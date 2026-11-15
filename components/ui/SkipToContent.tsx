"use client";

import React from "react";

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-600 focus:text-white focus:font-semibold focus:rounded-md focus:shadow-xl focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  );
}
