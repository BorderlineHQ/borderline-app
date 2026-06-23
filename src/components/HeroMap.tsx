'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { africaPaths } from './africaPaths';

// City markers positioned exactly in the Highcharts map coordinate system
// Note: Accra, Dakar, Abidjan, Lusaka, Maputo, and Addis Ababa are marked as (Yango) hubs
const cities = [
  { name: 'Cairo', x: 510, y: 78, label: 'Cairo', textAnchor: 'start', dx: 10, dy: 3 },
  { name: 'Lagos', x: 245, y: 287, label: 'Lagos', textAnchor: 'start', dx: 10, dy: 3 },
  { name: 'Accra', x: 205, y: 298, label: 'Accra (Yango)', textAnchor: 'start', dx: 10, dy: 7 },
  { name: 'Nairobi', x: 535, y: 360, label: 'Nairobi', textAnchor: 'start', dx: 10, dy: 3 },
  { name: 'Kigali', x: 468, y: 355, label: 'Kigali', textAnchor: 'end', dx: -10, dy: 3 },
  { name: 'Dakar', x: 70, y: 210, label: 'Dakar (Yango)', textAnchor: 'end', dx: -10, dy: 3 },
  { name: 'Kampala', x: 485, y: 340, label: 'Kampala', textAnchor: 'start', dx: 10, dy: -5 },
  { name: 'Cape Town', x: 365, y: 630, label: 'Cape Town', textAnchor: 'start', dx: 10, dy: 3 },
  
  // Yango Fellowship Specific Hubs
  { name: 'Abidjan', x: 185, y: 295, label: 'Abidjan (Yango)', textAnchor: 'end', dx: -10, dy: -6 },
  { name: 'Lusaka', x: 445, y: 492, label: 'Lusaka (Yango)', textAnchor: 'end', dx: -10, dy: 3 },
  { name: 'Maputo', x: 490, y: 563, label: 'Maputo (Yango)', textAnchor: 'start', dx: 10, dy: 3 },
  { name: 'Addis Ababa', x: 535, y: 275, label: 'Addis Ababa (Yango)', textAnchor: 'start', dx: 10, dy: 3 },
];

// Connection arcs between tech hubs
const arcs: [number, number][] = [
  [0, 1],   // Cairo -> Lagos
  [1, 2],   // Lagos -> Accra
  [2, 8],   // Accra -> Abidjan
  [8, 5],   // Abidjan -> Dakar
  [1, 3],   // Lagos -> Nairobi
  [3, 4],   // Nairobi -> Kigali
  [4, 6],   // Kigali -> Kampala
  [3, 11],  // Nairobi -> Addis Ababa
  [11, 0],  // Addis Ababa -> Cairo
  [3, 9],   // Nairobi -> Lusaka
  [9, 10],  // Lusaka -> Maputo
  [10, 7],  // Maputo -> Cape Town
];

// Extra pulsing data nodes inside the continent to make the map feel alive
const pulseNodes = [
  { x: 510, y: 78 },   // Cairo
  { x: 245, y: 287 },  // Lagos
  { x: 205, y: 298 },  // Accra
  { x: 535, y: 360 },  // Nairobi
  { x: 468, y: 355 },  // Kigali
  { x: 70,  y: 210 },  // Dakar
  { x: 485, y: 340 },  // Kampala
  { x: 365, y: 630 },  // Cape Town
  { x: 185, y: 295 },  // Abidjan
  { x: 445, y: 492 },  // Lusaka
  { x: 490, y: 563 },  // Maputo
  { x: 535, y: 275 },  // Addis Ababa
  { x: 150, y: 150 },  // West Sahara/Mauritania area
  { x: 220, y: 180 },  // Mali area
  { x: 310, y: 140 },  // Algeria/Libya area
  { x: 430, y: 110 },  // Egypt/Sudan border area
  { x: 340, y: 220 },  // Niger area
  { x: 390, y: 240 },  // Chad area
  { x: 480, y: 220 },  // Sudan area
  { x: 580, y: 270 },  // Somalia area
  { x: 330, y: 330 },  // Gabon/Congo area
  { x: 400, y: 350 },  // DRC area
  { x: 440, y: 440 },  // Zambia area
  { x: 480, y: 490 },  // Zimbabwe/Mozambique area
  { x: 410, y: 550 },  // Botswana area
  { x: 370, y: 500 },  // Namibia area
  { x: 460, y: 590 },  // South Africa northeast area
];

