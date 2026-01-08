
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Wand2, Download, Copy, Loader2, Image as ImageIcon, 
  Rocket, Terminal, ChevronRight, Zap, Target, Flame, Cpu, BarChart 
} from 'lucide-react';
import { GeminiService } from '../../services/geminiService';

export const ThumbnailGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    try {
      const url = await GeminiService.generateThumbnail(prompt);
      setResult(url);
    } catch (err) {
      console.error(err);
      alert("Error generating thumbnail. Please check your API configuration.");
    } finally {
      setIsGenerating(false);
    }
  };

  const presets = [
    { label: 'Extreme Challenge', icon: <Flame size={14} className="text-orange-500" />, prompt: "A high-stakes extreme challenge thumbnail, close up intense facial expression, vibrant background" },
    { label: 'Comparison', icon: <Target size={14} className="text-blue-500" />, prompt: "A side-by-side comparison thumbnail, Before vs After, high contrast, red vs blue themes" },
    { label: 'Storytelling', icon: <Sparkles size={14} className="text-purple-500" />, prompt: "A cinematic storytelling thumbnail, mysterious atmosphere, leading lines, emotional depth" },
    { label: 'MrBeast Style', icon: <Zap size={14} className="text-yellow-500" />, prompt: "MrBeast style thumbnail, huge scale object, shocked expressions, high saturation, 4k" }
  ];

  return (
    <div className="max-w-[1500px] mx-auto space-y-12 pb-20">
      {/* Header Premium */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(255,0,0,0.4)] rotate-3">
              <Cpu className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
                AI <span className="text-red-600">VISUAL</span> STUDIO
              </h1>
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em] mt-2">Elite Content Infrastructure v4.2</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-6 bg-[#1F1F1F] px-8 py-4 rounded-[2rem] border border-white/5">
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Engine</span>
            <span className="text-xs font-black text-green-500 uppercase">Gemini 3.0</span>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Speed</span>
            <span className="text-xs font-black text-white uppercase">Turbo</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Panneau de Contrôle (Gauche) */}
        <div className="xl:col-span-5 space-y-8">
          <div className="glass-dark border border-white/10 rounded-[3.5rem] p-10 shadow-2xl relative overflow-hidden">
            {/* Label: Generation Script & Clear */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Terminal className="text-red-600" size={20} />
                <span className="text-xs font-black uppercase tracking-[0.3em] text-white">Generation Script</span>
              </div>
              <button 
                onClick={() => setPrompt('')}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-red-600 transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Input Area: ai prompt */}
            <div className="space-y-6">
              <div className="relative group">
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Enter ai prompt... (e.g. Cinematic parkour in Paris at night)"
                  className="w-full h-64 bg-[#0F0F0F] border border-white/5 rounded-[2.5rem] p-8 text-white text-lg font-bold outline-none focus:border-red-600/50 resize-none transition-all placeholder:text-slate-800 shadow-inner group-hover:border-white/10"
                />
                <div className="absolute bottom-6 left-8 flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                   <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Neural Link Active</span>
                </div>
              </div>

              {/* Action: Generate Concept */}
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full py-7 bg-red-600 text-white rounded-[2.5rem] font-black text-xl uppercase tracking-[0.2em] shadow-[0_25px_50px_rgba(255,0,0,0.3)] hover:bg-red-700 hover:scale-[1.02] active:scale-95 disabled:opacity-30 disabled:grayscale transition-all flex items-center justify-center gap-4 group"
              >
                {isGenerating ? (
                  <Loader2 size={28} className="animate-spin" />
                ) : (
                  <>
                    <Wand2 size={28} className="group-hover:rotate-12 transition-transform" />
                    <span>Generate Concept</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Label: Viral Presets & Buttons */}
          <div className="p-10 rounded-[3.5rem] bg-[#1F1F1F] border border-white/5 shadow-xl">
             <div className="flex items-center gap-3 mb-8">
               <div className="w-1.5 h-6 bg-red-600 rounded-full" />
               <h4 className="text-white font-black uppercase tracking-tighter text-xl">Viral Presets</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
               {presets.map((p) => (
                 <button 
                   key={p.label} 
                   onClick={() => setPrompt(p.prompt)}
                   className="flex items-center gap-4 px-6 py-5 rounded-2xl bg-[#0F0F0F] border border-white/5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white hover:border-red-600/50 hover:bg-red-600/5 transition-all group"
                 >
                   <span className="group-hover:scale-110 transition-transform">{p.icon}</span>
                   {p.label}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Panneau de Preview (Droite) */}
        <div className="xl:col-span-7 bg-[#1F1F1F] border border-white/5 rounded-[4.5rem] p-10 flex flex-col min-h-[750px] shadow-2xl relative">
          <div className="flex items-center justify-between mb-10">
            {/* Label: Master Preview */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/10 rounded-lg">
                <ImageIcon className="text-red-600" size={20} />
              </div>
              <span className="text-white font-black text-[12px] uppercase tracking-[0.4em]">Master Preview</span>
            </div>
            
            {result && (
              <div className="flex gap-4">
                <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all">
                  <Copy size={22} />
                </button>
                <a 
                  href={result} 
                  download="elite-master-thumbnail.png" 
                  className="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20 hover:bg-red-700 transition-all"
                >
                  <Download size={22} />
                </a>
              </div>
            )}
          </div>

          <div className="flex-1 bg-[#0F0F0F] rounded-[3.5rem] overflow-hidden relative flex items-center justify-center border border-white/5 shadow-inner group">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div 
                  key="empty" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 0.2 }} 
                  exit={{ opacity: 0 }}
                  className="text-center space-y-8"
                >
                  <Rocket size={140} className="mx-auto text-white" />
                  <div className="space-y-3">
                    <p className="text-5xl font-black uppercase tracking-tighter text-white">Ready for Launch</p>
                    <p className="text-[11px] font-black uppercase tracking-[0.6em] text-slate-500">Awaiting Neural Commands</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="preview-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full relative"
                >
                  <img 
                    src={result}
                    alt="Master Preview Result"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlays decoratifs */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="absolute top-10 left-10 flex items-center gap-3 p-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl">
                     <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                     <span className="text-[10px] font-black text-white uppercase tracking-widest">Master Concept Rendered</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {isGenerating && (
              <div className="absolute inset-0 bg-[#0F0F0F]/95 backdrop-blur-2xl flex flex-col items-center justify-center z-50">
                <div className="relative mb-10">
                  <div className="w-32 h-32 border-[10px] border-white/5 rounded-full" />
                  <div className="absolute top-0 w-32 h-32 border-[10px] border-red-600 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(255,0,0,0.4)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Zap className="text-red-600 animate-pulse" size={40} />
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <p className="text-3xl font-black text-white uppercase tracking-tighter">Analyzing Visual DNA</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-1 w-12 bg-red-600 animate-pulse" />
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.8em]">Elite Processing</p>
                    <div className="h-1 w-12 bg-red-600 animate-pulse" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer Analysis: CTR Prediction, Deploy, etc. */}
          {result && (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-10 rounded-[3rem] bg-gradient-to-br from-red-600/10 via-transparent to-transparent border border-red-600/20 flex flex-col lg:flex-row items-center justify-between gap-8"
            >
              <div className="flex items-center gap-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                    <BarChart size={14} className="text-red-600" />
                    CTR Prediction
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-black text-white leading-none tracking-tighter">9.4%</span>
                    <div className="px-5 py-2 rounded-full bg-green-500 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-green-500/20">
                      Excellent
                    </div>
                  </div>
                </div>
                <div className="hidden lg:block w-px h-16 bg-white/10" />
                <div className="hidden lg:block space-y-2">
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Viral Potential</p>
                  <span className="text-2xl font-black text-white uppercase tracking-tighter">Elite Grade</span>
                </div>
              </div>

              {/* Action: Deploy to YouTube */}
              <button className="w-full lg:w-auto px-12 py-6 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-red-600 hover:text-white transition-all shadow-2xl group active:scale-95">
                Deploy to YouTube 
                <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
