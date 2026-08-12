import type { Metadata } from "next";
import { Fraunces, Work_Sans, Aref_Ruqaa } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["300", "400", "500", "600"],
});

const arefRuqaa = Aref_Ruqaa({
  subsets: ["arabic"],
  variable: "--font-aref-ruqaa",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Neema Cafe",
  description: "A taste that grows from the roots",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fraunces.variable} ${workSans.variable} ${arefRuqaa.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
