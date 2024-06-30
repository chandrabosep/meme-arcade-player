import type { Metadata } from "next";
import "./globals.css";
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
          <div className="max-w-screen-2xl h-screen mx-auto">{children}</div>
        </OnchainProviders>
      </body>
    </html>
  );
}
