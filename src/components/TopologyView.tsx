import React from 'react';
import { motion } from 'framer-motion';
import type { Workload } from '../hooks/useWorkloadData';
import { Cpu, HardDrive, Network, Layers, ShieldCheck } from 'lucide-react';

interface TopologyViewProps {
  workloads: Workload[];
  activeWorkload: Workload | null;
  onSelectWorkload: (workload: Workload) => void;
}

export const TopologyView: React.FC<TopologyViewProps> = ({
  workloads,
  activeWorkload,
  onSelectWorkload,
}) => {
  
  const awsWorkloads = workloads.filter((w) => w.category === 'aws');
  const azureWorkloads = workloads.filter((w) => w.category === 'azure');
  const gcpWorkloads = workloads.filter((w) => w.category === 'gcp');
  const onPremiseWorkloads = workloads.filter((w) => w.category === 'on-premise');

  
  const totalWorkloads = workloads.length;
  const optimizedCount = workloads.filter((w) => w.status === 'optimized').length;
  const optimizationScore = Math.round((optimizedCount / totalWorkloads) * 100);

  
  const totalCpu = workloads.reduce((acc, w) => acc + parseInt(w.metrics.cpuUsage), 0);
  const totalMemory = workloads.reduce((acc, w) => acc + parseInt(w.metrics.memoryUsage), 0);
  
  
  const maxCpu = 2500;
  const maxMemory = 8000;

  const cpuPercent = Math.min(100, Math.round((totalCpu / maxCpu) * 100));
  const memoryPercent = Math.min(100, Math.round((totalMemory / maxMemory) * 100));

  
  const heptagonPoints = "50,5 90,20 95,65 70,95 30,95 5,65 10,20";

  
  const hexPositions = [
    { x: 50, y: 30 }, 
    { x: 30, y: 60 }, 
    { x: 70, y: 60 }, 
    { x: 50, y: 78 }, 
  ];

  const renderCloudCluster = (
    title: string,
    _category: Workload['category'],
    clusterWorkloads: Workload[],
    logo: React.ReactNode
  ) => {
    return (
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          {logo}
          <span className="text-sm font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
            {title}
          </span>
        </div>

        <div className="relative w-44 h-44 md:w-52 md:h-52 select-none">
          <svg className="w-full h-full drop-shadow-md" viewBox="0 0 100 100">
            <polygon
              points={heptagonPoints}
              className="fill-slate-50/50 stroke-slate-200 dark:fill-zinc-900/40 dark:stroke-zinc-800 transition-colors"
              strokeWidth="1.5"
            />

            {clusterWorkloads.slice(0, 4).map((workload, idx) => {
              const pos = hexPositions[idx];
              const isSelected = activeWorkload?.id === workload.id;
              const isOptimized = workload.status === 'optimized';

              
              const r = 11;
              const hexPoints = [
                `${pos.x},${pos.y - r}`,
                `${pos.x + r * 0.866},${pos.y - r * 0.5}`,
                `${pos.x + r * 0.866},${pos.y + r * 0.5}`,
                `${pos.x},${pos.y + r}`,
                `${pos.x - r * 0.866},${pos.y + r * 0.5}`,
                `${pos.x - r * 0.866},${pos.y - r * 0.5}`,
              ].join(' ');

              return (
                <g 
                  key={workload.id}
                  onClick={() => onSelectWorkload(workload)}
                  className="cursor-pointer group"
                >
                  <polygon
                    points={hexPoints}
                    className={`transition-all duration-300 ${
                      isSelected 
                        ? 'fill-emerald-500/20 stroke-emerald-500' 
                        : isOptimized
                          ? 'fill-emerald-500/10 stroke-emerald-500/40 group-hover:fill-emerald-500/20'
                          : 'fill-rose-500/10 stroke-rose-500/40 group-hover:fill-rose-500/20'
                    }`}
                    strokeWidth={isSelected ? '2' : '1.2'}
                  />
                  
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="2.5"
                    className={`transition-all duration-300 ${
                      isOptimized ? 'fill-emerald-500' : 'fill-rose-500 animate-pulse'
                    }`}
                  />
                  
                  <polygon
                    points={hexPoints}
                    className="fill-transparent stroke-transparent"
                    style={{ pointerEvents: 'auto' }}
                  />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 flex flex-col gap-8">
      <div className="hidden md:grid grid-cols-5 items-center justify-items-center relative min-h-[500px]">
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <motion.path
            d="M 170 120 Q 300 120 400 230"
            className="fill-none stroke-slate-200 dark:stroke-zinc-800 animate-dash"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M 170 380 Q 300 380 400 270"
            className="fill-none stroke-slate-200 dark:stroke-zinc-800 animate-dash"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M 600 230 Q 700 120 830 120"
            className="fill-none stroke-slate-200 dark:stroke-zinc-800 animate-dash"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.path
            d="M 600 270 Q 700 380 830 380"
            className="fill-none stroke-slate-200 dark:stroke-zinc-800 animate-dash"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        </svg>

        <div className="col-span-1 flex flex-col gap-12 z-10">
          {renderCloudCluster(
            'AWS', 
            'aws', 
            awsWorkloads,
            <span className="text-amber-500 font-extrabold text-xs">AWS</span>
          )}
          {renderCloudCluster(
            'Google Cloud', 
            'gcp', 
            gcpWorkloads,
            <span className="text-red-500 font-extrabold text-xs">GCP</span>
          )}
        </div>

        <div className="col-span-1" />

        <div className="col-span-1 flex justify-center z-10 w-full min-w-[260px]">
          <motion.div
            layout
            className="glass rounded-3xl p-6 border border-slate-200 dark:border-zinc-800/80 shadow-xl flex flex-col items-center w-full relative"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-[#10b981] border border-emerald-500/20 text-[10px] uppercase font-black tracking-widest select-none shadow-sm shadow-emerald-500/5">
              <ShieldCheck className="w-3.5 h-3.5" />
              Score: {optimizationScore}%
            </div>

            <h3 className="text-sm font-extrabold tracking-widest text-slate-400 dark:text-zinc-500 uppercase mt-4 mb-6">
              Total Resources
            </h3>

            <div className="flex justify-around w-full gap-4 mb-6">
              <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-28 bg-slate-100 dark:bg-zinc-800/50 rounded-full relative overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${cpuPercent}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                  />
                </div>
                <Cpu className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">CPU</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-28 bg-slate-100 dark:bg-zinc-800/50 rounded-full relative overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${memoryPercent}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                  />
                </div>
                <HardDrive className="w-4 h-4 text-indigo-500" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">RAM</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-5 h-28 bg-slate-100 dark:bg-zinc-800/50 rounded-full relative overflow-hidden border border-slate-200/50 dark:border-zinc-800">
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-emerald-500 rounded-full"
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(20, optimizationScore)}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                  />
                </div>
                <Network className="w-4 h-4 text-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">NET</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-zinc-500">
                ACTIVE WORKLOADS
              </span>
              <p className="text-2xl font-black text-slate-800 dark:text-zinc-100 mt-0.5">
                {totalWorkloads} <span className="text-sm font-normal text-slate-400">Nodes</span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="col-span-1" />

        <div className="col-span-1 flex flex-col gap-12 z-10">
          {renderCloudCluster(
            'Azure', 
            'azure', 
            azureWorkloads,
            <span className="text-blue-500 font-extrabold text-xs">Azure</span>
          )}
          {renderCloudCluster(
            'On-Premise', 
            'on-premise', 
            onPremiseWorkloads,
            <div className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              <span className="text-zinc-500 font-extrabold text-xs">ON-PREM</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex md:hidden flex-col gap-8 items-center">
        <div className="glass rounded-2xl p-5 border border-slate-200 dark:border-zinc-800 w-full max-w-sm flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-[#10b981] font-bold border border-emerald-500/20 text-sm">
              {optimizationScore}%
            </div>
            <div>
              <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-zinc-500 block">System Score</span>
              <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">Clusters Optimized</span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[9px] uppercase font-black tracking-widest text-slate-400 dark:text-zinc-500 block">Nodes Online</span>
            <span className="text-sm font-bold text-slate-800 dark:text-zinc-200">{totalWorkloads} Workloads</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-md">
          {renderCloudCluster(
            'AWS', 
            'aws', 
            awsWorkloads,
            <span className="text-amber-500 font-bold text-xs">AWS</span>
          )}
          {renderCloudCluster(
            'Azure', 
            'azure', 
            azureWorkloads,
            <span className="text-blue-500 font-bold text-xs">Azure</span>
          )}
          {renderCloudCluster(
            'Google Cloud', 
            'gcp', 
            gcpWorkloads,
            <span className="text-red-500 font-bold text-xs">GCP</span>
          )}
          {renderCloudCluster(
            'On-Premise', 
            'on-premise', 
            onPremiseWorkloads,
            <span className="text-zinc-500 font-bold text-xs">ON-PREM</span>
          )}
        </div>
      </div>
    </div>
  );
};
