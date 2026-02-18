"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";

export type ToneOption = "professional" | "friendly" | "casual" | "formal";

export interface DashboardFormState {
  businessName: string;
  industry: string;
  location: string;
  tone: ToneOption;
  description: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
  };
}

export interface WebsitePage {
  id: string;
  name: string;
  type: 'hero' | 'about' | 'services' | 'features' | 'testimonials' | 'contact' | 'footer' | 'custom';
  html: string;
  css: string;
  javascript?: string;
  theme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily?: string;
  };
}

export interface GeneratedWebsite {
  id?: string;
  businessName?: string;
  pages: WebsitePage[];
  globalTheme: {
    primaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily?: string;
  };
  description: string;
}

interface WebsiteContextValue {
  formState: DashboardFormState;
  setFormState: React.Dispatch<React.SetStateAction<DashboardFormState>>;
  generatedWebsite: GeneratedWebsite | null;
  setGeneratedWebsite: React.Dispatch<React.SetStateAction<GeneratedWebsite | null>>;
  generateWebsite: () => Promise<void>;
  isGenerating: boolean;
  lastError: string | null;
}

const defaultFormState: DashboardFormState = {
  businessName: "",
  industry: "",
  location: "",
  tone: "professional",
  description: "",
  theme: {
    primaryColor: "",
    accentColor: "",
    backgroundColor: "",
    textColor: "",
    fontFamily: "",
  },
};

const WebsiteContext = React.createContext<WebsiteContextValue | null>(null);

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const { user, setCredits, getAuthHeaders } = useAuth();
  const [formState, setFormState] =
    React.useState<DashboardFormState>(defaultFormState);
  const [generatedWebsite, setGeneratedWebsite] =
    React.useState<GeneratedWebsite | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastError, setLastError] = React.useState<string | null>(null);

  const generateWebsite = React.useCallback(async () => {
    if (!formState.businessName.trim()) {
      setLastError("Business name is required");
      return;
    }
    if (user && user.credits < 1) {
      setLastError("You need at least 1 credit to generate a website. Log in for 5 free credits.");
      return;
    }

    // Build theme object only if user has specified at least one color
    // Filter out empty strings and only include fields with actual values
    const themeFields: Record<string, string> = {};
    if (formState.theme.primaryColor?.trim()) {
      themeFields.primaryColor = formState.theme.primaryColor.trim();
    }
    if (formState.theme.accentColor?.trim()) {
      themeFields.accentColor = formState.theme.accentColor.trim();
    }
    if (formState.theme.backgroundColor?.trim()) {
      themeFields.backgroundColor = formState.theme.backgroundColor.trim();
    }
    if (formState.theme.textColor?.trim()) {
      themeFields.textColor = formState.theme.textColor.trim();
    }
    if (formState.theme.fontFamily?.trim()) {
      themeFields.fontFamily = formState.theme.fontFamily.trim();
    }
    
    const theme = Object.keys(themeFields).length > 0 ? themeFields : undefined;

    const payload = {
      businessName: formState.businessName.trim(),
      industry: formState.industry || undefined,
      location: formState.location || undefined,
      tone: formState.tone,
      description: formState.description || undefined,
      globalTheme: theme,
      ...(user?.id && { userId: user.id }),
    };

    setIsGenerating(true);
    setLastError(null);

    const API_BASE_URL =
      process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3045";

    try {
      const res = await fetch(`${API_BASE_URL}/website`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      let data: {
        website?: {
          _id?: string;
          businessName?: string;
          pages?: WebsitePage[];
          globalTheme?: {
            primaryColor: string;
            accentColor: string;
            backgroundColor: string;
            textColor: string;
            fontFamily?: string;
          };
          description?: string;
        };
        creditsRemaining?: number;
        _id?: string;
        businessName?: string;
        pages?: WebsitePage[];
        globalTheme?: {
          primaryColor: string;
          accentColor: string;
          backgroundColor: string;
          textColor: string;
          fontFamily?: string;
        };
        description?: string;
        message?: string | string[];
      } | null = null;
      try {
        data = await res.json();
      } catch {
        // ignore JSON parse errors; will fall back
      }

      if (!res.ok) {
        const message =
          (data && (data.message as string | string[])) ||
          `Request failed with status ${res.status}`;
        throw new Error(
          Array.isArray(message) ? message.join(", ") : message
        );
      }

      const site = data?.website ?? data;
      if (!site || !site.pages || site.pages.length === 0) {
        throw new Error("No website was generated");
      }

      if (typeof data?.creditsRemaining === "number") {
        setCredits(data.creditsRemaining);
      }

      // Default theme values
      const defaultTheme = {
        primaryColor: '#065F46',
        accentColor: '#10B981',
        backgroundColor: '#FFFFFF',
        textColor: '#0F172A',
        fontFamily: 'system-ui, sans-serif',
      };

      const rawPage = site.pages[0];
      const pageWithTheme: WebsitePage = {
        ...rawPage,
        theme: {
          primaryColor: rawPage.theme?.primaryColor || defaultTheme.primaryColor,
          accentColor: rawPage.theme?.accentColor || defaultTheme.accentColor,
          backgroundColor: rawPage.theme?.backgroundColor || defaultTheme.backgroundColor,
          textColor: rawPage.theme?.textColor || defaultTheme.textColor,
          fontFamily: rawPage.theme?.fontFamily || defaultTheme.fontFamily,
        },
      };

      const globalTheme = site.globalTheme || pageWithTheme.theme;
      const completeGlobalTheme = {
        primaryColor: globalTheme.primaryColor || defaultTheme.primaryColor,
        accentColor: globalTheme.accentColor || defaultTheme.accentColor,
        backgroundColor: globalTheme.backgroundColor || defaultTheme.backgroundColor,
        textColor: globalTheme.textColor || defaultTheme.textColor,
        fontFamily: globalTheme.fontFamily || defaultTheme.fontFamily,
      };

      setGeneratedWebsite({
        id: site._id,
        businessName: site.businessName ?? payload.businessName,
        pages: [pageWithTheme],
        globalTheme: completeGlobalTheme,
        description: site.description ?? '',
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while generating your website.";
      setLastError(message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [formState, user, setCredits, getAuthHeaders]);

  const value: WebsiteContextValue = React.useMemo(
    () => ({
      formState,
      setFormState,
      generatedWebsite,
      setGeneratedWebsite,
      generateWebsite,
      isGenerating,
      lastError,
    }),
    [formState, generatedWebsite, generateWebsite, isGenerating, lastError]
  );

  return (
    <WebsiteContext.Provider value={value}>{children}</WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const ctx = React.useContext(WebsiteContext);
  if (!ctx) {
    throw new Error("useWebsite must be used within a WebsiteProvider");
  }
  return ctx;
}
