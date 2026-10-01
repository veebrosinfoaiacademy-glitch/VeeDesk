import { site } from '../../config/site';
import { ButtonLink } from '../ui/Button';
import { Container } from '../ui/Container';
import { LogoMark } from '../ui/Logo';
import { Reveal } from '../ui/Reveal';

const CLOSING = ['One Platform.', 'One Workforce.', 'Complete Control.'];

export function CTASection() {
  return (
    <section id="get-started" aria-labelledby="cta-title" className="relative isolate overflow-hidden bg-night-950 py-28 sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,black,transparent_80%)]" />
        <div className="absolute top-1/2 left-1/2 h-[560px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(106_54_208/0.4),transparent)]" />
        {/* Two light beams echoing the V mark */}
        <div className="absolute bottom-0 left-1/2 h-[130%] w-px origin-bottom -translate-x-[18px] rotate-[-33deg] bg-gradient-to-t from-transparent via-brand-300/20 to-transparent" />
        <div className="absolute bottom-0 left-1/2 h-[130%] w-px origin-bottom translate-x-[18px] rotate-[33deg] bg-gradient-to-t from-transparent via-white/12 to-transparent" />
      </div>

      <Container className="text-center">
        <Reveal>
          <div className="relative mx-auto w-fit">
            <span aria-hidden="true" className="absolute -inset-2 rounded-[24px] bg-[linear-gradient(135deg,#8a34d6,#e2448f,#f69452)] opacity-50 blur-xl" />
            <div className="relative rounded-[20px] bg-white px-3 py-2.5 shadow-lift">
              <LogoMark className="h-10" height={40} />
            </div>
          </div>
          <h2
            id="cta-title"
            className="mx-auto mt-8 max-w-3xl text-[36px] leading-[1.05] font-semibold tracking-[-0.04em] text-white sm:text-[52px] lg:text-[64px]"
          >
            Make Employee Management Effortless.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/65 sm:text-lg">
            Bring employee data, attendance, leave, work, and performance together with VeeDesk.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 min-[420px]:flex-row min-[420px]:items-center">
            <ButtonLink href={site.links.getStarted} size="lg" variant="inverse" arrow>
              Get Started
            </ButtonLink>
            <ButtonLink href={site.links.bookDemo} size="lg" variant="ghostDark">
              Book a Demo
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal
          as="p"
          delay={150}
          className="mx-auto mt-16 flex max-w-xl flex-col items-center gap-2 border-t border-white/10 pt-8 sm:flex-row sm:justify-center sm:gap-4"
        >
          {CLOSING.map((item, i) => (
            <span key={item} className="inline-flex items-center gap-4 text-[13px] font-medium tracking-[0.12em] text-white/55 uppercase">
              {i > 0 && <span aria-hidden="true" className="hidden size-1 rounded-full bg-brand-300/70 sm:block" />}
              {item}
            </span>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
