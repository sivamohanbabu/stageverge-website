import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StageVerge Reader — A quiet space to learn.",
  description:
    "A calm, private PDF reading space with page navigation, zoom, contrast, and local audio.",
  openGraph: {
    title: "StageVerge Reader — A quiet space to learn.",
    description: "Read local PDFs with a little more focus. Your files stay on your device.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
