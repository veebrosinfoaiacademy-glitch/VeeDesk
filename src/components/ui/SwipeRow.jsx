import { Children, useRef, useState } from 'react';
import { cn } from '../../lib';

/**
 * Phones: a horizontal, scroll-snapping row with position dots.
 * From `sm` up: a regular grid — pass the grid columns via `className`.
 * `itemClassName` may be a string or a function of the item index.
 */
export function SwipeRow({ children, label, className, itemClassName }) {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  const items = Children.toArray(children);

  const onScroll = () => {
    const el = ref.current;
    const first = el?.firstElementChild;
    if (!first) return;
    const step = first.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || '0');
    setIndex(Math.min(items.length - 1, Math.round(el.scrollLeft / step)));
  };

  return (
    <div>
      <ul
        ref={ref}
        onScroll={onScroll}
        aria-label={label}
        className={cn(
          'swipe-row scrollbar-none -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto px-5 pb-1',
          'sm:mx-0 sm:grid sm:snap-none sm:gap-4 sm:overflow-visible sm:px-0 sm:pb-0',
          className,
        )}
      >
        {items.map((child, i) => (
          <li
            key={i}
            className={cn(
              'w-[84%] max-w-[340px] shrink-0 snap-start sm:w-auto sm:max-w-none',
              typeof itemClassName === 'function' ? itemClassName(i) : itemClassName,
            )}
          >
            {child}
          </li>
        ))}
      </ul>
      <div aria-hidden="true" className="mt-5 flex justify-center gap-1.5 sm:hidden">
        {items.map((_, i) => (
          <span
            key={i}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              i === index ? 'w-5 bg-brand-600' : 'w-1.5 bg-ink-300',
            )}
          />
        ))}
      </div>
    </div>
  );
}
