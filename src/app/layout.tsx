import Script from "next/script";
import { headers } from "next/headers";
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Sans_TC,
  Noto_Serif_TC,
} from "next/font/google";
import { Footer } from "@/components/Footer";
import { GtmScripts } from "@/components/GtmScripts";
import { Header } from "@/components/Header";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { PageEngagementTracker } from "@/components/PageEngagementTracker";
import { CtaClickTracker } from "@/components/CtaClickTracker";
import { rootMetadata } from "@/lib/seo";
import "./globals.css";

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = rootMetadata;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang="zh-Hant"
      translate="no"
      className={`${notoSerif.variable} ${notoSans.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <Script id="kz-datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];`}
        </Script>
        <GtmScripts />
        {!isAdmin && <PageEngagementTracker />}
        {!isAdmin && <CtaClickTracker />}
        <LocalBusinessJsonLd />
        <a href="#main-content" className="skip-link" suppressHydrationWarning>
          跳至主內容
        </a>
        {!isAdmin && <Header />}
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <MobileBookingBar />}
      </body>
    </html>
  );
}
