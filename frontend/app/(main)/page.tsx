
"use client";
import { useEffect } from "react";
import SearchPanel from "@/components/layout/search-panel";
import CardPreview from "@/components/cards/card-preview";
import {useAppStore} from "@/store/app-store";

function CardSkeleton() {
  return (
    <div className="card p-4 animate-pulse">
      <div className="h-5 w-3/4 rounded bg-white/60" />
      <div className="mt-2 h-4 w-1/2 rounded bg-white/50" />
    </div>
  );
}

export default function HomePage() {
  const { cards, loading, error, refresh } = useAppStore();
  useEffect(() => { refresh(); }, [refresh]);

  return (
    <div className="space-y-6">
      <SearchPanel />
      {error && <p className="text-red-600">{error}</p>}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading && cards.length === 0 && (
  <div className="fixed inset-0 flex items-center justify-center bg-bg/80 dark:bg-darkbg/80 backdrop-blur-sm">
    <div className="w-16 h-16 border-4 border-accent/30 border-t-accent dark:border-darkaccent/30 dark:border-t-darkaccent rounded-full animate-spin"></div>
  </div>
)}
        {cards.map((c) => (<CardPreview key={c.id} card={c} />))}
      </section>
    </div>
  );
}
