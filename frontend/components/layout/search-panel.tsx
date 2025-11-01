"use client";
import { useEffect, useRef } from "react";
import {useAppStore} from "@/store/app-store";
import AddCardDialog from "../cards/add-card-dialog";


export default function SearchPanel() {
  const { query, setQuery, refresh } = useAppStore();
  const t = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (t.current) clearTimeout(t.current);
    t.current = setTimeout(() => refresh(), 300);
    return () => { if (t.current) clearTimeout(t.current); };
  }, [query, refresh]);

  return (
    <section className="flex items-center justify-between gap-3 rounded-xl bg-white/70 p-4 shadow-soft border border-fg/10">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search events by title..."
        className="flex-1 rounded-xl border border-fg/20 px-4 py-2 text-sm text-fg/80 focus:outline-none focus:ring-2 focus:ring-accent/50"
      />
      <div className="flex items-center gap-3">
      <AddCardDialog />
    </div>
    </section>
  );
}