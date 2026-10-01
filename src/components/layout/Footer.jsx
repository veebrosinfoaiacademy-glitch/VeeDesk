import { footerColumns, site } from '../../config/site';
import { Container } from '../ui/Container';
import { Logo } from '../ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-white" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">
        Footer
      </h2>
      <Container className="grid grid-cols-1 gap-12 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,2fr)]">
        <div>
          <Logo className="h-9" height={36} />
          <p className="mt-4 text-[15px] font-medium text-ink-900">{site.tagline}</p>
          <p className="mt-2 max-w-xs text-[14px] leading-relaxed text-ink-500">
            Employees, attendance, leave, work, and performance — managed in one place.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[13px] font-semibold text-ink-900">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-[14px] text-ink-500 transition-colors duration-200 hover:text-ink-900">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </Container>

      <Container>
        <div className="flex flex-col gap-2 border-t border-line py-6 text-[13px] text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} VeeDesk. All rights reserved.</p>
          <p>Product visuals use sample data for illustration.</p>
        </div>
      </Container>
    </footer>
  );
}
