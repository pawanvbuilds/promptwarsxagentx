import React from "react";

export function HeroIllustration3D({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full max-w-[480px] h-[300px] sm:h-[340px] flex items-center justify-center select-none pointer-events-none ${className}`}>
      <svg
        viewBox="0 0 540 380"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl overflow-visible"
      >
        <defs>
          <style>{`
            .card-screen-body { fill: url(#screenGlassGrad); stroke: url(#screenBorderGrad); }
            .card-screen-nav { fill: #ecfdf5; opacity: 0.6; }
            .card-grid-line { stroke: #e2e8f0; }
            .card-pill-tag { fill: #ffffff; stroke: #e2e8f0; }
            .card-pill-title { fill: #0f172a; }
            .card-pill-sub { fill: #475569; }

            [data-theme="dark"] .card-screen-body,
            html.dark .card-screen-body {
              fill: url(#darkScreenGlassGrad);
              stroke: #334155;
            }
            [data-theme="dark"] .card-screen-nav,
            html.dark .card-screen-nav {
              fill: #1e293b;
              opacity: 0.8;
            }
            [data-theme="dark"] .card-grid-line,
            html.dark .card-grid-line {
              stroke: #1e293b;
              opacity: 0.6;
            }
            [data-theme="dark"] .card-pill-tag,
            html.dark .card-pill-tag {
              fill: #0f172a;
              stroke: #334155;
            }
            [data-theme="dark"] .card-pill-title,
            html.dark .card-pill-title {
              fill: #f8fafc;
            }
            [data-theme="dark"] .card-pill-sub,
            html.dark .card-pill-sub {
              fill: #94a3b8;
            }
          `}</style>

          {/* Ambient Glows */}
          <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#facc15" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="mintOrbitalGlow" cx="40%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#a7f3d0" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#6ee7b7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>

          {/* 3D Dashboard Screen Gradients */}
          <linearGradient id="screenGlassGrad" x1="100" y1="60" x2="380" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#f0fdf4" stopOpacity="0.94" />
          </linearGradient>

          <linearGradient id="darkScreenGlassGrad" x1="100" y1="60" x2="380" y2="300" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="screenBorderGrad" x1="80" y1="50" x2="400" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#a7f3d0" />
            <stop offset="100%" stopColor="#6ee7b7" />
          </linearGradient>

          {/* Bar Chart 3D Columns */}
          <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          {/* Upward Line Arrow */}
          <linearGradient id="arrowGrad" x1="140" y1="240" x2="320" y2="140" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* 3D Lightbulb Gradients */}
          <radialGradient id="bulbGlassRadial" cx="42%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="80%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          <linearGradient id="metallicScrew" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="35%" stopColor="#94a3b8" />
            <stop offset="70%" stopColor="#334155" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>

          {/* Drop Shadow Filter */}
          <filter id="softCardShadow" x="-20%" y="-20%" width="150%" height="150%">
            <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#064e3b" floodOpacity="0.1" />
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.06" />
          </filter>
        </defs>

        {/* Ambient background mint glow aura */}
        <circle cx="280" cy="180" r="170" fill="url(#mintOrbitalGlow)" />

        {/* Orbiting mint rings */}
        <ellipse
          cx="280"
          cy="190"
          rx="210"
          ry="75"
          transform="rotate(-14 280 190)"
          stroke="#a7f3d0"
          strokeWidth="1.75"
          strokeDasharray="6 6"
          opacity="0.8"
        />
        <ellipse
          cx="290"
          cy="185"
          rx="180"
          ry="65"
          transform="rotate(-10 290 185)"
          stroke="#6ee7b7"
          strokeWidth="1"
          opacity="0.5"
        />

        {/* Sparkle Stars */}
        <path d="M470 95 L472 101 L478 103 L472 105 L470 111 L468 105 L462 103 L468 101 Z" fill="#10b981" />
        <path d="M110 95 L111.5 99 L115.5 100.5 L111.5 102 L110 106 L108.5 102 L104.5 100.5 L108.5 99 Z" fill="#34d399" />
        <path d="M485 240 L486.5 244 L490.5 245.5 L486.5 247 L485 251 L483.5 247 L479.5 245.5 L483.5 244 Z" fill="#6ee7b7" />

        {/* ============================================================== */}
        {/* 1. 3D FLOATING DASHBOARD TABLET / WINDOW CARD                   */}
        {/* ============================================================== */}
        <g filter="url(#softCardShadow)">
          {/* Angled Glass Card Body */}
          <path
            d="M125 78 L375 52 C386 51 395 58 396 69 L410 248 C411 259 403 269 392 270 L142 296 C131 297 122 290 121 279 L107 100 C106 89 114 79 125 78 Z"
            className="card-screen-body"
            strokeWidth="2.5"
          />

          {/* Subtle Top Window Nav Bar */}
          <path
            d="M123 80 L377 54 C386 53 393 58 394 67 L396 92 L109 122 L107 101 C106 91 113 81 123 80 Z"
            className="card-screen-nav"
          />
          {/* Window control dots */}
          <circle cx="128" cy="98" r="3" fill="#a7f3d0" />
          <circle cx="138" cy="97" r="3" fill="#a7f3d0" />
          <circle cx="148" cy="96" r="3" fill="#a7f3d0" />

          {/* Grid lines inside card */}
          <path d="M125 155 L375 130" className="card-grid-line" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
          <path d="M130 195 L380 170" className="card-grid-line" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
          <path d="M135 235 L385 210" className="card-grid-line" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />

          {/* 3D Vertical Columns (Green Bar Chart) */}
          {/* Bar 1 */}
          <path
            d="M165 242 L180 240 L181 210 L166 212 Z"
            fill="url(#barGrad1)"
            rx="4"
          />
          <path
            d="M166 212 L174 207 L189 205 L181 210 Z"
            fill="#6ee7b7"
            opacity="0.9"
          />

          {/* Bar 2 */}
          <path
            d="M198 238 L213 236 L215 186 L200 188 Z"
            fill="url(#barGrad1)"
            rx="4"
          />
          <path
            d="M200 188 L208 183 L223 181 L215 186 Z"
            fill="#6ee7b7"
            opacity="0.9"
          />

          {/* Bar 3 */}
          <path
            d="M232 234 L247 232 L250 162 L235 164 Z"
            fill="url(#barGrad1)"
            rx="4"
          />
          <path
            d="M235 164 L243 159 L258 157 L250 162 Z"
            fill="#6ee7b7"
            opacity="0.9"
          />

          {/* Bar 4 */}
          <path
            d="M266 230 L281 228 L285 138 L270 140 Z"
            fill="url(#barGrad2)"
            rx="4"
          />
          <path
            d="M270 140 L278 135 L293 133 L285 138 Z"
            fill="#6ee7b7"
            opacity="0.9"
          />

          {/* Bar 5 */}
          <path
            d="M300 226 L315 224 L320 114 L305 116 Z"
            fill="url(#barGrad2)"
            rx="4"
          />
          <path
            d="M305 116 L313 111 L328 109 L320 114 Z"
            fill="#a7f3d0"
            opacity="0.95"
          />

          {/* Bar 6 */}
          <path
            d="M334 222 L349 220 L355 90 L340 92 Z"
            fill="url(#barGrad2)"
            rx="4"
          />
          <path
            d="M340 92 L348 87 L363 85 L355 90 Z"
            fill="#a7f3d0"
            opacity="0.95"
          />

          {/* Dynamic Ascending Green Curve with Arrow */}
          <path
            d="M155 235 Q230 210 290 140 T362 76"
            fill="none"
            stroke="url(#arrowGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Arrowhead pointing up-right */}
          <polygon
            points="364,74 348,82 355,95"
            fill="#059669"
          />

          {/* Floating Tag: "Validate with Confidence" */}
          <g filter="drop-shadow(0 4px 8px rgba(0,0,0,0.08))">
            {/* Pill Container */}
            <rect
              x="200"
              y="40"
              width="180"
              height="38"
              rx="12"
              className="card-pill-tag"
              strokeWidth="1.2"
            />
            {/* Green Checkmark Circle */}
            <circle cx="218" cy="59" r="10" fill="#059669" />
            <path
              d="M213.5 59 L216.5 62 L222.5 56"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Tag Text */}
            <text
              x="234"
              y="56"
              className="card-pill-title"
              fontSize="11"
              fontWeight="bold"
              fontFamily="system-ui, sans-serif"
            >
              Validate
            </text>
            <text
              x="234"
              y="68"
              className="card-pill-sub"
              fontSize="10"
              fontWeight="500"
              fontFamily="system-ui, sans-serif"
            >
              with Confidence
            </text>
          </g>
        </g>

        {/* ============================================================== */}
        {/* 2. 3D GLOWING LIGHTBULB                                        */}
        {/* ============================================================== */}
        {/* Lightbulb Ambient Radiance Glow */}
        <circle cx="430" cy="180" r="75" fill="url(#bulbGlow)" />

        <g filter="drop-shadow(0 12px 20px rgba(245, 158, 11, 0.35))">
          {/* Bulb Glass Body */}
          <path
            d="M430 115 C398 115 378 138 378 166 C378 184 390 198 398 212 C402 220 404 226 405 235 L455 235 C456 226 458 220 462 212 C470 198 482 184 482 166 C482 138 462 115 430 115 Z"
            fill="url(#bulbGlassRadial)"
          />

          {/* Internal Glowing Filament */}
          <path
            d="M418 225 L418 190 Q425 170 430 170 Q435 170 442 190 L442 225"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          />
          <circle cx="430" cy="170" r="5" fill="#ffffff" />

          {/* Glass Specular Highlights */}
          <path
            d="M392 140 C388 150 388 162 392 172"
            fill="none"
            stroke="#ffffff"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M400 130 C408 124 418 120 430 120"
            fill="none"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.5"
          />

          {/* Metallic Screw Base */}
          {/* Thread 1 */}
          <rect x="406" y="235" width="48" height="6" rx="3" fill="url(#metallicScrew)" />
          {/* Thread 2 */}
          <rect x="407" y="242" width="46" height="6" rx="3" fill="url(#metallicScrew)" />
          {/* Thread 3 */}
          <rect x="409" y="249" width="42" height="6" rx="3" fill="url(#metallicScrew)" />
          {/* Bottom Contact Terminal */}
          <ellipse cx="430" cy="256" rx="14" ry="4" fill="#1e293b" />
        </g>
      </svg>
    </div>
  );
}
