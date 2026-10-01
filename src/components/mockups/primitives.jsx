import {
  Bell,
  CalendarCheck2,
  ChartSpline,
  Clock3,
  FileChartColumn,
  LayoutDashboard,
  Search,
  Settings,
  SquareKanban,
  TreePalm,
  Users,
} from 'lucide-react';
import { cn } from '../../lib';
import { Logo } from '../ui/Logo';

const AVATAR_TONES = [
  'bg-brand-100 text-brand-700',
  'bg-teal-100 text-teal-800',
  'bg-violet-100 text-violet-700',
  'bg-amber-100 text-amber-800',
  'bg-rose-100 text-rose-700',
  'bg-sky-100 text-sky-800',
  'bg-emerald-100 text-emerald-800',
  'bg-pink-100 text-pink-700',
];

export function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('');
}

export function Avatar({ name, className = 'size-7 text-[10px]' }) {
  const tone = AVATAR_TONES[[...name].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % AVATAR_TONES.length];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-semibold tracking-tight',
        tone,
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}

export const STATUS = {
  present: { label: 'Present', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
  late: { label: 'Late', dot: 'bg-amber-500', pill: 'bg-amber-50 text-amber-800 ring-amber-600/20' },
  absent: { label: 'Absent', dot: 'bg-rose-500', pill: 'bg-rose-50 text-rose-700 ring-rose-600/15' },
  leave: { label: 'On Leave', dot: 'bg-sky-500', pill: 'bg-sky-50 text-sky-700 ring-sky-600/15' },
  assigned: { label: 'Assigned', dot: 'bg-ink-400', pill: 'bg-slate-100 text-ink-700 ring-ink-500/15' },
  progress: { label: 'In Progress', dot: 'bg-brand-500', pill: 'bg-brand-50 text-brand-700 ring-brand-600/15' },
  completed: { label: 'Completed', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
  delayed: { label: 'Delayed', dot: 'bg-orange-500', pill: 'bg-orange-50 text-orange-700 ring-orange-600/15' },
  pending: { label: 'Pending', dot: 'bg-amber-500', pill: 'bg-amber-50 text-amber-800 ring-amber-600/20' },
  approved: { label: 'Approved', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
  rejected: { label: 'Rejected', dot: 'bg-rose-500', pill: 'bg-rose-50 text-rose-700 ring-rose-600/15' },
  active: { label: 'Active', dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15' },
};

export function StatusPill({ status, label, className }) {
  const s = STATUS[status];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10.5px] font-medium whitespace-nowrap ring-1 ring-inset',
        s.pill,
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', s.dot)} />
      {label ?? s.label}
    </span>
  );
}

export function Panel({ title, meta, action, className, bodyClassName, children }) {
  return (
    <div className={cn('flex min-w-0 flex-col rounded-xl border border-line bg-white', className)}>
      {(title || action) && (
        <div className="flex items-center justify-between gap-3 px-4 pt-3.5">
          <div className="min-w-0">
            <p className="truncate text-[12.5px] font-semibold text-ink-900">{title}</p>
            {meta && <p className="truncate text-[10.5px] text-ink-500">{meta}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={cn('flex-1 p-4', bodyClassName)}>{children}</div>
    </div>
  );
}

export function SampleBadge({ className, dark = false }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ring-inset',
        dark ? 'bg-white/5 text-white/60 ring-white/10' : 'bg-white text-ink-500 ring-line',
        className,
      )}
    >
      <span className={cn('size-1.5 rounded-full', dark ? 'bg-brand-300' : 'bg-brand-500')} />
      Sample data
    </span>
  );
}

const APP_NAV = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Employees', icon: Users },
  { label: 'Attendance', icon: CalendarCheck2 },
  { label: 'Leave', icon: TreePalm, badge: 6 },
  { label: 'Shifts', icon: Clock3 },
  { label: 'Work', icon: SquareKanban },
  { label: 'Performance', icon: ChartSpline },
  { label: 'Reports', icon: FileChartColumn },
];

export function AppSidebar({ active = 'Dashboard', className }) {
  return (
    <aside className={cn('w-[208px] shrink-0 flex-col border-r border-line bg-white px-3 py-4', className)}>
      <div className="px-2">
        <Logo className="h-6" height={24} alt="" />
      </div>
      <div className="mt-5 px-2 text-[10px] font-medium tracking-wide text-ink-400 uppercase">Workspace</div>
      <ul className="mt-2 space-y-0.5">
        {APP_NAV.map(({ label, icon: Icon, badge }) => (
          <li
            key={label}
            className={cn(
              'flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12.5px]',
              label === active ? 'bg-brand-50 font-medium text-brand-700' : 'text-ink-600',
            )}
          >
            <Icon className="size-4" strokeWidth={1.75} />
            <span className="flex-1">{label}</span>
            {badge && (
              <span className="rounded-full bg-amber-100 px-1.5 text-[10px] font-semibold text-amber-800">{badge}</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[12.5px] text-ink-600">
        <Settings className="size-4" strokeWidth={1.75} />
        Settings
      </div>
    </aside>
  );
}

export function AppTopbar({ title, meta, user = 'Anita Menon', className }) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <div className="min-w-0">
        <p className="truncate text-[15px] font-semibold tracking-tight text-ink-900">{title}</p>
        {meta && <p className="truncate text-[11px] text-ink-500">{meta}</p>}
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden h-8 w-48 items-center gap-2 rounded-lg border border-line bg-white px-2.5 text-[11.5px] text-ink-400 @3xl/main:flex">
          <Search className="size-3.5" />
          Search employees…
        </div>
        <span className="relative inline-flex size-8 items-center justify-center rounded-lg border border-line bg-white text-ink-600">
          <Bell className="size-3.5" />
          <span className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-orange-500 ring-2 ring-white" />
        </span>
        <Avatar name={user} className="size-8 text-[10.5px]" />
      </div>
    </div>
  );
}

/** Thin horizontal progress bar. */
export function Meter({ value, max = 100, tone = 'bg-brand-500', className, delay = 0 }) {
  return (
    <div className={cn('h-1.5 overflow-hidden rounded-full bg-ink-900/[0.06]', className)}>
      <div
        className={cn('m-grow h-full rounded-full', tone)}
        style={{ width: `${(value / max) * 100}%`, '--d': `${delay}ms` }}
      />
    </div>
  );
}
