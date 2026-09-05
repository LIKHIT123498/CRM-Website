import { useState } from 'react';
import { Plus, GripVertical, Calendar, MoreHorizontal, X, TrendingUp } from 'lucide-react';
import type { Deal, DealStage, Priority } from '@/types';
import { deals as initialDeals, dealStages } from '@/data/mockData';
import { formatCurrency, classNames } from '@/lib/utils';
import { Drawer } from '@/components/Drawer';
import { PriorityBadge, Avatar } from '@/components/Badges';

const stageConfig: Record<DealStage, { color: string; dot: string; header: string }> = {
  'Lead In': { color: 'border-slate-300 dark:border-slate-600', dot: 'bg-slate-400', header: 'text-slate-700 dark:text-slate-300' },
  'Contacted': { color: 'border-blue-300 dark:border-blue-700', dot: 'bg-blue-500', header: 'text-blue-700 dark:text-blue-400' },
  'Proposal Sent': { color: 'border-amber-300 dark:border-amber-700', dot: 'bg-amber-500', header: 'text-amber-700 dark:text-amber-400' },
  'Negotiation': { color: 'border-violet-300 dark:border-violet-700', dot: 'bg-violet-500', header: 'text-violet-700 dark:text-violet-400' },
  'Closed-Won': { color: 'border-emerald-300 dark:border-emerald-700', dot: 'bg-emerald-500', header: 'text-emerald-700 dark:text-emerald-400' },
  'Closed-Lost': { color: 'border-rose-300 dark:border-rose-700', dot: 'bg-rose-500', header: 'text-rose-700 dark:text-rose-400' },
};

export function DealsPipeline() {
  const [allDeals, setAllDeals] = useState<Deal[]>(initialDeals);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<DealStage | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({ title: '', company: '', contact: '', value: '', stage: 'Lead In' as DealStage, priority: 'Medium' as Priority });

  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (e: React.DragEvent, stage: DealStage) => {
    e.preventDefault();
    setDragOverStage(stage);
  };
  const handleDrop = (stage: DealStage) => {
    if (draggedId) {
      setAllDeals((prev) => prev.map((d) => (d.id === draggedId ? { ...d, stage } : d)));
    }
    setDraggedId(null);
    setDragOverStage(null);
  };

  const handleAddDeal = () => {
    if (!newDeal.title || !newDeal.company) return;
    const deal: Deal = {
      id: `d${Date.now()}`,
      title: newDeal.title,
      company: newDeal.company,
      contact: newDeal.contact || 'Unassigned',
      contactInitials: newDeal.contact ? newDeal.contact.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() : 'NA',
      contactColor: 'bg-slate-500',
      value: parseInt(newDeal.value) || 0,
      stage: newDeal.stage,
      priority: newDeal.priority,
      dueDate: 'TBD',
      probability: newDeal.stage === 'Lead In' ? 10 : 25,
    };
    setAllDeals((prev) => [...prev, deal]);
    setNewDeal({ title: '', company: '', contact: '', value: '', stage: 'Lead In', priority: 'Medium' });
    setDrawerOpen(false);
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {allDeals.length} deals · {formatCurrency(allDeals.filter((d) => !d.stage.startsWith('Closed')).reduce((s, d) => s + d.value, 0))} in pipeline
          </span>
        </div>
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
        >
          <Plus className="h-4 w-4" /> Quick Add Deal
        </button>
      </div>

      {/* Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {dealStages.map((stage) => {
          const stageDeals = allDeals.filter((d) => d.stage === stage);
          const config = stageConfig[stage];
          const totalValue = stageDeals.reduce((s, d) => s + d.value, 0);
          return (
            <div
              key={stage}
              onDragOver={(e) => handleDragOver(e, stage)}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={() => handleDrop(stage)}
              className={classNames(
                'flex w-72 shrink-0 flex-col rounded-xl border-t-4 bg-slate-100/70 transition-colors dark:bg-slate-800/40',
                config.color,
                dragOverStage === stage && 'ring-2 ring-blue-400 dark:ring-blue-500'
              )}
            >
              {/* Column header */}
              <div className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center gap-2">
                  <span className={classNames('h-2 w-2 rounded-full', config.dot)} />
                  <h3 className={classNames('text-sm font-semibold', config.header)}>{stage}</h3>
                  <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                    {stageDeals.length}
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="px-3 pb-2 text-xs text-slate-400 dark:text-slate-500">{formatCurrency(totalValue)}</p>

              {/* Cards */}
              <div className="flex-1 space-y-2.5 overflow-y-auto px-2.5 pb-3" style={{ maxHeight: 'calc(100vh - 280px)' }}>
                {stageDeals.map((deal) => (
                  <div
                    key={deal.id}
                    draggable
                    onDragStart={() => handleDragStart(deal.id)}
                    onDragEnd={() => { setDraggedId(null); setDragOverStage(null); }}
                    className={classNames(
                      'group cursor-grab rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm transition-all hover:shadow-md active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900',
                      draggedId === deal.id && 'opacity-50'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{deal.title}</p>
                      <GripVertical className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100 dark:text-slate-600" />
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{deal.company}</p>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-base font-bold text-slate-900 dark:text-white">{formatCurrency(deal.value)}</span>
                      <PriorityBadge priority={deal.priority} />
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Avatar initials={deal.contactInitials} color={deal.contactColor} size="sm" />
                        <span className="text-xs text-slate-500 dark:text-slate-400">{deal.contact}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                        <Calendar className="h-3 w-3" />
                        {deal.dueDate}
                      </div>
                    </div>

                    {/* Probability bar */}
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">Probability</span>
                        <span className="flex items-center gap-0.5 text-[10px] font-medium text-slate-600 dark:text-slate-300">
                          <TrendingUp className="h-2.5 w-2.5" />{deal.probability}%
                        </span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className={classNames('h-full rounded-full', deal.probability >= 70 ? 'bg-emerald-500' : deal.probability >= 40 ? 'bg-amber-500' : 'bg-slate-400')}
                          style={{ width: `${deal.probability}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {stageDeals.length === 0 && (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-8 text-center dark:border-slate-700">
                    <p className="text-xs text-slate-400 dark:text-slate-500">Drag deals here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Add Deal Drawer */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Add New Deal" subtitle="Create a new deal in your pipeline">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Deal Title</label>
            <input
              type="text"
              value={newDeal.title}
              onChange={(e) => setNewDeal({ ...newDeal, title: e.target.value })}
              placeholder="e.g. Annual Platform License"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
            <input
              type="text"
              value={newDeal.company}
              onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
              placeholder="e.g. Acme Corp"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Contact Name</label>
            <input
              type="text"
              value={newDeal.contact}
              onChange={(e) => setNewDeal({ ...newDeal, contact: e.target.value })}
              placeholder="e.g. Sarah Chen"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Deal Value ($)</label>
            <input
              type="number"
              value={newDeal.value}
              onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
              placeholder="e.g. 50000"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Stage</label>
              <select
                value={newDeal.stage}
                onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value as DealStage })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
              >
                {dealStages.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
              <select
                value={newDeal.priority}
                onChange={(e) => setNewDeal({ ...newDeal, priority: e.target.value as Priority })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              onClick={() => setDrawerOpen(false)}
              className="rounded-lg px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDeal}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md"
            >
              Create Deal
            </button>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
