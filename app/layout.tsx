import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import { SmoothScroll } from "@/components/smooth-scroll";
import { LoadingCurtain } from "@/components/loading-curtain";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
});

export const metadata: Metadata = {
  title: "Kanchipuram Silks — Modern Indian Heritage",
  description:
    "Handcrafted Kanchipuram silk sarees where every thread carries 400 years of tradition. A cinematic 3D journey through temple corridors of silk, gold and heritage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
      <body>
        <QueryProvider>
          <SmoothScroll>
            <LoadingCurtain />
            <SiteNav />
            <main>{children}</main>
            <SiteFooter />
          </SmoothScroll>
        </QueryProvider>
      </body>
    </html>
  );
}
