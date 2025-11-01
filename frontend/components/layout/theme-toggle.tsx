"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <button
      onClick={() => setDark(v => !v)}
      className="rounded-xl border border-fg/20 bg-muted px-3 py-1 text-sm text-fg hover:opacity-90"
      aria-label="Basculer le thème clair/sombre"
    >
      {dark ? "☾ Sombre" : "☼ Clair"}
    </button>
  );
}
