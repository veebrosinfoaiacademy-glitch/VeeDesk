import { CalendarCheck2, CircleCheck, ClipboardList, TreePalm, UserPlus, Users } from 'lucide-react';
import { employees, teamPerformance, weeklyTasks, workforce } from '../../data/demo';
import { cn } from '../../lib';
import { CountUp } from '../ui/CountUp';
import { GroupedBars, Legend, LineChart, StackedBar } from './charts';
import { AppSidebar, AppTopbar, Avatar, Meter, Panel, StatusPill } from './primitives';

const METRICS = [
  { label: 'Employees', value: workforce.total, icon: Users, tone: 'bg-brand-50 text-brand-600', note: <><span className="font-medium text-emerald-700">+{workforce.newThisMonth}</span> joined this month</> },
  { label: 'Present Today', value: workforce.present, icon: CalendarCheck2, tone: 'bg-emerald-50 text-emerald-600', note: <><span className="font-medium text-ink-700">87.9%</span> of workforce</> },
  { label: 'On Leave', value: workforce.onLeave, icon: TreePalm, tone: 'bg-sky-50 text-sky-600', note: <><span className="font-medium text-ink-700">3</span> returning tomorrow</> },
  { label: 'Pending Tasks', value: workforce.pendingTasks, icon: ClipboardList, tone: 'bg-orange-50 text-orange-600', note: <><span className="font-medium text-orange-700">5</span> due today</> },
];

const WORKFORCE = [
  { label: 'Present', value: workforce.present, color: '#10b981' },
  { label: 'Late', value: workforce.late, color: '#f59e0b' },
  { label: 'On Leave', value: workforce.onLeave, color: '#0ea5e9' },
  { label: 'Absent', value: workforce.absent, color: '#f43f5e' },
];

const ACTIVITY = [
  { icon: CircleCheck, tone: 'bg-emerald-50 text-emerald-600', text: <><b>Priya Sharma</b>’s leave request was approved</>, time: '2m' },
  { icon: CalendarCheck2, tone: 'bg-brand-50 text-brand-600', text: <><b>Arjun Kumar</b> checked in at 09:02</>, time: '18m' },
  { icon: ClipboardList, tone: 'bg-orange-50 text-orange-600', text: <><b>Rahul Raj</b> completed “API Integration”</>, time: '34m' },
  { icon: UserPlus, tone: 'bg-brand-50 text-brand-600', text: <><b>Divya Nair</b> was added to Support</>, time: '1h' },
];

function MetricCard({ label, value, icon: Icon, tone, note, index }) {
  return (
    <div className="m-fade rounded-xl border border-line bg-white p-3.5" style={{ '--d': `${400 + index * 90}ms` }}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium text-ink-500">{label}</span>
        <span className={cn('inline-flex size-6 items-center justify-center rounded-md', tone)}>
          <Icon className="size-3.5" strokeWidth={2} />
        </span>
      </div>
      <div className="mt-1.5 text-[22px] leading-none font-semibold tracking-tight text-ink-900 @3xl/main:text-[26px]">
        <CountUp value={value} delay={700 + index * 90} immediate />
      </div>
      <p className="mt-2 truncate text-[10.5px] text-ink-500">{note}</p>
    </div>
  );
}

