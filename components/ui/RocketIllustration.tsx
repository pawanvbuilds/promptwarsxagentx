import React from "react";

export function RocketIllustration({ className = "w-28 h-28" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md select-none pointer-events-none"
      >
        <defs>
          {/* Gradients for 3D Rocket */}
          <linearGradient id="rocketBodyGrad" x1="50" y1="50" x2="150" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>

          <linearGradient id="rocketConeGrad" x1="120" y1="40" x2="160" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="rocketFinGrad" x1="60" y1="100" x2="100" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>

          <linearGradient id="rocketPortholeRim" x1="100" y1="75" x2="125" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="rocketPortholeGlass" x1="105" y1="80" x2="120" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>

          <linearGradient id="exhaustFlame" x1="70" y1="130" x2="45" y2="155" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="40%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="cloudGrad" x1="40" y1="140" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#d1fae5" />
          </linearGradient>
        </defs>

        {/* Ambient sparkle stars */}
        <path d="M165 40 L167 46 L173 48 L167 50 L165 56 L163 50 L157 48 L163 46 Z" fill="#34d399" />
        <path d="M45 75 L46.5 79 L51 80.5 L46.5 82 L45 86 L43.5 82 L39 80.5 L43.5 79 Z" fill="#34d399" opacity="0.8" />
        <path d="M150 120 L151.5 124 L156 125.5 L151.5 127 L150 131 L148.5 127 L144 125.5 L148.5 124 Z" fill="#6ee7b7" />

        {/* Clouds / smoke plume at the bottom */}
        <ellipse cx="60" cy="155" rx="26" ry="16" fill="url(#cloudGrad)" opacity="0.95" />
        <ellipse cx="85" cy="162" rx="22" ry="14" fill="url(#cloudGrad)" />
        <ellipse cx="42" cy="160" rx="18" ry="12" fill="#ecfdf5" opacity="0.85" />
        <ellipse cx="72" cy="148" rx="16" ry="12" fill="#ffffff" />

        {/* Exhaust flame */}
        <path
          d="M66 124 Q48 142 42 165 Q62 150 78 136 Z"
          fill="url(#exhaustFlame)"
        />

        {/* Left / Bottom Fin */}
        <path
          d="M62 108 L44 126 C42 136 50 142 62 136 L76 124 Z"
          fill="url(#rocketFinGrad)"
        />

        {/* Right / Top Fin */}
        <path
          d="M104 68 L122 50 C132 48 138 56 132 68 L120 82 Z"
          fill="url(#rocketFinGrad)"
        />

        {/* Rocket Fuselage Body */}
        <path
          d="M65 127 C60 115 62 90 85 67 C108 44 133 42 145 47 C150 59 148 84 125 107 C102 130 77 132 65 127 Z"
          fill="url(#rocketBodyGrad)"
          filter="drop-shadow(0 4px 6px rgba(0,0,0,0.08))"
        />

        {/* Fuselage highlight spine */}
        <path
          d="M86 69 C104 51 124 47 138 49 C132 63 114 83 98 99 C88 88 84 76 86 69 Z"
          fill="#ffffff"
          opacity="0.6"
        />

        {/* Rocket Nosecone (Emerald) */}
        <path
          d="M125 67 C133 55 142 46 153 43 C150 54 141 63 129 71 Z"
          fill="url(#rocketConeGrad)"
        />

        {/* Center / Front Fin */}
        <path
          d="M86 106 L72 120 C70 128 76 132 84 128 L94 114 Z"
          fill="url(#rocketFinGrad)"
          opacity="0.9"
        />

        {/* Porthole Window Outer Rim */}
        <circle cx="107" cy="85" r="14" fill="url(#rocketPortholeRim)" />
        {/* Porthole Inner Glass */}
        <circle cx="107" cy="85" r="10" fill="url(#rocketPortholeGlass)" />
        {/* Porthole Reflection */}
        <path
          d="M102 81 Q107 77 112 81 Q108 84 102 81 Z"
          fill="#ffffff"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}

