"use client";

import React, { useState } from "react";
import type { CompetitorOutput, PositioningPointSchema } from "@/lib/types/domain";
import { z } from "zod";

type PositioningPoint = z.infer<typeof PositioningPointSchema>;

interface PositioningMatrixCanvasProps {
  matrix: CompetitorOutput["positioningMatrix"];
}

export function PositioningMatrixCanvas({ matrix }: PositioningMatrixCanvasProps) {
  const [hoveredPoint, setHoveredPoint] = useState<PositioningPoint | null>(null);

  // SVG dimensions
  const size = 460;
  const padding = 50;
  const center = size / 2;
  const usable = size - padding * 2;

  // Convert -100..100 coordinate space to SVG coordinate space
  const toSvgX = (x: number) => center + (x / 100) * (usable / 2);
  const toSvgY = (y: number) => center - (y / 100) * (usable / 2);

  return (
    <div className="w-full rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80 p-5 flex flex-col items-center">
      <div className="w-full flex items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-slate-700 dark:text-slate-300">
          2x2 Strategic Positioning Matrix
        </span>
        <span className="text-slate-500 dark:text-slate-400">
          Hover points to inspect rationale
        </span>
      </div>

      <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full select-none"
          role="img"
          aria-label="2x2 Competitor Positioning Matrix"
        >
          {/* Background Grid Quadrants */}
          <rect
            x={padding}
            y={padding}
            width={usable / 2}
            height={usable / 2}
            className="fill-slate-200/60 dark:fill-slate-900/40"
          />
          <rect
            x={center}
            y={padding}
            width={usable / 2}
            height={usable / 2}
            className="fill-emerald-100/60 dark:fill-emerald-950/20"
          />
          <rect
            x={padding}
            y={center}
            width={usable / 2}
            height={usable / 2}
            className="fill-slate-100 dark:fill-slate-900/20"
          />
          <rect
            x={center}
            y={center}
            width={usable / 2}
            height={usable / 2}
            className="fill-slate-200/60 dark:fill-slate-900/40"
          />

          {/* Grid Borders */}
          <rect
            x={padding}
            y={padding}
            width={usable}
            height={usable}
            fill="none"
            stroke="#334155"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Center Crosshairs */}
          <line
            x1={padding}
            y1={center}
            x2={size - padding}
            y2={center}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <line
            x1={center}
            y1={padding}
            x2={center}
            y2={size - padding}
            stroke="#475569"
            strokeWidth="1.5"
          />

          {/* Quadrant Callout Labels */}
          <text
            x={size - padding - 8}
            y={padding + 16}
            textAnchor="end"
            className="fill-emerald-600 dark:fill-emerald-400 text-[10px] font-bold tracking-wider uppercase opacity-80"
          >
            {matrix.quadrantNotes.topRight}
          </text>
          <text
            x={padding + 8}
            y={padding + 16}
            textAnchor="start"
            className="fill-slate-500 dark:fill-slate-400 text-[10px] font-medium opacity-70"
          >
            {matrix.quadrantNotes.topLeft}
          </text>
          <text
            x={size - padding - 8}
            y={size - padding - 10}
            textAnchor="end"
            className="fill-slate-500 dark:fill-slate-400 text-[10px] font-medium opacity-70"
          >
            {matrix.quadrantNotes.bottomRight}
          </text>
          <text
            x={padding + 8}
            y={size - padding - 10}
            textAnchor="start"
            className="fill-slate-500 dark:fill-slate-400 text-[10px] font-medium opacity-70"
          >
            {matrix.quadrantNotes.bottomLeft}
          </text>

          {/* Axis Labels */}
          <text
            x={center}
            y={size - 14}
            textAnchor="middle"
            className="fill-slate-600 dark:fill-slate-300 text-[11px] font-semibold"
          >
            {matrix.xAxisLabel}
          </text>
          <text
            x={18}
            y={center}
            textAnchor="middle"
            transform={`rotate(-90 18 ${center})`}
            className="fill-slate-600 dark:fill-slate-300 text-[11px] font-semibold"
          >
            {matrix.yAxisLabel}
          </text>

          {/* Plotted Points */}
          {matrix.points.map((pt) => {
            const cx = toSvgX(pt.x);
            const cy = toSvgY(pt.y);
            const isOurs = pt.isOurVenture;

            return (
              <g
                key={pt.name}
                className="cursor-pointer transition-transform hover:scale-125"
                onMouseEnter={() => setHoveredPoint(pt)}
                onMouseLeave={() => setHoveredPoint(null)}
                tabIndex={0}
                role="button"
                aria-label={`${pt.name}: X ${pt.x}, Y ${pt.y}`}
              >
                {/* Glowing ring for our venture */}
                {isOurs && (
                  <circle
                    cx={cx}
                    cy={cy}
                    r="12"
                    className="fill-emerald-200 dark:fill-emerald-500/20 stroke-emerald-400 stroke-1 animate-pulse"
                  />
                )}

                <circle
                  cx={cx}
                  cy={cy}
                  r={isOurs ? 6 : 4.5}
                  className={
                    isOurs
                      ? "fill-emerald-600 dark:fill-emerald-400 stroke-white stroke-2 shadow-lg"
                      : "fill-slate-500 dark:fill-slate-400 stroke-slate-200 dark:stroke-slate-900 stroke-1"
                  }
                />

                <text
                  x={cx}
                  y={cy - 9}
                  textAnchor="middle"
                  className={`text-[10px] font-bold ${
                    isOurs
                      ? "fill-emerald-700 dark:fill-emerald-300 drop-shadow"
                      : "fill-slate-600 dark:fill-slate-300 drop-shadow"
                  }`}
                >
                  {pt.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover Rationale Card */}
        {hoveredPoint && (
          <div className="absolute bottom-2 left-2 right-2 bg-white/95 dark:bg-slate-900/95 border border-slate-300/80 dark:border-slate-700/80 rounded-xl p-3 shadow-xl backdrop-blur-md pointer-events-none text-xs z-20">
            <div className="flex items-center justify-between mb-1">
              <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                {hoveredPoint.isOurVenture && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                )}
                {hoveredPoint.name}
              </span>
              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                [X: {hoveredPoint.x}, Y: {hoveredPoint.y}]
              </span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-snug">{hoveredPoint.rationale}</p>
          </div>
        )}
      </div>

      {/* Screen Reader Accessible Table */}
      <div className="sr-only">
        <table>
          <caption>Competitor Positioning Matrix Data</caption>
          <thead>
            <tr>
              <th>Competitor</th>
              <th>X ({matrix.xAxisLabel})</th>
              <th>Y ({matrix.yAxisLabel})</th>
              <th>Rationale</th>
            </tr>
          </thead>
          <tbody>
            {matrix.points.map((p) => (
              <tr key={p.name}>
                <td>{p.name}</td>
                <td>{p.x}</td>
                <td>{p.y}</td>
                <td>{p.rationale}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
