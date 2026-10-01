import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib';

const variants = {
  primary:
    'bg-brand-600 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_1px_2px_rgb(90_45_181/0.35),0_8px_20px_-6px_rgb(106_54_208/0.55)] hover:bg-brand-700',
  secondary:
    'bg-white text-ink-900 ring-1 ring-inset ring-line-strong shadow-[0_1px_2px_rgb(38_44_59/0.05)] hover:bg-canvas hover:ring-ink-300',
  inverse:
    'bg-white text-ink-900 shadow-[0_1px_2px_rgb(0_0_0/0.2),0_8px_24px_-8px_rgb(196_173_250/0.55)] hover:bg-brand-50',
  ghostDark: 'bg-white/[0.06] text-white ring-1 ring-inset ring-white/15 hover:bg-white/[0.1] hover:ring-white/25',
};

const sizes = {
  sm: 'h-9 px-4 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-12 px-6 text-[15px] gap-2',
};

export function ButtonLink({ href, variant = 'primary', size = 'md', arrow = false, className, children, ...props }) {
  return (
    <a
      href={href}
      className={cn(
        'group inline-flex shrink-0 items-center justify-center rounded-full font-medium whitespace-nowrap transition-[background-color,box-shadow,color,transform] duration-200 active:scale-[0.98]',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      )}
    </a>
  );
}