export function DashboardPreview() {
  return (
    <div className="@container flex bg-canvas/70">
      <AppSidebar active="Dashboard" className="hidden @5xl:flex" />
      <div className="@container/main min-w-0 flex-1 p-3.5 @2xl:p-5 @5xl:p-6">
        <AppTopbar title="Dashboard" meta="Overview · Today" />

        <div className="mt-4 grid grid-cols-2 gap-2.5 @3xl/main:grid-cols-4 @3xl/main:gap-3">
          {METRICS.map((m, i) => (
            <MetricCard key={m.label} {...m} index={i} />
          ))}
        </div>

        <div className="mt-2.5 grid gap-2.5 @3xl/main:mt-3 @3xl/main:grid-cols-12 @3xl/main:gap-3">
          <Panel title="Today’s Workforce" meta={`${workforce.total} employees`} className="@3xl/main:col-span-4">
            <StackedBar segments={WORKFORCE} />
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {WORKFORCE.map((s) => (
                <div key={s.label}>
                  <dt className="flex items-center gap-1.5 text-[10.5px] text-ink-500">
                    <span className="size-2 rounded-[3px]" style={{ background: s.color }} />
                    {s.label}
                  </dt>
                  <dd className="mt-0.5 flex items-baseline gap-1.5">
                    <span className="text-[17px] font-semibold tracking-tight text-ink-900 tabular-nums">{s.value}</span>
                    <span className="text-[10px] text-ink-400 tabular-nums">{((s.value / workforce.total) * 100).toFixed(1)}%</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Panel>

          <Panel
            title="Team Performance"
            meta="Average score · last 8 weeks"
            className="@3xl/main:col-span-5"
            action={
              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">+4.2 pts</span>
            }
          >
            <LineChart
              data={teamPerformance}
              min={70}
              max={95}
              target={85}
              height={104}
              delay={700}
              callout="Week 8 · 91"
              labels={['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8']}
            />
          </Panel>

          <Panel title="Task Completion" meta="This week" className="hidden @xl/main:flex @3xl/main:col-span-3">
            <GroupedBars
              data={weeklyTasks}
              labelKey="day"
              series={[
                { key: 'assigned', color: '#ddd0fd' },
                { key: 'completed', color: '#6a36d0' },
              ]}
              height={92}
              delay={800}
              barClassName="w-2 @5xl:w-2.5"
            />
            <Legend
              className="mt-3"
              items={[
                { label: 'Completed', color: '#6a36d0' },
                { label: 'Assigned', color: '#ddd0fd' },
              ]}
            />
          </Panel>

          <Panel
            title="Employees"
            meta="Today’s status and progress"
            className="@3xl/main:col-span-8"
            bodyClassName="px-0 pb-1 pt-3"
            action={<span className="text-[11px] font-medium text-brand-600">View all</span>}
          >
            <div className="relative overflow-hidden">
              <table className="w-full min-w-[520px] text-left text-[11.5px]">
                <thead>
                  <tr className="border-y border-line bg-canvas/60 text-[10px] font-medium tracking-wide text-ink-400 uppercase">
                    <th className="py-2 pl-4 font-medium">Employee</th>
                    <th className="py-2 font-medium">Department</th>
                    <th className="py-2 font-medium">Status</th>
                    <th className="py-2 font-medium">Tasks</th>
                    <th className="py-2 pr-4 font-medium">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.slice(0, 5).map((e, i) => (
                    <tr key={e.name} className="border-b border-line/70 last:border-0">
                      <td className="py-2 pl-4">
                        <div className="flex items-center gap-2">
                          <Avatar name={e.name} className="size-6 text-[9px]" />
                          <span className="font-medium text-ink-900">{e.name}</span>
                        </div>
                      </td>
                      <td className="py-2 text-ink-600">{e.department}</td>
                      <td className="py-2">
                        <StatusPill status={e.status} />
                      </td>
                      <td className="py-2 text-ink-600 tabular-nums">
                        {e.today.done}/{e.today.total}
                      </td>
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <Meter value={e.performance} className="w-16" delay={900 + i * 80} />
                          <span className="font-medium text-ink-900 tabular-nums">{e.performance}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>

          <Panel title="Recent Activity" className="hidden @xl/main:flex @3xl/main:col-span-4" bodyClassName="pt-3">
            <ul className="space-y-3">
              {ACTIVITY.map(({ icon: Icon, tone, text, time }, i) => (
                <li key={i} className="m-fade flex gap-2.5" style={{ '--d': `${1000 + i * 120}ms` }}>
                  <span className={cn('mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full', tone)}>
                    <Icon className="size-3.5" />
                  </span>
                  <p className="min-w-0 flex-1 text-[11px] leading-snug text-ink-600 [&_b]:font-medium [&_b]:text-ink-900">
                    {text}
                  </p>
                  <span className="text-[10px] text-ink-400">{time}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
