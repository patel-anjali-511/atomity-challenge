import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, DollarSign, Cpu, HardDrive } from 'lucide-react';
import type { Workload } from '../hooks/useWorkloadData';

interface MetricsCardProps {
  workload: Workload | null;
}

export const MetricsCard: React.FC<MetricsCardProps> = ({ workload }) => {
  const [animatedSavings, setAnimatedSavings] = useState(0);

  useEffect(() => {
    if (!workload) return;
    
    const target = workload.metrics.estimatedSavings;
    if (target === 0) {
      setAnimatedSavings(0);
      return;
    }

    let start = 0;
    const duration = 800; 
    const frameRate = 30; 
    const totalFrames = duration / frameRate;
    const step = target / totalFrames;

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setAnimatedSavings(target);
        clearInterval(timer);
      } else {
        setAnimatedSavings(parseFloat(start.toFixed(1)));
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [workload]);

  if (!workload) {
    return (
      <div className="glass w-full h-full rounded-2xl border border-slate-200 dark:border-zinc-800 p-8 flex flex-col items-center justify-center text-center text-slate-400 dark:text-zinc-500">
        <AlertCircle className="w-8 h-8 mb-3 opacity-60" />
        <p className="text-sm font-medium">Select a workload node in the topology map to inspect real-time metrics.</p>
      </div>
    );
  }

  const isOptimized = workload.status === 'optimized';

  return (
    <div className="container-query-wrapper w-full h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="glass w-full h-full rounded-2xl border border-slate-200 dark:border-zinc-800 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden"
      >
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16 opacity-20 transition-all ${
          isOptimized ? 'bg-emerald-500' : 'bg-rose-500'
        }`} />

        <div className="flex flex-col gap-1.5 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold tracking-widest text-[#10b981]">
              {workload.category} workload
            </span>
            <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
              isOptimized 
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
            }`}>
              {isOptimized ? <ShieldCheck className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              {isOptimized ? 'Optimized' : 'Over-provisioned'}
            </div>
          </div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-100 mt-1">
            {workload.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 italic">
            Ref: {workload.todoTitle}
          </p>
        </div>

        <div className="grid grid-cols-1 @[350px]:grid-cols-2 gap-4 mb-6">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800/50">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 block">CPU Core Usage</span>
              <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 block mt-0.5">
                {workload.metrics.cpuUsage} <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">/ {workload.metrics.cpuRequest} req</span>
              </span>
              <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (parseInt(workload.metrics.cpuUsage) / parseInt(workload.metrics.cpuRequest)) * 100)}%` }} 
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50/50 dark:bg-zinc-800/40 border border-slate-100 dark:border-zinc-800/50">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500 block">Memory Allocation</span>
              <span className="text-sm font-bold text-slate-800 dark:text-zinc-200 block mt-0.5">
                {workload.metrics.memoryUsage} <span className="text-xs font-normal text-slate-400 dark:text-zinc-500">/ {workload.metrics.memoryRequest} req</span>
              </span>
              <div className="w-full bg-slate-200 dark:bg-zinc-700 h-1.5 rounded-full mt-2 overflow-hidden">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-500" 
                  style={{ width: `${Math.min(100, (parseInt(workload.metrics.memoryUsage) / (parseInt(workload.metrics.memoryRequest) * 1024)) * 100)}%` }} 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto border-t border-slate-100 dark:border-zinc-800 pt-5">
          <div className={`p-4 rounded-xl flex items-center justify-between transition-all ${
            isOptimized 
              ? 'bg-slate-50/50 dark:bg-zinc-800/20' 
              : 'bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15'
          }`}>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-zinc-500">Estimated Cost Optimization</span>
              <div className="flex items-center text-slate-900 dark:text-zinc-50 mt-1">
                <span className={`text-2xl md:text-3xl font-extrabold flex items-center ${
                  !isOptimized && 'text-[#10b981]'
                }`}>
                  <DollarSign className="w-6 h-6 shrink-0" />
                  {animatedSavings.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                </span>
                <span className="text-xs text-slate-400 dark:text-zinc-500 ml-1.5 font-medium">/ month</span>
              </div>
            </div>
            {!isOptimized && (
              <div className="bg-[#10b981] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 select-none animate-pulse">
                Apply Action
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
