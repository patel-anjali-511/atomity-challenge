import React, { useEffect, useState } from 'react';
import { Sun, Moon, Shield } from 'lucide-react';
import { tokens } from '../tokens/colors';

export const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme as 'light' | 'dark';
      
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <header 
      className="glass sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between transition-all duration-300 border-b"
      style={{ borderColor: tokens.colors.borderPrimary }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-400/15 border border-emerald-500/25 flex items-center justify-center text-[#10b981]">
          <Shield className="w-5 h-5 animate-pulse" />
        </div>
        
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-zinc-50">Atomity</span>
            <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/10 text-[#10b981] border border-emerald-500/20">
              Sovereign
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-zinc-400 hidden sm:inline-block">
            Cloud Intelligence & Workload Orchestration
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-4">
        <a 
          href="https://atomity.de/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
        >
          Company
        </a>
        
        <button
          onClick={toggleTheme}
          aria-label="Toggle light/dark mode"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-200 transition-all duration-300 shadow-sm hover:scale-105"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </nav>
    </header>
  );
};
