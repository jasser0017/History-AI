"use client";
import Link from "next/link";
import ThemeToggle from "@/components/layout/theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-fg/10 bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-fg">
          <img src="/icon.svg" alt="AI Wiki" className="h-7 w-7" />
          <span className="text-2xl font-bold tracking-tight">History AI Wiki</span>
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}

