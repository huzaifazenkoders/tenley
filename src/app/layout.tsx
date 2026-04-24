import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Tenley - Property Management Platform",
  description:
    "Comprehensive property management platform for managing properties, tenants, staff, and maintenance with ease.",
  keywords: [
    "property management",
    "tenant management",
    "property listings",
    "maintenance tracking",
    "staff management"
  ],
  authors: [{ name: "Zenkoders" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tenley-tnt4.vercel.app/",
    title: "Tenley - Property Management Platform",
    description:
      "Comprehensive property management platform for managing properties, tenants, staff, and maintenance with ease.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tenley - Property Management Platform",
        type: "image/png"
      },
      {
        url: "/og-image.png",
        // url: "/og-image-square.png",
        width: 800,
        height: 800,
        alt: "Tenley - Property Management Platform",
        type: "image/png"
      }
    ],
    siteName: "Tenley"
  },
  twitter: {
    card: "summary_large_image",
    title: "Tenley - Property Management Platform",
    description:
      "Comprehensive property management platform for managing properties, tenants, staff, and maintenance with ease.",
    images: ["/og-image.png"],
    creator: "@zenkoders"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/favs/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favs/favicon.svg", type: "image/svg+xml" },
      { url: "/favs/favicon.ico" } // shortcut icon
    ],
    apple: [{ url: "/favs/apple-touch-icon.png", sizes: "180x180" }]
  },
  manifest: "/favs/site.webmanifest"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <NuqsAdapter>
          <Providers>{children}</Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
