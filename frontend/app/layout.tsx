
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "AI Wiki",
  description: "Cartes historiques & politiques générées par l’IA",
};

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
