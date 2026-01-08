
import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Users, TrendingUp, Target, Plus, ChevronRight } from 'lucide-react';
import { KPIStats } from '../../types';

export const Overview: React.FC = () => {
  const stats: KPIStats[] = [
    { label: 'Potential Views', value: '1.2M', trend: 'up', color: 'text-red-500' },
    { label: 'Avg CTR', value: '12.4%', trend: 'up', color: 'text-green-500' },
    { label: 'Active Concepts', value: '24', trend: 'neutral', color: 'text-blue-500' },
    { label: 'Viral Score', value: '88/100', trend: 'up', color: 'text-orange-500' },
  ];

  return (
    <div className="space-y-12">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tighter uppercase leading-none mb-4">Creator Overview</h1>
          <p className="text-slate-500 font-medium">Tracking your channel's viral trajectory with AI precision.</p>
        </div>
        <button className="px-8 py-4 bg-red-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-red-600/20 flex items-center gap-2">
          <Plus size={18} /> New Concept
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-[#1F1F1F] border border-white/5"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-red-600">
                {i === 0 ? <Flame size={20} /> : i === 1 ? <TrendingUp size={20} /> : i === 2 ? <Target size={20} /> : <Users size={20} />}
              </div>
              <span className={`text-xs font-black uppercase tracking-widest ${stat.color}`}>+{stat.trend === 'up' ? '14%' : '0%'}</span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-10 rounded-[3rem] bg-[#1F1F1F] border border-white/5 relative overflow-hidden group">
          <div className="relative z-10">
            <span className="px-4 py-1 rounded-full bg-red-600 text-[9px] font-black uppercase tracking-widest mb-6 inline-block">Trending Concept</span>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase leading-none mb-6">"I Survived 100 Days in AI Studio"</h2>
            <p className="text-slate-400 text-sm font-medium mb-10 max-w-md">Gemini predicts this title will achieve a 15% higher CTR than your current average. Ready to generate the thumbnail?</p>
            <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-red-600 hover:text-white transition-all">Generate Assets</button>
          </div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-red-600/10 rounded-full blur-[80px] group-hover:scale-110 transition-transform duration-1000" />
        </div>

        <div className="p-10 rounded-[3rem] bg-[#1F1F1F] border border-white/5 flex flex-col items-center justify-center text-center">
          <div className="relative w-40 h-40 mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-white/5" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="#FF0000" strokeWidth="10" strokeDasharray="210 282.6" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">75%</span>
            </div>
          </div>
          <h4 className="text-xl font-black text-white uppercase mb-2">Weekly Goal</h4>
          <p className="text-slate-500 text-xs leading-relaxed">3/4 viral concepts ready for production.</p>
        </div>
      </div>
    </div>
  );
};
