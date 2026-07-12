import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  preload: false,
});

export const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  preload: false,
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  preload: false,
});
