"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FormInput } from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWebsite } from "@/lib/website-context";
import { useAuth } from "@/lib/auth-context";
import type { ToneOption } from "@/lib/website-context";

const INDUSTRIES = [
  "Retail",
  "Restaurant & Food",
  "Health & Wellness",
  "Professional Services",
  "Technology",
  "Creative & Design",
  "Other",
];

const TONE_OPTIONS: { value: ToneOption; label: string }[] = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "casual", label: "Casual" },
  { value: "formal", label: "Formal" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { formState, setFormState, generateWebsite, isGenerating, lastError } =
    useWebsite();
  const outOfCredits = user && user.credits < 1;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await generateWebsite();
      router.push("/preview");
    } catch {
      // error message already handled via lastError in context
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold text-crest-text sm:text-3xl">
            Create your website from one prompt
          </h1>
          <p className="mt-2 text-base text-crest-text/80">
            Enter your business name and a short description. We&apos;ll generate a full single-page site—hero, sections, theme, and code—that you can preview and copy.
          </p>

          {lastError && (
            <p className="mt-4 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              We had trouble generating your website. Please try again in a moment.
              <br />
              <span className="text-xs opacity-80">Details: {lastError}</span>
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-6 rounded-lg border border-crest-text/10 bg-crest-background p-6 shadow-sm"
          >
            <FormInput
              id="businessName"
              label="Business Name *"
              placeholder="e.g. Acme Coffee Co."
              value={formState.businessName}
              onChange={(e) =>
                setFormState((prev) => ({
                  ...prev,
                  businessName: e.target.value,
                }))
              }
              required
            />

            <div className="space-y-1.5">
              <label
                htmlFor="description"
                className="text-sm font-medium text-crest-text leading-none"
              >
                What should the site feel like? (optional)
              </label>
              <textarea
                id="description"
                placeholder="e.g. Modern coffee shop, warm and minimal, with hero, menu highlight, and contact..."
                value={formState.description}
                onChange={(e) =>
                  setFormState((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                rows={3}
                className="w-full rounded-md border border-crest-text/20 bg-white px-3 py-2 text-sm text-crest-text placeholder:text-crest-text/40 focus:border-crest-primary focus:outline-none focus:ring-2 focus:ring-crest-primary/20"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="industry"
                className="text-sm font-medium text-crest-text leading-none"
              >
                Industry
              </label>
              <Select
                value={formState.industry || undefined}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, industry: value }))
                }
              >
                <SelectTrigger
                  id="industry"
                  className="border-crest-text/20 text-crest-text focus:ring-crest-primary"
                >
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <FormInput
              id="location"
              label="Location"
              placeholder="e.g. San Francisco, CA"
              value={formState.location}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, location: e.target.value }))
              }
            />

            <div className="space-y-1.5">
              <span className="text-sm font-medium text-crest-text leading-none">
                Tone
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {TONE_OPTIONS.map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() =>
                      setFormState((prev) => ({ ...prev, tone: value }))
                    }
                    className={`rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
                      formState.tone === value
                        ? "border-crest-primary bg-crest-primary/10 text-crest-primary"
                        : "border-crest-text/20 text-crest-text hover:bg-crest-text/5"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-crest-text/10 pt-6">
              <details className="group">
                <summary className="cursor-pointer text-sm font-medium text-crest-text hover:text-crest-primary">
                  Theme colors (optional)
                </summary>
                <p className="mt-2 text-xs text-crest-text/70 mb-4">
                  Leave blank for AI-chosen colors, or set your brand colors so the generated site matches your style.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-1.5">
                    <label
                      htmlFor="primaryColor"
                      className="text-xs font-medium text-crest-text leading-none"
                    >
                      Primary Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="primaryColor"
                        value={formState.theme.primaryColor || "#065F46"}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, primaryColor: e.target.value },
                          }))
                        }
                        className="h-10 w-16 rounded border border-crest-text/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="#065F46"
                        value={formState.theme.primaryColor}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, primaryColor: e.target.value },
                          }))
                        }
                        className="flex-1 rounded-md border border-crest-text/20 bg-white px-3 py-2 text-sm text-crest-text placeholder:text-crest-text/40 focus:border-crest-primary focus:outline-none focus:ring-2 focus:ring-crest-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="accentColor"
                      className="text-xs font-medium text-crest-text leading-none"
                    >
                      Accent Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="accentColor"
                        value={formState.theme.accentColor || "#10B981"}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, accentColor: e.target.value },
                          }))
                        }
                        className="h-10 w-16 rounded border border-crest-text/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="#10B981"
                        value={formState.theme.accentColor}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, accentColor: e.target.value },
                          }))
                        }
                        className="flex-1 rounded-md border border-crest-text/20 bg-white px-3 py-2 text-sm text-crest-text placeholder:text-crest-text/40 focus:border-crest-primary focus:outline-none focus:ring-2 focus:ring-crest-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="backgroundColor"
                      className="text-xs font-medium text-crest-text leading-none"
                    >
                      Background Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="backgroundColor"
                        value={formState.theme.backgroundColor || "#FFFFFF"}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, backgroundColor: e.target.value },
                          }))
                        }
                        className="h-10 w-16 rounded border border-crest-text/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="#FFFFFF"
                        value={formState.theme.backgroundColor}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, backgroundColor: e.target.value },
                          }))
                        }
                        className="flex-1 rounded-md border border-crest-text/20 bg-white px-3 py-2 text-sm text-crest-text placeholder:text-crest-text/40 focus:border-crest-primary focus:outline-none focus:ring-2 focus:ring-crest-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="textColor"
                      className="text-xs font-medium text-crest-text leading-none"
                    >
                      Text Color
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        id="textColor"
                        value={formState.theme.textColor || "#0F172A"}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, textColor: e.target.value },
                          }))
                        }
                        className="h-10 w-16 rounded border border-crest-text/20 cursor-pointer"
                      />
                      <input
                        type="text"
                        placeholder="#0F172A"
                        value={formState.theme.textColor}
                        onChange={(e) =>
                          setFormState((prev) => ({
                            ...prev,
                            theme: { ...prev.theme, textColor: e.target.value },
                          }))
                        }
                        className="flex-1 rounded-md border border-crest-text/20 bg-white px-3 py-2 text-sm text-crest-text placeholder:text-crest-text/40 focus:border-crest-primary focus:outline-none focus:ring-2 focus:ring-crest-primary/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5">
                  <label
                    htmlFor="fontFamily"
                    className="text-xs font-medium text-crest-text leading-none"
                  >
                    Font Family (Optional)
                  </label>
                  <input
                    type="text"
                    id="fontFamily"
                    placeholder="e.g. Inter, system-ui, sans-serif"
                    value={formState.theme.fontFamily}
                    onChange={(e) =>
                      setFormState((prev) => ({
                        ...prev,
                        theme: { ...prev.theme, fontFamily: e.target.value },
                      }))
                    }
                    className="w-full rounded-md border border-crest-text/20 bg-white px-3 py-2 text-sm text-crest-text placeholder:text-crest-text/40 focus:border-crest-primary focus:outline-none focus:ring-2 focus:ring-crest-primary/20"
                  />
                </div>
              </details>
            </div>

            {outOfCredits && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
                You have no credits left. Log in with a different account to get 5 free credits, or use the app without logging in (generated sites won’t be saved to your list).
              </p>
            )}
            <Button
              type="submit"
              variant="crestPrimary"
              size="lg"
              className="mt-2"
              disabled={isGenerating || !formState.businessName.trim() || !!outOfCredits}
            >
              {isGenerating ? "Building your website…" : "Generate website"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-crest-text/70">
            <Link href="/" className="hover:text-crest-primary underline">
              Back to home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
