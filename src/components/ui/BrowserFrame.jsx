import { Lock } from 'lucide-react';
import { cn } from '../../lib';

/** Desktop-app window chrome used around product mockups. */
export function BrowserFrame({ path = 'dashboard', className, bodyClassName, children }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl bg-white shadow-frame', className)}>
      <div className="flex h-10 items-center gap-3 border-b border-line bg-white px-4">
        <div className="flex w-12 gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-ink-300/80" />
          <span className="size-2.5 rounded-full bg-ink-300/80" />
          <span className="size-2.5 rounded-full bg-ink-300/80" />
        </div>
        <div className="mx-auto flex h-6 min-w-0 max-w-xs flex-1 items-center justify-center gap-1.5 rounded-md bg-canvas px-3 text-[11px] text-ink-500">
          <Lock aria-hidden="true" className="size-3 shrink-0" />
          <span className="truncate">
            <span className="text-ink-700">veedesk</span> / {path}
          </span>
        </div>
        <div className="w-12" aria-hidden="true" />
      </div>
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
