
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Mail, Lock, ArrowRight, Github, Chrome, ShieldCheck, Zap } from 'lucide-react';

interface AuthProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ onSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-red-600/5 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[480px] z-10"
      >
        {/* Branding Header */}
        <div className="flex flex-col items-center mb-12 group cursor-pointer" onClick={onBack}>
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_rgba(255,0,0,0.4)] mb-6"
          >
            <Play className="text-white fill-current" size={36} />
          </motion.div>
          <h2 className="text-3xl font-black tracking-tighter text-white uppercase leading-none">
            ELITE <span className="text-red-600">MASTER</span>
          </h2>
          <div className="mt-2 flex items-center gap-2 text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">
            <Zap size={10} className="text-red-600" /> Authorized Access Only
          </div>
        </div>

        {/* Auth Card */}
        <div className="glass-dark border border-white/10 rounded-[3rem] p-10 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          
          <div className="flex bg-[#0F0F0F] p-1.5 rounded-2xl mb-10 border border-white/5">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Log In
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-red-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="group">
                <div className="relative">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors">
                    <Zap size={18} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Channel Name" 
                    className="w-full pl-14 pr-6 py-5 bg-[#0F0F0F] border border-white/5 rounded-2xl text-sm font-bold outline-none focus:border-red-600/50 text-white transition-all placeholder:text-slate-700"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="group">
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full pl-14 pr-6 py-5 bg-[#0F0F0F] border border-white/5 rounded-2xl text-sm font-bold outline-none focus:border-red-600/50 text-white transition-all placeholder:text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="group">
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full pl-14 pr-6 py-5 bg-[#0F0F0F] border border-white/5 rounded-2xl text-sm font-bold outline-none focus:border-red-600/50 text-white transition-all placeholder:text-slate-700"
                  required
                />
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full py-6 bg-red-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-[0_20px_40px_rgba(255,0,0,0.3)] hover:bg-red-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 group mt-8"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Access Studio" : "Begin Viral Journey"}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10 flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-white/5" />
            <span className="relative px-6 bg-[#141414] text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Institutional Single Sign-On</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:bg-white/5 transition-all text-white text-[10px] font-black uppercase tracking-[0.2em]">
              <Chrome size={16} className="text-red-600" /> Google
            </button>
            <button className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-[#0F0F0F] border border-white/5 hover:bg-white/5 transition-all text-white text-[10px] font-black uppercase tracking-[0.2em]">
              <ShieldCheck size={16} className="text-green-600" /> Apple
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-slate-600 text-[9px] font-black uppercase tracking-widest text-center leading-relaxed">
            By accessing Elite Master, you confirm your status as a <br />
            <span className="text-slate-400">Verified Content Creator</span> under Global Protocol.
          </p>
          <button onClick={onBack} className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em] hover:text-white transition-colors">
            Return to HQ
          </button>
        </div>
      </motion.div>
    </div>
  );
};
