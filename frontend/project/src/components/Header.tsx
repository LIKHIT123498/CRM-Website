import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun, ChevronDown, Settings, User, LogOut, CheckCheck } from 'lucide-react';
import type { View, Notification } from '@/types';
import { notifications as initialNotifications } from '@/data/mockData';
import { classNames } from '@/lib/utils';

interface HeaderProps {
  view: View;
  dark: boolean;
  onToggleDark: () => void;
}

const viewTitles: Record<View, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Overview of your sales performance' },
  contacts: { title: 'Contacts', subtitle: 'Manage your client relationships' },
  companies: { title: 'Companies', subtitle: 'Organizations in your pipeline' },
  deals: { title: 'Deals Pipeline', subtitle: 'Track deals through every stage' },
  tasks: { title: 'Tasks', subtitle: 'Stay on top of your action items' },
  analytics: { title: 'Analytics', subtitle: 'Deep dive into your metrics' },
  settings: { title: 'Settings', subtitle: 'Configure your workspace' },
};

const notifIcons: Record<Notification['type'], string> = {
  deal: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
  contact: 'bg-blue-100 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
  task: 'bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400',
  system: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
};

export function Header({ view, dark, onToggleDark }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [notifications, setNotifications] = useState(initialNotifications);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const { title, subtitle } = viewTitles[view];

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-slate-200 bg-white/80 px-6 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      {/* Title */}
      <div className="min-w-0">
        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="hidden text-xs text-slate-500 dark:text-slate-400 lg:block">{subtitle}</p>
      </div>

      {/* Search */}
      <div className="ml-auto hidden items-center md:flex">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts, deals, companies..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-700 placeholder-slate-400 transition-all focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-blue-500 dark:focus:ring-blue-500/20 lg:w-80"
          />
        </div>
      </div>

      {/* Dark mode toggle */}
      <button
        onClick={onToggleDark}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        title="Toggle theme"
      >
        {dark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
      </button>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button
          onClick={() => setNotifOpen((o) => !o)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <div className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
              <button
                onClick={markAllRead}
                className="flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((n) => (
                <div
                  key={n.id}
                  className={classNames(
                    'flex gap-3 border-b border-slate-100 px-4 py-3 last:border-0 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50',
                    !n.read && 'bg-blue-50/50 dark:bg-blue-500/5'
                  )}
                >
                  <div className={classNames('mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-bold', notifIcons[n.type])}>
                    {n.type[0].toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{n.description}</p>
                    <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">{n.time}</p>
                  </div>
                  {!n.read && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Profile */}
      <div className="relative" ref={profileRef}>
        <button
          onClick={() => setProfileOpen((o) => !o)}
          className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-xs font-bold text-white">
            AM
          </div>
          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold leading-tight text-slate-900 dark:text-white">Alex Morgan</p>
            <p className="text-xs leading-tight text-slate-500 dark:text-slate-400">Sales Manager</p>
          </div>
          <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
        </button>

        {profileOpen && (
          <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30">
            <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Alex Morgan</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">alex.morgan@nexuscrm.com</p>
            </div>
            <div className="py-1">
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                <User className="h-4 w-4" /> My Profile
              </button>
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800">
                <Settings className="h-4 w-4" /> Settings
              </button>
              <div className="my-1 border-t border-slate-100 dark:border-slate-800" />
              <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10">
                <LogOut className="h-4 w-4" /> Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
