import { useMemo, useState } from 'react';
import { ArrowDown, CalendarDays, ChartSpline } from 'lucide-react';
import { employees } from '../../data/demo';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Avatar, SampleBadge } from '../mockups/primitives';

const DEPARTMENTS = ['All', ...new Set(employees.map((e) => e.department))];
const MOBILE_PREVIEW = 4;

function scoreTone(score) {
  if (score >= 90) return 'bg-emerald-500';
  if (score >= 85) return 'bg-brand-500';
  return 'bg-amber-500';
}

function Kpi({ label, value, hint }) {
  return (
    <div className="bg-white px-5 py-4 sm:px-6">
      <p className="text-[12px] font-medium text-ink-500">{label}</p>
      <p className="mt-1 text-[26px] leading-none font-semibold tracking-tight text-ink-900 tabular-nums">{value}</p>
      <p className="mt-1.5 text-[11.5px] text-ink-500">{hint}</p>
    </div>
  );
}

export function PerformanceSection() {
  const [department, setDepartment] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const rows = useMemo(
    () =>
      employees
        .filter((e) => department === 'All' || e.department === department)
        .sort((a, b) => b.performance - a.performance),
    [department],
  );

  const totals = useMemo(() => {
    const tasks = rows.reduce((s, e) => s + e.tasks, 0);
    const completed = rows.reduce((s, e) => s + e.completed, 0);
    const avg = (key) => Math.round(rows.reduce((s, e) => s + e[key], 0) / rows.length);
    return { tasks, completed, wip: tasks - completed, onTime: avg('onTime'), performance: avg('performance') };
  }, [rows]);

  return (
    <section id="analytics" aria-labelledby="analytics-title" className="relative py-20 sm:py-32">
      <Container>
        <SectionHeading
          id="analytics-title"
          eyebrow="Performance analytics"
          icon={ChartSpline}
          title="Turn Employee Activity"
          muted="Into Useful Insights."
          description="Track workload, completion, productivity, attendance, and performance without manually preparing spreadsheets."
        />

        <Reveal className="-mx-2 mt-10 overflow-hidden rounded-3xl border border-line bg-white shadow-lift sm:mx-0 sm:mt-14 lg:mt-16">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-line px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em]">Employee performance</h3>
              <SampleBadge />
            </div>
            <div className="flex min-w-0 items-center gap-2">
              <div
                role="group"
                aria-label="Filter by department"
                className="scrollbar-none relative -mx-5 flex min-w-0 gap-1 overflow-x-auto px-5 py-0.5 sm:-mx-1 sm:px-1"
              >
                {DEPARTMENTS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    aria-pressed={department === d}
                    onClick={() => setDepartment(d)}
                    className={cn(
                      'shrink-0 rounded-full px-3 py-1.5 text-[12.5px] font-medium whitespace-nowrap transition-colors duration-200',
                      department === d
                        ? 'bg-brand-600 text-white'
                        : 'text-ink-600 ring-1 ring-line ring-inset hover:bg-canvas hover:text-ink-900',
                    )}
                  >
                    {d === 'All' ? 'All teams' : d}
                  </button>
                ))}
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium text-ink-600 ring-1 ring-line ring-inset sm:inline-flex">
                <CalendarDays aria-hidden="true" className="size-3.5" />
                This month
              </span>
            </div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 gap-px border-b border-line bg-line lg:grid-cols-4">
            <Kpi label="Tasks" value={totals.tasks} hint={`${rows.length} employee${rows.length === 1 ? '' : 's'}`} />
            <Kpi label="Completed" value={totals.completed} hint={`${totals.wip} still in progress`} />
            <Kpi label="On-Time %" value={`${totals.onTime}%`} hint="Average across tasks" />
            <Kpi label="Performance" value={totals.performance} hint="Average score / 100" />
          </div>

          {/* Phones: one card per employee */}
          <ul
            id="performance-cards"
            className="divide-y divide-line sm:hidden"
            aria-label={`Employee performance, ${department === 'All' ? 'all teams' : department}`}
          >
            {(showAll ? rows : rows.slice(0, MOBILE_PREVIEW)).map((e) => (
              <li key={e.name} className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <Avatar name={e.name} className="size-9 text-[11px]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-ink-900">{e.name}</p>
                    <p className="truncate text-[12px] text-ink-500">
                      {e.role} · {e.department}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[18px] leading-none font-semibold text-ink-900 tabular-nums">{e.performance}</p>
                    <p className="mt-1 text-[10.5px] text-ink-500">Performance</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink-900/[0.06]">
                  <div className={cn('h-full rounded-full transition-[width] duration-500', scoreTone(e.performance))} style={{ width: `${e.performance}%` }} />
                </div>
                <dl className="mt-3 grid grid-cols-4 gap-2 text-center">
                  {[
                    ['Tasks', e.tasks],
                    ['Done', e.completed],
                    ['WIP', e.tasks - e.completed],
                    ['On-time', `${e.onTime}%`],
                  ].map(([k, v]) => (
                    <div key={k} className="rounded-lg bg-canvas py-1.5">
                      <dt className="text-[10.5px] text-ink-500">{k}</dt>
                      <dd className="text-[13px] font-semibold text-ink-900 tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
          {rows.length > MOBILE_PREVIEW && (
            <div className="border-t border-line px-5 py-3 sm:hidden">
              <button
                type="button"
                aria-expanded={showAll}
                aria-controls="performance-cards"
                onClick={() => setShowAll((v) => !v)}
                className="w-full rounded-xl py-2.5 text-[13.5px] font-medium text-brand-700 ring-1 ring-line ring-inset transition-colors hover:bg-brand-50"
              >
                {showAll ? 'Show fewer' : `Show all ${rows.length} employees`}
              </button>
            </div>
          )}

          {/* Table (tablet and up) */}
          <div className="relative hidden overflow-x-auto sm:block" tabIndex={0} role="region" aria-label="Employee performance table">
            <table className="w-full min-w-[760px] text-left text-[13.5px] whitespace-nowrap">
              <caption className="sr-only">
                Sample employee performance data for {department === 'All' ? 'all teams' : department}, this month
              </caption>
              <thead>
                <tr className="bg-canvas/70 text-[11.5px] font-medium tracking-wide text-ink-500 uppercase">
                  <th scope="col" className="py-3 pr-4 pl-5 font-medium sm:pl-6">Employee</th>
                  <th scope="col" className="px-4 py-3 font-medium">Department</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Tasks</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">Completed</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">WIP</th>
                  <th scope="col" className="px-4 py-3 text-right font-medium">On-Time %</th>
                  <th scope="col" className="py-3 pr-5 pl-4 font-medium sm:pr-6" aria-sort="descending">
                    <span className="inline-flex items-center gap-1">
                      Performance <ArrowDown aria-hidden="true" className="size-3" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((e) => (
                  <tr key={e.name} className="transition-colors hover:bg-canvas/60">
                    <th scope="row" className="py-3 pr-4 pl-5 font-normal sm:pl-6">
                      <div className="flex items-center gap-3">
                        <Avatar name={e.name} className="size-8 text-[11px]" />
                        <div>
                          <p className="font-medium text-ink-900">{e.name}</p>
                          <p className="text-[12px] text-ink-500">{e.role}</p>
                        </div>
                      </div>
                    </th>
                    <td className="px-4 py-3 text-ink-600">{e.department}</td>
                    <td className="px-4 py-3 text-right text-ink-900 tabular-nums">{e.tasks}</td>
                    <td className="px-4 py-3 text-right text-ink-900 tabular-nums">{e.completed}</td>
                    <td className="px-4 py-3 text-right text-ink-600 tabular-nums">{e.tasks - e.completed}</td>
                    <td className="px-4 py-3 text-right text-ink-900 tabular-nums">{e.onTime}%</td>
                    <td className="py-3 pr-5 pl-4 sm:pr-6">
                      <div className="flex items-center gap-3">
                        <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ink-900/[0.06]">
                          <div
                            className={cn('h-full rounded-full transition-[width] duration-500', scoreTone(e.performance))}
                            style={{ width: `${e.performance}%` }}
                          />
                        </div>
                        <span className="w-6 font-semibold text-ink-900 tabular-nums">{e.performance}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line px-5 py-3 text-[12px] text-ink-500 sm:px-6">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500" /> 90+ Strong
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-brand-500" /> 85–89 On track
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-amber-500" /> Below 85 Needs attention
            </span>
            <span className="text-ink-500 sm:ml-auto">Illustrative values for demonstration</span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
