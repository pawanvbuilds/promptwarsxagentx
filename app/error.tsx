"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Route-level error boundary component for catching runtime client exceptions.
 */
export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log exception for diagnostics
    console.error("[VentureArchitect ErrorBoundary]", error);
  }, [error]);

  return (
    <main
      id="main-content"
      role="alert"
      aria-live="assertive"
      className="min-h-screen flex items-center justify-center p-6 bg-canvas text-primary"
    >
      <div className="max-w-md w-full bg-surface border border-subtle rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto border border-rose-500/20">
          <AlertTriangle className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-primary">
            Something went wrong
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            An unexpected error occurred while executing the venture intelligence pipeline.
          </p>
          {error.message && (
            <div className="p-3 bg-muted rounded-lg text-xs font-mono text-secondary text-left break-words overflow-auto max-h-24">
              {error.message}
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 justify-center pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-accent-emerald text-white text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
            aria-label="Retry operation"
          >
            <RotateCcw className="w-4 h-4" aria-hidden="true" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-subtle bg-surface text-secondary text-sm font-medium hover:bg-card-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
            aria-label="Return to homepage"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
