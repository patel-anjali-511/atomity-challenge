import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { IntroSection } from './components/IntroSection';
import { TopologyView } from './components/TopologyView';
import { MetricsCard } from './components/MetricsCard';
import { useWorkloadData } from './hooks/useWorkloadData';
import type { Workload } from './hooks/useWorkloadData';
import { ShieldAlert, RefreshCw, Sparkles, TrendingDown, Leaf, Shield } from 'lucide-react';

const App: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const { data, isLoading, isError, error, refetch, isRefetching } = useWorkloadData();
  const [localWorkloads, setLocalWorkloads] = useState<Workload[]>([]);
  const [activeWorkload, setActiveWorkload] = useState<Workload | null>(null);
  const shouldReduceMotion = useReducedMotion();

  
  useEffect(() => {
    if (data) {
      setLocalWorkloads(data);
      
      const firstOver = data.find((w) => w.status === 'over-provisioned');
      if (firstOver) {
        setActiveWorkload(firstOver);
      } else if (data.length > 0) {
        setActiveWorkload(data[0]);
      }
    }
  }, [data]);

  
  const handleSelectWorkload = (workload: Workload) => {
    
    const current = localWorkloads.find((w) => w.id === workload.id);
    if (current) {
      setActiveWorkload(current);
    }
  };

  
  const handleOptimizeWorkload = (id: number) => {
    setLocalWorkloads((prev) =>
      prev.map((w) => {
        if (w.id === id) {
          const updated: Workload = {
            ...w,
            status: 'optimized',
            metrics: {
              ...w.metrics,
              estimatedSavings: 0,
            },
          };
          setActiveWorkload(updated);
          return updated;
        }
        return w;
      })
    );
  };

  
  const totalPotentialSavings = localWorkloads
    .filter((w) => w.status === 'over-provisioned')
    .reduce((acc, w) => acc + w.metrics.estimatedSavings, 0);

  const activeWasteCount = localWorkloads.filter((w) => w.status === 'over-provisioned').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 grid-bg transition-colors duration-300 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {!showDashboard ? (
            <motion.div
              key="intro"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <IntroSection onOptimize={() => setShowDashboard(true)} />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, type: 'spring', damping: 25 }}
              className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-zinc-800 pb-6">
                <div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-zinc-50 flex items-center gap-2">
                    Orchestration Controller <Sparkles className="w-5 h-5 text-emerald-500" />
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 mt-1">
                    Compliance-aware workload governance and cluster resource rightsizing.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="glass px-4 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                      <TrendingDown className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">Total Waste</span>
                      <span className="text-sm font-extrabold text-slate-800 dark:text-zinc-100 block">
                        ${totalPotentialSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo
                      </span>
                    </div>
                  </div>

                  <div className="glass px-4 py-3 rounded-2xl border border-slate-200 dark:border-zinc-800 flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      activeWasteCount > 0 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-500'
                    }`}>
                      {activeWasteCount > 0 ? <ShieldAlert className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-zinc-500 block">Action Needed</span>
                      <span className="text-sm font-extrabold text-slate-800 dark:text-zinc-100 block">
                        {activeWasteCount > 0 ? `${activeWasteCount} Over-provisioned` : 'All Optimal'}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => refetch()}
                    disabled={isLoading || isRefetching}
                    className="h-12 px-4 rounded-2xl glass hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 transition-all flex items-center gap-2 text-sm font-medium hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefetching && 'animate-spin'}`} />
                    {isRefetching ? 'Updating...' : 'Sync API'}
                  </button>
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-slate-400">
                  <RefreshCw className="w-8 h-8 animate-spin text-emerald-500 mb-4" />
                  <p className="text-sm font-medium">Fetching real-time workload topology from public API...</p>
                </div>
              ) : isError ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center max-w-md mx-auto">
                  <ShieldAlert className="w-12 h-12 text-rose-500 mb-4" />
                  <h3 className="text-lg font-bold text-slate-900 dark:text-zinc-100">API Connection Failed</h3>
                  <p className="text-sm text-slate-500 dark:text-zinc-400 mt-2 mb-6">
                    {error?.message || 'Could not fetch cloud data. Check your network connection.'}
                  </p>
                  <button
                    onClick={() => refetch()}
                    className="px-6 py-2.5 bg-rose-500 text-white rounded-xl text-sm font-semibold shadow-lg hover:bg-rose-600 transition-colors"
                  >
                    Retry Connection
                  </button>
                </div>
              ) : (
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mt-4">
                  <div className="lg:col-span-2 flex flex-col justify-center">
                    <TopologyView
                      workloads={localWorkloads}
                      activeWorkload={activeWorkload}
                      onSelectWorkload={handleSelectWorkload}
                    />
                  </div>

                  <div className="lg:col-span-1 min-h-[350px] lg:min-h-0 flex flex-col">
                    <MetricsCard
                      workload={activeWorkload}
                    />
                    {activeWorkload && activeWorkload.status === 'over-provisioned' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-4 p-4 rounded-2xl bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-[#10b981] flex items-center justify-between shadow-sm cursor-pointer hover:bg-emerald-500/10 transition-colors"
                        onClick={() => handleOptimizeWorkload(activeWorkload.id)}
                      >
                        <span className="flex items-center gap-1.5">
                          <Leaf className="w-4 h-4 text-emerald-500" />
                          Optimize workload to reduce cost and carbon footprint
                        </span>
                        <span className="font-bold underline">Apply Right-sizing</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <footer className="py-6 border-t border-slate-200 dark:border-zinc-900 text-center text-xs text-slate-400 dark:text-zinc-500 mt-12">
        &copy; {new Date().getFullYear()} Atomity GmbH. All rights reserved. Sovereign Cloud Intelligence.
      </footer>
    </div>
  );
};

export default App;
