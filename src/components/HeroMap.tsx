'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { africaPaths } from './africaPaths';

// Detailed lookup for country info (Capital, Estimated Talent Population)
const countryData: Record<string, { capital: string; talent: string; name: string }> = {
  ug: { name: 'Uganda', capital: 'Kampala', talent: '150,000+' },
  ng: { name: 'Nigeria', capital: 'Abuja', talent: '1,200,000+' },
  tz: { name: 'Tanzania', capital: 'Dodoma', talent: '180,000+' },
  ke: { name: 'Kenya', capital: 'Nairobi', talent: '350,000+' },
  gh: { name: 'Ghana', capital: 'Accra', talent: '280,000+' },
  sn: { name: 'Senegal', capital: 'Dakar', talent: '90,000+' },
  za: { name: 'South Africa', capital: 'Pretoria', talent: '650,000+' },
  eg: { name: 'Egypt', capital: 'Cairo', talent: '450,000+' },
  ci: { name: 'Ivory Coast', capital: 'Abidjan', talent: '110,000+' },
  zm: { name: 'Zambia', capital: 'Lusaka', talent: '80,000+' },
  mz: { name: 'Mozambique', capital: 'Maputo', talent: '70,000+' },
  et: { name: 'Ethiopia', capital: 'Addis Ababa', talent: '180,000+' },
  ma: { name: 'Morocco', capital: 'Rabat', talent: '220,000+' },
  dz: { name: 'Algeria', capital: 'Algiers', talent: '210,000+' },
  tn: { name: 'Tunisia', capital: 'Tunis', talent: '95,000+' },
  ly: { name: 'Libya', capital: 'Tripoli', talent: '40,000+' },
  sd: { name: 'Sudan', capital: 'Khartoum', talent: '130,000+' },
  ao: { name: 'Angola', capital: 'Luanda', talent: '115,000+' },
  zw: { name: 'Zimbabwe', capital: 'Harare', talent: '85,000+' },
  cm: { name: 'Cameroon', capital: 'Yaoundé', talent: '95,000+' },
  mg: { name: 'Madagascar', capital: 'Antananarivo', talent: '60,000+' },
  ml: { name: 'Mali', capital: 'Bamako', talent: '45,000+' },
  mr: { name: 'Mauritania', capital: 'Nouakchott', talent: '30,000+' },
  rw: { name: 'Rwanda', capital: 'Kigali', talent: '75,000+' },
  so: { name: 'Somalia', capital: 'Mogadishu', talent: '35,000+' },
  cg: { name: 'Congo', capital: 'Brazzaville', talent: '25,000+' },
  cd: { name: 'DR Congo', capital: 'Kinshasa', talent: '240,000+' },
  na: { name: 'Namibia', capital: 'Windhoek', talent: '35,000+' },
  bw: { name: 'Botswana', capital: 'Gaborone', talent: '40,000+' },
  sl: { name: 'Sierra Leone', capital: 'Freetown', talent: '30,000+' },
  lr: { name: 'Liberia', capital: 'Monrovia', talent: '25,000+' },
  gn: { name: 'Guinea', capital: 'Conakry', talent: '35,000+' },
  gw: { name: 'Guinea-Bissau', capital: 'Bissau', talent: '15,000+' },
  gm: { name: 'Gambia', capital: 'Banjul', talent: '12,000+' },
  tg: { name: 'Togo', capital: 'Lomé', talent: '25,000+' },
  bj: { name: 'Benin', capital: 'Porto-Novo', talent: '30,000+' },
  bf: { name: 'Burkina Faso', capital: 'Ouagadougou', talent: '50,000+' },
  ne: { name: 'Niger', capital: 'Niamey', talent: '35,000+' },
  td: { name: 'Chad', capital: 'N\'Djamena', talent: '25,000+' },
  cf: { name: 'Central African Republic', capital: 'Bangui', talent: '15,000+' },
  gq: { name: 'Equatorial Guinea', capital: 'Malabo', talent: '10,000+' },
  ga: { name: 'Gabon', capital: 'Libreville', talent: '20,000+' },
  bi: { name: 'Burundi', capital: 'Gitega', talent: '20,000+' },
  mw: { name: 'Malawi', capital: 'Lilongwe', talent: '45,000+' },
  sz: { name: 'Eswatini', capital: 'Mbabane', talent: '15,000+' },
  ls: { name: 'Lesotho', capital: 'Maseru', talent: '20,000+' },
  er: { name: 'Eritrea', capital: 'Asmara', talent: '18,000+' },
  dj: { name: 'Djibouti', capital: 'Djibouti', talent: '12,000+' },
  ss: { name: 'South Sudan', capital: 'Juba', talent: '22,000+' },
  st: { name: 'São Tomé and Príncipe', capital: 'São Tomé', talent: '5,000+' },
};

