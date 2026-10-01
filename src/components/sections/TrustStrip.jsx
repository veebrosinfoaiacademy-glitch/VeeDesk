import { CalendarCheck2, ChartSpline, FileChartColumn, SquareKanban, TreePalm, Users } from 'lucide-react';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

const CHIPS = [
  { label: 'Employee Management', icon: Users },
  { label: 'Attendance', icon: CalendarCheck2 },
  { label: 'Leave Management', icon: TreePalm },
  { label: 'Work Allocation', icon: SquareKanban },
  { label: 'Performance', icon: ChartSpline },
  { label: 'Reports', icon: FileChartColumn },
];

export function TrustStrip() {
  return (
    <section aria-labelledby="trust-title" className="relative pt-6 pb-20 sm:pb-24">
      <Container>
        <Reveal className="text-center">
          <h2 id="trust-title" className="text-[15px] font-medium tracking-[-0.01em] text-ink-500">
            Everything your team needs to stay organized.
          </h2>
          <ul className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-2 sm:gap-2.5">
            {CHIPS.map(({ label, icon: Icon }, i) => (
              <li
                key={label}
                className="m-fade inline-flex items-center gap-2 rounded-full border border-line bg-white py-1.5 pr-3.5 pl-2 text-[13.5px] font-medium text-ink-700 shadow-[0_1px_2px_rgb(38_44_59/0.04)]"
                style={{ '--d': `${150 + i * 60}ms` }}
              >
                <span className="inline-flex size-6 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                  <Icon aria-hidden="true" className="size-3.5" strokeWidth={2} />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
