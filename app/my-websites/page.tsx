"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3045";

interface WebsiteListItem {
  _id: string;
  businessName: string;
  description?: string;
  createdAt: string;
}

export default function MyWebsitesPage() {
  const router = useRouter();
  const { user, isReady, getAuthHeaders } = useAuth();
  const [list, setList] = useState<WebsiteListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isReady) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const abort = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/website?userId=${encodeURIComponent(user.id)}`, {
      signal: abort.signal,
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load websites");
        return res.json();
      })
      .then((data: WebsiteListItem[]) => {
        setList(Array.isArray(data) ? data : []);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
    return () => abort.abort();
  }, [isReady, user, router, getAuthHeaders]);

  if (!isReady || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <p className="text-crest-text/80">Loading…</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-crest-text sm:text-3xl">
                My websites
              </h1>
              <p className="mt-1 text-sm text-crest-text/80">
                All websites you’ve generated. Click to view or copy the code.
              </p>
            </div>
            <Button variant="crestPrimary" size="default" asChild>
              <Link href="/dashboard">Generate new website</Link>
            </Button>
          </div>

          {error && (
            <p className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              {error}
            </p>
          )}

          {loading ? (
            <p className="text-crest-text/70">Loading your websites…</p>
          ) : list.length === 0 ? (
            <div className="rounded-lg border border-crest-text/10 bg-crest-background p-12 text-center">
              <p className="text-crest-text/80">You haven’t generated any websites yet.</p>
              <Button variant="crestPrimary" size="lg" className="mt-4" asChild>
                <Link href="/dashboard">Generate your first website</Link>
              </Button>
            </div>
          ) : (
            <ul className="space-y-4">
              {list.map((site) => (
                <li key={site._id}>
                  <Link
                    href={`/websites/${site._id}`}
                    className="block rounded-lg border border-crest-text/10 bg-white p-4 shadow-sm hover:border-crest-primary/30 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h2 className="font-semibold text-crest-text">
                          {site.businessName || "Untitled website"}
                        </h2>
                        {site.description && (
                          <p className="mt-1 text-sm text-crest-text/70 line-clamp-2">
                            {site.description}
                          </p>
                        )}
                        <p className="mt-2 text-xs text-crest-text/50">
                          {site.createdAt
                            ? new Date(site.createdAt).toLocaleDateString(undefined, {
                                dateStyle: "medium",
                              })
                            : ""}
                        </p>
                      </div>
                      <span className="text-sm text-crest-primary font-medium">
                        View →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          <p className="mt-8 text-center text-sm text-crest-text/70">
            <Link href="/dashboard" className="hover:text-crest-primary underline">
              Dashboard
            </Link>
            {" · "}
            <Link href="/" className="hover:text-crest-primary underline">
              Home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
