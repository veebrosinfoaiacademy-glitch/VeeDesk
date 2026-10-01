import {
  CalendarCheck2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  IdCard,
  ListChecks,
  SquareKanban,
  TreePalm,
} from 'lucide-react';
import { checkIns, employees, workforce } from '../../data/demo';
import { cn } from '../../lib';
import { CountUp } from '../ui/CountUp';
import { Legend, LineChart } from './charts';
import { Avatar, Meter, StatusPill } from './primitives';

const byName = Object.fromEntries(employees.map((e) => [e.name, e]));

function Card({ className, children }) {
  return <div className={cn('rounded-2xl border border-line bg-white shadow-card', className)}>{children}</div>;
}

function Segmented({ items, active }) {
  return (
    <div className="flex rounded-lg bg-canvas p-0.5 text-[11px] font-medium ring-1 ring-line ring-inset">
      {items.map((item) => (
        <span
          key={item}
          className={cn('rounded-md px-2.5 py-1', item === active ? 'bg-white text-ink-900 shadow-sm' : 'text-ink-500')}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   A · Attendance
------------------------------------------------------------------- */
export function AttendanceMockup() {
  const tiles = [
    { status: 'present', label: 'Present', value: workforce.present },
    { status: 'absent', label: 'Absent', value: workforce.absent },
    { status: 'late', label: 'Late', value: workforce.late },
    { status: 'leave', label: 'On Leave', value: workforce.onLeave },
  ];
  const max = Math.max(...checkIns.map((c) => c.count));
  const rows = ['Priya Sharma', 'Arjun Kumar', 'Rahul Raj', 'Meena Devi', 'Vikram Rao'].map((n) => byName[n]);

  return (
    <Card className="@container overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 @lg:px-5">
        <div className="flex items-center gap-2">
          <CalendarCheck2 className="size-4 text-emerald-600" />
          <p className="text-[13px] font-semibold text-ink-900">Attendance</p>
          <span className="hidden text-[11px] text-ink-400 @md:inline">· All departments</span>
        </div>
        <Segmented items={['Day', 'Week', 'Month']} active="Day" />
      </div>

      <div className="p-4 @lg:p-5">
        <div className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
          {tiles.map((t, i) => (
            <div key={t.status} className="rounded-xl bg-canvas px-3 py-2.5">
              <span className="flex items-center gap-1.5 text-[11px] text-ink-500">
                <span className={cn('size-2 rounded-full', { present: 'bg-emerald-500', absent: 'bg-rose-500', late: 'bg-amber-500', leave: 'bg-sky-500' }[t.status])} />
                {t.label}
              </span>
              <p className="mt-1 text-[22px] leading-none font-semibold tracking-tight text-ink-900">
                <CountUp value={t.value} delay={i * 80} />
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <p className="text-[12px] font-semibold text-ink-900">Check-ins</p>
            <Legend
              items={[
                { label: 'On time', color: '#6a36d0' },
                { label: 'Late', color: '#f59e0b' },
              ]}
            />
          </div>
          <div className="relative mt-3 flex h-24 items-end gap-1.5">
            {checkIns.map((c, i) => (
              <div key={c.time} className="flex h-full flex-1 flex-col justify-end">
                <div
                  className="m-bar rounded-t-[4px]"
                  style={{
                    height: `${(c.count / max) * 100}%`,
                    background: c.late ? '#f59e0b' : '#6a36d0',
                    '--d': `${i * 60}ms`,
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1.5 flex gap-1.5 border-t border-line pt-1.5 text-[9.5px] text-ink-400 tabular-nums">
            {checkIns.map((c) => (
              <span key={c.time} className="flex-1 text-center">
                {c.time}
              </span>
            ))}
          </div>
        </div>

        <ul className="mt-4 divide-y divide-line rounded-xl border border-line">
          {rows.map((e, i) => (
            <li key={e.name} className="m-fade flex items-center gap-3 px-3 py-2" style={{ '--d': `${300 + i * 70}ms` }}>
              <Avatar name={e.name} className="size-7 text-[10px]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-ink-900">{e.name}</p>
                <p className="truncate text-[10.5px] text-ink-500">{e.department}</p>
              </div>
              <span className="hidden w-14 text-right text-[11px] text-ink-600 tabular-nums @md:block">{e.checkIn ?? '—'}</span>
              <span className="hidden w-14 text-right text-[11px] text-ink-500 tabular-nums @lg:block">{e.hours}</span>
              <span className="w-[74px] text-right">
                <StatusPill status={e.status} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------
   B · Work allocation
------------------------------------------------------------------- */
const TASKS = [
  { title: 'Website Redesign', owner: 'Arjun Kumar', due: 'Today', status: 'progress', selected: true },
  { title: 'API Integration', owner: 'Rahul Raj', due: 'Thu', status: 'progress' },
  { title: 'Vendor onboarding', owner: 'Priya Sharma', due: 'Fri', status: 'assigned' },
  { title: 'Sales deck refresh', owner: 'Karthik S', due: 'Done', status: 'completed' },
  { title: 'Ticket backlog cleanup', owner: 'Divya Nair', due: '2d late', status: 'delayed' },
];

const CHECKLIST = [
  { label: 'Homepage wireframes', done: true },
  { label: 'Visual design', done: true },
  { label: 'Responsive layouts', done: false, active: true },
  { label: 'Handoff to engineering', done: false },
];

export function TaskMockup() {
  return (
    <Card className="@container overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 @lg:px-5">
        <div className="flex items-center gap-2">
          <SquareKanban className="size-4 text-orange-600" />
          <p className="text-[13px] font-semibold text-ink-900">Work</p>
          <span className="text-[11px] text-ink-400">· This week</span>
        </div>
        <div className="hidden items-center gap-1.5 @md:flex">
          {[
            ['assigned', 14],
            ['progress', 42],
            ['completed', 31],
            ['delayed', 7],
          ].map(([s, n]) => (
            <StatusPill key={s} status={s} label={`${n}`} />
          ))}
        </div>
      </div>

      <div className="grid @xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul className="hidden border-r border-line p-2 @xl:block">
          {TASKS.map((t, i) => (
            <li
              key={t.title}
              className={cn(
                'm-fade flex items-center gap-2.5 rounded-xl px-2.5 py-2',
                t.selected && 'bg-brand-50/70 ring-1 ring-brand-100 ring-inset',
              )}
              style={{ '--d': `${i * 70}ms` }}
            >
              <Avatar name={t.owner} className="size-6 text-[9px]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-ink-900">{t.title}</p>
                <p className="truncate text-[10.5px] text-ink-500">
                  {t.owner} · {t.due}
                </p>
              </div>
              <span className={cn('size-2 shrink-0 rounded-full', { progress: 'bg-brand-500', assigned: 'bg-ink-400', completed: 'bg-emerald-500', delayed: 'bg-orange-500' }[t.status])} />
            </li>
          ))}
        </ul>

        <div className="p-4 @lg:p-5">
          <p className="flex items-center gap-1 text-[10.5px] text-ink-400">
            Work <ChevronRight className="size-3" /> Design
          </p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <p className="text-[17px] font-semibold tracking-tight text-ink-900">Website Redesign</p>
            <StatusPill status="progress" />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[12px]">
            <div>
              <dt className="text-[10.5px] text-ink-400">Assigned</dt>
              <dd className="mt-1 flex items-center gap-1.5 font-medium text-ink-900">
                <Avatar name="Arjun Kumar" className="size-5 text-[8.5px]" />
                Arjun Kumar
              </dd>
            </div>
            <div>
              <dt className="text-[10.5px] text-ink-400">Department</dt>
              <dd className="mt-1 font-medium text-ink-900">Design</dd>
            </div>
            <div>
              <dt className="text-[10.5px] text-ink-400">Deadline</dt>
              <dd className="mt-1 inline-flex items-center gap-1 font-medium text-orange-700">
                <CalendarDays className="size-3.5" /> Today
              </dd>
            </div>
            <div>
              <dt className="text-[10.5px] text-ink-400">Status</dt>
              <dd className="mt-1 font-medium text-ink-900">In Progress</dd>
            </div>
          </dl>

          <div className="mt-4">
            <div className="flex justify-between text-[11px]">
              <span className="text-ink-500">Progress</span>
              <span className="font-semibold text-ink-900 tabular-nums">65%</span>
            </div>
            <Meter value={65} className="mt-1.5 h-2" />
          </div>

          <ul className="mt-4 space-y-1.5">
            {CHECKLIST.map((c, i) => (
              <li
                key={c.label}
                className={cn('m-fade flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px]', c.active ? 'bg-canvas text-ink-900' : 'text-ink-600')}
                style={{ '--d': `${400 + i * 80}ms` }}
              >
                <span
                  className={cn(
                    'inline-flex size-4 items-center justify-center rounded-[5px]',
                    c.done ? 'bg-emerald-500 text-white' : 'ring-1 ring-ink-300 ring-inset',
                  )}
                >
                  {c.done && <Check className="size-3" strokeWidth={3} />}
                </span>
                <span className={c.done ? 'text-ink-400 line-through' : ''}>{c.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------
   C · Performance
------------------------------------------------------------------- */
export function PerformanceMockup() {
  const priya = byName['Priya Sharma'];
  const kpis = [
    { label: 'Tasks Completed', value: priya.completed, suffix: '', delta: '+3' },
    { label: 'On-Time', value: priya.onTime, suffix: '%', delta: '+2%' },
    { label: 'Productivity', value: 94, suffix: '%', delta: '+5%' },
    { label: 'Quality', value: 95, suffix: '%', delta: '+1%' },
  ];
  const trend = [86, 88, 87, 91, 93, 96];
  const team = [84, 85, 85, 87, 88, 89];

  return (
    <Card className="@container overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 @lg:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar name="Priya Sharma" className="size-8 text-[11px]" />
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-ink-900">Priya Sharma</p>
            <p className="truncate text-[11px] text-ink-500">Operations Lead · Operations</p>
          </div>
        </div>
        <Segmented items={['Month', 'Quarter']} active="Month" />
      </div>

      <div className="p-4 @lg:p-5">
        <div className="grid grid-cols-2 gap-2 @lg:grid-cols-4">
          {kpis.map((k, i) => (
            <div key={k.label} className="rounded-xl border border-line px-3 py-2.5">
              <p className="truncate text-[10.5px] text-ink-500">{k.label}</p>
              <p className="mt-1 text-[21px] leading-none font-semibold tracking-tight text-ink-900">
                <CountUp value={k.value} suffix={k.suffix} delay={i * 80} />
              </p>
              <p className="mt-1.5 text-[10.5px] font-medium text-emerald-700">{k.delta} vs last month</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-line p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="text-[12px] font-semibold text-ink-900">Performance score · 6 months</p>
            <Legend
              items={[
                { label: 'Priya Sharma', color: '#e246a4' },
                { label: 'Team average', color: '#9aa0ae', dashed: true },
              ]}
            />
          </div>
          <div className="relative mt-3">
            <LineChart data={trend} min={80} max={100} height={120} color="#e246a4" callout="Sep · 96" delay={200} labels={['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep']} />
            {/* Team average as a dashed reference series */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-0 h-[120px] w-full" aria-hidden="true">
              <polyline
                points={team.map((v, i) => `${(i / (team.length - 1)) * 100},${100 - ((v - 80) / 20) * 100}`).join(' ')}
                fill="none"
                stroke="#9aa0ae"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------
   D · Employee self-service portal
------------------------------------------------------------------- */
const ACTIONS = [
  { label: 'View Profile', icon: IdCard },
  { label: 'Check Attendance', icon: CalendarCheck2 },
  { label: 'Apply Leave', icon: TreePalm, active: true },
  { label: 'View Tasks', icon: ListChecks },
  { label: 'Track Requests', icon: Clock3 },
];

const REQUESTS = [
  { type: 'Casual leave', dates: '14–15 Oct · 2 days', status: 'pending' },
  { type: 'Sick leave', dates: '2 Sep · 1 day', status: 'approved' },
  { type: 'Casual leave', dates: '12 Aug · 1 day', status: 'approved' },
];

function Field({ label, value, className }) {
  return (
    <div className={className}>
      <p className="text-[10.5px] font-medium text-ink-500">{label}</p>
      <div className="mt-1 flex h-8 items-center justify-between rounded-lg border border-line bg-white px-2.5 text-[12px] text-ink-900">
        {value}
      </div>
    </div>
  );
}

export function SelfServiceMockup() {
  return (
    <Card className="@container overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 @lg:px-5">
        <div className="flex items-center gap-2.5">
          <Avatar name="Arjun Kumar" className="size-8 text-[11px]" />
          <div>
            <p className="text-[13px] font-semibold text-ink-900">Hi, Arjun</p>
            <p className="text-[11px] text-ink-500">Checked in at 09:02 · General shift</p>
          </div>
        </div>
        <span className="hidden items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10.5px] font-medium text-emerald-700 @md:inline-flex">
          <CircleCheck className="size-3" /> Present
        </span>
      </div>

      <div className="p-4 @lg:p-5">
        <div className="grid grid-cols-5 gap-1.5">
          {ACTIONS.map(({ label, icon: Icon, active }) => (
            <div
              key={label}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl px-1 py-2.5 text-center text-[10px] leading-tight font-medium',
                active ? 'bg-brand-600 text-white' : 'bg-canvas text-ink-700',
              )}
            >
              <Icon className={cn('size-4', active ? 'text-white' : 'text-ink-500')} strokeWidth={1.75} />
              {label}
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-3 @xl:grid-cols-2">
          <div className="rounded-xl border border-line bg-canvas/60 p-3.5">
            <p className="text-[12px] font-semibold text-ink-900">Apply Leave</p>
            <div className="mt-3 space-y-2.5">
              <Field label="Leave type" value={<>Casual leave <ChevronRight className="size-3.5 rotate-90 text-ink-400" /></>} />
              <div className="grid grid-cols-2 gap-2">
                <Field label="From" value="14 Oct" />
                <Field label="To" value="15 Oct" />
              </div>
              <Field label="Reason" value={<span className="text-ink-500">Family function</span>} />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10.5px] text-ink-500">Sent to your manager</span>
                <span className="rounded-lg bg-brand-600 px-3 py-1.5 text-[11px] font-medium text-white">Submit request</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-line p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[12px] font-semibold text-ink-900">My Requests</p>
              <span className="text-[10.5px] text-ink-400">3 this quarter</span>
            </div>
            <ul className="mt-2.5 space-y-2">
              {REQUESTS.map((r, i) => (
                <li key={i} className="m-fade flex items-center justify-between gap-2 rounded-lg bg-canvas px-2.5 py-2" style={{ '--d': `${200 + i * 90}ms` }}>
                  <div className="min-w-0">
                    <p className="truncate text-[11.5px] font-medium text-ink-900">{r.type}</p>
                    <p className="truncate text-[10.5px] text-ink-500">{r.dates}</p>
                  </div>
                  <StatusPill status={r.status} />
                </li>
              ))}
            </ul>
            <div className="mt-3 rounded-lg border border-dashed border-line-strong px-2.5 py-2">
              <p className="text-[10.5px] text-ink-500">Request timeline</p>
              <div className="mt-1.5 flex items-center gap-1 text-[10.5px] font-medium">
                <span className="text-emerald-700">Submitted</span>
                <span className="h-px flex-1 bg-emerald-300" />
                <span className="text-amber-700">Manager review</span>
                <span className="h-px flex-1 bg-line-strong" />
                <span className="text-ink-400">Decision</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
