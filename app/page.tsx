import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GetStartedCta } from "@/components/GetStartedCta";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/Card";

function HeroSection() {
  return (
    <section className="relative w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-crest-primary bg-emerald-50/80 px-4 py-1.5 text-xs font-medium uppercase tracking-wide text-crest-primary">
          Prompt to website
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-crest-text sm:text-4xl md:text-5xl">
          Describe Your Business. Get a Full Website.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-crest-text/90 sm:text-lg">
          One prompt creates a complete single-page website: hero, sections, theme, and code.
          Copy the HTML and use it anywhere, no coding required.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <GetStartedCta variant="crestPrimary" size="lg">
            Get Started
          </GetStartedCta>
          {/* <Button variant="crestSecondary" size="lg" asChild>
            <Link href="/#features" className="inline-flex items-center gap-2">
              <PlayIcon className="h-4 w-4" />
              See How It Works
            </Link>
          </Button> */}
        </div>
        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-4xl">
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-crest-text/60">
              You describe → AI generates a full page
            </p>
            {/* Browser-style window */}
            <div className="overflow-hidden rounded-2xl border border-crest-text/10 bg-slate-100 shadow-2xl shadow-crest-primary/10">
              <div className="flex items-center gap-2 border-b border-crest-text/10 bg-slate-200/80 px-4 py-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" aria-hidden />
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-400" aria-hidden />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="flex items-center gap-2 rounded-lg bg-white/90 px-4 py-1.5 text-xs text-slate-500 shadow-inner">
                    <LockIcon className="h-3 w-3" />
                    app.crestweb.ai/dashboard
                  </div>
                </div>
                <div className="w-12" aria-hidden />
              </div>
              {/* Bento: input left, content cards right */}
              <div className="grid grid-cols-1 gap-0 bg-[#0f172a] sm:grid-cols-5" style={{ minHeight: "320px" }}>
                <div className="flex flex-col justify-center gap-4 border-r border-slate-700/50 bg-slate-900/40 p-5 sm:col-span-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-emerald-400/90">
                    BesCoffy.co
                  </span>
                  <div>
                    <label className="block text-xs text-slate-400">Business + style</label>
                    <div className="mt-1 h-9 w-full max-w-[180px] rounded-lg border border-slate-600 bg-slate-800/80 px-3 py-2 text-sm text-slate-200">
                      A modern coffee shop
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-8 items-center rounded-lg bg-crest-cta/20 px-3 text-xs font-medium text-amber-200">
                      Generate
                    </span>
                    <span className="text-xs text-slate-500">→</span>
                  </div>
                </div>
                <div className="flex flex-wrap content-start gap-2 p-4 sm:col-span-3 sm:gap-3 sm:p-5">
                  <span className="w-full text-[10px] font-semibold uppercase tracking-widest text-slate-500 sm:w-auto">
                    AI builds
                  </span>
                  {[
                    { label: "Hero + sections", w: "w-full sm:w-[calc(50%-6px)]", done: true },
                    { label: "Theme + code", w: "w-full sm:w-[calc(50%-6px)]", done: true },
                    { label: "Copy HTML", w: "w-full", done: true },
                  ].map((card, i) => (
                    <div
                      key={card.label}
                      className={`flex items-start justify-between gap-2 rounded-xl border px-3 py-2.5 sm:py-3 ${card.w} ${
                        card.done
                          ? "border-emerald-500/30 bg-emerald-500/10"
                          : "border-slate-600/40 bg-slate-800/50"
                      }`}
                      style={{ animationDelay: `${i * 80}ms` }}
                    >
                      <span className="text-xs font-medium text-slate-300">{card.label}</span>
                      {card.done && (
                        <span className="rounded-full bg-emerald-500/20 p-0.5" aria-hidden>
                          <CheckIcon className="h-3 w-3 text-emerald-400" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="features-heading"
          className="text-2xl font-semibold text-crest-text sm:text-3xl"
        >
          From Prompt to Live Website
        </h2>
        <p className="mt-2 max-w-xl text-base text-crest-text/80">
          One flow: describe your business and style, get a full single-page site with code you can copy and host anywhere.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-crest-primary text-white">
                <BrainIcon className="h-5 w-5" />
              </div>
              <CardTitle>Full Page, Not Just Copy</CardTitle>
              <CardDescription>
                We generate a complete single-page website: hero, about, services, contact, and footer with real HTML, CSS, and optional JavaScript, not just text blocks.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-crest-primary text-white">
                <StoreIcon className="h-5 w-5" />
              </div>
              <CardTitle>Your Colors, Your Vibe</CardTitle>
              <CardDescription>
                Pick your theme colors and tone, or leave it to the AI. Every site is responsive and uses placeholder images so it looks real from the first preview.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="flex flex-col">
            <CardHeader>
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-crest-primary text-white">
                <ChecklistIcon className="h-5 w-5" />
              </div>
              <CardTitle>Copy the Code and Go</CardTitle>
              <CardDescription>
                Preview your site, then copy the full HTML (or sections). Drop it into any host or static site,no lock-in, no subscription needed to use the code.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </section>
  );
}

function BrainIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
      <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
      <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
      <path d="M2 7h20" />
    </svg>
  );
}

function ChecklistIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function CtaBanner() {
  return (
    <section
      className="w-full px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="cta-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="rounded-xl bg-crest-primary px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2
            id="cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            Get your website in one go
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-white/90">
            Describe your business, choose your style, and get a full single-page website with code. Preview, copy, and use it anywhere.
          </p>
          <GetStartedCta
            variant="crestPrimary"
            size="lg"
            className="mt-6 bg-crest-cta text-white hover:bg-crest-cta/90"
          >
            Generate a website
          </GetStartedCta>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
