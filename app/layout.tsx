import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shadcn Registry",
  description: "A custom component registry for shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
