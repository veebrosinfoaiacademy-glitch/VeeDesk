import {
  Bell,
  CalendarCheck2,
  ChartSpline,
  Check,
  Clock3,
  CloudCheck,
  FileChartColumn,
  FileText,
  History,
  LayoutGrid,
  MonitorSmartphone,
  ShieldCheck,
  SquareKanban,
  TreePalm,
  Users,
  X,
} from 'lucide-react';
import { employees, teamPerformance, workforce } from '../../data/demo';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { Donut, LineChart } from '../mockups/charts';
import { Avatar, Meter, StatusPill } from '../mockups/primitives';

/* ---------- Mini visuals ---------- */

function ProfileVisual() {
  const fields = [
    ['Employee ID', 'VD-0142'],
    ['Department', 'Design'],
    ['Designation', 'Senior Designer'],
    ['Role', 'Manager'],
    ['Joined', 'Mar 2022'],
    ['Shift', 'General · 09–18'],
  ];
  return (
    <div className="relative mx-auto w-full max-w-[400px]">
      <div className="absolute inset-x-6 -top-3 h-full rounded-2xl border border-line bg-white/70" />
      <div className="absolute inset-x-3 -top-1.5 h-full rounded-2xl border border-line bg-white/85" />
      <div className="relative rounded-2xl border border-line bg-white p-4 shadow-card">
        <div className="flex items-center gap-3">
          <Avatar name="Arjun Kumar" className="size-11 text-[13px]" />
          <div className="min-w-0 flex-1">
            <p className="text-[14px] font-semibold text-ink-900">Arjun Kumar</p>
            <p className="text-[12px] text-ink-500">Senior Designer · Design</p>
          </div>
          <StatusPill status="active" />
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-line pt-3.5">
          {fields.map(([k, v], i) => (
            <div key={k} className="m-fade min-w-0" style={{ '--d': `${200 + i * 60}ms` }}>
              <dt className="text-[10.5px] text-ink-400">{k}</dt>
              <dd className="truncate text-[12px] font-medium text-ink-800">{v}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-3.5 flex gap-2 border-t border-line pt-3">
          {['Offer letter.pdf', 'ID proof.pdf'].map((doc) => (
            <span key={doc} className="inline-flex items-center gap-1.5 rounded-lg bg-canvas px-2 py-1 text-[11px] text-ink-600">
              <FileText className="size-3.5 text-ink-400" />
              {doc}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function AttendanceVisual() {
  const segments = [
    { label: 'Present', value: workforce.present, color: '#10b981' },
    { label: 'Late', value: workforce.late, color: '#f59e0b' },
    { label: 'On Leave', value: workforce.onLeave, color: '#0ea5e9' },
    { label: 'Absent', value: workforce.absent, color: '#f43f5e' },
  ];
  return (
    <div className="flex w-full items-center gap-5 rounded-2xl border border-line bg-white p-4 shadow-card">
      <Donut segments={segments} size={104} stroke={11}>
        <span className="text-[19px] font-semibold tracking-tight text-ink-900">88%</span>
        <span className="text-[10px] text-ink-500">present</span>
      </Donut>
      <ul className="min-w-0 flex-1 space-y-2">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center justify-between text-[12px]">
            <span className="flex items-center gap-2 text-ink-600">
              <span className="size-2 rounded-[3px]" style={{ background: s.color }} />
              {s.label}
            </span>
            <span className="font-semibold text-ink-900 tabular-nums">{s.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LeaveVisual() {
  const counts = [
    { label: 'Pending', value: 6, status: 'pending' },
    { label: 'Approved', value: 18, status: 'approved' },
    { label: 'Rejected', value: 2, status: 'rejected' },
  ];
  return (
    <div className="w-full space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        {counts.map((c) => (
          <div key={c.label} className="rounded-xl border border-line bg-white px-3 py-2.5 shadow-[0_1px_2px_rgb(38_44_59/0.04)]">
            <StatusPill status={c.status} />
            <p className="mt-1.5 text-[18px] font-semibold tracking-tight text-ink-900 tabular-nums">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="m-fade rounded-xl border border-line bg-white p-3 shadow-card" style={{ '--d': '300ms' }}>
        <div className="flex items-center gap-2.5">
          <Avatar name="Rahul Raj" className="size-7 text-[10px]" />
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-semibold text-ink-900">Rahul Raj</p>
            <p className="text-[11px] text-ink-500">Casual leave · 14–15 Oct · 2 days</p>
          </div>
        </div>
        <div className="mt-2.5 grid grid-cols-2 gap-2">
          <span className="inline-flex items-center justify-center gap-1 rounded-lg border border-line py-1.5 text-[11px] font-medium text-ink-700">
            <X className="size-3" /> Reject
          </span>
          <span className="inline-flex items-center justify-center gap-1 rounded-lg bg-brand-600 py-1.5 text-[11px] font-medium text-white">
            <Check className="size-3" /> Approve
          </span>
        </div>
      </div>
    </div>
  );
}

function ShiftVisual() {
  const START = 6;
  const SPAN = 16; // 06:00 → 22:00
  const shifts = [
    { name: 'Morning', from: 6, to: 14, people: 18, color: 'bg-accent-orange' },
    { name: 'General', from: 9, to: 18, people: 186, color: 'bg-brand-500' },
    { name: 'Evening', from: 14, to: 22, people: 24, color: 'bg-accent-magenta' },
  ];
  return (
    <div className="w-full rounded-2xl border border-line bg-white p-4 shadow-card">
      <div className="relative space-y-3">
        {shifts.map((s, i) => (
          <div key={s.name}>
            <div className="mb-1 flex justify-between text-[11px]">
              <span className="font-medium text-ink-800">{s.name}</span>
              <span className="text-ink-500 tabular-nums">
                {String(s.from).padStart(2, '0')}:00–{s.to}:00 · {s.people}
              </span>
            </div>
            <div className="relative h-2 rounded-full bg-ink-900/[0.05]">
              <div
                className={cn('m-grow absolute inset-y-0 rounded-full', s.color)}
                style={{
                  left: `${((s.from - START) / SPAN) * 100}%`,
                  width: `${((s.to - s.from) / SPAN) * 100}%`,
                  '--d': `${i * 140}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between border-t border-line pt-2 text-[10px] text-ink-400 tabular-nums">
        {['06:00', '10:00', '14:00', '18:00', '22:00'].map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function WorkVisual() {
  const columns = [
    { status: 'assigned', count: 14, cards: 2 },
    { status: 'progress', count: 42, cards: 3 },
    { status: 'completed', count: 31, cards: 2 },
    { status: 'delayed', count: 7, cards: 1 },
  ];
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {columns.map((col, ci) => (
        <div key={col.status} className="rounded-xl border border-line bg-white p-2.5 shadow-[0_1px_2px_rgb(38_44_59/0.04)]">
          <div className="flex items-center justify-between">
            <StatusPill status={col.status} />
            <span className="text-[12px] font-semibold text-ink-900 tabular-nums">{col.count}</span>
          </div>
          <div className="mt-2 space-y-1">
            {Array.from({ length: Math.min(col.cards, 2) }, (_, i) => (
              <div
                key={i}
                className="m-fade h-[7px] rounded-full bg-ink-900/[0.06]"
                style={{ width: `${88 - i * 26}%`, '--d': `${ci * 80 + i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function PerformanceVisual() {
  const top = [...employees].sort((a, b) => b.performance - a.performance).slice(0, 3);
  return (
    <div className="@container w-full">
    <div className="grid gap-3 @sm:grid-cols-[1.3fr_1fr]">
      <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
        <div className="flex items-baseline justify-between">
          <p className="text-[12px] font-semibold text-ink-900">Team score</p>
          <p className="text-[11px] text-ink-500">Last 8 weeks</p>
        </div>
        <p className="mt-1 text-[22px] font-semibold tracking-tight text-ink-900">
          91 <span className="text-[12px] font-medium text-emerald-700">+4.2</span>
        </p>
        <LineChart data={teamPerformance} min={70} max={95} height={70} color="#e246a4" gridLines={3} className="mt-2" />
      </div>
      <div className="rounded-2xl border border-line bg-white p-4 shadow-card">
        <p className="text-[12px] font-semibold text-ink-900">Top performers</p>
        <ul className="mt-3 space-y-3">
          {top.map((e, i) => (
            <li key={e.name} className="flex items-center gap-2.5">
              <Avatar name={e.name} className="size-7 text-[10px]" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-medium text-ink-900">{e.name}</p>
                <Meter value={e.performance} tone="bg-accent-pink" className="mt-1" delay={i * 120} />
              </div>
              <span className="text-[12px] font-semibold text-ink-900 tabular-nums">{e.performance}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}

/* ---------- Cards ---------- */

function FeatureCard({ icon: Icon, tone, title, copy, children, visual, wide = false, className, delay = 0 }) {
  return (
    <Reveal delay={delay} className={cn('h-full', className)}>
      <article
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-[border-color,box-shadow] duration-300 hover:border-line-strong hover:shadow-lift',
          wide && 'lg:flex-row',
        )}
      >
        <div className={cn('flex flex-col p-5 sm:p-7', wide && 'lg:w-[42%] lg:justify-center lg:pr-2')}>
          <span
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5',
              tone,
            )}
          >
            <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
          </span>
          <h3 className="mt-5 text-[19px] font-semibold tracking-[-0.02em]">{title}</h3>
          <p className="mt-2 text-[14.5px] leading-relaxed text-ink-600">{copy}</p>
          {children}
        </div>
        <Reveal
          variant="none"
          aria-hidden="true"
          className={cn(
            'relative mx-2 mb-2 flex flex-1 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,#f7f6fb,#f0eef7)] px-3 py-5 ring-1 ring-inset ring-ink-900/[0.03] sm:mx-3 sm:mb-3 sm:px-5 sm:py-7',
            wide && 'lg:my-3 lg:ml-0 lg:px-8',
          )}
        >
          {visual}
        </Reveal>
      </article>
    </Reveal>
  );
}

const MORE = [
  { label: 'Notifications', icon: Bell },
  { label: 'Reports & Analytics', icon: FileChartColumn },
  { label: 'Role-Based Access', icon: ShieldCheck },
  { label: 'Audit Trail', icon: History },
  { label: 'Cloud Access', icon: CloudCheck },
  { label: 'Mobile Friendly', icon: MonitorSmartphone },
];

export function FeatureGrid() {
  return (
    <section id="features" aria-labelledby="features-title" className="relative py-20 sm:py-32">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          icon={LayoutGrid}
          title="Everything You Need to"
          muted="Manage Your Workforce."
          description="Six core modules that share one employee record — so information entered once is available everywhere it’s needed."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          <FeatureCard
            wide
            className="md:col-span-2"
            icon={Users}
            tone="bg-brand-50 text-brand-600"
            title="Employee Management"
            copy="Keep employee profiles, roles, departments, documents, and employment information organized in one place."
            visual={<ProfileVisual />}
          >
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {['Employee Profiles', 'Departments', 'Designations', 'Roles', 'Employee Status'].map((item) => (
                <li key={item} className="inline-flex items-center gap-1 rounded-full bg-canvas px-2.5 py-1 text-[12px] font-medium text-ink-700 ring-1 ring-inset ring-line">
                  <Check aria-hidden="true" className="size-3 text-brand-600" strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </FeatureCard>

          <FeatureCard
            delay={80}
            icon={CalendarCheck2}
            tone="bg-emerald-50 text-emerald-600"
            title="Attendance Management"
            copy="Track attendance, working hours, late arrivals, absences, and daily workforce availability."
            visual={<AttendanceVisual />}
          />

          <FeatureCard
            icon={TreePalm}
            tone="bg-sky-50 text-sky-600"
            title="Leave Management"
            copy="Employees can submit leave requests while managers review and approve them from one centralized workflow."
            visual={<LeaveVisual />}
          />

          <FeatureCard
            delay={80}
            icon={Clock3}
            tone="bg-teal-50 text-teal-600"
            title="Shift Management"
            copy="Create shifts, assign schedules, and keep working hours organized across teams."
            visual={<ShiftVisual />}
          />

          <FeatureCard
            delay={160}
            icon={SquareKanban}
            tone="bg-orange-50 text-orange-600"
            title="Work Allocation"
            copy="Assign responsibilities, set deadlines, monitor progress, and improve accountability."
            visual={<WorkVisual />}
          />

          <FeatureCard
            wide
            className="md:col-span-2"
            icon={ChartSpline}
            tone="bg-pink-50 text-pink-600"
            title="Employee Performance"
            copy="Understand employee workload, completion, productivity, and performance over time."
            visual={<PerformanceVisual />}
          />

          <Reveal delay={80} className="h-full md:col-span-2 lg:col-span-1">
            <article className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-night-900 p-6 text-white sm:p-7">
              <div aria-hidden="true" className="absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(closest-side,rgb(193_58_220/0.35),transparent)]" />
              <h3 className="relative text-[19px] font-semibold tracking-[-0.02em] text-white">Built into every module</h3>
              <p className="relative mt-2 text-[14.5px] leading-relaxed text-white/65">
                The essentials that keep your workforce data connected, secure, and within reach.
              </p>
              <ul className="relative mt-6 flex flex-1 flex-wrap content-end gap-2">
                {MORE.map(({ label, icon: Icon }) => (
                  <li key={label} className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] py-2 pr-3.5 pl-3 text-[13px] font-medium ring-1 ring-white/10 ring-inset">
                    <Icon aria-hidden="true" className="size-4 text-brand-300" strokeWidth={1.75} />
                    {label}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
