import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@coinbase/onchainkit/styles.css";
import OnchainProviders from "./_lib/OnchainProvider";

export const metadata: Metadata = {
  title: "Meme Arcade",
  description: "Play memes games on the blockchain",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-yellow`}>
        <OnchainProviders>
          {/* <Navbar /> */}

          <div className="max-w-screen-2xl mx-auto py-6">{children}</div>
        </OnchainProviders>
      </body>
    </html>
  );
}
