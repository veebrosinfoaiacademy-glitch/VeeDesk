import { Bell, CalendarCheck2, ChartSpline, Check, Clock3, SquareKanban, TrendingUp, UserRound } from 'lucide-react';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { Eyebrow } from '../ui/SectionHeading';
import { AttendanceMockup, PerformanceMockup, SelfServiceMockup, TaskMockup } from '../mockups/ShowcaseMockups';

function Callout({ icon: Icon, tone, title, text, className }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute z-10 hidden w-[250px] items-start gap-3 rounded-2xl bg-white/95 p-3.5 shadow-float backdrop-blur sm:flex',
        className,
      )}
    >
      <span className={cn('inline-flex size-8 shrink-0 items-center justify-center rounded-full', tone)}>
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[12.5px] font-semibold text-ink-900">{title}</p>
        <p className="mt-0.5 text-[11.5px] leading-snug text-ink-500">{text}</p>
      </div>
    </div>
  );
}

const ROWS = [
  {
    id: 'attendance',
    eyebrow: 'Attendance',
    icon: CalendarCheck2,
    title: 'Know Who’s Working.',
    copy: 'See who’s present, late, absent, or on leave across every team — without chasing anyone for updates.',
    bullets: ['Daily attendance and working hours', 'Late arrivals and absences highlighted', 'Availability by department and shift'],
    Mockup: AttendanceMockup,
    label:
      'Sample attendance dashboard showing 218 present, 8 absent, 10 late and 12 on leave, a check-in distribution chart, and a list of employees with check-in times and status.',
    callout: {
      icon: Clock3,
      tone: 'bg-amber-50 text-amber-600',
      title: 'Late check-in',
      text: 'Rahul Raj · Engineering · 09:41 AM',
      className: '-bottom-6 -left-5 animate-float xl:-left-10',
    },
  },
  {
    id: 'work',
    eyebrow: 'Work Allocation',
    icon: SquareKanban,
    title: 'Keep Work Moving.',
    copy: 'Assign tasks with clear owners and deadlines, then follow progress from assigned to done — without status meetings.',
    bullets: ['A clear owner and deadline on every task', 'Progress tracked from assigned to completed', 'Delayed work surfaced early'],
    Mockup: TaskMockup,
    label:
      'Sample task view: Website Redesign, assigned to Arjun Kumar in Design, deadline today, status in progress at 65 percent, with a task list and checklist.',
    callout: {
      icon: Bell,
      tone: 'bg-brand-50 text-brand-600',
      title: 'Deadline reminder',
      text: 'Website Redesign is due today',
      className: '-top-6 -right-5 animate-float-delayed xl:-right-10',
    },
  },
  {
    id: 'performance',
    eyebrow: 'Performance',
    icon: ChartSpline,
    title: 'Understand Performance.',
    copy: 'Follow completion, on-time delivery, productivity, and quality for every employee — and see how it changes over time.',
    bullets: ['Individual and team performance views', 'Trends across weeks and months', 'Reviews backed by real work data'],
    Mockup: PerformanceMockup,
    label:
      'Sample performance analytics for Priya Sharma: 27 tasks completed, 97 percent on time, 94 percent productivity, 95 percent quality, and a six-month performance trend compared with the team average.',
    callout: {
      icon: TrendingUp,
      tone: 'bg-pink-50 text-pink-600',
      title: 'Productivity up 5%',
      text: 'Priya Sharma · compared with last month',
      className: '-bottom-6 -left-5 animate-float xl:-left-10',
    },
  },
  {
    id: 'self-service',
    eyebrow: 'Self-Service',
    icon: UserRound,
    title: 'Give Employees More Control.',
    copy: 'Employees handle everyday actions on their own, from checking attendance to applying for leave and tracking the request.',
    bullets: ['View Profile', 'Check Attendance', 'Apply Leave', 'View Tasks', 'Track Requests'],
    Mockup: SelfServiceMockup,
    label:
      'Sample employee self-service portal with shortcuts to view profile, check attendance, apply leave, view tasks and track requests, a leave application form, and a list of past requests.',
    callout: {
      icon: Check,
      tone: 'bg-emerald-50 text-emerald-600',
      title: 'Request submitted',
      text: 'Casual leave · 14–15 Oct · awaiting manager review',
      className: '-top-6 -right-5 animate-float-delayed xl:-right-10',
    },
  },
];

function ShowcaseRow({ row, index }) {
  const { id, eyebrow, icon, title, copy, bullets, Mockup, label, callout } = row;
  const reverse = index % 2 === 1;
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn(
        'grid grid-cols-1 items-center gap-8 lg:gap-16',
        reverse ? 'lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]' : 'lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]',
      )}
    >
      <Reveal className={cn(reverse && 'lg:order-2')}>
        <Eyebrow icon={icon}>{eyebrow}</Eyebrow>
        <h3 id={`${id}-title`} className="mt-4 text-[30px] leading-[1.1] font-semibold tracking-[-0.035em] sm:text-[38px]">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-[16px] leading-relaxed text-ink-600 sm:text-[17px]">{copy}</p>
        <ul className={cn('mt-7 gap-x-6 gap-y-3', bullets.length > 3 ? 'grid sm:grid-cols-2' : 'space-y-3')}>
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-3 text-[14.5px] font-medium text-ink-800">
              <span className="inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100 ring-inset">
                <Check aria-hidden="true" className="size-3" strokeWidth={2.75} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={120} className={cn('relative', reverse && 'lg:order-1')}>
        <div className="relative rounded-[28px] bg-[linear-gradient(140deg,var(--color-brand-50),var(--color-canvas)_55%,#fff)] p-3 ring-1 ring-line sm:p-6 lg:p-8">
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 rounded-[28px] opacity-60 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <Callout {...callout} />
          <Reveal variant="none" role="img" aria-label={label} className="relative">
            <div aria-hidden="true">
              <Mockup />
            </div>
          </Reveal>
        </div>
      </Reveal>
    </article>
  );
}

export function FeatureShowcase() {
  return (
    <section aria-labelledby="showcase-title" className="relative pb-20 sm:pb-32">
      <h2 id="showcase-title" className="sr-only">
        A closer look at VeeDesk
      </h2>
      <Container className="space-y-20 sm:space-y-32">
        {ROWS.map((row, i) => (
          <ShowcaseRow key={row.id} row={row} index={i} />
        ))}
      </Container>
    </section>
  );
}
