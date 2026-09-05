import { TrendingUp, TrendingDown, DollarSign, Target, Users, Zap, ArrowUpRight, Phone, Mail, Calendar, FileText, Trophy } from 'lucide-react';
import { revenueData, stageBreakdown, recentActivity, deals } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import { classNames } from '@/lib/utils';
import type { Activity } from '@/types';

interface MetricCard {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  icon: typeof DollarSign;
  iconBg: string;
}

const metrics: MetricCard[] = [
  { label: 'Total Revenue', value: '$1.24M', change: '+12.5%', positive: true, icon: DollarSign, iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' },
  { label: 'Active Deals', value: '17', change: '+3 this month', positive: true, icon: Target, iconBg: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  { label: 'Conversion Rate', value: '24.8%', change: '+2.1%', positive: true, icon: Zap, iconBg: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  { label: 'New Leads', value: '42', change: '-5.2%', positive: false, icon: Users, iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
];

const activityIcons: Record<Activity['type'], { icon: typeof Phone; bg: string }> = {
  call: { icon: Phone, bg: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  email: { icon: Mail, bg: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  meeting: { icon: Calendar, bg: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
  note: { icon: FileText, bg: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
  deal: { icon: Trophy, bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' },
};

export function Dashboard() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));
  const totalStageCount = stageBreakdown.reduce((s, d) => s + d.count, 0);
  const totalPipelineValue = deals.filter((d) => !d.stage.startsWith('Closed')).reduce((s, d) => s + d.value, 0);

  return (
    <div className="space-y-6">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="rounded-2xl border border-slate-200 bg-white p-5 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex items-center justify-between">
                <div className={classNames('flex h-11 w-11 items-center justify-center rounded-xl', m.iconBg)}>
                  <Icon className="h-5.5 w-5.5" />
                </div>
                <span
                  className={classNames(
                    'flex items-center gap-1 text-xs font-semibold',
                    m.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  )}
                >
                  {m.positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {m.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{m.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{m.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Over Time</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Monthly revenue (in thousands)</p>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5 dark:bg-emerald-500/10">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">+27.2%</span>
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex h-52 items-end justify-between gap-2">
            {revenueData.map((d, i) => {
              const heightPct = (d.value / maxRevenue) * 100;
              const isLast = i === revenueData.length - 1;
              return (
                <div key={d.month} className="group flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className={classNames(
                        'w-full rounded-t-md transition-all duration-300 group-hover:opacity-80',
                        isLast ? 'bg-gradient-to-t from-blue-500 to-cyan-400' : 'bg-slate-200 dark:bg-slate-700'
                      )}
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                        ${d.value}K
                      </div>
                    </div>
                  </div>
                  <span className={classNames('text-xs', isLast ? 'font-semibold text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500')}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stage Breakdown */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Deal Stages Breakdown</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{totalStageCount} deals in pipeline</p>

          {/* Donut-style progress */}
          <div className="mt-6 space-y-3">
            {stageBreakdown.map((s) => {
              const pct = (s.count / totalStageCount) * 100;
              return (
                <div key={s.stage}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={classNames('h-2.5 w-2.5 rounded-full', s.color)} />
                      <span className="text-sm text-slate-700 dark:text-slate-300">{s.stage}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{s.count}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className={classNames('h-full rounded-full transition-all duration-500', s.color)} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/50">
            <p className="text-xs text-slate-500 dark:text-slate-400">Open Pipeline Value</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(totalPipelineValue)}</p>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Recent Activity</h3>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">View all</button>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />

          <div className="space-y-5">
            {recentActivity.map((activity) => {
              const { icon: Icon, bg } = activityIcons[activity.type];
              return (
                <div key={activity.id} className="relative flex gap-4">
                  <div className={classNames('relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white dark:ring-slate-900', bg)}>
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <div className="flex-1 pt-0.5">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
                    <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{activity.description}</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{activity.date} · {activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
