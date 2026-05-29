import { useRef, useState, useCallback } from 'react';
import type { Bezier } from '../types';
import { BEZIER_PRESETS } from '../presets';

const SIZE = 220;
const PAD = 20;
const INNER = SIZE - PAD * 2;

const Y_MIN = -0.4;
const Y_MAX = 1.4;

const round = (n: number) => Math.round(n * 1000) / 1000;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const bezierToSvg = (bx: number, by: number) => ({
  x: PAD + bx * INNER,
  y: PAD + (1 - (by - Y_MIN) / (Y_MAX - Y_MIN)) * INNER,
});

const svgToBezier = (sx: number, sy: number) => ({
  x: clamp((sx - PAD) / INNER, 0, 1),
  y: clamp(Y_MIN + (1 - (sy - PAD) / INNER) * (Y_MAX - Y_MIN), Y_MIN, Y_MAX),
});

type Props = {
  value: Bezier;
  onChange: (next: Bezier) => void;
};

export function BezierEditor({ value, onChange }: Props) {
  const [x1, y1, x2, y2] = value;
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragIndex, setDragIndex] = useState<0 | 1 | null>(null);

  const p1 = bezierToSvg(x1, y1);
  const p2 = bezierToSvg(x2, y2);
  const start = bezierToSvg(0, 0);
  const end = bezierToSvg(1, 1);

  const handleMouseDown = (idx: 0 | 1) => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragIndex(idx);
  };

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (dragIndex === null || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const sx = ((e.clientX - rect.left) / rect.width) * SIZE;
      const sy = ((e.clientY - rect.top) / rect.height) * SIZE;
      const { x, y } = svgToBezier(sx, sy);
      const next: Bezier =
        dragIndex === 0 ? [round(x), round(y), x2, y2] : [x1, y1, round(x), round(y)];
      onChange(next);
    },
    [dragIndex, onChange, x1, y1, x2, y2],
  );

  const handleMouseUp = () => setDragIndex(null);

  const baseY = bezierToSvg(0, 0).y;
  const topY = bezierToSvg(0, 1).y;

  return (
    <div className="bezier-editor">
      <div className="preset-row">
        {BEZIER_PRESETS.map((p) => {
          const active = p.value.every((n, i) => Math.abs(n - value[i]) < 0.001);
          return (
            <button
              key={p.name}
              type="button"
              className={`preset-btn${active ? ' active' : ''}`}
              onClick={() => onChange(p.value)}
            >
              {p.name}
            </button>
          );
        })}
      </div>

      <svg
        ref={svgRef}
        className="bezier-svg"
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <rect x={PAD} y={PAD} width={INNER} height={INNER} className="grid-bg" />

        {[0.25, 0.5, 0.75].map((t) => (
          <g key={`gx-${t}`}>
            <line
              x1={PAD + t * INNER}
              y1={PAD}
              x2={PAD + t * INNER}
              y2={PAD + INNER}
              className="grid-line"
            />
          </g>
        ))}

        <line x1={PAD} y1={baseY} x2={PAD + INNER} y2={baseY} className="grid-axis" />
        <line x1={PAD} y1={topY} x2={PAD + INNER} y2={topY} className="grid-axis" />

        <line x1={start.x} y1={start.y} x2={p1.x} y2={p1.y} className="handle-line" />
        <line x1={end.x} y1={end.y} x2={p2.x} y2={p2.y} className="handle-line" />

        <path
          d={`M ${start.x} ${start.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`}
          className="bezier-curve"
          fill="none"
        />

        <circle cx={start.x} cy={start.y} r={4} className="endpoint" />
        <circle cx={end.x} cy={end.y} r={4} className="endpoint" />

        <circle
          cx={p1.x}
          cy={p1.y}
          r={8}
          className={`handle handle-1${dragIndex === 0 ? ' dragging' : ''}`}
          onMouseDown={handleMouseDown(0)}
        />
        <circle
          cx={p2.x}
          cy={p2.y}
          r={8}
          className={`handle handle-2${dragIndex === 1 ? ' dragging' : ''}`}
          onMouseDown={handleMouseDown(1)}
        />
      </svg>

      <div className="bezier-value">
        cubic-bezier({round(x1)}, {round(y1)}, {round(x2)}, {round(y2)})
      </div>
    </div>
  );
}
