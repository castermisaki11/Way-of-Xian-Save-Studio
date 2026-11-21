'use client';

import { useEffect, useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

function getSnapshot(): boolean {
  const saved = localStorage.getItem('wox-theme');
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getServerSnapshot(): boolean {
  return false;
}

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  const onChange = () => callback();
  mq.addEventListener('change', onChange);
  window.addEventListener('wox-theme-change', onChange);
  window.addEventListener('storage', onChange);
  return () => {
    mq.removeEventListener('change', onChange);
    window.removeEventListener('wox-theme-change', onChange);
    window.removeEventListener('storage', onChange);
  };
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const toggle = () => {
    const next = !dark;
    localStorage.setItem('wox-theme', next ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', next);
    window.dispatchEvent(new Event('wox-theme-change'));
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? 'สลับเป็นโหมดสว่าง' : 'สลับเป็นโหมดมืด'}
      className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-teal-700 focus-visible:outline-none sm:min-h-[40px] dark:border-slate-800 dark:bg-[#121821] dark:text-slate-200 dark:hover:bg-slate-800/70 dark:focus-visible:ring-teal-400 whitespace-nowrap shrink-0"
    >
      {dark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-600" />}
      <span>{dark ? 'โหมดสว่าง' : 'โหมดมืด'}</span>
    </button>
  );
}
