"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  onSuccessRedirect?: string;
}

export function AuthModal({
  open,
  onClose,
  onSuccessRedirect = "/dashboard",
}: AuthModalProps) {
  const router = useRouter();
  const { login, register } = useAuth();
  const [mode, setMode] = React.useState<Mode>("signin");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [company, setCompany] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  React.useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  const resetForm = React.useCallback(() => {
    setError("");
    setEmail("");
    setPassword("");
    setName("");
    setCompany("");
    setLoading(false);
  }, []);

  const handleClose = React.useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }
    if (mode === "signup" && password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "signin") {
        const ok = await login(email.trim(), password);
        if (ok) {
          handleClose();
          router.push(onSuccessRedirect);
        } else setError("Invalid email or password.");
      } else {
        const ok = await register(email.trim(), password, {
          name: name.trim() || undefined,
          company: company.trim() || undefined,
        });
        if (ok) {
          handleClose();
          router.push(onSuccessRedirect);
        } else setError("An account with this email already exists, or something went wrong.");
      }
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onCancel={handleClose}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-[100] w-full max-w-lg rounded-xl border border-crest-text/10 bg-crest-background p-0 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm [&::backdrop]:bg-black/50"
      aria-labelledby="auth-modal-title"
      aria-describedby="auth-modal-desc"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 id="auth-modal-title" className="text-xl font-semibold text-crest-text">
            {mode === "signin" ? "Sign in" : "Create an account"}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1 text-crest-text/70 hover:bg-crest-text/10 hover:text-crest-text focus:outline-none focus:ring-2 focus:ring-crest-primary"
            aria-label="Close"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
        <p id="auth-modal-desc" className="mt-1 text-sm text-crest-text/80">
          {mode === "signin"
            ? "Sign in to access your dashboard and generate websites."
            : "Sign up to get 5 free credits and save your generated websites."}
        </p>

        <div className="mt-6 flex rounded-lg border border-crest-text/15 bg-crest-text/5 p-1">
          <button
            type="button"
            onClick={() => { setMode("signin"); setError(""); }}
            className={cn(
              "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
              mode === "signin"
                ? "bg-crest-background text-crest-text shadow"
                : "text-crest-text/70 hover:text-crest-text"
            )}
          >
            Sign in
          </button>
          <button
            type="button"
            onClick={() => { setMode("signup"); setError(""); }}
            className={cn(
              "flex-1 rounded-md py-2 text-sm font-medium transition-colors",
              mode === "signup"
                ? "bg-crest-background text-crest-text shadow"
                : "text-crest-text/70 hover:text-crest-text"
            )}
          >
            Sign up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {error && (
            <p
              className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2"
              role="alert"
            >
              {error}
            </p>
          )}
          <FormInput
            id="auth-modal-email"
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
          <FormInput
            id="auth-modal-password"
            label="Password"
            type="password"
            placeholder={mode === "signup" ? "At least 6 characters" : "••••••••"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={mode === "signup" ? "new-password" : "current-password"}
          />
          {mode === "signup" && (
            <>
              <FormInput
                id="auth-modal-name"
                label="Name (optional)"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <FormInput
                id="auth-modal-company"
                label="Company (optional)"
                placeholder="Your business"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                autoComplete="organization"
              />
            </>
          )}
          <Button
            type="submit"
            variant="crestPrimary"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? mode === "signin"
                ? "Signing in…"
                : "Creating account…"
              : mode === "signin"
                ? "Sign in"
                : "Sign up"}
          </Button>
        </form>
      </div>
    </dialog>
  );
}

function CloseIcon({ className }: { className?: string }) {
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
        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
