import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DreamPath Development Profile Builder",
  description: "DreamPath Development Profile Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.hugeicons.com/font/hgi-stroke-rounded.css"
        />
      </head>
      <body>
        <main id="main">
          <section className="outer">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
