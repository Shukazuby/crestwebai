"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function ResultsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <p className="text-crest-text/80 text-center max-w-md">
          We now generate full single-page websites, not just content. Create a website from the dashboard and preview it on the preview page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            variant="crestPrimary"
            size="lg"
            onClick={() => router.push("/dashboard")}
          >
            Generate a website
          </Button>
          <Button variant="crestOutline" size="lg" asChild>
            <Link href="/">Home</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
