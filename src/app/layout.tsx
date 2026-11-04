import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SAMANVAYA 2027",
    template: "%s | SAMANVAYA 2027",
  },
  description:
    "United for Health. Together for a Sustainable Future. Community Health, Wellness & Sustainability event in Hubballi–Dharwad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
