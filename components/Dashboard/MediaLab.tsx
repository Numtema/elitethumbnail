
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Loader2, Play, Download, Wand2, Terminal, Plus } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';

export const MediaLab: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleGenVideo = async () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setResult(null);
    try {
      const url = await GeminiService.generateVideoTeaser(prompt);
      setResult(url);
    } catch (err) {
      console.error(err);
      alert("Video generation failed. Ensure your Veo 3.1 quota is active.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Video className="text-red-600" size={32} />
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter">Veo Cinematic Lab</h1>
        </div>
        <p className="text-slate-500 font-medium">Generate high-end video intros and cinematic B-roll with AI.</p>
      </header>

      <div className="p-10 rounded-[3rem] bg-[#1F1F1F] border border-white/5 space-y-8 shadow-2xl">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-red-600">
            <Terminal size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Cinematography Prompt</span>
          </div>
          <input 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: High-speed FPV drone shot through a futuristic cyber city..."
            className="w-full bg-[#0F0F0F] border border-white/5 rounded-2xl p-6 text-white text-lg font-bold outline-none focus:ring-2 focus:ring-red-600/20"
          />
        </div>

        <button 
          onClick={handleGenVideo}
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-6 bg-red-600 text-white rounded-3xl flex items-center justify-center gap-4 font-black uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-600/20 disabled:opacity-30"
        >
          {isGenerating ? <Loader2 className="animate-spin" /> : <Wand2 />}
          {isGenerating ? "Synthesizing Video (Veo 3.1)..." : "Generate 720p Teaser"}
        </button>
      </div>

      <div className="bg-[#1F1F1F] border border-white/5 rounded-[3rem] overflow-hidden min-h-[400px] flex flex-col relative">
        <AnimatePresence mode="wait">
          {!result ? (
            <div key="empty" className="flex-1 flex flex-col items-center justify-center text-slate-700 opacity-20">
               <Play size={100} />
               <p className="text-2xl font-black uppercase tracking-[0.5em] mt-6 text-center">Rendering Studio</p>
            </div>
          ) : (
            <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1">
              <video src={result} controls className="w-full h-full object-cover rounded-[3rem]" autoPlay loop />
              <div className="absolute top-6 right-6 flex gap-4">
                <button className="p-4 bg-black/60 backdrop-blur-md text-white rounded-2xl hover:bg-red-600 transition-all"><Download size={24} /></button>
                <button className="p-4 bg-black/60 backdrop-blur-md text-white rounded-2xl hover:bg-red-600 transition-all"><Plus size={24} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isGenerating && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 z-20">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-white/10 rounded-full" />
              <div className="w-24 h-24 border-8 border-red-600 border-t-transparent rounded-full animate-spin absolute top-0" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Veo 3.1 Generating</h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] animate-pulse">This may take up to 2 minutes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
