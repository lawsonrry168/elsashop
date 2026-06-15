import type { Metadata } from "next";
import Script from "next/script";
import {
  Cormorant_Garamond,
  DM_Sans,
  Noto_Sans_TC,
  Noto_Serif_TC,
} from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookingBar } from "@/components/MobileBookingBar";
import { site } from "@/data/site";
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

export const metadata: Metadata = {
  title: {
    default: `${site.name}｜屯門美容 · 皮膚管理 · 痛症理療`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  icons: {
    icon: "/brand/kzj-icon.png",
    apple: "/brand/kzj-icon.png",
  },
  openGraph: {
    title: `${site.name} Kang Zi Jian`,
    description: site.description,
    locale: "zh_HK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${notoSerif.variable} ${notoSans.variable} ${cormorant.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 md:pb-0">
        <Script id="kz-datalayer-init" strategy="beforeInteractive">
          {`window.dataLayer=window.dataLayer||[];`}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileBookingBar />
      </body>
    </html>
  );
}
