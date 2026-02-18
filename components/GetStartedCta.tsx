"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import type { ButtonProps } from "@/components/ui/button";

export interface GetStartedCtaProps extends Omit<ButtonProps, "asChild"> {
  children: React.ReactNode;
}

/**
 * For guests: opens the auth (sign in / sign up) modal.
 * For logged-in users: links to /dashboard.
 */
export function GetStartedCta({ children, ...buttonProps }: GetStartedCtaProps) {
  const { user, openAuthModal } = useAuth();

  if (user) {
    return (
      <Button {...buttonProps} asChild>
        <Link href="/dashboard">{children}</Link>
      </Button>
    );
  }

  return (
    <Button {...buttonProps} onClick={openAuthModal}>
      {children}
    </Button>
  );
}
