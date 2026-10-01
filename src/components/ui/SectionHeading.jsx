import { cn } from '../../lib';
import { Reveal } from './Reveal';

export function Eyebrow({ icon: Icon, children, dark = false, className }) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-[13px] font-medium tracking-[-0.005em]',
        dark ? 'text-brand-300' : 'text-brand-600',
        className,
      )}
    >
      {Icon && <Icon aria-hidden="true" className="size-4" strokeWidth={2} />}
      {children}
    </p>
  );
}

/**
 * Section intro: eyebrow, two-tone headline and supporting copy.
 * `muted` renders the second clause of the headline in a softer tone.
 */
export function SectionHeading({
  id,
  eyebrow,
  icon,
  title,
  muted,
  description,
  align = 'center',
  dark = false,
  as: Heading = 'h2',
  className,
}) {
  const centered = align === 'center';
  return (
    <Reveal className={cn(centered ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl', className)}>
      {eyebrow && (
        <Eyebrow icon={icon} dark={dark}>
          {eyebrow}
        </Eyebrow>
      )}
      <Heading
        id={id}
        className={cn(
          'text-[32px] leading-[1.08] font-semibold tracking-[-0.035em] sm:text-[40px] lg:text-[48px]',
          eyebrow && 'mt-4',
          dark && 'text-white',
        )}
      >
        {title}
        {muted && (
          <>
            {' '}
            <br className="hidden sm:block" />
            <span className={dark ? 'text-white/45' : 'text-ink-muted'}>{muted}</span>
          </>
        )}
      </Heading>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed sm:mt-5 sm:text-lg',
            centered && 'mx-auto max-w-2xl',
            dark ? 'text-white/65' : 'text-ink-600',
          )}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
