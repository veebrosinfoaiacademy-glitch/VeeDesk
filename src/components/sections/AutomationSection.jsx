import {
  Bell,
  BellRing,
  CalendarClock,
  CircleCheck,
  ClipboardCheck,
  Clock3,
  Mail,
  MessageCircle,
  MessageSquareText,
  MonitorSmartphone,
  SquareKanban,
  TreePalm,
  TriangleAlert,
  Zap,
} from 'lucide-react';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SwipeRow } from '../ui/SwipeRow';

const FLOWS = [
  {
    title: 'Leave approvals',
    steps: [
      { label: 'Leave Request', text: 'Rahul Raj requested casual leave for 14–15 Oct', icon: TreePalm, tone: 'bg-sky-50 text-sky-600', time: '09:12' },
      { label: 'Manager Notification', text: 'Priya Sharma: 1 leave request needs your review', icon: Bell, tone: 'bg-brand-50 text-brand-600', time: '09:12', channels: ['In-App', 'Email'] },
      { label: 'Approval', text: 'Approved by Priya Sharma', icon: CircleCheck, tone: 'bg-emerald-50 text-emerald-600', time: '09:40' },
      { label: 'Employee Notification', text: 'Rahul Raj: your leave for 14–15 Oct is approved', icon: BellRing, tone: 'bg-brand-50 text-brand-600', time: '09:40', channels: ['In-App', 'WhatsApp'] },
    ],
  },
  {
    title: 'Task follow-ups',
    steps: [
      { label: 'Task Assigned', text: 'Website Redesign assigned to Arjun Kumar', icon: SquareKanban, tone: 'bg-orange-50 text-orange-600', time: 'Mon' },
      { label: 'Employee Notification', text: 'Arjun Kumar: new task, due Thursday', icon: BellRing, tone: 'bg-brand-50 text-brand-600', time: 'Mon', channels: ['In-App', 'Email'] },
      { label: 'Deadline Reminder', text: 'Website Redesign is due in 3 hours', icon: CalendarClock, tone: 'bg-amber-50 text-amber-600', time: 'Thu', channels: ['In-App', 'SMS'] },
      { label: 'Completion Update', text: 'Manager notified: Website Redesign completed', icon: ClipboardCheck, tone: 'bg-emerald-50 text-emerald-600', time: 'Thu' },
    ],
  },
  {
    title: 'Attendance alerts',
    steps: [
      { label: 'Attendance Issue', text: 'Rahul Raj hasn’t checked in for the 09:00 shift', icon: Clock3, tone: 'bg-amber-50 text-amber-600', time: '09:15' },
      { label: 'Manager Alert', text: '3 late check-ins in Engineering this morning', icon: TriangleAlert, tone: 'bg-orange-50 text-orange-600', time: '09:15', channels: ['In-App', 'Email'] },
    ],
  },
];

const CHANNELS = [
  { label: 'In-App', icon: MonitorSmartphone },
  { label: 'Email', icon: Mail },
  { label: 'WhatsApp', icon: MessageCircle },
  { label: 'SMS', icon: MessageSquareText },
];

function Step({ step, index, last }) {
  const { label, text, icon: Icon, tone, time, channels } = step;
  return (
    <li className="relative flex gap-3.5 pb-5 last:pb-0">
      {!last && <span aria-hidden="true" className="absolute top-10 bottom-1 left-[17px] w-px bg-line" />}
      <span className={cn('relative z-10 inline-flex size-9 shrink-0 items-center justify-center rounded-xl ring-4 ring-white', tone)}>
        <Icon aria-hidden="true" className="size-4" strokeWidth={1.9} />
      </span>
      <div
        className="m-fade min-w-0 flex-1 rounded-xl border border-line bg-white px-3.5 py-3 shadow-[0_1px_2px_rgb(38_44_59/0.04)]"
        style={{ '--d': `${index * 220}ms` }}
      >
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[11px] font-semibold tracking-[0.06em] text-ink-500 uppercase">{label}</p>
          <span className="text-[11px] text-ink-500 tabular-nums">{time}</span>
        </div>
        <p className="mt-1 text-[13.5px] leading-snug text-ink-800">{text}</p>
        {channels && (
          <div className="mt-2 flex gap-1.5">
            {channels.map((c) => (
              <span key={c} className="rounded-md bg-canvas px-1.5 py-0.5 text-[10.5px] font-medium text-ink-600 ring-1 ring-line ring-inset">
                {c}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

function FlowCard({ flow, delay, children }) {
  return (
    <Reveal delay={delay} className="h-full">
      <Reveal variant="none" className="relative h-full rounded-3xl border border-line bg-canvas/70 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{flow.title}</h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-ink-500 ring-1 ring-line ring-inset">
            <Zap aria-hidden="true" className="size-3 text-brand-500" /> Example flow
          </span>
        </div>
        <ol className="mt-5" aria-label={`${flow.title} steps`}>
          {flow.steps.map((step, i) => (
            <Step key={step.label} step={step} index={i} last={i === flow.steps.length - 1} />
          ))}
        </ol>
        {children}
      </Reveal>
    </Reveal>
  );
}

export function AutomationSection() {
  return (
    <section aria-labelledby="automation-title" className="relative py-20 sm:py-32">
      <Container>
        <SectionHeading
          id="automation-title"
          eyebrow="Notifications & follow-ups"
          icon={Zap}
          title="Let VeeDesk Handle"
          muted="the Follow-Ups."
          description="Requests, reminders, and alerts reach the right people at the right moment — so nothing waits on someone remembering to send a message."
        />

        <SwipeRow label="Example notification flows" className="mt-10 sm:mt-14 sm:grid-cols-1 lg:mt-16 lg:grid-cols-3">
          <FlowCard flow={FLOWS[0]} delay={0} />
          <FlowCard flow={FLOWS[1]} delay={90} />
          <FlowCard flow={FLOWS[2]} delay={180}>
            <div className="mt-6 rounded-2xl border border-line bg-white p-4">
              <p className="text-[13px] font-semibold text-ink-900">Notification channels</p>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {CHANNELS.map(({ label, icon: Icon }) => (
                  <li key={label} className="flex items-center gap-2 rounded-xl bg-canvas px-3 py-2.5 text-[13px] font-medium text-ink-800">
                    <Icon aria-hidden="true" className="size-4 text-brand-600" strokeWidth={1.75} />
                    {label}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-[12px] leading-relaxed text-ink-500">
                Flows shown are examples. Email, WhatsApp, and SMS delivery depend on the integrations set up for your
                workspace.
              </p>
            </div>
          </FlowCard>
        </SwipeRow>
      </Container>
    </section>
  );
}
