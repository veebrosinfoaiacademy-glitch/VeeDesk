import {
  Building2,
  CalendarCheck2,
  ChartSpline,
  FileChartColumn,
  Layers,
  SquareKanban,
  TreePalm,
  UserRound,
} from 'lucide-react';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const STEPS = [
  { label: 'Employee', icon: UserRound, sample: 'Arjun Kumar', detail: 'Profile created' },
  { label: 'Department & Role', icon: Building2, sample: 'Design', detail: 'Senior Designer' },
  { label: 'Attendance', icon: CalendarCheck2, sample: '09:02 AM', detail: 'Checked in' },
  { label: 'Leave', icon: TreePalm, sample: '2 days', detail: 'Approved' },
  { label: 'Work Allocation', icon: SquareKanban, sample: 'Website Redesign', detail: 'In progress' },
  { label: 'Performance', icon: ChartSpline, sample: 'Score 92', detail: '+4 this month' },
  { label: 'Reports', icon: FileChartColumn, sample: 'Monthly report', detail: 'Ready to review' },
];

const PILLARS = [
  {
    title: 'One employee record',
    copy: 'Every module works from the same profile, department, and role — no duplicate data entry.',
  },
  {
    title: 'Connected workflows',
    copy: 'Attendance, leave, and work flow straight into performance tracking and reports.',
  },
  {
    title: 'Visibility for every role',
    copy: 'Admins, HR, managers, and employees each see exactly what they need.',
  },
];

const STEP_DELAY = 260;

export function SolutionSection() {
  return (
    <section id="solutions" aria-labelledby="solution-title" className="relative bg-canvas pt-10 pb-20 sm:pb-32">
      <Container>
        <SectionHeading
          id="solution-title"
          eyebrow="The VeeDesk way"
          icon={Layers}
          title="One Platform."
          muted="Your Entire Workforce."
          description="VeeDesk connects employee management, attendance, leave, work, and performance into one centralized system."
        />

        <Reveal
          variant="none"
          className="relative mt-10 overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-card sm:p-8 sm:mt-14 lg:mt-16 lg:px-10 lg:pt-12 lg:pb-10"
        >
          <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative">
            {/* Connector: vertical on mobile, horizontal on desktop */}
            <div aria-hidden="true" className="absolute top-6 bottom-6 left-6 w-px bg-line lg:hidden">
              <div className="m-grow-y absolute inset-0 bg-gradient-to-b from-brand-500 to-brand-300" style={{ '--d': '200ms' }} />
            </div>
            <div aria-hidden="true" className="absolute top-6 right-[calc(100%/14)] left-[calc(100%/14)] hidden h-px bg-line lg:block">
              <div className="m-grow absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-300" style={{ '--d': '200ms', '--dur': '2.2s' }} />
              <span className="travel-x absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-brand-500 shadow-[0_0_0_4px_rgb(106_54_208/0.15)]" style={{ '--d': '2.6s' }} />
            </div>

            <ol className="relative grid gap-5 lg:grid-cols-7 lg:gap-3">

            {STEPS.map(({ label, icon: Icon, sample, detail }, i) => (
              <li key={label} className="relative flex items-start gap-4 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                <span
                  className="m-light relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-2xl"
                  style={{ '--d': `${300 + i * STEP_DELAY}ms` }}
                >
                  <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 pt-1 lg:pt-4">
                  <p className="text-[11px] font-semibold tracking-[0.08em] text-ink-500 uppercase">
                    <span className="mr-1.5 text-ink-300 tabular-nums lg:hidden">{String(i + 1).padStart(2, '0')}</span>
                    {label}
                  </p>
                  <div
                    className="m-fade mt-1.5 inline-flex flex-wrap items-baseline gap-x-1.5 rounded-xl border border-line bg-white px-3 py-1.5 text-left shadow-[0_1px_2px_rgb(38_44_59/0.04)] lg:mt-2 lg:flex-col lg:items-center lg:py-2 lg:text-center"
                    style={{ '--d': `${450 + i * STEP_DELAY}ms` }}
                  >
                    <span className="text-[13px] font-semibold text-ink-900">{sample}</span>
                    <span className="text-[11.5px] text-ink-500">{detail}</span>
                  </div>
                </div>
              </li>
            ))}
            </ol>
          </div>

          <p className="relative mt-8 text-center text-[12.5px] text-ink-500 lg:mt-10">
            Following one employee through VeeDesk · sample data
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
          {PILLARS.map(({ title, copy }, i) => (
            <Reveal key={title} delay={i * 90} className="border-t border-line-strong pt-5">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-600">{copy}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
