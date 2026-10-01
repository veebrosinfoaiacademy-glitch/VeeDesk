import { Activity, Bell, LayoutDashboard, Users, ChartColumn } from 'lucide-react';
import { BrowserFrame } from '../ui/BrowserFrame';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import { ManagerDashboardMockup } from '../mockups/ManagerDashboardMockup';
import { SampleBadge } from '../mockups/primitives';

const PANELS = [
  { icon: Users, title: 'Team Overview', copy: 'Headcount and attendance for every department.' },
  { icon: ChartColumn, title: 'Performance', copy: 'Department scores side by side.' },
  { icon: Bell, title: 'Alerts', copy: 'Overdue tasks, late check-ins, and pending approvals.' },
  { icon: Activity, title: 'Recent Activity', copy: 'Approvals, check-ins, and task updates as they happen.' },
];

export function ManagerDashboard() {
  return (
    <section aria-labelledby="manager-title" className="relative isolate overflow-hidden bg-night-950 py-20 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent_75%)]" />
        <div className="absolute top-[-200px] left-1/2 h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(106_54_208/0.35),transparent)]" />
        <div className="absolute bottom-[-300px] left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(226_70_164/0.18),transparent)]" />
      </div>

      <Container>
        <SectionHeading
          id="manager-title"
          dark
          eyebrow="Manager dashboard"
          icon={LayoutDashboard}
          title="Everything Managers Need."
          muted="At a Glance."
          description="Attendance, approvals, workload, and performance for every team — on one screen, ready the moment you sign in."
        />
      </Container>

      <div className="relative mx-auto mt-10 max-w-[1240px] px-3 sm:mt-14 sm:px-6 lg:mt-16">
        <div aria-hidden="true" className="absolute inset-x-[10%] top-10 bottom-0 -z-10 rounded-full bg-brand-500/25 blur-[100px]" />
        <Reveal className="rounded-[22px] bg-white/[0.06] p-1.5 ring-1 ring-white/10 sm:p-2">
          <BrowserFrame
            path="dashboard / today"
            className="shadow-[0_40px_100px_-30px_rgb(0_0_0/0.6)]"
            bodyClassName="relative max-h-[760px] overflow-hidden sm:max-h-none"
          >
            <Reveal
              variant="none"
              role="img"
              aria-label="Sample manager dashboard: today's overview with 4 new employees, 218 present, 8 absent, 12 on leave, 6 pending approvals, 42 tasks in progress, 31 completed today and 7 delayed, plus team attendance by department, department performance scores, alerts, and recent activity."
            >
              <div aria-hidden="true">
                <ManagerDashboardMockup />
              </div>
            </Reveal>
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent sm:hidden" />
          </BrowserFrame>
        </Reveal>
        <div className="mt-5 flex justify-center">
          <SampleBadge dark />
        </div>
      </div>

      <Container>
        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/10 sm:mt-14 lg:grid-cols-4">
          {PANELS.map(({ icon: Icon, title, copy }, i) => (
            <Reveal as="li" key={title} delay={i * 80} className="bg-night-950 p-4 sm:p-6">
              <Icon aria-hidden="true" className="size-5 text-brand-300" strokeWidth={1.75} />
              <h3 className="mt-3 text-[14px] font-semibold text-white sm:mt-4 sm:text-[15px]">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-white/60 sm:mt-1.5 sm:text-[14px]">{copy}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
