"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

const LOGO_ICON_SIZE = 28;

function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      width={LOGO_ICON_SIZE}
      height={LOGO_ICON_SIZE}
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <rect
        width="28"
        height="28"
        rx="6"
        fill="currentColor"
        className="text-crest-primary"
      />
      <path
        d="M8 14L12 10L16 14L12 18L8 14Z"
        fill="white"
        fillOpacity="0.9"
      />
      <path
        d="M14 8L18 12L14 16L10 12L14 8Z"
        fill="white"
        fillOpacity="0.6"
      />
    </svg>
  );
}

export interface NavbarProps {
  className?: string;
}

function Navbar({ className }: NavbarProps) {
  const { user, openAuthModal } = useAuth();
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-crest-text/10 bg-crest-background",
        className
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-crest-text no-underline"
        >
          <LogoIcon />
          <span className="font-semibold text-crest-text">CrestWeb AI</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/features"
            className="text-sm font-medium text-crest-text hover:text-crest-primary transition-colors"
          >
            Features
          </Link>
          {/* <Link
            href="/pricing"
            className="text-sm font-medium text-crest-text hover:text-crest-primary transition-colors"
          >
            Pricing
          </Link> */}
          <Link
            href="/about"
            className="text-sm font-medium text-crest-text hover:text-crest-primary transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-crest-text/80" title="Credits remaining">
                {user.credits} credit{user.credits !== 1 ? "s" : ""}
              </span>
              <Button variant="crestSecondary" size="default" asChild>
                <Link href="/my-websites">My websites</Link>
              </Button>
              <Button variant="crestSecondary" size="default" asChild>
                <Link href="/account">Account</Link>
              </Button>
              <Button variant="crestPrimary" size="default" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="crestPrimary" size="default" onClick={openAuthModal}>
                Get Started
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

Navbar.displayName = "Navbar";

export { Navbar, LogoIcon };
