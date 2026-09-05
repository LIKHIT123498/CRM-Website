import { TrendingUp, TrendingDown, Users, Target, DollarSign, Award, BarChart3, PieChart } from 'lucide-react';
import { revenueData, deals, contacts, companies, stageBreakdown } from '@/data/mockData';
import { formatCurrency, classNames } from '@/lib/utils';

export function Analytics() {
  const wonDeals = deals.filter((d) => d.stage === 'Closed-Won');
  const lostDeals = deals.filter((d) => d.stage === 'Closed-Lost');
  const openDeals = deals.filter((d) => !d.stage.startsWith('Closed'));
  const totalWon = wonDeals.reduce((s, d) => s + d.value, 0);
  const totalOpen = openDeals.reduce((s, d) => s + d.value, 0);
  const winRate = Math.round((wonDeals.length / (wonDeals.length + lostDeals.length)) * 100);
  const avgDealSize = Math.round(totalWon / wonDeals.length);
  const activeContacts = contacts.filter((c) => c.status === 'Active').length;
  const leadContacts = contacts.filter((c) => c.status === 'Lead').length;
  const activeCompanies = companies.filter((c) => c.status === 'Active').length;

  const maxRevenue = Math.max(...revenueData.map((d) => d.value));
  const topDeals = [...deals].sort((a, b) => b.value - a.value).slice(0, 5);
  const totalStageCount = stageBreakdown.reduce((s, d) => s + d.count, 0);

  const kpis = [
    { label: 'Total Revenue (Won)', value: formatCurrency(totalWon), change: '+12.5%', positive: true, icon: DollarSign, bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' },
    { label: 'Win Rate', value: `${winRate}%`, change: '+3.2%', positive: true, icon: Award, bg: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
    { label: 'Avg Deal Size', value: formatCurrency(avgDealSize), change: '+8.1%', positive: true, icon: Target, bg: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
    { label: 'Pipeline Value', value: formatCurrency(totalOpen), change: '-2.4%', positive: false, icon: BarChart3, bg: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
  ];

  // Industry distribution
  const industries = companies.reduce((acc, c) => {
    acc[c.industry] = (acc[c.industry] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const industryEntries = Object.entries(industries).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxIndustry = Math.max(...industryEntries.map(([, v]) => v));

  const industryColors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-violet-500', 'bg-rose-500', 'bg-cyan-500'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((k) => {
          const Icon = k.icon;
          return (
            <div key={k.label} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <div className={classNames('flex h-11 w-11 items-center justify-center rounded-xl', k.bg)}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={classNames('flex items-center gap-1 text-xs font-semibold', k.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400')}>
                  {k.positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                  {k.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">{k.value}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{k.label}</p>
            </div>
          );
        })}
      </div>

      {/* Revenue trend + Donut */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Revenue trend line */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:col-span-2">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Revenue Trend</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Won revenue by month (in thousands)</p>

          {/* Line chart (SVG-free, using bars with gradient) */}
          <div className="mt-6 flex h-56 items-end justify-between gap-2">
            {revenueData.map((d, i) => {
              const heightPct = (d.value / maxRevenue) * 100;
              const prev = i > 0 ? revenueData[i - 1].value : d.value;
              const trend = d.value >= prev;
              return (
                <div key={d.month} className="group flex flex-1 flex-col items-center gap-2">
                  <div className="relative flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-blue-500/70 to-cyan-400 transition-all duration-300 group-hover:from-blue-500 group-hover:to-cyan-400"
                      style={{ height: `${heightPct}%` }}
                    >
                      <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                        ${d.value}K
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{d.month}</span>
                    <span className={classNames('text-[10px]', trend ? 'text-emerald-500' : 'text-rose-500')}>
                      {trend ? '+' : ''}{d.value - prev}K
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pipeline funnel */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">Pipeline Funnel</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Deals by stage</p>

          <div className="mt-6 space-y-2.5">
            {stageBreakdown.map((s, i) => {
              const widthPct = ((s.count / totalStageCount) * 100) - i * 5;
              return (
                <div key={s.stage} className="flex items-center gap-2">
                  <div className="w-24 shrink-0 text-xs text-slate-600 dark:text-slate-400">{s.stage}</div>
                  <div className="flex-1 overflow-hidden">
                    <div
                      className={classNames('flex h-7 items-center justify-end rounded-md px-2 text-xs font-bold text-white', s.color)}
                      style={{ width: `${Math.max(widthPct, 15)}%` }}
                    >
                      {s.count}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-500/10">
              <p className="text-xs text-slate-500 dark:text-slate-400">Won</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{wonDeals.length}</p>
            </div>
            <div className="rounded-lg bg-rose-50 p-3 dark:bg-rose-500/10">
              <p className="text-xs text-slate-500 dark:text-slate-400">Lost</p>
              <p className="text-lg font-bold text-rose-600 dark:text-rose-400">{lostDeals.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Industry distribution + Top deals */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Industry distribution */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-5 flex items-center gap-2">
            <PieChart className="h-5 w-5 text-blue-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Companies by Industry</h3>
          </div>

          <div className="space-y-3">
            {industryEntries.map(([name, count], i) => (
              <div key={name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{name}</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{count}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className={classNames('h-full rounded-full', industryColors[i])} style={{ width: `${(count / maxIndustry) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-6 rounded-lg bg-slate-50 p-4 dark:bg-slate-800/50">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Active Companies</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{activeCompanies}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-emerald-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Active Contacts</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{activeContacts}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Leads</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">{leadContacts}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top deals */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <h3 className="mb-5 text-base font-bold text-slate-900 dark:text-white">Top Deals by Value</h3>

          <div className="space-y-3">
            {topDeals.map((deal, i) => (
              <div key={deal.id} className="flex items-center gap-3">
                <span className={classNames(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold',
                  i === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                )}>
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{deal.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{deal.company}</p>
                </div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{formatCurrency(deal.value)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
