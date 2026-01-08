
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Sparkles, Layout, TrendingUp, Image as ImageIcon, Video, Mic, 
  Settings, LogOut, Search, Bell, ArrowRight, Zap, Target, Flame, Users,
  Menu, X, CheckCircle, ChevronRight
} from 'lucide-react';
import { ViewState, DashboardTab, ThumbnailAsset } from './types';
import { Overview } from './components/Dashboard/Overview';
import { ThumbnailGenerator } from './components/Dashboard/ThumbnailGenerator';
import { StrategyHub } from './components/Dashboard/StrategyHub';
import { MediaLab } from './components/Dashboard/MediaLab';
import { Sidebar } from './components/Layout/Sidebar';
import { Auth } from './components/Auth/Auth';

const InfiniteMarquee = () => (
  <div className="w-full border-y border-white/5 py-6 overflow-hidden select-none bg-[#0F0F0F]">
    <div className="animate-marquee whitespace-nowrap flex items-center">
      {[...Array(10)].map((_, i) => (
        <div key={i} className="flex items-center mx-8">
          <span className="text-[11px] font-black uppercase tracking-[0.4em] flex items-center gap-6 text-slate-500">
            <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_12px_#ff0000]" />
            VIRAL THUMBNAILS • AI GENERATED • CTR MASTERY • GROWTH HACKING • ELITE STRATEGY
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default function App() {
  const [view, setView] = useState<ViewState>('landing');
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const LandingPage = () => (
    <div className="min-h-screen bg-[#0F0F0F]">
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-8 flex justify-center">
        <div className="glass-dark rounded-[2.5rem] flex items-center justify-between px-10 py-5 w-full max-w-7xl shadow-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center rotate-3 shadow-lg shadow-red-600/40">
              <Play className="text-white fill-current" size={20} />
            </div>
            <span className="text-xl font-black tracking-tighter text-white uppercase">
              ELITE <span className="text-red-600">MASTER</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            {['Creators', 'Ecosystem', 'Pricing'].map(l => (
              <button key={l} className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-red-600 transition-all">{l}</button>
            ))}
          </div>
          <button onClick={() => setView('auth')} className="px-8 py-3.5 rounded-2xl bg-red-600 text-white text-xs font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-600/20">
            Launch Studio
          </button>
        </div>
      </nav>

      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-32 text-center hero-gradient">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-red-600/20 bg-red-600/5 text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
            <Zap size={14} className="animate-pulse" /> Gemini 3.0 & Veo Powered
          </div>
          <h1 className="text-6xl sm:text-8xl lg:text-[140px] font-black tracking-tighter leading-[0.85] mb-12 text-white uppercase max-w-6xl">
            GO VIRAL <br /> <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">EFFORTLESSLY</span>
          </h1>
          <p className="text-slate-400 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
            The elite AI infrastructure for YouTubers. Generate high-CTR thumbnails, 
            cinematic B-rolls, and viral strategies in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <button onClick={() => setView('auth')} className="w-full sm:w-auto px-12 py-7 bg-red-600 text-white rounded-[2rem] font-black text-2xl shadow-[0_0_50px_rgba(255,0,0,0.3)] hover:scale-105 transition-all flex items-center gap-4">
              Get Started <ArrowRight size={28} />
            </button>
            <button className="w-full sm:w-auto px-12 py-7 glass-dark border border-white/10 rounded-[2rem] font-black text-2xl text-white hover:bg-white/5 transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      <InfiniteMarquee />

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <ImageIcon />, title: "CTR Optimizer", desc: "Generate pixel-perfect thumbnails designed by analyzing top-performing visual patterns." },
            { icon: <Target />, title: "Strategy Live", desc: "Real-time AI voice coaching to refine your titles, hooks, and content roadmap." },
            { icon: <Video />, title: "Veo Lab", desc: "Create high-end cinematic stock footage and intros using latest video generation models." }
          ].map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-[#1F1F1F] border border-white/5 hover:border-red-600/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-600 mb-8 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-white uppercase mb-4 tracking-tight">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );

  const DashboardLayout = () => (
    <div className="flex h-screen bg-[#0F0F0F] overflow-hidden">
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(t) => { setActiveTab(t); setIsSidebarOpen(false); }} 
        isOpen={isSidebarOpen}
        onLogout={() => setView('landing')}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-4 sm:px-10 flex items-center justify-between bg-[#1F1F1F]/50 border-b border-white/5 shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-400">
              <Menu size={24} />
            </button>
            <div className="hidden sm:block relative w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search studio..." 
                className="w-full pl-12 pr-4 py-2.5 bg-[#0F0F0F] border border-white/5 rounded-2xl text-xs font-medium outline-none focus:border-red-600/50"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full border-2 border-[#1F1F1F]" />
            </button>
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-sm shadow-xl shadow-red-600/20">
              YT
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto custom-scrollbar p-6 sm:p-10 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'overview' && <Overview />}
              {activeTab === 'generator' && <ThumbnailGenerator />}
              {activeTab === 'strategy' && <StrategyHub />}
              {activeTab === 'media-lab' && <MediaLab />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {view === 'landing' && (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage />
          </motion.div>
        )}
        {view === 'auth' && (
          <motion.div key="auth" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <Auth onSuccess={() => setView('dashboard')} onBack={() => setView('landing')} />
          </motion.div>
        )}
        {view === 'dashboard' && (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <DashboardLayout />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
