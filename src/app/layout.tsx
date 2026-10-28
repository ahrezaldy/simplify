import type { Metadata } from "next";
import { Geist_Mono, Lato } from "next/font/google";
import { Providers } from "@/components/deck/Providers";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const description =
  "How the best businesses simplify: price- and proposition-simplifying, great simplifiers, and how market leaders respond. By Arif Hidayah Rezaldy, Mamikos.";

export const metadata: Metadata = {
  title: "Simplify — Arif Hidayah Rezaldy · Mamikos",
  description,
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  openGraph: {
    title: "Simplify",
    description,
    type: "website",
    siteName: "Mamikos",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${lato.variable} ${geistMono.variable} antialiased`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
