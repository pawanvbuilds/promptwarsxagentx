import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SkipToContent } from "@/components/ui/SkipToContent";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "VentureArchitect — Autonomous Multi-Agent Startup Co-Pilot (PS08)",
  description:
    "An autonomous multi-agent venture operating system that deconstructs founder hypotheses, sizes markets, reverse-engineers competitors, profiles customer ICPs, stress-tests unit economics, and formulates 90-day launch roadmaps.",
  keywords: [
    "Startup Co-Pilot",
    "Multi-Agent AI",
    "Market Research",
    "Competitor Analysis",
    "Customer Profiling",
    "Idea Validation",
    "Execution Planning",
    "PS08 Hackathon",
  ],
  authors: [{ name: "Harshvdev" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("va_theme");var dark=t==="dark";var r=document.documentElement;r.setAttribute("data-theme",dark?"dark":"light");r.classList.toggle("dark",dark);r.classList.toggle("light",!dark);}catch(e){}})();`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased selection:bg-emerald-500/20 selection:text-emerald-400"
      >
        <SkipToContent />
        <div id="live-announcer" className="sr-only" aria-live="polite" aria-atomic="true" />
        {children}
      </body>
    </html>
  );
}
