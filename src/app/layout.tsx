import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://jalneeti.in"),
  title: {
    default: "Jal Neeti Technologies — Clean Water. Everywhere.",
    template: "%s | Jal Neeti Technologies",
  },
  description:
    "JalBox™ containerized, solar-powered, IoT-monitored sewage treatment plants. 100% Indian-sourced materials. Clean water for every community.",
  keywords: [
    "JalBox",
    "sewage treatment plant",
    "STP",
    "water treatment",
    "solar powered",
    "IoT monitoring",
    "India",
    "BioNeer",
    "Jal Neeti",
    "containerized STP",
  ],
  openGraph: {
    title: "Jal Neeti Technologies — Clean Water. Everywhere.",
    description:
      "JalBox™ containerized, solar-powered, IoT-monitored sewage treatment plants built with 100% Indian materials.",
    url: "https://jalneeti.in",
    siteName: "Jal Neeti Technologies",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jal Neeti Technologies — Clean Water. Everywhere.",
    description:
      "JalBox™ containerized, solar-powered, IoT-monitored sewage treatment plants built with 100% Indian materials.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
