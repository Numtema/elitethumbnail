
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Layout, Sparkles, Target, Video, BarChart3, Settings, LogOut, Play, ChevronRight 
} from 'lucide-react';
import { DashboardTab } from '../../types';

interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  isOpen: boolean;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, onLogout }) => {
  const menuItems: { id: DashboardTab; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: <Layout size={20} /> },
    { id: 'generator', label: 'AI Thumbnail', icon: <Sparkles size={20} /> },
    { id: 'strategy', label: 'Strategy Hub', icon: <Target size={20} /> },
    { id: 'media-lab', label: 'Media Lab', icon: <Video size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 size={20} /> },
  ];

  return (
    <aside className={`
      fixed inset-y-0 left-0 z-50 w-[300px] bg-[#0F0F0F] border-r border-white/5 transition-transform duration-300 transform lg:static lg:translate-x-0
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center rotate-3">
            <Play className="text-white fill-current" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-white uppercase leading-none">ELITE</span>
            <span className="text-[10px] font-black tracking-[0.3em] text-red-600 uppercase">STUDIO</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 mt-6 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`
              w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all relative group
              ${activeTab === item.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}
            `}
          >
            <span className="relative z-10">{item.icon}</span>
            <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.2em] flex-1 text-left">{item.label}</span>
            {activeTab === item.id && <ChevronRight size={14} className="relative z-10" />}
            
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-red-600 rounded-3xl -z-0"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="p-8 mt-auto space-y-2">
        <button className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-slate-500 hover:text-white hover:bg-white/5 transition-all text-[11px] font-black uppercase tracking-widest">
          <Settings size={20} /> Settings
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-3xl text-slate-500 hover:text-red-500 hover:bg-red-500/10 transition-all text-[11px] font-black uppercase tracking-widest"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};
