import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/Card";

const FEATURES = [
  {
    icon: "brain",
    title: "Prompt to full page",
    description:
      "Describe your business and optional style. Our AI generates a complete single-page website: hero, about, services, contact, footer with real HTML, CSS, and optional JavaScript.",
  },
  {
    icon: "store",
    title: "Built for small businesses",
    description:
      "No dev team required. Get a professional, responsive single-page site in one flow. Ideal for solopreneurs, local shops, and small teams who need a real website fast.",
  },
  {
    icon: "copy",
    title: "Copy the code",
    description:
      "Preview your site, then copy the full HTML (or just HTML, CSS, or JS). Use it in any host, static site, or CMS you own the output with no lock-in.",
  },
  {
    icon: "tone",
    title: "Your theme, your tone",
    description:
      "Set primary, accent, background, and text colors or leave them blank and let the AI pick. Choose tone: professional, friendly, casual, or formal.",
  },
  {
    icon: "layers",
    title: "Real layout and images",
    description:
      "Sections are laid out as a real page with placeholder images from trusted services. What you see in the preview is what you get in the code.",
  },
  {
    icon: "refresh",
    title: "Regenerate anytime",
    description:
      "Not quite right? Regenerate from the dashboard or preview page. Tweak your description or theme and get a new version in seconds.",
  },
];

function FeatureIcon({ name }: { name: string }) {
  const className = "h-5 w-5";
  switch (name) {
    case "brain":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
          <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
        </svg>
      );
    case "store":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M2 7h20" />
        </svg>
      );
    case "copy":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
        </svg>
      );
    case "tone":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9 9" />
          <path d="M19 3v4" />
          <path d="M21 5h-4" />
        </svg>
      );
    case "layers":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
        </svg>
      );
    case "refresh":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21h5v-5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-crest-text sm:text-4xl">
              From prompt to website
            </h1>
            <p className="mt-4 text-base text-crest-text/80">
              One flow to generate a full single-page site with code. No coding required—describe, preview, copy, and go.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <Card key={feature.title} className="flex flex-col">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-crest-primary text-white">
                    <FeatureIcon name={feature.icon} />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <Button variant="crestPrimary" size="lg" asChild>
              <Link href="/dashboard">Generate a website</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
