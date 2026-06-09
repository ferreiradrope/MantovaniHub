import type { Metadata, Viewport } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import { RegisterSW } from "@/components/register-sw";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MantovaniHub — Charcutaria Mantovani",
    template: "%s · MantovaniHub",
  },
  description:
    "Plataforma de gestão integrada da Charcutaria Mantovani: produção por lote, controle de perdas, estoque, validade e cardápio digital artesanal.",
  applicationName: "MantovaniHub",
  authors: [{ name: "Equipe MantovaniHub" }],
  keywords: ["charcutaria", "embutidos artesanais", "Mantovani", "cardápio digital"],
};

export const viewport: Viewport = {
  themeColor: "#8a1c24",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${hanken.variable} h-full`}>
      <body className="min-h-full antialiased">
        {children}
        <RegisterSW />
      </body>
    </html>
  );
}
