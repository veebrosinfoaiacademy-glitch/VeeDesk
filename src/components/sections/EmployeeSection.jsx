import {
  Bell,
  CalendarCheck2,
  Check,
  Clock3,
  House,
  IdCard,
  ListChecks,
  Smartphone,
  TreePalm,
  UserRound,
} from 'lucide-react';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SwipeRow } from '../ui/SwipeRow';
import { Avatar, Meter, StatusPill } from '../mockups/primitives';

function SelfCard({ icon: Icon, tone, title, children, delay }) {
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group h-full rounded-2xl border border-line bg-white p-4 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-lift">
        <div className="flex items-center gap-2.5">
          <span className={cn('inline-flex size-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105', tone)}>
            <Icon aria-hidden="true" className="size-4" strokeWidth={1.9} />
          </span>
          <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
        </div>
        <div className="mt-3.5">{children}</div>
      </article>
    </Reveal>
  );
}

function ProfileCard({ delay }) {
  return (
    <SelfCard icon={IdCard} tone="bg-brand-50 text-brand-600" title="My Profile" delay={delay}>
      <div className="flex items-center gap-3 rounded-xl bg-canvas p-2.5">
        <Avatar name="Arjun Kumar" className="size-9 text-[12px]" />
        <div className="min-w-0">
          <p className="text-[13px] font-semibold text-ink-900">Arjun Kumar</p>
          <p className="text-[11.5px] text-ink-500">Senior Designer · VD-0142</p>
        </div>
      </div>
    </SelfCard>
  );
}

function AttendanceCard({ delay }) {
  // 22 working days: one late arrival, one leave day
  const days = Array.from({ length: 22 }, (_, i) => (i === 7 ? 'late' : i === 15 ? 'leave' : 'present'));
  return (
    <SelfCard icon={CalendarCheck2} tone="bg-emerald-50 text-emerald-600" title="My Attendance" delay={delay}>
      <div className="flex items-baseline justify-between">
        <p className="text-[13px] text-ink-600">
          <span className="text-[18px] font-semibold text-ink-900">21</span> of 22 days
        </p>
        <span className="text-[11px] text-ink-500">This month</span>
      </div>
      <div className="mt-2.5 grid grid-cols-11 gap-1">
        {days.map((d, i) => (
          <span
            key={i}
            className={cn('h-3 rounded-[3px]', { present: 'bg-emerald-400', late: 'bg-amber-400', leave: 'bg-sky-400' }[d])}
          />
        ))}
      </div>
    </SelfCard>
  );
}

function LeaveCard({ delay }) {
  return (
    <SelfCard icon={TreePalm} tone="bg-sky-50 text-sky-600" title="My Leave" delay={delay}>
      <div className="flex items-center justify-between rounded-xl bg-canvas px-3 py-2.5">
        <div>
          <p className="text-[12.5px] font-medium text-ink-900">Casual leave</p>
          <p className="text-[11px] text-ink-500">14–15 Oct · 2 days</p>
        </div>
        <StatusPill status="pending" />
      </div>
    </SelfCard>
  );
}

