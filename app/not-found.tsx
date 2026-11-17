import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

/**
 * 404 Not Found fallback component for non-existent routes.
 */
export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex items-center justify-center p-6 bg-canvas text-primary"
    >
      <div className="max-w-md w-full bg-surface border border-subtle rounded-2xl p-8 shadow-2xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto border border-emerald-500/20">
          <Compass className="w-8 h-8" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-accent-emerald">
            404 Error
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Page Not Found
          </h1>
          <p className="text-sm text-muted leading-relaxed">
            The requested venture workspace or resource does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-emerald text-white text-sm font-medium hover:bg-emerald-600 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-emerald"
            aria-label="Back to VentureArchitect Dashboard"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
