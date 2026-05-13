

import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ThemeProvider } from "next-themes";
import GlobalHotkeys from "./_components/GlobalHotkeys";

export const metadata: Metadata = {
  title: "TripBuddy AI | AI-Powered Luxury Voyages",
  description: "Architected by Shounak Mandal",
  icons: {
    icon: "/favicon.png",
  },
};

const urbanist = Urbanist({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={urbanist.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <GlobalHotkeys />
            <ConvexClientProvider>
              {children}
            </ConvexClientProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
