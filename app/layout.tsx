import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Pinyon_Script } from "next/font/google";
import "./globals.css";

const pinyon = Pinyon_Script({
  variable: "--font-pinyon",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cordelia & Denzil — Holy Matrimony, Shillong",
  description:
    "Saturday, 14th November 2026 · 1:30 PM · Cathedral of Mary Help of Christians, Laitumkhrah, Shillong. With joyful hearts, we invite you to celebrate with us.",
  applicationName: "Cordelia & Denzil",
  authors: [{ name: "Cordelia & Denzil" }],
  formatDetection: { telephone: false, date: false, address: false },
  openGraph: {
    title: "Cordelia & Denzil — Holy Matrimony, Shillong",
    description:
      "Saturday, 14th November 2026 · 1:30 PM · Cathedral of Mary Help of Christians, Laitumkhrah, Shillong. With joyful hearts, we invite you to celebrate with us.",
    type: "website",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#5c1b21",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${pinyon.variable} ${cormorant.variable} ${jost.variable} antialiased`}
    >
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS can show it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
