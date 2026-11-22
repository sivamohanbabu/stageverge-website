import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StageVerge Learn — Your learning, in motion.",
  description:
    "A hands-on learning space for curious minds and real-world builders.",
  openGraph: {
    title: "StageVerge Learn — Your learning, in motion.",
    description: "A hands-on learning space for curious minds and real-world builders.",
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
