import { useId } from 'react';
import { cn } from '../../lib';

/** Catmull-Rom spline through points, converted to cubic Béziers. */
function smoothPath(points) {
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
  }
  return d;
}

/**
 * Responsive single-series line/area chart.
 * The SVG stretches to its box (non-scaling strokes keep lines at 2px);
 * markers and labels are HTML so they never distort.
 */
export function LineChart({
  data,
  min,
  max,
  labels,
  target,
  color = '#6a36d0',
  height = 120,
  callout,
  gridLines = 4,
  delay = 0,
  className,
}) {
  const gradientId = useId();
  const lo = min ?? Math.min(...data);
  const hi = max ?? Math.max(...data);
  const x = (i) => (i / (data.length - 1)) * 100;
  const y = (v) => 100 - ((v - lo) / (hi - lo)) * 100;
  const points = data.map((v, i) => [x(i), y(v)]);
  const line = smoothPath(points);
  const area = `${line} L100,100 L0,100 Z`;
  const last = points[points.length - 1];

  return (
    <div className={className}>
      <div className="relative" style={{ height }}>
        {Array.from({ length: gridLines }, (_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 border-t border-ink-900/[0.06]"
            style={{ top: `${(i / (gridLines - 1)) * 100}%` }}
          />
        ))}
        {target != null && (
          <div
            className="absolute inset-x-0 border-t border-dashed border-ink-400/70"
            style={{ top: `${y(target)}%` }}
          >
            <span className="absolute -top-2 right-0 rounded bg-white px-1 text-[9.5px] font-medium text-ink-500">
              Target {target}
            </span>
          </div>
        )}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="m-wipe absolute inset-0 size-full overflow-visible"
          style={{ '--d': `${delay}ms` }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={color} stopOpacity="0.18" />
              <stop offset="1" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${gradientId})`} />
          <path
            d={line}
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <div
          className="m-fade absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 bg-white"
          style={{ left: `${last[0]}%`, top: `${last[1]}%`, borderColor: color, '--d': `${delay + 1300}ms` }}
        />
        {callout && (
          <div
            className="m-fade absolute -translate-x-full -translate-y-full pr-1.5 pb-2.5"
            style={{ left: `${last[0]}%`, top: `${last[1]}%`, '--d': `${delay + 1400}ms` }}
          >
            <div className="rounded-md bg-ink-900 px-2 py-1 text-[10px] font-medium whitespace-nowrap text-white shadow-lg">
              {callout}
            </div>
          </div>
        )}
      </div>
      {labels && (
        <div className="mt-2 flex justify-between text-[9.5px] text-ink-400 tabular-nums">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/** Vertical grouped bars. `series` = [{ key, color }] in drawing order. */
export function GroupedBars({ data, series, labelKey = 'label', max, height = 110, barClassName = 'w-2.5', delay = 0, className }) {
  const top = max ?? Math.max(...data.flatMap((d) => series.map((s) => d[s.key])));
  return (
    <div className={className}>
      <div className="relative flex items-end justify-between gap-1" style={{ height }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="absolute inset-x-0 border-t border-ink-900/[0.06]" style={{ top: `${(i / 3) * 100}%` }} />
        ))}
        {data.map((d, gi) => (
          <div key={d[labelKey]} className="relative flex h-full flex-1 items-end justify-center gap-[2px]">
            {series.map((s, si) => (
              <div
                key={s.key}
                className={cn('m-bar rounded-t-[3px]', barClassName)}
                style={{
                  height: `${(d[s.key] / top) * 100}%`,
                  background: s.color,
                  '--d': `${delay + gi * 70 + si * 40}ms`,
                }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-1 text-[9.5px] text-ink-400">
        {data.map((d) => (
          <span key={d[labelKey]} className="flex-1 text-center">
            {d[labelKey]}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Small legend row: colored swatch + text in ink (never in the series color). */
export function Legend({ items, className }) {
  return (
    <div className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-ink-500', className)}>
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <span
            className={cn('inline-block', item.dashed ? 'h-0 w-3 border-t-2 border-dashed' : 'size-2 rounded-[3px]')}
            style={item.dashed ? { borderColor: item.color } : { background: item.color }}
          />
          {item.label}
        </span>
      ))}
    </div>
  );
}

/** Stacked horizontal bar with 2px surface gaps between segments. */
export function StackedBar({ segments, className, height = 'h-2.5' }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  return (
    <div className={cn('flex w-full gap-[2px] overflow-hidden rounded-full', height, className)}>
      {segments.map((s, i) => (
        <div
          key={s.label}
          className="m-grow h-full first:rounded-l-full last:rounded-r-full"
          style={{ width: `${(s.value / total) * 100}%`, background: s.color, '--d': `${i * 120}ms` }}
        />
      ))}
    </div>
  );
}

/** Donut ring built from stroked circles (pathLength = 100 for easy math). */
export function Donut({ segments, size = 96, stroke = 10, children, className }) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const r = (size - stroke) / 2;
  let offset = 0;
  const gap = segments.length > 1 ? 1.2 : 0;
  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="size-full -rotate-90" aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgb(11 23 54 / 0.06)" strokeWidth={stroke} />
        {segments.map((s, i) => {
          const len = (s.value / total) * 100;
          const dash = Math.max(len - gap, 0.1);
          const el = (
            <circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={stroke}
              pathLength="100"
              strokeDasharray={`${dash} ${100 - dash}`}
              strokeDashoffset={-offset}
              className="m-fade"
              style={{ '--d': `${200 + i * 150}ms` }}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      {children && <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>}
    </div>
  );
}

/** Minimal sparkline for compact cards. */
export function Sparkline({ data, color = '#6a36d0', className, delay = 0 }) {
  const lo = Math.min(...data);
  const hi = Math.max(...data);
  const points = data.map((v, i) => [(i / (data.length - 1)) * 100, 92 - ((v - lo) / (hi - lo || 1)) * 84]);
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={cn('m-wipe overflow-visible', className)}
      style={{ '--d': `${delay}ms` }}
      aria-hidden="true"
    >
      <path
        d={smoothPath(points)}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