// City markers mapped to highcharts coordinate space
const cities = [
  { name: 'Cairo', x: 510, y: 78, label: 'Cairo', textAnchor: 'start', dx: 10, dy: 3, countryId: 'eg' },
  { name: 'Lagos', x: 245, y: 287, label: 'Lagos', textAnchor: 'start', dx: 10, dy: 3, countryId: 'ng' },
  { name: 'Accra', x: 205, y: 298, label: 'Accra (Yango)', textAnchor: 'start', dx: 10, dy: 7, countryId: 'gh' },
  { name: 'Nairobi', x: 535, y: 360, label: 'Nairobi', textAnchor: 'start', dx: 10, dy: 3, countryId: 'ke' },
  { name: 'Kigali', x: 468, y: 355, label: 'Kigali', textAnchor: 'end', dx: -10, dy: 3, countryId: 'rw' },
  { name: 'Dakar', x: 70, y: 210, label: 'Dakar (Yango)', textAnchor: 'end', dx: -10, dy: 3, countryId: 'sn' },
  { name: 'Kampala', x: 485, y: 340, label: 'Kampala', textAnchor: 'start', dx: 10, dy: -5, countryId: 'ug' },
  { name: 'Cape Town', x: 365, y: 630, label: 'Cape Town', textAnchor: 'start', dx: 10, dy: 3, countryId: 'za' },
  { name: 'Abidjan', x: 185, y: 295, label: 'Abidjan (Yango)', textAnchor: 'end', dx: -10, dy: -6, countryId: 'ci' },
  { name: 'Lusaka', x: 445, y: 492, label: 'Lusaka (Yango)', textAnchor: 'end', dx: -10, dy: 3, countryId: 'zm' },
  { name: 'Maputo', x: 490, y: 563, label: 'Maputo (Yango)', textAnchor: 'start', dx: 10, dy: 3, countryId: 'mz' },
  { name: 'Addis Ababa', x: 535, y: 275, label: 'Addis Ababa (Yango)', textAnchor: 'start', dx: 10, dy: 3, countryId: 'et' },
];

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

const pulseNodes = [
  { x: 510, y: 78, countryId: 'eg' },
  { x: 245, y: 287, countryId: 'ng' },
  { x: 205, y: 298, countryId: 'gh' },
  { x: 535, y: 360, countryId: 'ke' },
  { x: 468, y: 355, countryId: 'rw' },
  { x: 70,  y: 210, countryId: 'sn' },
  { x: 485, y: 340, countryId: 'ug' },
  { x: 365, y: 630, countryId: 'za' },
  { x: 185, y: 295, countryId: 'ci' },
  { x: 445, y: 492, countryId: 'zm' },
  { x: 490, y: 563, countryId: 'mz' },
  { x: 535, y: 275, countryId: 'et' },
  { x: 150, y: 150, countryId: 'mr' },
  { x: 220, y: 180, countryId: 'ml' },
  { x: 310, y: 140, countryId: 'dz' },
  { x: 430, y: 110, countryId: 'ly' },
  { x: 340, y: 220, countryId: 'ne' },
  { x: 390, y: 240, countryId: 'td' },
  { x: 480, y: 220, countryId: 'sd' },
  { x: 580, y: 270, countryId: 'so' },
  { x: 330, y: 330, countryId: 'cg' },
  { x: 400, y: 350, countryId: 'cd' },
  { x: 440, y: 440, countryId: 'zm' },
  { x: 480, y: 490, countryId: 'zw' },
  { x: 410, y: 550, countryId: 'bw' },
  { x: 370, y: 500, countryId: 'na' },
  { x: 460, y: 590, countryId: 'za' },
];

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
  const bulge = len * 0.22;
  const cx = mx + nx * bulge;
  const cy = my + ny * bulge;
  return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
}

const PulseNodes = React.memo(() => {
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());

  // Stagger pulses so they feel organic and dynamic
  const pickRandomNodes = useCallback(() => {
    const numActive = Math.floor(Math.random() * 5) + 4;
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
    <>
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
    </>
  );
});
PulseNodes.displayName = 'PulseNodes';

