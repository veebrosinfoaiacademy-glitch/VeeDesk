import { CalendarCheck2, CircleCheck } from 'lucide-react';
import { site } from '../../config/site';
import { ButtonLink } from '../ui/Button';
import { BrowserFrame } from '../ui/BrowserFrame';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';
import { DashboardPreview } from '../mockups/DashboardPreview';
import { Avatar } from '../mockups/primitives';

const VALUE_LINE = ['Employees', 'Attendance', 'Leave', 'Work', 'Performance', 'Analytics'];

function FloatingCard({ className, children }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute z-10 hidden w-[264px] rounded-2xl bg-white/95 p-3.5 shadow-float backdrop-blur xl:block ${className}`}
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 sm:pt-36 lg:pt-40">
      {/* Background: soft brand glow + masked grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black_30%,transparent_75%)]" />
        <div className="absolute top-[-280px] left-1/2 h-[640px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(132_86_234/0.22),transparent)]" />
        <div className="absolute top-[340px] left-1/2 h-[700px] w-[1400px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(106_54_208/0.10),transparent)]" />
      </div>

      <Container className="text-center">
        <p
          className="hero-in mx-auto inline-flex items-center gap-2 rounded-full border border-ink-900/[0.08] bg-white/70 py-1 pr-3.5 pl-1 text-[13px] font-medium text-ink-700 shadow-[0_1px_2px_rgb(38_44_59/0.04)] backdrop-blur"
          style={{ '--d': '0ms' }}
        >
          <LogoMark className="h-[18px]" height={18} />
          {site.tagline}
        </p>

        <h1
          id="hero-title"
          className="hero-in mx-auto mt-7 max-w-4xl text-[38px] leading-[1.04] font-semibold tracking-[-0.045em] min-[400px]:text-[42px] sm:text-6xl lg:text-[76px]"
          style={{ '--d': '80ms' }}
        >
          Manage Your Employees.
          <br />
          <span className="text-gradient-brand">Simplify Your Workplace.</span>
        </h1>

        <p
          className="hero-in mx-auto mt-6 max-w-[42rem] text-[17px] text-balance leading-relaxed text-ink-600 sm:text-xl sm:leading-relaxed"
          style={{ '--d': '160ms' }}
        >
          VeeDesk is a complete employee management platform for attendance, leave, work allocation, performance, and
          workforce analytics — all in one place.
        </p>

        <div
          className="hero-in mt-8 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center"
          style={{ '--d': '240ms' }}
        >
          <ButtonLink href={site.links.getStarted} size="lg" arrow>
            Get Started
          </ButtonLink>
          <ButtonLink href={site.links.bookDemo} size="lg" variant="secondary">
            Book a Demo
          </ButtonLink>
        </div>

        <p
          className="hero-in mx-auto mt-7 flex max-w-md flex-wrap justify-center gap-x-2 gap-y-1 text-[13px] text-ink-500 sm:max-w-none"
          style={{ '--d': '320ms' }}
        >
          {VALUE_LINE.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-ink-300">
                  •
                </span>
              )}
              {item}
            </span>
          ))}
        </p>
      </Container>

      {/* Product visual */}
      <div className="relative mx-auto mt-12 max-w-[1240px] px-3 sm:mt-20 sm:px-6">
        <div className="frame-in relative" style={{ '--d': '300ms' }}>
          <FloatingCard className="top-[58%] animate-float xl:-left-10 2xl:-left-20">
            <div className="flex items-start gap-3">
              <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <CircleCheck className="size-4.5" />
              </span>
              <div className="min-w-0 text-left">
                <p className="text-[12.5px] font-semibold text-ink-900">Leave approved</p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-ink-500">
                  Priya Sharma · Casual leave · 2 days
                </p>
              </div>
              <span className="text-[10px] text-ink-400">now</span>
            </div>
          </FloatingCard>

          <FloatingCard className="top-[66%] animate-float-delayed xl:-right-10 2xl:-right-20">
            <div className="flex items-center gap-3">
              <Avatar name="Arjun Kumar" className="size-8 text-[11px]" />
              <div className="min-w-0 flex-1 text-left">
                <p className="text-[12.5px] font-semibold text-ink-900">Arjun Kumar</p>
                <p className="text-[11.5px] text-ink-500">Design · Senior Designer</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-canvas px-3 py-2">
              <span className="inline-flex items-center gap-1.5 text-[11.5px] text-ink-600">
                <CalendarCheck2 className="size-3.5 text-emerald-600" />
                Checked in
              </span>
              <span className="text-[12px] font-semibold text-ink-900 tabular-nums">09:02 AM</span>
            </div>
          </FloatingCard>

          <div className="rounded-[22px] bg-white/50 p-1.5 ring-1 ring-ink-900/[0.06] backdrop-blur sm:p-2">
            <Reveal variant="none" rootMargin="0px">
              <BrowserFrame
                path="dashboard"
                bodyClassName="relative max-h-[540px] overflow-hidden sm:max-h-[700px] lg:max-h-[760px]"
              >
                <div role="img" aria-label="Sample VeeDesk dashboard showing 248 employees, 218 present today, 12 on leave, 18 pending tasks, a team performance chart, weekly task completion, recent activity, and an employee status table.">
                  <div aria-hidden="true">
                    <DashboardPreview />
                  </div>
                </div>
              </BrowserFrame>
            </Reveal>
          </div>
        </div>
        {/* Fade the bottom of the product shot into the page */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-64 bottom-0 z-20 h-56 bg-gradient-to-t from-white from-15% via-white/85 to-transparent"
        />
      </div>
    </section>
  );
}
