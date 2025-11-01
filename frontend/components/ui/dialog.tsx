
"use client";

import * as React from "react";
import { cn } from "@//lib/utils";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Dialog({ open, onClose, title, children }: DialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative z-10 w-[min(680px,92vw)] rounded-2xl border border-fg/10 dark:border-darkborder bg-white dark:bg-darkcard p-6 shadow-2xl transition-all duration-300"
        )}
      >
                <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-opacity"
          aria-label="Close"
        >
          ✕
        </button>
        {title && <h2 className="mb-4 text-lg font-semibold">{title}</h2>}
        
        {children}
      </div>
    </div>
  );
}
