import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-crest-background">
      <Navbar />

      {/* Hero — full-bleed with subtle gradient and accent line */}
      <header className="relative overflow-hidden px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
        <div
          className="absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #065F46 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-crest-primary to-transparent sm:w-32" />
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-crest-primary">
            Our story
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-crest-text sm:text-5xl lg:text-[2.75rem]">
            About CrestWeb AI
          </h1>
          <p className="mt-6 max-w-xl mx-auto text-lg leading-relaxed text-crest-text/80">
            We turn a short description into a full single-page website. You get real HTML, CSS, and code—not just copy—so you can host your site anywhere.
          </p>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">

          {/* Mission — editorial block with left accent */}
          <section className="relative border-l-2 border-crest-primary/30 pl-6 sm:pl-8 py-2">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-crest-primary/80">
              Mission
            </span>
            <h2 className="mt-2 text-xl font-semibold text-crest-text sm:text-2xl">
              Why we exist
            </h2>
            <p className="mt-4 text-crest-text/85 leading-[1.75]">
              CrestWeb AI was built for people who want a real website without hiring a developer or learning to code. You describe your business and style; we generate a complete single-page site with hero, sections, theme, and code. Preview it, copy the HTML, and use it anywhere—no lock-in.
            </p>
          </section>

          {/* Beliefs — chic card list */}
          <section className="mt-16 sm:mt-20">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-crest-primary/80">
              Beliefs
            </span>
            <h2 className="mt-2 text-xl font-semibold text-crest-text sm:text-2xl">
              What we believe
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                "A website should be a full page with layout and code, not just text.",
                "You should own the output—copy the code and host it wherever you want.",
                "Theme and tone should match your brand; you choose colors or let the AI suggest.",
              ].map((text, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-4 rounded-xl border border-crest-text/5 bg-white/60 px-5 py-4 shadow-sm transition-shadow hover:shadow-md"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-crest-primary/10 text-xs font-medium text-crest-primary"
                    aria-hidden
                  >
                    {i + 1}
                  </span>
                  <span className="text-crest-text/90 leading-relaxed">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Who we're for — pull quote style */}
          <section className="mt-16 sm:mt-20">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-crest-primary/80">
              For you
            </span>
            <h2 className="mt-2 text-xl font-semibold text-crest-text sm:text-2xl">
              Who we’re for
            </h2>
            <div className="mt-6 rounded-2xl border border-crest-text/5 bg-gradient-to-br from-crest-primary/5 to-crest-accent/5 px-6 py-8 sm:px-8 sm:py-10">
              <p className="text-lg leading-[1.8] text-crest-text/90 sm:text-xl">
                Solopreneurs, local businesses, freelancers, and small teams who want a real single-page website—with layout, sections, and code—without hiring a developer or learning HTML.
              </p>
              <p className="mt-4 font-medium text-crest-text">
                If you’d rather describe your business once and get a full site to preview and copy, CrestWeb AI is for you.
              </p>
            </div>
          </section>

          {/* CTAs — refined strip */}
          <div className="mt-20 rounded-2xl border border-crest-text/5 bg-gradient-to-b from-white/80 to-crest-primary/[0.04] px-6 py-10 text-center sm:px-10 sm:py-12">
            <p className="text-sm font-medium uppercase tracking-widest text-crest-primary/90">
              Ready to try?
            </p>
            <p className="mt-2 text-lg text-crest-text/85 sm:text-xl">
              Generate your first website in one go.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="crestPrimary" size="lg" asChild>
                <Link href="/dashboard">Generate a website</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
