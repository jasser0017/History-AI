import { fetchCardById } from "@//lib/api";
import BlogCardContent from "@//components/cards/blog-card-content";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";


export const dynamic = "force-dynamic";

interface PageProps {
  params: { id: string };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } =  await params;
  let card;

  try {
    card = await fetchCardById(id);
  } catch {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-bg px-4 py-6 text-fg dark:bg-darkbg dark:text-darkfg md:px-6">
   
      <div className="mx-auto mb-3 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-fg/80 hover:text-accent dark:text-darkfg/80 dark:hover:text-darkaccent"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cards
        </Link>
      </div>

 
      <div className="mx-auto max-w-4xl rounded-2xl border border-fg/10 bg-white p-6 shadow-xl dark:border-darkborder dark:bg-darkcard md:p-8">
      
        <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-fg dark:text-darkfg md:text-[40px]">
          {card.title}
        </h1>

       
        {card.keywords?.length ? (
          <div className="mb-6 flex flex-wrap gap-2">
            {card.keywords.map((kw: string) => (
              <span
                key={kw}
                className="rounded-full bg-accent/12 px-3 py-1 text-sm font-medium text-accent dark:bg-darkaccent/20 dark:text-darkaccent"
              >
                {kw}
              </span>
            ))}
          </div>
        ) : null}

        {/* Contenu Markdown : premier titre = H2 gros, puis H2/H3… */}
        <BlogCardContent content={card.content_md} />

      </div>
    </div>
  )
            }
