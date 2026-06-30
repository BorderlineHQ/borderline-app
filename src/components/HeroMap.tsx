'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { africaPaths } from './africaPaths';

// ─── Country Data ────────────────────────────────────────────────────────────
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
  td: { name: 'Chad', capital: "N'Djamena", talent: '25,000+' },
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

// ─── Cities ──────────────────────────────────────────────────────────────────
const cities = [
  { name: 'Cairo',       x: 510, y: 78,  label: 'Cairo',              textAnchor: 'start', dx: 10,  dy: 3,  countryId: 'eg' },
  { name: 'Lagos',       x: 245, y: 287, label: 'Lagos',              textAnchor: 'start', dx: 10,  dy: 3,  countryId: 'ng' },
  { name: 'Accra',       x: 205, y: 298, label: 'Accra (Yango)',      textAnchor: 'start', dx: 10,  dy: 7,  countryId: 'gh' },
  { name: 'Nairobi',     x: 535, y: 360, label: 'Nairobi',            textAnchor: 'start', dx: 10,  dy: 3,  countryId: 'ke' },
  { name: 'Kigali',      x: 468, y: 355, label: 'Kigali',             textAnchor: 'end',   dx: -10, dy: 3,  countryId: 'rw' },
  { name: 'Dakar',       x: 70,  y: 210, label: 'Dakar (Yango)',      textAnchor: 'end',   dx: -10, dy: 3,  countryId: 'sn' },
  { name: 'Kampala',     x: 485, y: 340, label: 'Kampala',            textAnchor: 'start', dx: 10,  dy: -5, countryId: 'ug' },
  { name: 'Cape Town',   x: 365, y: 630, label: 'Cape Town',          textAnchor: 'start', dx: 10,  dy: 3,  countryId: 'za' },
  { name: 'Abidjan',     x: 185, y: 295, label: 'Abidjan (Yango)',    textAnchor: 'end',   dx: -10, dy: -6, countryId: 'ci' },
  { name: 'Lusaka',      x: 445, y: 492, label: 'Lusaka (Yango)',     textAnchor: 'end',   dx: -10, dy: 3,  countryId: 'zm' },
  { name: 'Maputo',      x: 490, y: 563, label: 'Maputo (Yango)',     textAnchor: 'start', dx: 10,  dy: 3,  countryId: 'mz' },
  { name: 'Addis Ababa', x: 535, y: 275, label: 'Addis Ababa (Yango)', textAnchor: 'start', dx: 10, dy: 3, countryId: 'et' },
];

// ─── Arcs ────────────────────────────────────────────────────────────────────
const arcs: [number, number][] = [
  [0, 1], [1, 2], [2, 8], [8, 5],
  [1, 3], [3, 4], [4, 6], [3, 11],
  [11, 0], [3, 9], [9, 10], [10, 7],
];

// ─── Pulse nodes ─────────────────────────────────────────────────────────────
const pulseNodes = [
  { x: 510, y: 78  }, { x: 245, y: 287 }, { x: 205, y: 298 }, { x: 535, y: 360 },
  { x: 468, y: 355 }, { x: 70,  y: 210 }, { x: 485, y: 340 }, { x: 365, y: 630 },
  { x: 185, y: 295 }, { x: 445, y: 492 }, { x: 490, y: 563 }, { x: 535, y: 275 },
  { x: 150, y: 150 }, { x: 220, y: 180 }, { x: 310, y: 140 }, { x: 430, y: 110 },
  { x: 340, y: 220 }, { x: 390, y: 240 }, { x: 480, y: 220 }, { x: 580, y: 270 },
  { x: 330, y: 330 }, { x: 400, y: 350 }, { x: 440, y: 440 }, { x: 480, y: 490 },
  { x: 410, y: 550 }, { x: 370, y: 500 }, { x: 460, y: 590 },
];

