import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/views/Dashboard';
import { Contacts } from '@/views/Contacts';
import { Companies } from '@/views/Companies';
import { DealsPipeline } from '@/views/DealsPipeline';
import { Tasks } from '@/views/Tasks';
import { Analytics } from '@/views/Analytics';
import { Settings } from '@/views/Settings';
import type { View } from '@/types';
import { classNames } from '@/lib/utils';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const renderView = () => {
    switch (view) {
      case 'dashboard': return <Dashboard />;
      case 'contacts': return <Contacts />;
      case 'companies': return <Companies />;
      case 'deals': return <DealsPipeline />;
      case 'tasks': return <Tasks />;
      case 'analytics': return <Analytics />;
      case 'settings': return <Settings dark={dark} onToggleDark={() => setDark((d) => !d)} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar
        currentView={view}
        onNavigate={setView}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />

      <div className={classNames('transition-all duration-300', collapsed ? 'ml-16' : 'ml-60')}>
        <Header view={view} dark={dark} onToggleDark={() => setDark((d) => !d)} />

        <main className="p-6">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
