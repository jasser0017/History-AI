import Link from "next/link";
import type { Card } from "@/lib/validators";

export default function CardPreview({ card }: { card: Card }) {
  return (
    <Link
      href={`/cards/${card.id}`}
      className="block rounded-xl bg-white p-5 shadow-soft transition hover:shadow-lg"
    >
      <h3 className="text-lg font-semibold text-fg mb-2">{card.title}</h3>
      <p className="text-sm text-fg/70 line-clamp-3 mb-3">{card.content_md}</p>
      <div className="flex flex-wrap gap-2">
        {card.keywords.map((kw) => (
          <span
            key={kw}
            className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium"
          >
            {kw}
          </span>
        ))}
      </div>
    </Link>
  );
}

