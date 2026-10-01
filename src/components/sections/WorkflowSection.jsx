import {
  Building2,
  CalendarCheck2,
  ChartSpline,
  FileChartColumn,
  Route,
  SquareKanban,
  TreePalm,
  UserPlus,
} from 'lucide-react';
import { site } from '../../config/site';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const STEPS = [
  { title: 'Add Employee', copy: 'Create a profile with personal, job, and employment details.', icon: UserPlus },
  { title: 'Assign Department & Role', copy: 'Place employees in departments, set designations, and define access.', icon: Building2 },
  { title: 'Track Attendance', copy: 'Record daily attendance, working hours, and late arrivals.', icon: CalendarCheck2 },
  { title: 'Manage Leave', copy: 'Handle leave requests and approvals in one workflow.', icon: TreePalm },
  { title: 'Allocate Work', copy: 'Assign tasks with owners, deadlines, and a clear status.', icon: SquareKanban },
  { title: 'Track Performance', copy: 'Follow completion, on-time delivery, and productivity.', icon: ChartSpline },
  { title: 'Analyze Reports', copy: 'Turn workforce data into reports for every team.', icon: FileChartColumn },
];

export function WorkflowSection() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="relative py-20 sm:py-32">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            id="how-title"
            align="left"
            eyebrow="How it works"
            icon={Route}
            title="From Employee Onboarding"
            muted="to Performance."
            description="Seven steps take a new hire from their first day to the reports that help you plan ahead."
          />
          <Reveal delay={120} className="mt-8 hidden lg:block">
            <ButtonLink href={site.links.getStarted} arrow>
              Get Started
            </ButtonLink>
          </Reveal>
        </div>

        <ol className="relative">
          {STEPS.map(({ title, copy, icon: Icon }, i) => {
            const last = i === STEPS.length - 1;
            return (
              <Reveal
                as="li"
                key={title}
                variant="none"
                rootMargin="0px 0px -30% 0px"
                className="relative grid grid-cols-[44px_minmax(0,1fr)] gap-4 pb-4 last:pb-0 sm:gap-6"
              >
                {!last && (
                  <span aria-hidden="true" className="absolute top-12 bottom-0 left-[21.5px] w-px bg-line">
                    <span className="m-grow-y absolute inset-0 bg-brand-500" style={{ '--d': '300ms', '--dur': '1.2s' }} />
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className="m-light relative z-10 inline-flex size-11 items-center justify-center rounded-full text-[13px] font-semibold tabular-nums"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="m-fade">
                <div className="group flex items-start gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-[box-shadow,border-color] duration-300 hover:border-brand-200 hover:shadow-lift">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[16.5px] font-semibold tracking-[-0.015em]">
                      <span className="sr-only">Step {i + 1}: </span>
                      {title}
                    </h3>
                    <p className="mt-1 text-[14px] leading-relaxed text-ink-600">{copy}</p>
                  </div>
                  <span className="hidden size-10 shrink-0 items-center justify-center rounded-xl bg-canvas text-ink-500 transition-colors duration-300 group-hover:bg-brand-50 group-hover:text-brand-600 sm:inline-flex">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                  </span>
                </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
