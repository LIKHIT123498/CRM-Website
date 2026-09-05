import { useState } from 'react';
import { Mail, Phone, MapPin, Building2, Briefcase, Calendar, Phone as PhoneIcon, FileText, Trophy, Calendar as CalIcon, Pencil, MessageSquare } from 'lucide-react';
import type { Contact, Activity } from '@/types';
import { Drawer } from '@/components/Drawer';
import { Avatar, StatusBadge, StageBadge, PriorityBadge } from '@/components/Badges';
import { deals, tasks } from '@/data/mockData';
import { formatCurrency, classNames } from '@/lib/utils';

const activityIcons: Record<Activity['type'], { icon: typeof Mail; bg: string }> = {
  call: { icon: PhoneIcon, bg: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  email: { icon: Mail, bg: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  meeting: { icon: CalIcon, bg: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
  note: { icon: FileText, bg: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
  deal: { icon: Trophy, bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' },
};

type Tab = 'timeline' | 'deals' | 'tasks';

export function ContactProfile({ contact, onClose }: { contact: Contact; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('timeline');
  const contactDeals = deals.filter((d) => contact.deals.includes(d.id) || d.contact === contact.name);
  const contactTasks = tasks.filter((t) => t.contact === contact.name);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'timeline', label: 'Timeline', count: contact.notes.length },
    { id: 'deals', label: 'Active Deals', count: contactDeals.length },
    { id: 'tasks', label: 'Open Tasks', count: contactTasks.filter((t) => !t.done).length },
  ];

  return (
    <Drawer open onClose={onClose} title="Contact Profile" subtitle={contact.name} width="max-w-xl">
      {/* Profile header */}
      <div className="flex items-start gap-4 rounded-xl bg-slate-50 p-5 dark:bg-slate-800/50">
        <Avatar initials={contact.initials} color={contact.avatarColor} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{contact.name}</h3>
            <StatusBadge status={contact.status} />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{contact.role}</p>
          <div className="mt-2 flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <Building2 className="h-3.5 w-3.5" /> {contact.company}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <MapPin className="h-3.5 w-3.5" /> {contact.location}
            </span>
          </div>
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200">
          <Pencil className="h-4 w-4" />
        </button>
      </div>

      {/* Contact info */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400">
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 dark:text-slate-500">Email</p>
            <p className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">{contact.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
            <Phone className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 dark:text-slate-500">Phone</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{contact.phone}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400">
            <Briefcase className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 dark:text-slate-500">Role</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{contact.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2.5 dark:border-slate-700">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400">
            <Calendar className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-400 dark:text-slate-500">Last Contact</p>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{contact.lastContact}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 border-b border-slate-200 dark:border-slate-700">
        <div className="flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={classNames(
                'flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors',
                tab === t.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              )}
            >
              {t.label}
              <span className={classNames(
                'rounded-full px-1.5 py-0.5 text-xs font-semibold',
                tab === t.id ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
              )}>
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="mt-5">
        {tab === 'timeline' && (
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-px bg-slate-200 dark:bg-slate-700" />
            <div className="space-y-5">
              {contact.notes.map((activity) => {
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
            {/* Add note */}
            <div className="mt-5 flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                <MessageSquare className="h-4.5 w-4.5" />
              </div>
              <input
                type="text"
                placeholder="Add a note..."
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-500/20"
              />
            </div>
          </div>
        )}

        {tab === 'deals' && (
          <div className="space-y-3">
            {contactDeals.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">No active deals for this contact</p>
            )}
            {contactDeals.map((deal) => (
              <div key={deal.id} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{deal.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{deal.company}</p>
                  </div>
                  <span className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(deal.value)}</span>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <StageBadge stage={deal.stage} />
                  <PriorityBadge priority={deal.priority} />
                  <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">Due {deal.dueDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'tasks' && (
          <div className="space-y-2.5">
            {contactTasks.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-400 dark:text-slate-500">No open tasks for this contact</p>
            )}
            {contactTasks.map((task) => (
              <div key={task.id} className={classNames(
                'flex items-center gap-3 rounded-xl border p-3.5 dark:border-slate-700',
                task.done ? 'border-slate-200 opacity-60 dark:border-slate-800' : 'border-slate-200 dark:border-slate-700'
              )}>
                <input type="checkbox" checked={task.done} readOnly className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                <div className="flex-1">
                  <p className={classNames('text-sm font-medium', task.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-900 dark:text-white')}>
                    {task.title}
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{task.type} · {task.dueDate} at {task.dueTime}</p>
                </div>
                <PriorityBadge priority={task.priority} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Drawer>
  );
}
