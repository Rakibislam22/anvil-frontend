import type { Metadata } from "next";
import "./globals.css";
import { bodyFont, displayFont, monoFont } from "@/lib/fonts";
import AppHeader from "./AppHeader";
import { AnvilProvider } from "@/context/AnvilContext";

export const metadata: Metadata = {
  title: "Anvil",
  description: "Tasks and image annotation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable}`}
    >
      <body>
        <AnvilProvider>
          <AppHeader />
          {children}
        </AnvilProvider>
      </body>
    </html>
  );
}
