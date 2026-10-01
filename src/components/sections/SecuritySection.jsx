import { CloudCheck, DatabaseBackup, History, MonitorSmartphone, ShieldCheck, LockKeyhole } from 'lucide-react';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';

const ITEMS = [
  { title: 'Role-Based Access', copy: 'Control what each user can view and manage.', icon: ShieldCheck },
  { title: 'Audit Trail', copy: 'Keep visibility into important activities and changes.', icon: History },
  { title: 'Data Backup', copy: 'Protect important workforce information.', icon: DatabaseBackup },
  { title: 'Cloud Access', copy: 'Access your workforce data from anywhere.', icon: CloudCheck },
  { title: 'Mobile Friendly', copy: 'Manage employee operations across devices.', icon: MonitorSmartphone },
];

const AUDIT = [
  { who: 'Meena Devi', what: 'updated designation for Arjun Kumar', time: '10:24' },
  { who: 'Priya Sharma', what: 'approved leave request #L-2291', time: '09:40' },
  { who: 'Admin', what: 'changed role: Rahul Raj → Manager', time: 'Yesterday' },
];

export function SecuritySection() {
  return (
    <section id="security" aria-labelledby="security-title" className="relative bg-canvas pt-20 pb-10 sm:pt-32 sm:pb-16">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <SectionHeading
            id="security-title"
            align="left"
            eyebrow="Security"
            icon={LockKeyhole}
            title="Built With Control"
            muted="and Security in Mind."
            description="Decide who sees what, keep a record of important changes, and keep workforce data protected and available."
          />

          {/* Audit trail preview */}
          <Reveal delay={120} role="img" aria-label="Sample audit trail listing recent changes: a designation update, a leave approval, and a role change, each with who made it and when.">
            <div aria-hidden="true" className="rounded-2xl border border-line bg-white p-4 shadow-card sm:p-5">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 text-[13px] font-semibold text-ink-900">
                  <History className="size-4 text-brand-600" /> Audit trail
                </p>
                <span className="text-[11px] text-ink-400">Sample entries</span>
              </div>
              <ul className="mt-3 divide-y divide-line">
                {AUDIT.map((a) => (
                  <li key={a.what} className="flex items-center gap-3 py-2.5 text-[12.5px]">
                    <span className="size-1.5 shrink-0 rounded-full bg-brand-500" />
                    <p className="min-w-0 flex-1 truncate text-ink-600">
                      <span className="font-medium text-ink-900">{a.who}</span> {a.what}
                    </p>
                    <span className="shrink-0 text-[11.5px] text-ink-400 tabular-nums">{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:mt-14 lg:grid-cols-5">
          {ITEMS.map(({ title, copy, icon: Icon }, i) => (
            <Reveal as="li" key={title} delay={i * 70} className={cn(i === 4 && 'sm:col-span-2 lg:col-span-1')}>
              <article className="group flex h-full gap-4 rounded-2xl border border-line bg-white p-5 shadow-card transition-[box-shadow,transform,border-color] duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift sm:block">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-[0_6px_16px_-6px_rgb(106_54_208/0.6)] transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.75} />
                </span>
                <div>
                  <h3 className="text-[15.5px] font-semibold tracking-[-0.01em] sm:mt-5">{title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-ink-600 sm:mt-1.5">{copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
