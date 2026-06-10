import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ArrowRight } from 'lucide-react';

interface IntroSectionProps {
  onOptimize: () => void;
}

export const IntroSection: React.FC<IntroSectionProps> = ({ onOptimize }) => {
  return (
    <section className="relative py-16 px-4 flex flex-col items-center justify-center max-w-5xl mx-auto text-center min-h-[70vh]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-zinc-50 dark:via-zinc-200 dark:to-zinc-50 bg-clip-text text-transparent"
      >
        Cloud Cost & Carbon Intelligence
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="text-lg md:text-xl text-slate-500 dark:text-zinc-400 max-w-2xl mb-12"
      >
        Sovereign, compliance-first, and highly optimized workload routing across public and private infrastructure.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.2 }}
        className="glass relative w-full max-w-3xl rounded-3xl p-8 md:p-12 shadow-xl border mb-12 flex flex-col md:flex-row items-center justify-around gap-8 group hover:shadow-emerald-500/5 transition-shadow"
      >
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [12, 10, 14, 12] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: 'easeInOut' 
          }}
          className="absolute -top-6 -right-4 bg-[#10b981] text-white text-lg md:text-xl font-bold px-4 py-2 rounded-2xl shadow-lg border border-emerald-400 flex items-center gap-0.5 pointer-events-none z-10"
        >
          <DollarSign className="w-5 h-5" />
          <DollarSign className="w-5 h-5" />
          <DollarSign className="w-5 h-5" />
        </motion.div>

        <div className="flex flex-col items-center gap-2 select-none grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300">
          <svg className="h-10 md:h-12 w-auto" viewBox="0 0 100 40" fill="currentColor">
            <path d="M12 25c0-4.8 2.6-6.5 6.2-6.5 2.1 0 3.8.7 3.8.7v1.8s-1.5-.5-3.1-.5c-2.4 0-4 1.1-4 4.3 0 2.8 1.4 4 3.7 4 1.8 0 3.4-.6 3.4-.6v1.9s-1.4.6-3.7.6c-4 0-6.3-2.1-6.3-5.9zM29 15h3.2l2.9 11.2 3.1-11.2h3.2l3.1 11.2 2.9-11.2h3.2l-4.5 16h-3.2l-3.1-11.2-3.1 11.2h-3.2L29 15z" className="fill-slate-800 dark:fill-zinc-300"/>
            <path d="M59 28.5c0-2.3 1.9-3.8 4.6-3.8 1.7 0 2.9.5 2.9.5v1.2c0 2.4-1.6 3.4-3.8 3.4-2.3 0-3.7-1.3-3.7-3.3zm7.5-6.8s-1.8-.7-3.9-.7c-4.4 0-7.8 2.7-7.8 7.3 0 4.2 2.8 6.7 7 6.7 2.3 0 3.9-.7 3.9-.7v.5c0 1.2-.8 2.3-2.7 2.3-1.6 0-3-.5-3-.5v1.8s1.3.5 3 .5c3.2 0 5.4-1.8 5.4-5.3V21.7z" className="fill-slate-800 dark:fill-zinc-300"/>
            <path d="M15 35c20 8 46 8 66 0 3.3-1.3 6-3.5 4.5-5.5-1.1-1.4-4-.7-6.2.2-18 8-41.5 8-59.5 0-2.2-.9-5.1-1.6-6.2-.2-1.5 2 1.2 4.2 4.5 5.5z" fill="#FF9900"/>
            <path d="M82.5 27.5c-1-.5-3.5-1.5-6.2-.5-.5.2-.8.8-.5 1.3 1 2 2.5 4 4.5 4.5.5.1 1-.2 1-.8-.2-1.5-1.5-3.5-3.8-4.5z" fill="#FF9900"/>
          </svg>
          <span className="text-xs font-semibold tracking-wider text-slate-400 group-hover:text-amber-500 transition-colors uppercase">Web Services</span>
        </div>

        <div className="h-px w-16 md:h-12 md:w-px bg-slate-200 dark:bg-zinc-800" />

        <div className="flex flex-col items-center gap-2 select-none grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300">
          <svg className="h-10 md:h-12 w-auto" viewBox="0 0 120 40" fill="currentColor">
            <path d="M2.5 31.2l9.7-18.7c.5-1 1.6-1.6 2.7-1.6h17.3c1.7 0 2.6 1.9 1.6 3.2L14.7 34.4c-.6.9-1.6 1.4-2.7 1.4H4.2c-1.8.2-2.7-1.8-1.7-3.2z" fill="#0078d4"/>
            <path d="M43.7 36c-1.1 0-2.1-.5-2.7-1.4L21.7 14.1c-1-1.3-.1-3.2 1.6-3.2H40.6c1.1 0 2.2.6 2.7 1.6l9.7 18.7c1 1.4 0 3.4-1.6 3.4H43.7z" fill="#50e6ff"/>
            <span className="text-xl font-bold font-sans text-slate-800 dark:text-zinc-200 ml-1">Azure</span>
          </svg>
          <span className="text-xs font-semibold tracking-wider text-slate-400 group-hover:text-blue-500 transition-colors uppercase">Microsoft Cloud</span>
        </div>

        <div className="h-px w-16 md:h-12 md:w-px bg-slate-200 dark:bg-zinc-800" />

        <div className="flex flex-col items-center gap-2 select-none grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300">
          <div className="flex items-center gap-1.5">
            <svg className="h-9 w-9" viewBox="0 0 24 24">
              <path d="M12.24 10.285V14.4h6.887c-.648 2.433-2.76 4.119-5.719 4.119-3.707 0-6.735-3.003-6.735-6.697 0-3.69 3.028-6.696 6.735-6.696 1.677 0 3.197.608 4.385 1.603l3.057-3.057C18.665 1.943 15.651 1 12.24 1c-6.104 0-11 4.896-11 11s4.896 11 11 11c6.353 0 10.556-4.462 10.556-10.73 0-.742-.08-1.285-.198-1.998H12.24z" fill="#ea4335" />
            </svg>
            <span className="text-xl font-bold font-sans text-slate-800 dark:text-zinc-200 tracking-tight">Google Cloud</span>
          </div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 group-hover:text-red-500 transition-colors uppercase">Google Platform</span>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        onClick={onOptimize}
        className="relative px-8 py-4 bg-slate-900 text-white dark:bg-zinc-50 dark:text-zinc-950 font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center gap-3 group text-base md:text-lg overflow-hidden border border-transparent dark:hover:border-emerald-500 hover:border-emerald-500/50"
      >
        <span className="relative z-10">Analyze & Optimize Clusters</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </motion.button>
    </section>
  );
};