function arcPath(from: typeof cities[0], to: typeof cities[0]): string {
  const x1 = from.x, y1 = from.y, x2 = to.x, y2 = to.y;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy);
  const nx = -dy / len, ny = dx / len;
  const bulge = len * 0.22;
  return `M ${x1} ${y1} Q ${mx + nx * bulge} ${my + ny * bulge} ${x2} ${y2}`;
}

// ─── PulseNodes ──────────────────────────────────────────────────────────────
const PulseNodes = React.memo(() => {
  const [activeNodes, setActiveNodes] = useState<Set<number>>(new Set());
  const pickRandomNodes = useCallback(() => {
    const num = Math.floor(Math.random() * 5) + 4;
    const active = new Set<number>();
    for (let i = 0; i < num; i++) active.add(Math.floor(Math.random() * pulseNodes.length));
    setActiveNodes(active);
  }, []);
  useEffect(() => {
    pickRandomNodes();
    const id = setInterval(pickRandomNodes, 2500);
    return () => clearInterval(id);
  }, [pickRandomNodes]);
  return (
    <>
      {pulseNodes.map((node, idx) => (
        <circle key={`pulse-${idx}`} cx={node.x} cy={node.y} r={activeNodes.has(idx) ? 4.5 : 2}
          className={`hm-dot${activeNodes.has(idx) ? ' active' : ''}`} />
      ))}
    </>
  );
});
PulseNodes.displayName = 'PulseNodes';

// ─── ViewBox ─────────────────────────────────────────────────────────────────
type VB = { x: number; y: number; w: number; h: number };
const DESKTOP_VB: VB = { x: 40,  y: 40, w: 620, h: 610 };
const MOBILE_VB:  VB = { x: 80,  y: 50, w: 510, h: 545 };