// Build a quadratic bezier arc path between two cities
function arcPath(from: typeof cities[0], to: typeof cities[0]): string {
  const x1 = from.x;
  const y1 = from.y;
  const x2 = to.x;
  const y2 = to.y;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len;
  const ny = dx / len;
  const bulge = len * 0.22; // how much the arc bows out
  const cx = mx + nx * bulge;
  const cy = my + ny * bulge;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

export const HeroMap: React.FC = () => {
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());

  // Stagger pulses so they feel organic and dynamic
  const pickRandomNodes = useCallback(() => {
    const numActive = Math.floor(Math.random() * 5) + 4; // 4-8 active
    const newActive = new Set<number>();
    for (let i = 0; i < numActive; i++) {
      const idx = Math.floor(Math.random() * pulseNodes.length);
      newActive.add(idx);
    }
    setActiveNodes(newActive);
  }, []);

  useEffect(() => {
    pickRandomNodes();
    const interval = setInterval(pickRandomNodes, 2500);
    return () => clearInterval(interval);
  }, [pickRandomNodes]);

  return (
    <div
      className="hero-map-container"
      aria-hidden="true"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <style>{`
        /* ---- repeating dots pattern ---- */
        .hm-pattern-dot {
          fill: var(--color-text-secondary);
          opacity: 0.16;
        }
        body.light-theme .hm-pattern-dot {
          fill: var(--color-text-primary);
          opacity: 0.58;
        }

        /* ---- country outlines ---- */
        .hm-country-border {
          stroke: var(--color-accent);
          stroke-width: 0.4px;
          stroke-opacity: 0.08;
          fill: none;
        }
        body.light-theme .hm-country-border {
          stroke-opacity: 0.35;
          stroke-width: 0.5px;
        }

        .hm-continent-outline {
          stroke: var(--color-border);
          stroke-width: 0.8px;
          stroke-opacity: 0.28;
          fill: none;
        }
        body.light-theme .hm-continent-outline {
          stroke-opacity: 0.65;
          stroke-width: 1px;
        }

        /* ---- pulse dots ---- */
        .hm-dot {
          fill: var(--color-accent);
          opacity: 0.15;
          transition: fill 0.6s ease, opacity 0.6s ease, r 0.6s ease;
        }
        body.light-theme .hm-dot {
          opacity: 0.5;
        }
        .hm-dot.active {
          fill: var(--color-accent);
          opacity: 0.9;
          animation: hm-pulse 2.5s ease-in-out infinite;
        }
        body.light-theme .hm-dot.active {
          opacity: 0.95;
        }
        @keyframes hm-pulse {
          0%, 100% { r: 2px; opacity: 0.35; }
          50%      { r: 5px; opacity: 0.9; }
        }

        /* ---- city markers ---- */
        .hm-city-ring {
          fill: none;
          stroke: var(--color-accent);
          stroke-width: 1.2;
          opacity: 0.6;
          animation: hm-ring 3s ease-in-out infinite;
        }
        body.light-theme .hm-city-ring {
          stroke-width: 1.4;
          opacity: 0.85;
        }
        @keyframes hm-ring {
          0%, 100% { r: 5; opacity: 0.6; }
          50%      { r: 8; opacity: 0.22; }
        }

        /* ---- Yango Fellowship special markers ---- */
        .hm-city-ring.yango-ring {
          stroke: var(--color-accent);
          stroke-width: 1.5;
          animation: hm-yango-pulse 2.5s ease-in-out infinite;
        }
        .hm-city-ring.yango-ring-outer {
          stroke: var(--color-accent);
          stroke-width: 0.8;
          opacity: 0.35;
          animation: hm-yango-outer 3.5s ease-in-out infinite;
        }
        @keyframes hm-yango-pulse {
          0%, 100% { r: 5; opacity: 0.8; }
          50%      { r: 9; opacity: 0.3; }
        }
        @keyframes hm-yango-outer {
          0%, 100% { r: 8; opacity: 0.35; }
          50%      { r: 14; opacity: 0.05; }
        }

        .hm-city-core {
          fill: var(--color-accent);
        }
        .hm-city-core.yango-core {
          filter: drop-shadow(0 0 2px var(--color-accent));
        }
        .hm-city-label {
          fill: var(--color-text-secondary);
          font-family: var(--font-body), sans-serif;
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          opacity: 0.85;
          pointer-events: none;
        }
        body.light-theme .hm-city-label {
          fill: var(--color-text-primary);
          font-weight: 700;
          opacity: 0.95;
        }

        /* ---- arcs ---- */
        .hm-arc {
          fill: none;
          stroke: var(--color-accent);
          stroke-width: 1;
          opacity: 0.14;
          stroke-dasharray: 4 4;
          animation: hm-dash 25s linear infinite;
        }
        body.light-theme .hm-arc {
          opacity: 0.28;
          stroke-width: 1.1;
        }
        @keyframes hm-dash {
          to { stroke-dashoffset: -200; }
        }

        /* ---- travelling dot along arcs ---- */
        .hm-traveller {
          fill: var(--color-accent);
          opacity: 0.9;
          filter: drop-shadow(0 0 2px var(--color-accent));
        }

        /* ---- smooth map viewport entrance animation ---- */
        @keyframes hm-fade-in-up {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(12px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .hero-map-viewport {
          animation: hm-fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <svg
        viewBox="50 35 580 610"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: 'visible', maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }}
      >
        <defs>
          {/* Hardware-accelerated repeating dot grid pattern */}
          <pattern id="map-dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="5" cy="5" r="1.15" className="hm-pattern-dot" />
          </pattern>
          
          {/* Mask containing all country borders to limit dots exactly to land mass */}
          <mask id="map-africa-mask">
            <rect x="-10" y="-10" width="730" height="750" fill="#000000" />
            <g fill="#ffffff">
              {africaPaths.map((country) => (
                <path key={country.id} d={country.d} />
              ))}
            </g>
          </mask>
        </defs>

        {/* Dotted grid representation of Africa continent */}
        <rect
          x="-5"
          y="-5"
          width="720"
          height="740"
          fill="url(#map-dot-pattern)"
          mask="url(#map-africa-mask)"
        />

        {/* Subtle, glowing geopolitical country outlines */}
        <g className="hm-country-border">
          {africaPaths.map((country) => (
            <path key={`border-${country.id}`} d={country.d} />
          ))}
        </g>

        {/* Outer silhouette outline to define the continent shape clearly */}
        <g className="hm-continent-outline">
          {africaPaths.map((country) => (
            <path key={`outline-${country.id}`} d={country.d} />
          ))}
        </g>

        {/* Pulsing telemetry data nodes */}
        {pulseNodes.map((node, idx) => {
          const isActive = activeNodes.has(idx);
          return (
            <circle
              key={`pulse-${idx}`}
              cx={node.x}
              cy={node.y}
              r={isActive ? 4.5 : 2}
              className={`hm-dot${isActive ? ' active' : ''}`}
            />
          );
        })}

        {/* Connection arcs with travelling data dots */}
        {arcs.map(([fi, ti], idx) => {
          const from = cities[fi];
          const to = cities[ti];
          const d = arcPath(from, to);
          const pathId = `arc-${idx}`;
          return (
            <g key={pathId}>
              <path id={pathId} d={d} className="hm-arc" />
              <circle r="3" className="hm-traveller">
                <animateMotion
                  dur={`${4.5 + idx * 0.8}s`}
                  repeatCount="indefinite"
                  path={d}
                />
              </circle>
            </g>
          );
        })}

        {/* City markers & custom label alignments */}
        {cities.map((city) => {
          const isYangoHub = city.label.includes('Yango');
          return (
            <g key={city.name}>
              {isYangoHub ? (
                <>
                  {/* Double pulsing rings for Yango hubs */}
                  <circle
                    cx={city.x}
                    cy={city.y}
                    className="hm-city-ring yango-ring"
                    style={{ animationDelay: `${Math.random() * 2}s` }}
                  />
                  <circle
                    cx={city.x}
                    cy={city.y}
                    className="hm-city-ring yango-ring-outer"
                    style={{ animationDelay: `${Math.random() * 2}s` }}
                  />
                  <circle cx={city.x} cy={city.y} r={2.5} className="hm-city-core yango-core" />
                </>
              ) : (
                <>
                  <circle
                    cx={city.x}
                    cy={city.y}
                    r={5}
                    className="hm-city-ring"
                    style={{ animationDelay: `${Math.random() * 2}s` }}
                  />
                  <circle cx={city.x} cy={city.y} r={2.5} className="hm-city-core" />
                </>
              )}
              <text
                x={city.x + city.dx}
                y={city.y + city.dy}
                textAnchor={city.textAnchor as "start" | "end" | "middle" | "inherit"}
                className="hm-city-label"
              >
                {city.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
