import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/app/assets/styles/color.scss";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Pokemon Web",
  description: "My Pokemon Web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
