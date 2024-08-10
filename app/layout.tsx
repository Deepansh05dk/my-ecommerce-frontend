import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/providers/toast-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecommerce -Jewellery",
  description: "ecommerce website for jewellery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-[100vh] flex flex-col">
          <Navbar />
          <ToastProvider />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>

      </body>
    </html>
  );
}
