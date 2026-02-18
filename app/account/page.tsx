"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function AccountPage() {
  const router = useRouter();
  const { user, isReady, updateUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setCompany(user.company ?? "");
    }
  }, [user]);

  useEffect(() => {
    if (isReady && user === null) router.push("/login");
  }, [isReady, user, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name: name.trim(), email: email.trim(), company: company.trim() || undefined });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  if (!isReady || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <p className="text-crest-text/70">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl">
          <h1 className="text-2xl font-semibold text-crest-text">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-crest-text/80">
            Update your profile. From the dashboard you can generate and preview websites.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {saved && (
              <p className="text-sm text-crest-primary bg-crest-primary/10 border border-crest-primary/20 rounded-md px-3 py-2" role="status">
                Profile saved.
              </p>
            )}
            <FormInput
              id="name"
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
            <FormInput
              id="company"
              label="Company (optional)"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Your business name"
            />
            <div className="flex flex-wrap gap-3 pt-2">
              <Button type="submit" variant="crestPrimary" size="default">
                Save changes
              </Button>
              <Button type="button" variant="crestOutline" size="default" asChild>
                <Link href="/dashboard">Go to Dashboard</Link>
              </Button>
            </div>
          </form>

          <div className="mt-10 pt-8 border-t border-crest-text/10">
            <Button
              type="button"
              variant="crestSecondary"
              size="default"
              onClick={handleLogout}
              className="text-crest-text"
            >
              Log out
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
