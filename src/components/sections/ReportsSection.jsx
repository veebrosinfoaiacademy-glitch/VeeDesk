import {
  Building2,
  CalendarCheck2,
  ChartSpline,
  Clock3,
  FileChartColumn,
  SquareKanban,
  TreePalm,
  Users,
} from 'lucide-react';
import { departments, teamPerformance } from '../../data/demo';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SwipeRow } from '../ui/SwipeRow';
import { Donut, Sparkline } from '../mockups/charts';

/* ---------- Mini visuals (decorative) ---------- */

function HeadcountBars() {
  const max = Math.max(...departments.map((d) => d.headcount));
  return (
    <ul className="w-full space-y-1.5">
      {departments.slice(0, 5).map((d, i) => (
        <li key={d.name} className="grid grid-cols-[72px_1fr_22px] items-center gap-2 text-[10.5px]">
          <span className="truncate text-ink-500">{d.name}</span>
          <div className="h-2.5">
            <div className="m-grow h-full rounded-r-[3px] bg-brand-500" style={{ width: `${(d.headcount / max) * 100}%`, '--d': `${i * 70}ms` }} />
          </div>
          <span className="text-right font-medium text-ink-800 tabular-nums">{d.headcount}</span>
        </li>
      ))}
    </ul>
  );
}

function AttendanceColumns() {
  const days = [91, 88, 93, 87, 90, 84, 92];
  return (
    <div className="w-full">
      <div className="flex h-16 items-end justify-between gap-2 border-b border-ink-900/10 px-1">
        {days.map((v, i) => (
          <div key={i} className="flex h-full w-3 flex-col justify-end">
            <div className="m-bar rounded-t-[4px] bg-emerald-500" style={{ height: `${v}%`, '--d': `${i * 60}ms` }} />
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex justify-between px-1 text-[9.5px] text-ink-400">
        <span>Attendance % · last 7 days</span>
      </div>
    </div>
  );
}

function LeaveDonut() {
  return (
    <Donut
      size={78}
      stroke={9}
      segments={[
        { label: 'Approved', value: 18, color: '#10b981' },
        { label: 'Pending', value: 6, color: '#f59e0b' },
        { label: 'Rejected', value: 2, color: '#f43f5e' },
      ]}
    >
      <span className="text-[13px] font-semibold text-ink-900">26</span>
    </Donut>
  );
}

function WorkStack() {
  const rows = [
    [14, 42, 31, 7],
    [10, 38, 40, 4],
    [12, 30, 44, 6],
  ];
  const colors = ['#9aa0ae', '#6a36d0', '#10b981', '#f97316'];
  return (
    <div className="w-full space-y-2.5">
      {rows.map((r, ri) => {
        const total = r.reduce((a, b) => a + b, 0);
        return (
          <div key={ri} className="flex h-3 gap-[2px] overflow-hidden rounded-full">
            {r.map((v, i) => (
              <div key={i} className="m-grow h-full" style={{ width: `${(v / total) * 100}%`, background: colors[i], '--d': `${ri * 100 + i * 60}ms` }} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function PerformanceLine() {
  return <Sparkline data={teamPerformance} color="#e246a4" className="h-16 w-full" />;
}

function DepartmentTreemap() {
  return (
    <div className="grid h-[84px] w-full grid-cols-[1.3fr_1fr_0.8fr] grid-rows-2 gap-1 text-[9.5px] font-medium">
      <div className="row-span-2 flex items-end rounded-md bg-brand-500 p-1.5 text-white">Engineering</div>
      <div className="flex items-end rounded-md bg-brand-400 p-1.5 text-white">Operations</div>
      <div className="flex items-end rounded-md bg-brand-300 p-1.5 text-brand-900">Sales</div>
      <div className="flex items-end rounded-md bg-brand-300 p-1.5 text-brand-900">Support</div>
      <div className="grid grid-cols-2 gap-1">
        <div className="rounded-md bg-brand-200" />
        <div className="rounded-md bg-brand-100" />
      </div>
    </div>
  );
}

function ShiftLanes() {
  const lanes = [
    { left: 0, width: 50, color: 'bg-accent-orange' },
    { left: 19, width: 56, color: 'bg-brand-500' },
    { left: 50, width: 50, color: 'bg-accent-magenta' },
  ];
  return (
    <div className="w-full space-y-2.5">
      {lanes.map((l, i) => (
        <div key={i} className="relative h-3 rounded-full bg-ink-900/[0.05]">
          <div className={cn('m-grow absolute inset-y-0 rounded-full', l.color)} style={{ left: `${l.left}%`, width: `${l.width}%`, '--d': `${i * 120}ms` }} />
        </div>
      ))}
    </div>
  );
}

const REPORTS = [
  {
    title: 'Employee Report',
    copy: 'Headcount, employee status, and profile details by department.',
    icon: Users,
    tone: 'bg-brand-50 text-brand-600',
    visual: HeadcountBars,
    wide: true,
  },
  { title: 'Attendance Report', copy: 'Presence, late arrivals, absences, and working hours.', icon: CalendarCheck2, tone: 'bg-emerald-50 text-emerald-600', visual: AttendanceColumns },
  { title: 'Leave Report', copy: 'Leave requests, approvals, and time away by team.', icon: TreePalm, tone: 'bg-sky-50 text-sky-600', visual: LeaveDonut },
  { title: 'Work Report', copy: 'Task allocation, progress, and overdue work.', icon: SquareKanban, tone: 'bg-orange-50 text-orange-600', visual: WorkStack },
  { title: 'Performance Report', copy: 'Completion, on-time delivery, and productivity trends.', icon: ChartSpline, tone: 'bg-pink-50 text-pink-600', visual: PerformanceLine },
  { title: 'Department Report', copy: 'Headcount, attendance, and workload per department.', icon: Building2, tone: 'bg-brand-50 text-brand-600', visual: DepartmentTreemap },
  { title: 'Shift Report', copy: 'Shift schedules and working hours across teams.', icon: Clock3, tone: 'bg-teal-50 text-teal-600', visual: ShiftLanes },
];

export function ReportsSection() {
  return (
    <section id="reports" aria-labelledby="reports-title" className="relative bg-canvas py-20 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <Container>
        <SectionHeading
          id="reports-title"
          eyebrow="Reports"
          icon={FileChartColumn}
          title="Reports That Help You"
          muted="Understand Your Workforce."
          description="Ready-made reports for every part of your workforce, built from the data your teams already record in VeeDesk."
        />

        <SwipeRow
          label="Reports"
          className="mt-10 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
          itemClassName={(i) => REPORTS[i].wide && 'sm:col-span-2'}
        >
          {REPORTS.map(({ title, copy, icon: Icon, tone, visual: Visual }, i) => (
            <Reveal key={title} delay={(i % 4) * 70} className="h-full">
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-2 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift">
                <Reveal
                  variant="none"
                  aria-hidden="true"
                  className="flex h-32 items-center justify-center rounded-xl bg-[linear-gradient(180deg,#f7f6fb,#f0eef7)] px-5 ring-1 ring-ink-900/[0.03] ring-inset"
                >
                  <Visual />
                </Reveal>
                <div className="flex flex-1 items-start gap-3 px-3 pt-4 pb-3">
                  <span className={cn('inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5', tone)}>
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">{title}</h3>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600">{copy}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </SwipeRow>
      </Container>
    </section>
  );
}
