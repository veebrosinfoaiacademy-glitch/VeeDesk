import logo138 from '../../assets/veedesk-logo-138w.webp';
import logo277 from '../../assets/veedesk-logo-277w.webp';
import logo492 from '../../assets/veedesk-logo-492w.webp';
import mark32 from '../../assets/veedesk-mark-32w.webp';
import mark64 from '../../assets/veedesk-mark-64w.webp';
import mark128 from '../../assets/veedesk-mark-128w.webp';
import mark213 from '../../assets/veedesk-mark-213w.webp';
import { cn } from '../../lib';

// Width / height of the trimmed artwork, used to derive `sizes` from the display height.
const LOGO_RATIO = 3.8466;
const MARK_RATIO = 1.3315;
const LOGO_SRCSET = `${logo138} 138w, ${logo277} 277w, ${logo492} 492w`;
const MARK_SRCSET = `${mark32} 32w, ${mark64} 64w, ${mark128} 128w, ${mark213} 213w`;

/**
 * The "V + people" symbol on its own — for small spaces and app chrome.
 * `height` is the largest rendered height in px (it picks the right file).
 */
export function LogoMark({ className, height = 40, alt = '' }) {
  return (
    <img
      src={mark64}
      srcSet={MARK_SRCSET}
      sizes={`${Math.ceil(height * MARK_RATIO)}px`}
      alt={alt}
      width={213}
      height={160}
      decoding="async"
      className={cn('w-auto object-contain', className)}
    />
  );
}

/** Full VeeDesk logo (symbol + wordmark). Set the height via `className`; width follows the artwork. */
export function Logo({ className = 'h-8', height = 36, alt = 'VeeDesk', priority = false }) {
  return (
    <img
      src={logo277}
      srcSet={LOGO_SRCSET}
      sizes={`${Math.ceil(height * LOGO_RATIO)}px`}
      alt={alt}
      width={492}
      height={128}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : undefined}
      className={cn('w-auto', className)}
    />
  );
}
