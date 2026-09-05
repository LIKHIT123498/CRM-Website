import { useState } from 'react';
import { Phone, Mail, Calendar, Monitor, RefreshCw, Plus, CheckCircle2, Circle, Clock } from 'lucide-react';
import { tasks as initialTasks } from '@/data/mockData';
import type { Task } from '@/types';
import { PriorityBadge, Avatar } from '@/components/Badges';
import { contacts } from '@/data/mockData';
import { classNames } from '@/lib/utils';

const typeIcons: Record<Task['type'], { icon: typeof Phone; bg: string }> = {
  Call: { icon: Phone, bg: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400' },
  Email: { icon: Mail, bg: 'bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400' },
  Meeting: { icon: Calendar, bg: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400' },
  Demo: { icon: Monitor, bg: 'bg-cyan-100 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400' },
  'Follow-up': { icon: RefreshCw, bg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400' },
};

type Filter = 'all' | 'today' | 'upcoming' | 'completed';

export function Tasks() {
  const [taskList, setTaskList] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>('all');

  const toggleTask = (id: string) => {
    setTaskList((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const filtered = taskList.filter((t) => {
    if (filter === 'all') return !t.done;
    if (filter === 'today') return !t.done && t.dueDate === 'Today';
    if (filter === 'upcoming') return !t.done && t.dueDate !== 'Today';
    if (filter === 'completed') return t.done;
    return true;
  });

  const completed = taskList.filter((t) => t.done).length;
  const total = taskList.length;
  const completionRate = Math.round((completed / total) * 100);

  const filters: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All Open', count: taskList.filter((t) => !t.done).length },
    { id: 'today', label: 'Today', count: taskList.filter((t) => !t.done && t.dueDate === 'Today').length },
    { id: 'upcoming', label: 'Upcoming', count: taskList.filter((t) => !t.done && t.dueDate !== 'Today').length },
    { id: 'completed', label: 'Completed', count: completed },
  ];

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Completion Rate</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{completionRate}%</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
            <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${completionRate}%` }} />
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Open Tasks</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{taskList.filter((t) => !t.done).length}</p>
          <p className="mt-1 text-xs text-amber-600 dark:text-amber-400">{taskList.filter((t) => !t.done && t.dueDate === 'Today').length} due today</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">Completed</p>
          <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{completed}</p>
          <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400">of {total} total tasks</p>
        </div>
      </div>

      {/* Filter tabs + Add button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={classNames(
                'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                filter === f.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              )}
            >
              {f.label}
              <span className={classNames(
                'rounded-full px-1.5 py-0.5 text-xs font-semibold',
                filter === f.id ? 'bg-blue-500/30 text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
              )}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md">
          <Plus className="h-4 w-4" /> New Task
        </button>
      </div>

      {/* Task list */}
      <div className="space-y-2.5">
        {filtered.map((task) => {
          const { icon: Icon, bg } = typeIcons[task.type];
          const contact = contacts.find((c) => c.name === task.contact);
          return (
            <div
              key={task.id}
              className={classNames(
                'group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900',
                task.done && 'opacity-60'
              )}
            >
              <button onClick={() => toggleTask(task.id)} className="shrink-0 text-slate-300 transition-colors hover:text-blue-500 dark:text-slate-600">
                {task.done ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
              </button>

              <div className={classNames('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', bg)}>
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <p className={classNames('text-sm font-medium', task.done ? 'text-slate-400 line-through dark:text-slate-500' : 'text-slate-900 dark:text-white')}>
                  {task.title}
                </p>
                <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>{task.company}</span>
                  {contact && (
                    <span className="flex items-center gap-1">
                      <Avatar initials={contact.initials} color={contact.avatarColor} size="sm" />
                      {task.contact}
                    </span>
                  )}
                </div>
              </div>

              <div className="hidden items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 sm:flex">
                <Clock className="h-3.5 w-3.5" />
                {task.dueDate} · {task.dueTime}
              </div>

              <PriorityBadge priority={task.priority} />
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 dark:border-slate-700">
            <CheckCircle2 className="h-10 w-10 text-slate-300 dark:text-slate-600" />
            <p className="mt-3 text-sm text-slate-400 dark:text-slate-500">No tasks in this view</p>
          </div>
        )}
      </div>
    </div>
  );
}
