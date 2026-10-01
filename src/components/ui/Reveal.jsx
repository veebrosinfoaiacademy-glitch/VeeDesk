import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib';

/**
 * Adds `.is-visible` once the element scrolls into view.
 * - variant="up"   fades and rises the element itself
 * - variant="none" only triggers child `.m-*` animations (charts, bars, lines)
 */
export function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, rootMargin, className, style, children, ...props }) {
  const [ref, inView] = useInView(rootMargin ? { rootMargin } : undefined);
  return (
    <Tag
      ref={ref}
      className={cn(variant === 'up' && 'reveal', inView && 'is-visible', className)}
      style={{ '--d': `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}
