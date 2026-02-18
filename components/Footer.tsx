"use client";

import Link from "next/link";
import { LogoIcon } from "@/components/Navbar";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full border-t border-crest-text/10 bg-crest-background py-10",
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-crest-text no-underline"
          >
            <LogoIcon />
            <span className="font-semibold text-crest-text">CrestWeb AI</span>
          </Link>

          {/* <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              href="/about"
              className="text-sm text-crest-text hover:text-crest-primary transition-colors"
            >
              About
            </Link>
          </div> */}

          {/* <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-crest-text hover:text-crest-primary transition-colors"
              aria-label="Share"
            >
              <ShareIcon className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@crestweb.ai"
              className="text-crest-text hover:text-crest-primary transition-colors"
              aria-label="Email"
            >
              <EmailIcon className="h-5 w-5" />
            </a>
          </div> */}
        </div>

        <p className="mt-8 text-center text-sm text-crest-text/70">
          © {new Date().getFullYear()} CrestWeb AI. Prompt to website, generate full single-page sites with code.
        </p>
      </div>
    </footer>
  );
}

Footer.displayName = "Footer";

export { Footer };
