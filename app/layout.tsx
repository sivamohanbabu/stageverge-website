import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StageVerge — Real challenges. Verified builders. Working demos.",
  description:
    "StageVerge turns real business challenges into mentor-guided proof-of-concept demos built by verified student talent.",
  openGraph: {
    title: "StageVerge — Real challenges. Verified builders. Working demos.",
    description:
      "A B2B innovation platform connecting industry needs, academic talent, and working software.",
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
