"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogCardContent({ content }: { content: string }) {
  return (
    <div className="leading-relaxed text-fg/90 dark:text-darkfg/90">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h2
              className="mt-4 mb-3 text-[28px] font-extrabold tracking-tight text-fg dark:text-darkfg"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="mt-8 mb-3 text-[22px] font-bold tracking-tight text-fg dark:text-darkfg"
              {...props}
            />
          ),
          h3: ({ node, ...props }) => (
            <h3
              className="mt-6 mb-2 text-[18px] font-semibold text-fg dark:text-darkfg"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="my-3 text-[15px] leading-7" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="my-3 ml-6 list-disc marker:text-accent dark:marker:text-darkaccent" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="my-3 ml-6 list-decimal" {...props} />
          ),
          li: ({ node, ...props }) => <li className="my-1" {...props} />,
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-accent/40 dark:border-darkaccent/40 pl-4 italic text-fg/80 dark:text-darkfg/80"
              {...props}
            />
          ),
          code: ({ node, className, children, ...props }) => {
            if (node) {
              return (
                <code className="rounded bg-fg/10 px-1.5 py-0.5 text-[13px] dark:bg-darkborder/30" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <pre className="my-4 overflow-x-auto rounded-lg bg-[#0f1f24] p-4 text-[13px] text-[#e7f0ef] dark:bg-[#0d2630]">
                <code {...props}>{children}</code>
              </pre>
            );
          },
          a: ({ node, ...props }) => (
            <a
              className="text-accent underline-offset-2 hover:underline dark:text-darkaccent"
              target="_blank"
              rel="noreferrer"
              {...props}
            />
          ),
          hr: () => <hr className="my-6 border-fg/10 dark:border-darkborder/60" />,
          table: ({ node, ...props }) => (
            <div className="my-4 overflow-x-auto">
              <table className="w-full min-w-max border-collapse text-sm" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border-b border-fg/10 px-3 py-2 text-left font-semibold dark:border-darkborder" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border-b border-fg/10 px-3 py-2 dark:border-darkborder" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
