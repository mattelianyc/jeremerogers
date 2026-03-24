import "./globals.css";
import localFont from "next/font/local";
import { BackgroundScrollTransition } from "@/components/BackgroundScrollTransition";
import { BrandHeroReprisal } from "@/app/(marketing)/components/BrandHeroReprisal";

const bodoniModaFont = localFont({
  src: [
    {
      path: "./fonts/BodoniModa-VariableFont_opsz,wght.ttf",
      style: "normal"
    },
    {
      path: "./fonts/BodoniModa-Italic-VariableFont_opsz,wght.ttf",
      style: "italic"
    }
  ],
  variable: "--font-bodoni-moda",
  display: "swap"
});

export const metadata = {
  title: "ALMO SEBASTIAN",
  description: "Minimalist luxury fashion storefront powered by Shopify."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={bodoniModaFont.variable}>
        <BackgroundScrollTransition />
        <main>{children}</main>
        <BrandHeroReprisal />
      </body>
    </html>
  );
}
