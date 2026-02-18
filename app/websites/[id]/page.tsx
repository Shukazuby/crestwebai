"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import type { WebsitePage } from "@/lib/website-context";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3045";

const defaultTheme = {
  primaryColor: "#065F46",
  accentColor: "#10B981",
  backgroundColor: "#FFFFFF",
  textColor: "#0F172A",
  fontFamily: "system-ui, sans-serif",
};

export default function ViewWebsitePage() {
  const params = useParams();
  const { getAuthHeaders } = useAuth();
  const id = params?.id as string | undefined;
  const [website, setWebsite] = useState<{
    _id: string;
    businessName: string;
    description?: string;
    pages: WebsitePage[];
    globalTheme?: {
      primaryColor: string;
      accentColor: string;
      backgroundColor: string;
      textColor: string;
      fontFamily?: string;
    };
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("Missing website id");
      return;
    }
    const abort = new AbortController();
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/website/${encodeURIComponent(id)}`, {
      signal: abort.signal,
      headers: getAuthHeaders(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Website not found");
        return res.json();
      })
      .then((data) => {
        setWebsite(data);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setError(e.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
    return () => abort.abort();
  }, [id, getAuthHeaders]);

  if (!id || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <p className="text-crest-text/80">{loading ? "Loading…" : "Invalid link."}</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !website) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <p className="text-crest-text/80">{error || "Website not found."}</p>
          <Button variant="crestPrimary" size="lg" className="mt-4" asChild>
            <Link href="/my-websites">Back to my websites</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const page = website.pages?.[0];
  if (!page) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <p className="text-crest-text/80">This website has no content.</p>
          <Button variant="crestPrimary" size="lg" className="mt-4" asChild>
            <Link href="/my-websites">Back to my websites</Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const theme = page.theme ?? website.globalTheme ?? defaultTheme;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold text-crest-text">
                {website.businessName || "Generated website"}
              </h1>
              {website.description && (
                <p className="mt-1 text-sm text-crest-text/70">{website.description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <Button variant="crestOutline" size="default" asChild>
                <Link href="/my-websites">My websites</Link>
              </Button>
              <Button variant="crestPrimary" size="default" asChild>
                <Link href="/dashboard">Generate another</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-crest-text/10 bg-white shadow-sm overflow-hidden">
            <div className="p-4 bg-crest-background border-b border-crest-text/10">
              <p className="text-sm text-crest-text/70">
                Preview of your saved website. Copy the code from the preview page after generating to reuse it.
              </p>
            </div>
            <div className="p-4">
              <iframe
                srcDoc={`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${page.css}
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 0;
      background-color: ${theme.backgroundColor || defaultTheme.backgroundColor};
      color: ${theme.textColor || defaultTheme.textColor};
      font-family: ${theme.fontFamily || defaultTheme.fontFamily};
    }
  </style>
</head>
<body>
  ${page.html}
  ${page.javascript ? `<script>${page.javascript}</script>` : ""}
</body>
</html>
                `}
                className="w-full border border-crest-text/10 rounded"
                style={{ minHeight: "600px", height: "auto" }}
                title="Website preview"
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-crest-text/70">
            <Link href="/my-websites" className="hover:text-crest-primary underline">
              Back to my websites
            </Link>
            {" · "}
            <Link href="/dashboard" className="hover:text-crest-primary underline">
              Dashboard
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
