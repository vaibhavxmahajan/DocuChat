import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const figTree = Figtree({
  variable : "--font-figtree",
  subsets : ["latin"]
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DocuChat",
  description: "AI-powered document Q/A application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figTree.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