// ─── HeroMap ─────────────────────────────────────────────────────────────────
export const HeroMap = React.memo(() => {
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null);
  const [tooltipPos,  setTooltipPos]  = useState({ x: 0, y: 0 });
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [vb, setVb] = useState<VB>(DESKTOP_VB);

  const containerRef  = useRef<HTMLDivElement>(null);
  const svgRef        = useRef<SVGSVGElement>(null);
  const tooltipTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);
  const vbRef         = useRef<VB>(DESKTOP_VB);
  const defaultVbRef  = useRef<VB>(DESKTOP_VB);
  const gestureRef    = useRef<{
    mode: 'pan' | 'pinch';
    startVB: VB;
    startX: number; startY: number;
    startDist: number; startCx: number; startCy: number;
  } | null>(null);
  const lastTapRef  = useRef(0);
  const tapPosRef   = useRef({ x: 0, y: 0 });

  // Always keep vbRef current for gesture closures
  const updateVb = useCallback((newVb: VB) => {
    vbRef.current = newVb;
    setVb(newVb);
  }, []);

  useEffect(() => {
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    const initial = mobile ? MOBILE_VB : DESKTOP_VB;
    updateVb(initial);
    defaultVbRef.current = initial;
    if (mobile) {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3200);
    }
  }, [updateVb]);

  // ── Tooltip ──
  const clearTooltipTimer = useCallback(() => {
    if (tooltipTimer.current) { clearTimeout(tooltipTimer.current); tooltipTimer.current = null; }
  }, []);

  const showTooltip = useCallback((clientX: number, clientY: number, countryId: string, autoHide: boolean) => {
    if (!countryData[countryId]) return;
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: clientX - rect.left,
        y: clientY - rect.top - 125,
      });
    }
    setSelectedCountryId(countryId);
    setTooltipVisible(true);
    clearTooltipTimer();
    if (autoHide) {
      tooltipTimer.current = setTimeout(() => {
        setTooltipVisible(false);
        setSelectedCountryId(null);
      }, 2500);
    }
  }, [clearTooltipTimer]);

  const hideTooltip = useCallback(() => {
    clearTooltipTimer();
    setTooltipVisible(false);
    setSelectedCountryId(null);
  }, [clearTooltipTimer]);

  // ── Mouse handlers (desktop) ──
  const handleCountryHover  = useCallback((e: React.MouseEvent<SVGPathElement>, id: string) => showTooltip(e.clientX, e.clientY, id, false), [showTooltip]);
  const handleMarkerHover   = useCallback((e: React.MouseEvent<SVGGElement>,    id: string) => showTooltip(e.clientX, e.clientY, id, false), [showTooltip]);
  const handleMapLeave      = useCallback(() => { if (!isMobile) hideTooltip(); }, [isMobile, hideTooltip]);

  // ── Touch tap handlers (mobile tooltip) ──
  const handleCountryTap = useCallback((e: React.TouchEvent<SVGPathElement>, id: string) => {
    e.preventDefault(); // Stop browser from firing a duplicate 'click' event 300ms later
    const t = e.changedTouches[0];
    if (t) showTooltip(t.clientX, t.clientY, id, true);
  }, [showTooltip]);

  const handleMarkerTap = useCallback((e: React.TouchEvent<SVGGElement>, id: string) => {
    e.preventDefault();
    const t = e.changedTouches[0];
    if (t) showTooltip(t.clientX, t.clientY, id, true);
  }, [showTooltip]);

  // ── Non-passive touch pan + pinch-zoom ──
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const dist = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        gestureRef.current = {
          mode: 'pan', startVB: { ...vbRef.current },
          startX: e.touches[0].clientX, startY: e.touches[0].clientY,
          startDist: 0, startCx: 0, startCy: 0,
        };
      } else if (e.touches.length === 2) {
        e.preventDefault();
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        gestureRef.current = {
          mode: 'pinch', startVB: { ...vbRef.current },
          startX: cx, startY: cy,
          startDist: dist(e), startCx: cx, startCy: cy,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      const g = gestureRef.current;
      if (!g || !svg) return;
      const rect = svg.getBoundingClientRect();

      if (e.touches.length === 2 && g.mode === 'pinch') {
        e.preventDefault();
        if (g.startDist === 0) return;
        const currentDist = dist(e);
        const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2;
        const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2;
        const scale = g.startDist / currentDist;

        const newW = Math.max(120, Math.min(700, g.startVB.w * scale));
        const newH = Math.max(130, Math.min(760, g.startVB.h * scale));

        // Zoom toward pinch-center in SVG coordinate space
        const focusSvgX = g.startVB.x + (g.startCx - rect.left) / rect.width  * g.startVB.w;
        const focusSvgY = g.startVB.y + (g.startCy - rect.top)  / rect.height * g.startVB.h;

        // Pan from center movement
        const panX = (g.startX - cx) * (g.startVB.w / rect.width);
        const panY = (g.startY - cy) * (g.startVB.h / rect.height);

        let newX = focusSvgX - (focusSvgX - g.startVB.x) * (newW / g.startVB.w) + panX;
        let newY = focusSvgY - (focusSvgY - g.startVB.y) * (newH / g.startVB.h) + panY;

        // Clamp to prevent infinite scrolling
        newX = Math.max(-40, Math.min(740 - newW, newX));
        newY = Math.max(-40, Math.min(760 - newH, newY));

        updateVb({ x: newX, y: newY, w: newW, h: newH });

      } else if (e.touches.length === 1 && g.mode === 'pan') {
        const dx = (g.startX - e.touches[0].clientX) * (g.startVB.w / rect.width);
        const dy = (g.startY - e.touches[0].clientY) * (g.startVB.h / rect.height);
        if (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5) return;
        // Prevent page scroll only when map is actually panning
        e.preventDefault();
        
        let newX = g.startVB.x + dx;
        let newY = g.startVB.y + dy;

        // Clamp to prevent infinite scrolling
        newX = Math.max(-40, Math.min(740 - g.startVB.w, newX));
        newY = Math.max(-40, Math.min(760 - g.startVB.h, newY));

        updateVb({ x: newX, y: newY, w: g.startVB.w, h: g.startVB.h });
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      // Double-tap to reset viewBox
      if (e.changedTouches.length === 1) {
        const now = Date.now();
        const tx = e.changedTouches[0].clientX;
        const ty = e.changedTouches[0].clientY;
        const nearPrev = Math.abs(tx - tapPosRef.current.x) < 40 && Math.abs(ty - tapPosRef.current.y) < 40;
        if (now - lastTapRef.current < 350 && nearPrev) {
          updateVb(defaultVbRef.current);
        }
        lastTapRef.current = now;
        tapPosRef.current = { x: tx, y: ty };
      }
      gestureRef.current = null;
    };

    svg.addEventListener('touchstart', onTouchStart, { passive: false });
    svg.addEventListener('touchmove',  onTouchMove,  { passive: false });
    svg.addEventListener('touchend',   onTouchEnd,   { passive: true  });

    return () => {
      svg.removeEventListener('touchstart', onTouchStart);
      svg.removeEventListener('touchmove',  onTouchMove);
      svg.removeEventListener('touchend',   onTouchEnd);
    };
  }, [updateVb]);

  const selectedCountry = selectedCountryId ? countryData[selectedCountryId] : null;
  const vbStr = `${vb.x} ${vb.y} ${vb.w} ${vb.h}`;

  return (
    <div
      ref={containerRef}
      className="hero-map-wrapper"
      style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}
    >
      <div
        className="hero-map-container"
        aria-hidden="true"
        style={{ width: '100%', height: '100%', minHeight: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'visible' }}
      >
        <style>{`
          /* ─── dot fill pattern ─── */
          .hm-pattern-dot { fill: var(--color-accent); opacity: 0.12; }
          body.light-theme .hm-pattern-dot { fill: #059669; opacity: 0.45; }

          /* ─── borders ─── */
          .hm-country-border { stroke: rgba(255, 255, 255, 0.18); stroke-width: 0.5px; fill: none; }
          body.light-theme .hm-country-border { stroke: rgba(0, 0, 0, 0.12); stroke-width: 0.6px; }

          /* ─── interactive fill ─── */
          .hm-country-interactive {
            fill: transparent; cursor: pointer;
            transition: fill 0.18s ease, fill-opacity 0.18s ease, stroke 0.18s ease, stroke-opacity 0.18s ease;
          }
          .hm-country-interactive:hover {
            fill: var(--color-accent); fill-opacity: 0.18;
            stroke: var(--color-accent); stroke-width: 1px; stroke-opacity: 0.6;
          }
          body.light-theme .hm-country-interactive:hover { fill-opacity: 0.22; stroke-opacity: 0.8; }
          .hm-country-interactive.selected {
            fill: var(--color-accent); fill-opacity: 0.28;
            stroke: var(--color-accent); stroke-width: 1.2px; stroke-opacity: 0.9;
            filter: drop-shadow(0 0 8px rgba(52, 211, 153, 0.4));
          }
          body.light-theme .hm-country-interactive.selected { fill-opacity: 0.32; filter: drop-shadow(0 0 8px rgba(5, 150, 105, 0.4)); }

          /* ─── continent outline ─── */
          .hm-continent-outline { stroke: var(--color-accent); stroke-width: 0.8px; stroke-opacity: 0.4; fill: none; }
          body.light-theme .hm-continent-outline { stroke: #059669; stroke-opacity: 0.6; stroke-width: 1px; }

          /* ─── pulse dots ─── */
          .hm-dot { fill: var(--color-accent); opacity: 0.15; transition: opacity 0.5s ease; }
          body.light-theme .hm-dot { opacity: 0.5; }
          .hm-dot.active { opacity: 0.9; animation: hm-pulse 2.5s ease-in-out infinite; }
          body.light-theme .hm-dot.active { opacity: 0.95; }
          @keyframes hm-pulse { 0%,100% { r: 2px; opacity: 0.35; } 50% { r: 5px; opacity: 0.95; } }

          /* ─── city rings ─── */
          .hm-city-ring { fill: none; stroke: var(--color-accent); stroke-width: 1.2; opacity: 0.55; animation: hm-ring 3s ease-in-out infinite; }
          body.light-theme .hm-city-ring { stroke-width: 1.7; opacity: 0.9; }
          @keyframes hm-ring { 0%,100% { r: 5; opacity: 0.55; } 50% { r: 9; opacity: 0.15; } }
          .hm-city-ring.yango-ring { stroke-width: 1.5; animation: hm-yango-pulse 2.5s ease-in-out infinite; }
          .hm-city-ring.yango-ring-outer { stroke-width: 0.8; opacity: 0.3; animation: hm-yango-outer 3.5s ease-in-out infinite; }
          @keyframes hm-yango-pulse { 0%,100% { r: 5; opacity: 0.85; } 50% { r: 10; opacity: 0.25; } }
          @keyframes hm-yango-outer { 0%,100% { r: 9; opacity: 0.3; } 50% { r: 16; opacity: 0.04; } }
          .hm-city-core { fill: var(--color-accent); }
          .hm-city-core.yango-core { filter: drop-shadow(0 0 3px var(--color-accent)); }

          /* ─── city labels: hide on small phones ─── */
          .hm-city-label {
            fill: var(--color-text-secondary); font-family: var(--font-body), sans-serif;
            font-size: 9.5px; font-weight: 600; letter-spacing: 0.04em; opacity: 0.85; pointer-events: none;
          }
          body.light-theme .hm-city-label { fill: #064e3b; font-weight: 700; opacity: 1; }
          @media (max-width: 480px) { .hm-city-label { display: none; } }

          /* ─── arcs ─── */
          .hm-arc { fill: none; stroke: var(--color-accent); stroke-width: 1; opacity: 0.14; stroke-dasharray: 4 4; animation: hm-dash 22s linear infinite; }
          body.light-theme .hm-arc { opacity: 0.35; stroke-width: 1.2; }
          @media (max-width: 768px) { .hm-arc { stroke-width: 1.6; stroke-dasharray: 3 3; opacity: 0.25; } body.light-theme .hm-arc { opacity: 0.5; } }
          @keyframes hm-dash { to { stroke-dashoffset: -200; } }
          .hm-traveller { fill: var(--color-accent); opacity: 0.9; filter: drop-shadow(0 0 2px var(--color-accent)); }

          /* ─── glow under selected country ─── */
          .hm-glow { fill: var(--color-accent); pointer-events: none; }

          /* ─── entrance ─── */
          @keyframes hm-fade-in-up {
            from { opacity: 0; transform: scale(0.96) translateY(14px); }
            to   { opacity: 1; transform: scale(1)    translateY(0); }
          }
          .hero-map-viewport { animation: hm-fade-in-up 1.2s cubic-bezier(0.16,1,0.3,1) forwards; }
          @media (max-width: 768px) { .hero-map-viewport { transform: none !important; } }

          /* ─── mobile hint ─── */
          @keyframes hm-hint-life { 0% { opacity:0; } 10% { opacity:1; } 80% { opacity:1; } 100% { opacity:0; } }
          .hm-hint { animation: hm-hint-life 3.2s ease-out forwards; pointer-events: none; }
          @keyframes hm-hint-ring-anim { 0%,100% { r: 14; opacity: 0.6; } 60% { r: 26; opacity: 0; } }
          .hm-hint-ring { animation: hm-hint-ring-anim 1.6s ease-out infinite; }

          /* ─── tooltip ─── */
          @keyframes hm-tip-in { from { opacity:0; transform: translateY(8px) scale(0.93); } to { opacity:1; transform: translateY(0) scale(1); } }
          .hm-tooltip-card { animation: hm-tip-in 0.16s ease-out forwards; }
        `}</style>

        {/* ── Tooltip card ── */}
        {tooltipVisible && selectedCountry && (
          <div
            className="hm-tooltip-card"
            style={{
              position: 'absolute',
              left: `${Math.max(8, Math.min(tooltipPos.x - 100, (containerRef.current?.getBoundingClientRect().width ?? 600) - 218))}px`,
              top:  `${Math.max(8, tooltipPos.y)}px`,
              width: '210px',
              background: 'linear-gradient(135deg, rgba(6,15,10,0.97) 0%, rgba(6,24,15,0.97) 100%)',
              border: '1.5px solid rgba(52,211,153,0.6)',
              borderRadius: '12px',
              padding: '13px 15px',
              color: 'white',
              boxShadow: '0 4px 30px rgba(0,255,102,0.22), 0 1px 0 rgba(52,211,153,0.12) inset',
              backdropFilter: 'blur(20px)',
              zIndex: 100,
              pointerEvents: 'none',
            }}
          >
            <div style={{ fontWeight: 700, color: '#34D399', fontSize: '0.9rem', marginBottom: '7px', borderBottom: '1px solid rgba(52,211,153,0.18)', paddingBottom: '6px', letterSpacing: '-0.01em' }}>
              {selectedCountry.name}
            </div>
            <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.55)', marginBottom: '3px' }}>
              Capital: <strong style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>{selectedCountry.capital}</strong>
            </div>
            <div style={{ fontSize: '0.77rem', color: 'rgba(255,255,255,0.55)' }}>
              Est. Talent: <strong style={{ color: '#34D399', fontWeight: 700 }}>{selectedCountry.talent}</strong>
            </div>
          </div>
        )}

        {/* ── SVG Map ── */}
        <svg
          ref={svgRef}
          viewBox={vbStr}
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            overflow: 'visible', maxWidth: '100%', maxHeight: '100%',
            display: 'block', margin: 'auto',
            userSelect: 'none', WebkitUserSelect: 'none',
            touchAction: 'none',  /* hand off all touch to our JS */
          }}
          onMouseLeave={handleMapLeave}
        >
          <defs>
            <pattern id="map-dot-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="1.15" className="hm-pattern-dot" />
            </pattern>
            <mask id="map-africa-mask">
              <rect x="-10" y="-10" width="730" height="750" fill="#000" />
              <g fill="#fff">
                {africaPaths.map((c) => <path key={c.id} d={c.d} />)}
              </g>
            </mask>
          </defs>

          <g>
            {/* Dot grid */}
            <rect x="-5" y="-5" width="720" height="740" fill="url(#map-dot-pattern)" mask="url(#map-africa-mask)" />

            {/* Country borders */}
            <g className="hm-country-border">
              {africaPaths.map((c) => <path key={`b-${c.id}`} d={c.d} />)}
            </g>

            {/* Interactive hit areas */}
            <g>
              {africaPaths.map((c) => (
                <path
                  key={`i-${c.id}`}
                  d={c.d}
                  className={`hm-country-interactive${selectedCountryId === c.id ? ' selected' : ''}`}
                  onMouseEnter={(e) => handleCountryHover(e, c.id)}
                  onClick={(e) => showTooltip(e.clientX, e.clientY, c.id, false)}
                  onTouchEnd={(e) => handleCountryTap(e, c.id)}
                />
              ))}
            </g>

            {/* Continent silhouette */}
            <g className="hm-continent-outline">
              {africaPaths.map((c) => <path key={`o-${c.id}`} d={c.d} />)}
            </g>

            {/* Pulse nodes */}
            <PulseNodes />

            {/* Arcs + travelling dots */}
            {arcs.map(([fi, ti], idx) => {
              const d = arcPath(cities[fi], cities[ti]);
              return (
                <g key={`arc-${idx}`}>
                  <path id={`arc-${idx}`} d={d} className="hm-arc" />
                  <circle r="3" className="hm-traveller">
                    <animateMotion dur={`${4.5 + idx * 0.8}s`} repeatCount="indefinite" path={d} />
                  </circle>
                </g>
              );
            })}

            {/* City markers */}
            {cities.map((city) => {
              const isYango = city.label.includes('Yango');
              return (
                <g
                  key={city.name}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={(e) => handleMarkerHover(e, city.countryId)}
                  onClick={(e) => showTooltip(e.clientX, e.clientY, city.countryId, false)}
                  onTouchEnd={(e) => handleMarkerTap(e, city.countryId)}
                >
                  {isYango ? (
                    <>
                      <circle cx={city.x} cy={city.y} className="hm-city-ring yango-ring"       style={{ animationDelay: `${(city.x % 10) * 0.2}s` }} />
                      <circle cx={city.x} cy={city.y} className="hm-city-ring yango-ring-outer"  style={{ animationDelay: `${(city.y % 10) * 0.2}s` }} />
                      <circle cx={city.x} cy={city.y} r={3}   className="hm-city-core yango-core" />
                    </>
                  ) : (
                    <>
                      <circle cx={city.x} cy={city.y} r={5}   className="hm-city-ring"  style={{ animationDelay: `${(city.x % 8) * 0.25}s` }} />
                      <circle cx={city.x} cy={city.y} r={2.5} className="hm-city-core" />
                    </>
                  )}
                  {/* Larger invisible touch target for mobile */}
                  <circle cx={city.x} cy={city.y} r={16} fill="transparent" />
                  <text
                    x={city.x + city.dx} y={city.y + city.dy}
                    textAnchor={city.textAnchor as 'start' | 'end' | 'middle' | 'inherit'}
                    className="hm-city-label"
                  >
                    {city.label}
                  </text>
                </g>
              );
            })}

            {/* Mobile first-load hint — pulsing ring on Lagos */}
            {showHint && (
              <g className="hm-hint">
                <circle cx={245} cy={287} r={14} className="hm-hint-ring" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                <circle cx={245} cy={287} r={14} className="hm-hint-ring" fill="none" stroke="var(--color-accent)" strokeWidth="1" style={{ animationDelay: '0.6s', animationDuration: '2s' }} />
                <rect x={152} y={258} width={130} height={22} rx={5} fill="rgba(6,15,10,0.88)" />
                <text x={217} y={273} textAnchor="middle" fill="#34D399" fontSize="8.5" fontWeight="700" fontFamily="system-ui,sans-serif" letterSpacing="0.05em">
                  TAP A COUNTRY
                </text>
              </g>
            )}
          </g>
        </svg>
      </div>

      {/* ── Legend ── */}
      <div style={{
        width: '100%', maxWidth: '700px', marginTop: '10px',
        padding: '8px var(--spacing-md)',
        borderTop: '1px solid rgba(128,128,128,0.07)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '6px',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: 'var(--color-text-secondary)', opacity: 0.8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: 'var(--color-accent)', boxShadow: '0 0 5px var(--color-accent)', display: 'inline-block', animation: 'hm-pulse 2s infinite' }} />
            <span>BorderLine presence</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-text-secondary)', opacity: 0.4, display: 'inline-block' }} />
            <span>Planned expansion</span>
          </div>
          {isMobile && (
            <span style={{ opacity: 0.45, fontSize: '0.62rem', whiteSpace: 'nowrap' }}>
              ↔ Pan &nbsp;·&nbsp; Pinch to zoom &nbsp;·&nbsp; Double-tap to reset
            </span>
          )}
        </div>
        <div style={{ fontSize: '0.72rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          <p style={{ color: 'var(--color-text-primary)', fontWeight: 500, marginBottom: 2, opacity: 0.85 }}>
            Our vision is to empower cross-African work and collaboration.
          </p>
          <p style={{ fontSize: '0.62rem', opacity: 0.4 }}>
            {isMobile ? 'Tap a country to learn more.' : 'Hover or click a country to learn more.'}
          </p>
        </div>
      </div>
    </div>
  );
});
HeroMap.displayName = 'HeroMap';
