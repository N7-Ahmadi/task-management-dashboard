// 


import { useState } from 'react';
import { LayoutDashboard, CheckSquare, Settings, User, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard },
    { label: 'All Tasks', icon: CheckSquare },
    { label: 'Profile', icon: User },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
            TF
          </div>
          <span className="font-bold text-slate-800 dark:text-slate-100 text-lg">TaskFlow</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className="p-2 rounded-lg text-gray-500 dark:text-slate-400">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>
          <button onClick={() => setIsOpen(true)} className="p-2 rounded-lg text-gray-600 dark:text-slate-300">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div onClick={() => setIsOpen(false)} className="lg:hidden fixed inset-0 bg-slate-900/60 z-40" />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 bottom-0 left-0 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 w-64 z-50 transition-all duration-300 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-base">
                TF
              </div>
              <span className="font-bold text-slate-800 dark:text-slate-100 text-xl tracking-tight">TaskFlow</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="lg:hidden p-1.5 rounded-lg text-gray-400 dark:text-slate-500">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => {
                    setActiveTab(item.label);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-slate-800 space-y-3">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-slate-500 font-bold">
              {theme}
            </span>
          </button>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center gap-3 border border-gray-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold flex items-center justify-center text-xs shrink-0">
              AH
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">Ahmadi</p>
              <p className="text-[10px] text-gray-500 dark:text-slate-400 truncate">ahmadi@taskflow.io</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};