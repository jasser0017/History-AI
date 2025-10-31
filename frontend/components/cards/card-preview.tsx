import Link from "next/link";
import type { Card } from "@/lib/validators";

export default function CardPreview({ card }: { card: Card }) {
  return (
    <Link
      href={`/cards/${card.id}`}
      className="flex flex-col justify-between
      bg-white dark:bg-[hsl(193_57%_18%)]
      text-[hsl(193_57%_27%)] dark:text-[hsl(40_38%_93%)]
      border border-[hsl(193_57%_27%)/0.1] dark:border-[hsl(193_57%_24%)]
      rounded-2xl shadow-md dark:shadow-lg
      p-5 transition-all duration-300
      hover:shadow-lg dark:hover:shadow-xl hover:-translate-y-0.5"
    >
      <h3 className="text-lg font-semibold capitalize mb-2 tracking-tight">{card.title}</h3>
      <p className="text-sm leading-relaxed text-[hsl(193_57%_27%)/0.75] dark:text-[hsl(40_38%_93%)/0.8] line-clamp-4">{card.content_md}</p>
      <div className="flex flex-wrap gap-2">
        {card.keywords.map((kw) => (
          <span
            key={kw}
            className=" px-3 py-1 text-xs font-medium rounded-full
            bg-[hsl(195_56%_78%)]/40 dark:bg-[hsl(19_74%_64%)/30]
            text-[hsl(193_57%_27%)] dark:text-[hsl(40_38%_93%)]
            border border-transparent dark:border-[hsl(193_57%_24%)]
            transition-all duration-300"
          >
            {kw}
          </span>
        ))}
      </div>
    </Link>
  );
}

