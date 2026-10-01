import {
  CalendarCheck2,
  CalendarX2,
  ClipboardCheck,
  Clock3,
  Hourglass,
  Loader,
  TreePalm,
  TriangleAlert,
  UserPlus,
} from 'lucide-react';
import { departments, workforce } from '../../data/demo';
import { cn } from '../../lib';
import { CountUp } from '../ui/CountUp';
import { AppSidebar, AppTopbar, Avatar, Meter, Panel } from './primitives';

const TILES = [
  { label: 'New Employees', value: workforce.newThisMonth, note: 'This month', icon: UserPlus, tone: 'bg-brand-50 text-brand-600' },
  { label: 'Present', value: workforce.present, note: '87.9% of workforce', icon: CalendarCheck2, tone: 'bg-emerald-50 text-emerald-600' },
  { label: 'Absent', value: workforce.absent, note: 'Unplanned', icon: CalendarX2, tone: 'bg-rose-50 text-rose-600' },
  { label: 'On Leave', value: workforce.onLeave, note: 'Approved leave', icon: TreePalm, tone: 'bg-sky-50 text-sky-600' },
  { label: 'Pending Approvals', value: 6, note: 'Leave requests', icon: Hourglass, tone: 'bg-amber-50 text-amber-600', highlight: true },
  { label: 'Tasks in Progress', value: 42, note: 'Across 7 teams', icon: Loader, tone: 'bg-brand-50 text-brand-600' },
  { label: 'Completed Today', value: 31, note: '+6 vs yesterday', icon: ClipboardCheck, tone: 'bg-emerald-50 text-emerald-600' },
  { label: 'Delayed', value: 7, note: 'Past deadline', icon: Clock3, tone: 'bg-orange-50 text-orange-600' },
];

const ALERTS = [
  { icon: TriangleAlert, tone: 'text-orange-600 bg-orange-50', title: '7 tasks are past their deadline', meta: 'Engineering 4 · Support 3', level: 'Delayed' },
  { icon: Hourglass, tone: 'text-amber-600 bg-amber-50', title: '6 leave requests need approval', meta: 'Oldest waiting 2 days', level: 'Pending' },
  { icon: Clock3, tone: 'text-amber-600 bg-amber-50', title: '10 late check-ins today', meta: 'Most in Engineering', level: 'Late' },
];

const ACTIVITY = [
  { who: 'Meena Devi', what: 'approved leave for Rahul Raj', time: '09:48' },
  { who: 'Arjun Kumar', what: 'completed “Homepage wireframes”', time: '09:31' },
  { who: 'Priya Sharma', what: 'assigned 4 tasks to Operations', time: '09:15' },
  { who: 'Divya Nair', what: 'joined Support · Morning shift', time: '09:02' },
];

function Tile({ label, value, note, icon: Icon, tone, highlight, index }) {
  return (
    <div
      className={cn(
        'm-fade rounded-xl border bg-white p-3.5',
        highlight ? 'border-amber-200 shadow-[0_0_0_3px_rgb(245_158_11/0.08)]' : 'border-line',
      )}
      style={{ '--d': `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] leading-tight font-medium text-ink-500">{label}</span>
        <span className={cn('inline-flex size-6 shrink-0 items-center justify-center rounded-md', tone)}>
          <Icon className="size-3.5" strokeWidth={2} />
        </span>
      </div>
      <p className="mt-1.5 text-[24px] leading-none font-semibold tracking-tight text-ink-900">
        <CountUp value={value} delay={index * 60} />
      </p>
      <p className="mt-1.5 truncate text-[10.5px] text-ink-500">{note}</p>
    </div>
  );
}

export function ManagerDashboardMockup() {
  return (
    <div className="@container flex bg-canvas/70">
      <AppSidebar active="Dashboard" className="hidden @5xl:flex" />
      <div className="@container/main min-w-0 flex-1 p-3.5 @2xl:p-5 @5xl:p-6">
        <AppTopbar title="Today’s Overview" meta="All departments · Today" user="Meena Devi" />

        <div className="mt-4 grid grid-cols-2 gap-2.5 @3xl/main:grid-cols-4 @3xl/main:gap-3">
          {TILES.map((t, i) => (
            <Tile key={t.label} {...t} index={i} />
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 @3xl/main:mt-3 @3xl/main:grid-cols-12 @3xl/main:gap-3">
          <Panel title="Team Overview" meta="Attendance by department" className="@3xl/main:col-span-7" bodyClassName="pt-3">
            <ul className="space-y-2.5">
              {departments.map((d, i) => (
                <li key={d.name} className="grid grid-cols-[88px_1fr_auto] items-center gap-3 text-[11.5px]">
                  <span className="truncate font-medium text-ink-800">{d.name}</span>
                  <Meter value={d.present} max={d.headcount} tone="bg-emerald-500" delay={i * 70} />
                  <span className="w-14 text-right text-ink-500 tabular-nums">
                    <span className="font-medium text-ink-900">{d.present}</span>/{d.headcount}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Performance" meta="Average score by department" className="@3xl/main:col-span-5" bodyClassName="pt-3">
            <ul className="space-y-2.5">
              {[...departments]
                .sort((a, b) => b.performance - a.performance)
                .map((d, i) => (
                  <li key={d.name} className="grid grid-cols-[76px_1fr_24px] items-center gap-2.5 text-[11.5px]">
                    <span className="truncate text-ink-600">{d.name}</span>
                    <div className="h-3.5">
                      <div
                        className="m-grow h-full rounded-r-[4px] bg-brand-500"
                        style={{ width: `${d.performance}%`, '--d': `${i * 70}ms` }}
                      />
                    </div>
                    <span className="text-right font-medium text-ink-900 tabular-nums">{d.performance}</span>
                  </li>
                ))}
            </ul>
          </Panel>

          <Panel title="Alerts" meta="Needs attention" className="@3xl/main:col-span-5" bodyClassName="pt-3">
            <ul className="space-y-2">
              {ALERTS.map(({ icon: Icon, tone, title, meta, level }) => (
                <li key={title} className="flex items-start gap-2.5 rounded-lg bg-canvas px-2.5 py-2">
                  <span className={cn('mt-px inline-flex size-6 shrink-0 items-center justify-center rounded-md', tone)}>
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11.5px] font-medium text-ink-900">{title}</p>
                    <p className="text-[10.5px] text-ink-500">{meta}</p>
                  </div>
                  <span className="text-[10px] font-medium text-ink-500">{level}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Recent Activity" meta="Across all teams" className="@3xl/main:col-span-7" bodyClassName="pt-3">
            <ol className="relative space-y-3 before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-px before:bg-line">
              {ACTIVITY.map((a, i) => (
                <li key={i} className="m-fade relative flex items-center gap-3" style={{ '--d': `${200 + i * 100}ms` }}>
                  <Avatar name={a.who} className="relative size-6 text-[9px] ring-2 ring-white" />
                  <p className="min-w-0 flex-1 truncate text-[11.5px] text-ink-600">
                    <span className="font-medium text-ink-900">{a.who}</span> {a.what}
                  </p>
                  <span className="text-[10.5px] text-ink-400 tabular-nums">{a.time}</span>
                </li>
              ))}
            </ol>
          </Panel>
        </div>
      </div>
    </div>
  );
}
