import type { Metadata } from "next";
import localFont from "next/font/local";
import { WebsiteProvider } from "@/lib/website-context";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CrestWeb AI | Prompt to Website",
  description:
    "Describe your business and get a full single-page website. We generate HTML, CSS, and code—preview and copy to use anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-crest-background text-crest-text`}
      >
        <AuthProvider>
          <WebsiteProvider>{children}</WebsiteProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