export const HeroMap = React.memo(() => {
  // Interactive tooltips states
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedCountry = selectedCountryId ? countryData[selectedCountryId] : null;

  // Tooltip position calculator (called once per click/tap, keeping position static)
  const selectCountry = (clientX: number, clientY: number, countryId: string) => {
    const data = countryData[countryId];
    if (data) {
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        setTooltipPos({
          x: clientX - containerRect.left,
          y: clientY - containerRect.top - 100, // Show pop-up slightly above the pointer
        });
      }
      setSelectedCountryId(countryId);
    }
  };

  const handleCountryClick = (e: React.MouseEvent<SVGPathElement>, countryId: string) => {
    selectCountry(e.clientX, e.clientY, countryId);
  };

  const handleCountryTouch = (e: React.TouchEvent<SVGPathElement>, countryId: string) => {
    const touch = e.touches[0];
    if (touch) {
      selectCountry(touch.clientX, touch.clientY, countryId);
    }
  };

  const handleMarkerClick = (e: React.MouseEvent<SVGGElement>, countryId: string) => {
    selectCountry(e.clientX, e.clientY, countryId);
  };

  return (
    <div
      ref={containerRef}
      className="hero-map-wrapper"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <div
        className="hero-map-container"
        aria-hidden="true"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '380px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'visible',
          touchAction: 'pan-y',
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

          .hm-country-interactive {
            fill: transparent;
            cursor: pointer;
            transition: fill 0.3s ease, stroke 0.3s ease, stroke-opacity 0.3s ease;
          }
          .hm-country-interactive:hover {
            fill: var(--color-accent);
            fill-opacity: 0.05;
          }
          .hm-country-interactive.selected {
            fill: var(--color-accent);
            fill-opacity: 0.12;
            stroke: var(--color-accent);
            stroke-width: 0.8px;
            stroke-opacity: 0.6;
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
          /* Mobile specific scale and shift to make map larger and slightly westward */
          @media (max-width: 768px) {
            .hero-map-viewport {
              transform: translateX(-5%) scale(1.2);
            }
          }
        `}</style>

        {/* Premium Statistics Card Tooltip/Pop-up */}
        {selectedCountry && (
          <div
            style={{
              position: 'absolute',
              left: `${Math.max(10, Math.min(tooltipPos.x - 100, (containerRef.current?.getBoundingClientRect().width || 600) - 210))}px`,
              top: `${Math.max(10, Math.min(tooltipPos.y, (containerRef.current?.getBoundingClientRect().height || 500) - 150))}px`,
              width: '200px',
              backgroundColor: 'rgba(10, 20, 15, 0.92)',
              border: '1.5px solid var(--color-accent)',
              borderRadius: '8px',
              padding: '12px',
              color: 'white',
              boxShadow: '0 8px 32px rgba(0, 255, 102, 0.12)',
              backdropFilter: 'blur(8px)',
              zIndex: 100,
              pointerEvents: 'auto',
              animation: 'hm-fade-in-up 0.2s ease-out forwards',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 'bold', color: 'white', fontSize: '0.95rem' }}>{selectedCountry.name}</span>
              <button
                onClick={() => setSelectedCountryId(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.4)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  padding: '2px',
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
              Capital: <strong style={{ color: 'white' }}>{selectedCountry.capital}</strong>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Est. Talent: <strong style={{ color: 'var(--color-accent)' }}>{selectedCountry.talent}</strong>
            </div>
          </div>
        )}

        <svg
          viewBox="20 40 580 610"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: 'visible', maxWidth: '100%', maxHeight: '100%', display: 'block', margin: 'auto' }}
        >
          <defs>
            <pattern id="map-dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.15" className="hm-pattern-dot" />
            </pattern>
            
            <mask id="map-africa-mask">
              <rect x="-10" y="-10" width="730" height="750" fill="#000000" />
              <g fill="#ffffff">
                {africaPaths.map((country) => (
                  <path key={country.id} d={country.d} />
                ))}
              </g>
            </mask>
          </defs>

          {/* Group containing all elements */}
          <g style={{ transformOrigin: '290px 305px' }}>
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

            {/* Interactive invisible fill paths for hover/tap targeting */}
            <g>
              {africaPaths.map((country) => {
                const isSelected = selectedCountryId === country.id;
                return (
                  <path
                    key={`interactive-${country.id}`}
                    d={country.d}
                    className={`hm-country-interactive${isSelected ? ' selected' : ''}`}
                    onClick={(e) => handleCountryClick(e, country.id)}
                    onTouchStart={(e) => handleCountryTouch(e, country.id)}
                  />
                );
              })}
            </g>

            {/* Outer silhouette outline to define the continent shape clearly */}
            <g className="hm-continent-outline">
              {africaPaths.map((country) => (
                <path key={`outline-${country.id}`} d={country.d} />
              ))}
            </g>

            {/* Pulsing telemetry data nodes (isolated state to prevent full SVG re-render) */}
            <PulseNodes />

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
                <g
                  key={city.name}
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => handleMarkerClick(e, city.countryId)}
                >
                  {isYangoHub ? (
                    <>
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
          </g>
        </svg>
      </div>

      {/* Map Legend and Collaboration Prompt Section */}
      <div style={{
        width: '100%',
        maxWidth: '700px',
        marginTop: '10px',
        padding: '8px var(--spacing-md)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '6px'
      }}>
        {/* Subtle Dots Legend */}
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.7rem',
          color: 'var(--color-text-secondary)',
          opacity: 0.8
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-accent)',
              boxShadow: '0 0 4px var(--color-accent)',
              display: 'inline-block',
              animation: 'hm-pulse 2s infinite'
            }} />
            <span>— BorderLine presence</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-text-secondary)',
              opacity: 0.4,
              display: 'inline-block'
            }} />
            <span>— Planned expansion</span>
          </div>
        </div>

        {/* Vision & Action Prompt */}
        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
          <p style={{ color: 'var(--color-text-primary)', fontWeight: '500', marginBottom: '2px', opacity: 0.85 }}>
            Our vision is to empower cross-African work and collaboration.
          </p>
          <p style={{ fontSize: '0.65rem', opacity: 0.5 }}>
            Tap, zoom in and tap the countries to learn more.
          </p>
        </div>
      </div>
    </div>
  );
});
HeroMap.displayName = 'HeroMap';
