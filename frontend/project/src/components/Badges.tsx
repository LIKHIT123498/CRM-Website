import type { Priority, Status, DealStage } from '@/types';
import { classNames } from '@/lib/utils';

const priorityStyles: Record<Priority, string> = {
  High: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  Low: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

const statusStyles: Record<Status, string> = {
  Active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  Inactive: 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
  Lead: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <span className={classNames('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', priorityStyles[priority])}>
      {priority}
    </span>
  );
}

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={classNames('inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium', statusStyles[status])}>
      <span className={classNames('h-1.5 w-1.5 rounded-full', status === 'Active' ? 'bg-emerald-500' : status === 'Lead' ? 'bg-blue-500' : 'bg-slate-400')} />
      {status}
    </span>
  );
}

export function StageBadge({ stage }: { stage: DealStage }) {
  const styles: Record<DealStage, string> = {
    'Lead In': 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
    'Contacted': 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
    'Proposal Sent': 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
    'Negotiation': 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-400',
    'Closed-Won': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
    'Closed-Lost': 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400',
  };
  return (
    <span className={classNames('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', styles[stage])}>
      {stage}
    </span>
  );
}

interface AvatarProps {
  initials: string;
  color: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ initials, color, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'h-7 w-7 text-[10px]',
    md: 'h-9 w-9 text-xs',
    lg: 'h-14 w-14 text-base',
  };
  return (
    <div className={classNames('flex shrink-0 items-center justify-center rounded-full font-bold text-white', color, sizes[size])}>
      {initials}
    </div>
  );
}

export function LogoAvatar({ initials, color, size = 'md' }: { initials: string; color: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: 'h-7 w-7 text-[10px] rounded-md',
    md: 'h-9 w-9 text-xs rounded-lg',
    lg: 'h-14 w-14 text-base rounded-xl',
  };
  return (
    <div className={classNames('flex shrink-0 items-center justify-center font-bold text-white', color, sizes[size])}>
      {initials}
    </div>
  );
}