function TasksCard({ delay }) {
  const tasks = [
    { title: 'Website Redesign', due: 'Today', done: false, urgent: true },
    { title: 'Design review', due: 'Thu', done: false },
    { title: 'Icon set update', due: 'Done', done: true },
  ];
  return (
    <SelfCard icon={ListChecks} tone="bg-orange-50 text-orange-600" title="My Tasks" delay={delay}>
      <ul className="space-y-1.5">
        {tasks.map((t) => (
          <li key={t.title} className="flex items-center gap-2.5 rounded-lg px-1 py-1 text-[12.5px]">
            <span
              className={cn(
                'inline-flex size-4 items-center justify-center rounded-[5px]',
                t.done ? 'bg-emerald-500 text-white' : 'ring-1 ring-ink-300 ring-inset',
              )}
            >
              {t.done && <Check aria-hidden="true" className="size-3" strokeWidth={3} />}
            </span>
            <span className={cn('flex-1', t.done ? 'text-ink-500 line-through' : 'text-ink-800')}>{t.title}</span>
            <span className={cn('text-[11px]', t.urgent ? 'font-medium text-orange-700' : 'text-ink-500')}>{t.due}</span>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-500">
        <Meter value={65} className="flex-1" />
        65% of this week
      </div>
    </SelfCard>
  );
}

function NotificationsCard({ delay }) {
  const items = [
    { text: 'Your leave request was sent to your manager', time: '2m', dot: 'bg-brand-500' },
    { text: 'Reminder: Website Redesign is due today', time: '1h', dot: 'bg-orange-500' },
    { text: 'Shift updated to General · 09:00–18:00', time: 'Mon', dot: 'bg-ink-300' },
  ];
  return (
    <SelfCard icon={Bell} tone="bg-brand-50 text-brand-600" title="My Notifications" delay={delay}>
      <ul className="space-y-2">
        {items.map((n) => (
          <li key={n.text} className="flex items-start gap-2.5 text-[12px] leading-snug text-ink-700">
            <span className={cn('mt-1.5 size-1.5 shrink-0 rounded-full', n.dot)} />
            <span className="flex-1">{n.text}</span>
            <span className="text-[10.5px] text-ink-500">{n.time}</span>
          </li>
        ))}
      </ul>
    </SelfCard>
  );
}

function PhoneMockup() {
  const actions = [
    { label: 'Attendance', icon: CalendarCheck2, tone: 'bg-emerald-50 text-emerald-600' },
    { label: 'Apply Leave', icon: TreePalm, tone: 'bg-sky-50 text-sky-600' },
    { label: 'My Tasks', icon: ListChecks, tone: 'bg-orange-50 text-orange-600' },
    { label: 'Requests', icon: Clock3, tone: 'bg-brand-50 text-brand-600' },
  ];
  return (
    <div
      role="img"
      aria-label="Sample VeeDesk employee app on a phone: check-in status for the general shift, shortcuts for attendance, leave, tasks and requests, and the latest notification."
      className="relative mx-auto w-[272px] shrink-0"
    >
      <div aria-hidden="true" className="absolute inset-x-6 -bottom-6 h-16 rounded-full bg-night-900/25 blur-2xl" />
      <div aria-hidden="true" className="relative rounded-[44px] bg-night-950 p-2.5 shadow-[0_0_0_1px_rgb(255_255_255/0.08)_inset,0_30px_60px_-20px_rgb(38_44_59/0.5)]">
        <div className="relative h-[556px] overflow-hidden rounded-[36px] bg-canvas">
          {/* status bar + island */}
          <div className="flex items-center justify-between px-6 pt-3 text-[10.5px] font-semibold text-ink-900">
            <span>9:41</span>
            <span className="absolute top-2.5 left-1/2 h-[22px] w-[84px] -translate-x-1/2 rounded-full bg-night-950" />
            <span className="flex items-center gap-1">
              <span className="h-2 w-3 rounded-[2px] bg-ink-900" />
              <span className="h-2 w-4 rounded-[3px] border border-ink-900" />
            </span>
          </div>

          <div className="px-4 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] text-ink-500">Good morning,</p>
                <p className="text-[17px] font-semibold tracking-tight text-ink-900">Arjun Kumar</p>
              </div>
              <Avatar name="Arjun Kumar" className="size-9 text-[12px]" />
            </div>

            <div className="relative mt-4 overflow-hidden rounded-2xl bg-[linear-gradient(135deg,#5a2db5,#8a34d6_60%,#c13adc)] p-4 text-white">
              <div className="absolute -top-10 -right-10 size-32 rounded-full bg-[radial-gradient(closest-side,rgb(246_148_82/0.55),transparent)]" />
              <p className="relative text-[10.5px] text-white/60">General shift · 09:00–18:00</p>
              <p className="relative mt-1 text-[15px] font-semibold">Checked in at 09:02</p>
              <div className="relative mt-3 h-1.5 rounded-full bg-white/15">
                <div className="h-full w-[46%] rounded-full bg-white" />
              </div>
              <div className="relative mt-1.5 flex justify-between text-[10px] text-white/55">
                <span>4h 12m worked</span>
                <span>Ends 18:00</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {actions.map(({ label, icon: Icon, tone }) => (
                <div key={label} className="flex items-center gap-2 rounded-xl bg-white p-2.5 shadow-[0_1px_2px_rgb(38_44_59/0.05)] ring-1 ring-line ring-inset">
                  <span className={cn('inline-flex size-7 items-center justify-center rounded-lg', tone)}>
                    <Icon className="size-3.5" />
                  </span>
                  <span className="text-[11px] font-medium text-ink-800">{label}</span>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] font-semibold text-ink-900">Today</p>
            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 ring-1 ring-line ring-inset">
                <span className="size-1.5 rounded-full bg-orange-500" />
                <span className="flex-1 text-[11px] text-ink-800">Website Redesign</span>
                <span className="text-[10px] font-medium text-orange-700">Due today</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl bg-white p-2.5 ring-1 ring-line ring-inset">
                <span className="size-1.5 rounded-full bg-amber-500" />
                <span className="flex-1 text-[11px] text-ink-800">Leave · 14–15 Oct</span>
                <span className="text-[10px] font-medium text-amber-800">Pending</span>
              </div>
            </div>
          </div>

          {/* tab bar */}
          <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-white/90 px-4 pt-2.5 pb-5 backdrop-blur">
            {[House, CalendarCheck2, TreePalm, ListChecks, UserRound].map((Icon, i) => (
              <Icon key={i} className={cn('size-[18px]', i === 0 ? 'text-brand-600' : 'text-ink-400')} strokeWidth={1.9} />
            ))}
          </div>

          {/* incoming notification */}
          <div className="absolute inset-x-3 top-10 rounded-2xl bg-white/95 p-3 shadow-float backdrop-blur animate-float">
            <div className="flex items-start gap-2.5">
              <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Check className="size-3.5" strokeWidth={2.5} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-semibold text-ink-900">Leave request sent</p>
                <p className="text-[10.5px] leading-snug text-ink-500">Casual leave · 14–15 Oct is with your manager.</p>
              </div>
              <span className="text-[9.5px] text-ink-400">now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmployeeSection() {
  return (
    <section id="employees" aria-labelledby="employees-title" className="relative overflow-hidden bg-canvas py-20 sm:py-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(132_86_234/0.12),transparent)]" />
      <Container className="relative">
        <SectionHeading
          id="employees-title"
          eyebrow="Employee self-service"
          icon={Smartphone}
          title="Empower Employees"
          muted="With Self-Service."
          description="Give employees access to the information and everyday actions they need without making HR handle every small request."
        />

        <div className="mt-10 grid grid-cols-1 items-center gap-5 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
          <div className="order-2 hidden space-y-5 sm:block lg:order-1">
            <ProfileCard delay={0} />
            <AttendanceCard delay={80} />
            <LeaveCard delay={160} />
          </div>
          <Reveal className="order-1 sm:col-span-2 sm:mb-6 lg:order-2 lg:col-span-1 lg:mb-0">
            <PhoneMockup />
          </Reveal>
          <div className="order-3 hidden space-y-5 sm:block">
            <TasksCard delay={120} />
            <NotificationsCard delay={200} />
          </div>
        </div>

        {/* Phones: the five cards as a swipeable row under the phone */}
        <div className="mt-10 sm:hidden">
          <SwipeRow label="Employee self-service features">
            <ProfileCard delay={0} />
            <AttendanceCard delay={0} />
            <LeaveCard delay={0} />
            <TasksCard delay={0} />
            <NotificationsCard delay={0} />
          </SwipeRow>
        </div>
      </Container>
    </section>
  );
}
