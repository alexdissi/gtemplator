import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import SessionProvider from "@/components/providers/session-provider";
import {ThemeProvider} from "@/components/providers/theme-provider";
import {Toaster} from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GTemplator",
  description: "Generate your own website with IA in a minute",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html>
      <body>
      <SessionProvider>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              <main>
                {children}
                  <Toaster richColors position="top-right" duration={2000} />
              </main>
          </ThemeProvider>
      </SessionProvider>
      </body>
      </html>
  );
}