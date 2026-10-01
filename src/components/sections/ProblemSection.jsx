import { ChartColumn, Clock3, FileSpreadsheet, FileText, MessageSquareText, TriangleAlert } from 'lucide-react';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { SwipeRow } from '../ui/SwipeRow';

function ScatteredFiles() {
  const files = [
    { name: 'employees_final_v3.xlsx', icon: FileSpreadsheet, cls: 'left-4 top-4 -rotate-3', tone: 'text-emerald-600' },
    { name: 'HR records (old).xlsx', icon: FileSpreadsheet, cls: 'right-3 top-[58px] rotate-2', tone: 'text-emerald-600' },
    { name: 'dept-list-2024.docx', icon: FileText, cls: 'left-7 bottom-3.5 -rotate-1', tone: 'text-brand-500' },
  ];
  return (
    <>
      {files.map(({ name, icon: Icon, cls, tone }) => (
        <div
          key={name}
          className={`absolute flex items-center gap-2 rounded-lg border border-line bg-white px-2.5 py-2 text-[11px] text-ink-600 shadow-sm transition-transform duration-500 group-hover:rotate-0 ${cls}`}
        >
          <Icon className={`size-4 ${tone}`} />
          {name}
        </div>
      ))}
    </>
  );
}

function SignInSheet() {
  const rows = [
    ['A. Kumar', '9:02'],
    ['R. Raj', '9:4?'],
    ['P. Sharma', '8:51'],
    ['K. S', '—'],
  ];
  return (
    <div className="absolute inset-x-5 top-4 rounded-lg border border-line bg-white p-3 shadow-sm">
      <div className="flex items-center justify-between border-b border-dashed border-line pb-1.5 text-[10px] font-medium tracking-wide text-ink-400 uppercase">
        <span>Sign-in sheet</span>
        <Clock3 className="size-3.5" />
      </div>
      <ul className="mt-1.5 space-y-1 font-mono text-[11px] text-ink-600">
        {rows.map(([name, time]) => (
          <li key={name} className="flex justify-between">
            <span>{name}</span>
            <span className={time.includes('?') || time === '—' ? 'text-orange-600' : ''}>{time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BuriedMessages() {
  return (
    <div className="absolute inset-x-5 top-4 space-y-1.5">
      <div className="w-fit rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[11px] text-ink-500 shadow-sm">
        Meeting moved to 3 pm
      </div>
      <div className="relative ml-auto w-fit rounded-xl rounded-tr-sm border border-orange-200 bg-white px-2.5 py-1.5 text-[11px] text-ink-700 shadow-sm">
        Can I take leave on Friday?
        <span className="absolute -bottom-2 left-2 inline-flex items-center gap-1 rounded-full bg-orange-50 px-1.5 py-px text-[9.5px] font-medium text-orange-700 ring-1 ring-orange-200">
          <TriangleAlert className="size-2.5" /> No reply · 3 days
        </span>
      </div>
      <div className="mt-3 w-fit rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[11px] text-ink-500 shadow-sm">
        Sent the report
      </div>
      <div className="w-fit rounded-xl rounded-tl-sm bg-white px-2.5 py-1.5 text-[11px] text-ink-500 opacity-60 shadow-sm">
        Who is on shift tomorrow?
      </div>
    </div>
  );
}

function FoggyChart() {
  const bars = [38, 62, 0, 48, 0, 70, 30];
  return (
    <div className="absolute inset-x-5 top-4 bottom-4 rounded-lg border border-line bg-white p-3 shadow-sm">
      <div className="flex h-full items-end gap-2 blur-[1.5px]">
        {bars.map((h, i) => (
          <div
            key={i}
            className={h ? 'flex-1 rounded-t-[3px] bg-ink-300/70' : 'h-[40%] flex-1 rounded-t-[3px] border border-dashed border-ink-300'}
            style={h ? { height: `${h}%` } : undefined}
          />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-ink-600 shadow-sm ring-1 ring-line">
          <ChartColumn className="size-3.5 text-ink-400" />
          Missing data this week
        </span>
      </div>
    </div>
  );
}

const PROBLEMS = [
  {
    title: 'Scattered Employee Data',
    copy: 'Employee information lives across multiple files and systems.',
    visual: ScatteredFiles,
  },
  {
    title: 'Manual Attendance',
    copy: 'Tracking attendance, working hours, and late arrivals takes unnecessary effort.',
    visual: SignInSheet,
  },
  {
    title: 'Lost Approvals',
    copy: 'Leave requests and approvals can easily get buried in messages.',
    visual: BuriedMessages,
  },
  {
    title: 'Limited Visibility',
    copy: 'Managers need a clear view of workload, productivity, and team performance.',
    visual: FoggyChart,
  },
];

/** Four lines converging into the VeeDesk mark — the hand-off into the solution. */
function Convergence() {
  return (
    <Reveal variant="none" className="relative mx-auto mt-6 flex flex-col items-center" aria-hidden="true">
      <svg viewBox="0 0 1000 150" preserveAspectRatio="none" className="m-wipe-down hidden h-[150px] w-full lg:block">
        <defs>
          <linearGradient id="converge" x1="0" y1="0" x2="0" y2="150" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c6c9d2" stopOpacity="0.6" />
            <stop offset="1" stopColor="#6a36d0" />
          </linearGradient>
        </defs>
        {[125, 375, 625, 875].map((x) => (
          <path
            key={x}
            d={`M${x},0 C${x},80 500,60 500,150`}
            fill="none"
            stroke="url(#converge)"
            strokeWidth="1.5"
            strokeDasharray="4 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="m-wipe-down h-16 w-px bg-gradient-to-b from-ink-300/0 to-brand-500 lg:hidden" />
      <div className="m-fade relative" style={{ '--d': '700ms' }}>
        <span className="animate-pulse-ring absolute inset-0 rounded-[18px] bg-brand-400/30" />
        <div className="relative rounded-[18px] bg-white px-3 py-2.5 shadow-lift ring-1 ring-brand-100">
          <LogoMark className="h-10" height={40} />
        </div>
      </div>
    </Reveal>
  );
}

export function ProblemSection() {
  return (
    <section aria-labelledby="problem-title" className="relative bg-canvas pt-20 pb-6 sm:pt-32">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <Container>
        <SectionHeading
          id="problem-title"
          eyebrow="Sound familiar?"
          icon={MessageSquareText}
          title="Managing People Shouldn’t Mean"
          muted="Managing Spreadsheets."
          description="Employee information, attendance, leave requests, tasks, and performance often end up scattered across spreadsheets, messages, and disconnected tools."
        />

        <SwipeRow label="Common problems" className="mt-10 sm:mt-14 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PROBLEMS.map(({ title, copy, visual: Visual }, i) => (
            <Reveal key={title} delay={i * 90} className="h-full">
              <article className="group h-full rounded-2xl border border-line bg-white p-2 shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift">
                <div
                  aria-hidden="true"
                  className="relative h-40 overflow-hidden rounded-xl bg-[linear-gradient(180deg,#f7f6fb,#f0eef7)] ring-1 ring-inset ring-ink-900/[0.03]"
                >
                  <Visual />
                </div>
                <div className="px-3 pt-4 pb-3">
                  <h3 className="text-[16px] font-semibold tracking-[-0.015em]">{title}</h3>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">{copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </SwipeRow>

        <Convergence />
      </Container>
    </section>
  );
}
