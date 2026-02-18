"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useWebsite } from "@/lib/website-context";
import { WebsitePage } from "@/lib/website-context";

function PagePreview({ page }: { page: WebsitePage }) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const fullHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.name}</title>
  <style>
    ${page.css}
  </style>
</head>
<body>
  ${page.html}
  ${page.javascript ? `<script>${page.javascript}</script>` : ''}
</body>
</html>
  `.trim();

  return (
    <div className="rounded-lg border border-crest-text/10 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-crest-text/10 bg-crest-background px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold text-crest-text">Single-page site</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-crest-primary/10 text-crest-primary">
            Full HTML · CSS · JS
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="crestOutline"
            size="sm"
            onClick={() => setShowCode(!showCode)}
          >
            {showCode ? "Hide code" : "Show code"}
          </Button>
          <Button
            variant="crestOutline"
            size="sm"
            onClick={() => copyToClipboard(fullHtml, `full-${page.id}`)}
          >
            {copied === `full-${page.id}` ? "Copied!" : "Copy full HTML"}
          </Button>
        </div>
      </div>

      {showCode && (
        <div className="border-b border-crest-text/10 bg-slate-50 p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-crest-text">HTML</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(page.html, `html-${page.id}`)}
                className="h-6 text-xs"
              >
                {copied === `html-${page.id}` ? "Copied!" : "Copy"}
              </Button>
            </div>
            <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto">
              <code>{page.html}</code>
            </pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-crest-text">CSS</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(page.css, `css-${page.id}`)}
                className="h-6 text-xs"
              >
                {copied === `css-${page.id}` ? "Copied!" : "Copy"}
              </Button>
            </div>
            <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto">
              <code>{page.css}</code>
            </pre>
          </div>
          {page.javascript && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-crest-text">JavaScript</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(page.javascript || '', `js-${page.id}`)}
                  className="h-6 text-xs"
                >
                  {copied === `js-${page.id}` ? "Copied!" : "Copy"}
                </Button>
              </div>
              <pre className="text-xs bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto max-h-48 overflow-y-auto">
                <code>{page.javascript}</code>
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="p-4 bg-white">
        <iframe
          srcDoc={`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${page.css}
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      background-color: ${page.theme?.backgroundColor || '#FFFFFF'};
      color: ${page.theme?.textColor || '#000000'};
      font-family: ${page.theme?.fontFamily || 'system-ui, sans-serif'};
    }
  </style>
</head>
<body>
  ${page.html}
  ${page.javascript ? `<script>${page.javascript}</script>` : ''}
</body>
</html>
          `}
          className="w-full border border-crest-text/10 rounded"
          style={{ minHeight: '600px', height: 'auto' }}
          title="Preview: Complete Website"
          sandbox="allow-scripts allow-same-origin"
        />
      </div>
    </div>
  );
}

export default function PreviewPage() {
  const router = useRouter();
  const { generatedWebsite, generateWebsite, isGenerating, lastError } =
    useWebsite();

  const handleRegenerate = () => {
    void generateWebsite();
  };

  if (!generatedWebsite || !generatedWebsite.pages || generatedWebsite.pages.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
          <p className="text-crest-text/80">No website generated yet.</p>
          <Button
            variant="crestPrimary"
            size="lg"
            className="mt-4"
            onClick={() => router.push("/dashboard")}
          >
            Go to Dashboard
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-crest-text sm:text-3xl">
                Your generated website
              </h1>
              <p className="mt-1 text-sm text-crest-text/80">
                {generatedWebsite.businessName && (
                  <>Built for <strong>{generatedWebsite.businessName}</strong>. </>
                )}
                Preview below, then copy the full HTML to use anywhere.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="crestOutline"
                size="default"
                className="shrink-0"
                disabled={isGenerating}
                onClick={handleRegenerate}
              >
                {isGenerating ? "Regenerating..." : "Regenerate"}
              </Button>
              <Button
                variant="crestPrimary"
                size="default"
                className="shrink-0"
                onClick={() => router.push("/dashboard")}
              >
                Create Another
              </Button>
            </div>
          </div>

          {lastError && (
            <p className="mb-6 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900">
              We had trouble regenerating your website. Please try again in a moment.
              <br />
              <span className="text-xs opacity-80">Details: {lastError}</span>
            </p>
          )}

          {generatedWebsite.description && (
            <div className="mb-6 rounded-lg border border-crest-text/10 bg-crest-background p-4">
              <p className="text-sm text-crest-text/80">{generatedWebsite.description}</p>
            </div>
          )}

          <div className="space-y-8">
            {generatedWebsite.pages.length > 0 && (
              <PagePreview page={generatedWebsite.pages[0]} />
            )}
          </div>

          {generatedWebsite.globalTheme && (
            <div className="mt-12 rounded-lg border border-crest-text/10 bg-crest-background p-6">
              <h2 className="text-lg font-semibold text-crest-text mb-2">Global Theme</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-crest-text/60">Primary Color</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-8 h-8 rounded border border-crest-text/20"
                      style={{ backgroundColor: generatedWebsite.globalTheme?.primaryColor || '#065F46' }}
                    />
                    <code className="text-xs">{generatedWebsite.globalTheme?.primaryColor || '#065F46'}</code>
                  </div>
                </div>
                <div>
                  <span className="text-crest-text/60">Accent Color</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-8 h-8 rounded border border-crest-text/20"
                      style={{ backgroundColor: generatedWebsite.globalTheme?.accentColor || '#10B981' }}
                    />
                    <code className="text-xs">{generatedWebsite.globalTheme?.accentColor || '#10B981'}</code>
                  </div>
                </div>
                <div>
                  <span className="text-crest-text/60">Background</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-8 h-8 rounded border border-crest-text/20"
                      style={{ backgroundColor: generatedWebsite.globalTheme?.backgroundColor || '#FFFFFF' }}
                    />
                    <code className="text-xs">{generatedWebsite.globalTheme?.backgroundColor || '#FFFFFF'}</code>
                  </div>
                </div>
                <div>
                  <span className="text-crest-text/60">Text Color</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div
                      className="w-8 h-8 rounded border border-crest-text/20"
                      style={{ backgroundColor: generatedWebsite.globalTheme?.textColor || '#0F172A' }}
                    />
                    <code className="text-xs">{generatedWebsite.globalTheme?.textColor || '#0F172A'}</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="mt-8 text-center text-sm text-crest-text/70">
            <Link href="/dashboard" className="hover:text-crest-primary underline">
              Create another website
            </Link>
            {" · "}
            <Link href="/" className="hover:text-crest-primary underline">
              Home
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
