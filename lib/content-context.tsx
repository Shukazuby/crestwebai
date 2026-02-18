"use client";

import * as React from "react";

export type ToneOption = "professional" | "friendly" | "casual" | "formal";

export interface DashboardFormState {
  businessName: string;
  industry: string;
  location: string;
  tone: ToneOption;
}

export interface GeneratedContent {
  id?: string;
  businessName?: string;
  about: string;
  services: string;
  mission: string;
  faqs: string;
  socialCaptions: string;
}

interface ContentContextValue {
  formState: DashboardFormState;
  setFormState: React.Dispatch<React.SetStateAction<DashboardFormState>>;
  generatedContent: GeneratedContent | null;
  setGeneratedContent: React.Dispatch<React.SetStateAction<GeneratedContent | null>>;
  generateContent: () => Promise<void>;
  isGenerating: boolean;
  lastError: string | null;
}

const defaultFormState: DashboardFormState = {
  businessName: "",
  industry: "",
  location: "",
  tone: "professional",
};

const defaultGeneratedContent: GeneratedContent = {
  about:
    "We are a dedicated team focused on delivering exceptional value to our customers. With years of experience in our field, we combine expertise with a customer-first approach to help your business thrive.",
  services:
    "Our core services include strategic consulting, tailored solutions, and ongoing support. We work closely with you to understand your needs and deliver results that exceed expectations.",
  mission:
    "Our mission is to empower businesses with the tools and insights they need to grow sustainably. We believe in transparency, quality, and building long-term partnerships.",
  faqs:
    "Q: How quickly can I get started?\nA: Most clients are up and running within a few days.\n\nQ: Do you offer ongoing support?\nA: Yes, we provide continuous support and regular check-ins.\n\nQ: What makes you different?\nA: We focus on your specific goals and adapt our approach to your industry.",
  socialCaptions:
    "Ready to take the next step? We're here to help you grow. #BusinessGrowth #Partnership\n\nThank you to everyone who has trusted us with their success. More wins ahead! #Grateful #Community",
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3045";

const ContentContext = React.createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [formState, setFormState] =
    React.useState<DashboardFormState>(defaultFormState);
  const [generatedContent, setGeneratedContent] =
    React.useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [lastError, setLastError] = React.useState<string | null>(null);

  const generateContent = React.useCallback(async () => {
    const about =
      formState.businessName.trim() !== ""
        ? `${formState.businessName} is a dedicated team focused on delivering exceptional value to our customers. With years of experience, we combine expertise with a customer-first approach to help your business thrive.`
        : defaultGeneratedContent.about;

    const payload = {
      businessName:
        formState.businessName.trim() || "Your business",
      industry: formState.industry || undefined,
      location: formState.location || undefined,
      tone: formState.tone,
      about,
      services: defaultGeneratedContent.services,
      mission: defaultGeneratedContent.mission,
      faqs: defaultGeneratedContent.faqs,
      socialCaptions: defaultGeneratedContent.socialCaptions,
    };

    setIsGenerating(true);
    setLastError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/content`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data: {
        _id?: string;
        businessName?: string;
        about?: string;
        services?: string;
        mission?: string;
        faqs?: string;
        socialCaptions?: string;
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

      setGeneratedContent({
        id: data?._id,
        businessName: data?.businessName ?? payload.businessName,
        about: data?.about ?? payload.about,
        services: data?.services ?? payload.services,
        mission: data?.mission ?? payload.mission,
        faqs: data?.faqs ?? payload.faqs,
        socialCaptions:
          data?.socialCaptions ?? payload.socialCaptions,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while generating content.";
      setLastError(message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  }, [formState]);

  const value: ContentContextValue = React.useMemo(
    () => ({
      formState,
      setFormState,
      generatedContent,
      setGeneratedContent,
      generateContent,
      isGenerating,
      lastError,
    }),
    [formState, generatedContent, generateContent, isGenerating, lastError]
  );

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  );
}

export function useContent() {
  const ctx = React.useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
}
