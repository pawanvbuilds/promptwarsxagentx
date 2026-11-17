"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Root layout error boundary capturing critical initialization and layout failures.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("[VentureArchitect GlobalError]", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 antialiased">
        <main
          role="alert"
          aria-live="assertive"
          className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center space-y-6"
        >
          <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
            <AlertTriangle className="w-8 h-8" aria-hidden="true" />
          </div>

          <div className="space-y-2">
            <h1 className="text-xl font-bold tracking-tight text-white">
              Application Error
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              A critical layout or root runtime error occurred. Please restart the session.
            </p>
          </div>

          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm"
            aria-label="Reload application"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Reload Application</span>
          </button>
        </main>
      </body>
    </html>
  );
}
