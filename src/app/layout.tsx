import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Callme TH — AI Receptionist for Thai Businesses",
  description:
    "Never miss a customer call. Callme TH answers calls 24/7 for restaurants, clinics, and salons — no staff needed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="min-h-screen flex flex-col" style={{ background: "#F5EDE3" }}>
        {children}
      </body>
    </html>
  );
}
