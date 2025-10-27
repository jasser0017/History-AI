"use client";
import Link from "next/link";
import ThemeToggle from "@/layout/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-fg/10 bg-CREAM/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 text-fg">
          <img src="/icon.svg" alt="AI Wiki" className="h-6 w-6" />
          <span className="font-semibold tracking-tight">AI Wiki</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
