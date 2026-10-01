import { useState } from 'react';
import { Crown, IdCard, UserRound, UsersRound } from 'lucide-react';
import { cn } from '../../lib';
import { Container } from '../ui/Container';
import { Reveal } from '../ui/Reveal';

const ROLES = [
  { key: 'admin', name: 'Admin', scope: 'Full system control', icon: Crown, reach: 100 },
  { key: 'hr', name: 'HR', scope: 'Employee & HR operations', icon: IdCard, reach: 80 },
  { key: 'manager', name: 'Manager', scope: 'Team & performance management', icon: UsersRound, reach: 55 },
  { key: 'employee', name: 'Employee', scope: 'Personal workforce tools', icon: UserRound, reach: 30 },
];

// Illustrative access levels per area — values: full | team | own | view | none
const MATRIX = [
  { area: 'System settings & roles', admin: 'full', hr: 'none', manager: 'none', employee: 'none' },
  { area: 'Employee records', admin: 'full', hr: 'full', manager: 'team', employee: 'own' },
  { area: 'Attendance & shifts', admin: 'full', hr: 'full', manager: 'team', employee: 'own' },
  { area: 'Leave approvals', admin: 'full', hr: 'full', manager: 'team', employee: 'own' },
  { area: 'Work allocation', admin: 'full', hr: 'view', manager: 'team', employee: 'own' },
  { area: 'Performance & reports', admin: 'full', hr: 'full', manager: 'team', employee: 'own' },
  { area: 'Audit trail', admin: 'full', hr: 'view', manager: 'none', employee: 'none' },
];

const LEVEL = {
  full: { label: 'Full', className: 'bg-brand-600 text-white' },
  team: { label: 'Team', className: 'bg-brand-100 text-brand-700' },
  view: { label: 'View', className: 'bg-white text-ink-700 ring-1 ring-line-strong ring-inset' },
  own: { label: 'Own', className: 'bg-canvas text-ink-600 ring-1 ring-line ring-inset' },
  none: { label: '—', className: 'text-ink-300' },
};

function Level({ value }) {
  const l = LEVEL[value];
  return (
    <span className={cn('inline-flex min-w-11 justify-center rounded-md px-2 py-1 text-[11.5px] font-medium', l.className)}>
      {value === 'none' ? (
        <>
          <span aria-hidden="true">—</span>
          <span className="sr-only">No access</span>
        </>
      ) : (
        l.label
      )}
    </span>
  );
}

export function RoleAccessSection() {
  const [role, setRole] = useState('manager');
  return (
    <section aria-labelledby="roles-title" className="relative bg-canvas pt-10 pb-20 sm:pt-16 sm:pb-32">
      <Container>
        <Reveal className="overflow-hidden rounded-3xl border border-line bg-white shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            {/* Hierarchy */}
            <div className="border-b border-line p-6 sm:p-8 lg:border-r lg:border-b-0 lg:p-10">
              <h2 id="roles-title" className="text-[26px] leading-[1.15] font-semibold tracking-[-0.03em] sm:text-[30px]">
                The right access <span className="text-ink-muted">for every role.</span>
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-600">
                Four roles, each with a clear scope — from full system control down to personal tools.
              </p>

              <ol className="mt-8 space-y-3">
                {ROLES.map(({ key, name, scope, icon: Icon, reach }, i) => (
                  <Reveal as="li" key={key} delay={i * 90} className="relative">
                    {i > 0 && <span aria-hidden="true" className="absolute -top-3 left-[31px] h-3 w-px bg-line-strong" />}
                    <div className="flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-[0_1px_2px_rgb(38_44_59/0.04)]">
                      <span
                        className={cn(
                          'inline-flex size-9 shrink-0 items-center justify-center rounded-xl',
                          i === 0 ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-600',
                        )}
                      >
                        <Icon aria-hidden="true" className="size-4" strokeWidth={1.9} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[12px] font-semibold tracking-[0.08em] text-ink-900 uppercase">{name}</p>
                        <p className="truncate text-[13px] text-ink-600">{scope}</p>
                      </div>
                      <div aria-hidden="true" className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-ink-900/[0.06] sm:block">
                        <div className="h-full rounded-full bg-brand-500" style={{ width: `${reach}%` }} />
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>

            {/* Matrix */}
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[15px] font-semibold">Access by area</h3>
                <span className="rounded-full bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-500 ring-1 ring-line ring-inset">
                  Illustrative setup
                </span>
              </div>
              {/* Phones: pick a role, see its access list */}
              <div className="mt-4 sm:hidden">
                <div role="group" aria-label="Choose a role" className="grid grid-cols-4 gap-1 rounded-xl bg-canvas p-1 ring-1 ring-line ring-inset">
                  {ROLES.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      aria-pressed={role === r.key}
                      onClick={() => setRole(r.key)}
                      className={cn(
                        'rounded-lg py-2 text-[12.5px] font-medium transition-colors duration-200',
                        role === r.key ? 'bg-white text-ink-900 shadow-sm ring-1 ring-line' : 'text-ink-500',
                      )}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
                <ul className="mt-3 divide-y divide-line" aria-live="polite" aria-label={`${ROLES.find((r) => r.key === role).name} access`}>
                  {MATRIX.map((row) => (
                    <li key={row.area} className="flex items-center justify-between gap-3 py-2.5 text-[13px]">
                      <span className="font-medium text-ink-800">{row.area}</span>
                      <Level value={row[role]} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tablet and up: full matrix */}
              <div className="relative mt-5 hidden overflow-x-auto sm:block" tabIndex={0} role="region" aria-label="Access levels by role">
                <table className="w-full min-w-[460px] text-left text-[13px]">
                  <caption className="sr-only">Illustrative access levels for each role across VeeDesk areas</caption>
                  <thead>
                    <tr className="text-[11px] font-semibold tracking-[0.06em] text-ink-500 uppercase">
                      <th scope="col" className="pb-3 font-semibold">Area</th>
                      {ROLES.map((r) => (
                        <th key={r.key} scope="col" className="pb-3 text-center font-semibold">
                          {r.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line border-t border-line">
                    {MATRIX.map((row) => (
                      <tr key={row.area}>
                        <th scope="row" className="py-2.5 pr-3 font-medium text-ink-800">
                          {row.area}
                        </th>
                        {ROLES.map((r) => (
                          <td key={r.key} className="py-2.5 text-center">
                            <Level value={row[r.key]} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-[12px] text-ink-500">
                Team = the manager’s own team · Own = the employee’s own records and requests
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
