
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, ShieldCheck, Loader2, Sparkles, Brain } from 'lucide-react';
import { GeminiService } from '../../services/geminiService';

export const StrategyHub: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const sessionRef = useRef<any>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  };

  const decodeAudioData = async (
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number,
    numChannels: number,
  ): Promise<AudioBuffer> => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) {
        channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
      }
    }
    return buffer;
  };

  const startSession = async () => {
    setIsConnecting(true);
    try {
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      outputAudioContextRef.current = outputCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = GeminiService.connectStrategyLive({
        onopen: () => {
          const source = inputCtx.createMediaStreamSource(stream);
          const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
          scriptProcessor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
            sessionPromise.then(session => {
              session.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
            });
          };
          source.connect(scriptProcessor);
          scriptProcessor.connect(inputCtx.destination);
          setIsActive(true);
          setIsConnecting(false);
        },
        onmessage: async (message: any) => {
          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }
          const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioBase64 && outputAudioContextRef.current) {
            const ctx = outputAudioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            const binary = atob(audioBase64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
            const buffer = await decodeAudioData(bytes, ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.onended = () => sourcesRef.current.delete(source);
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
          }
        },
        onclose: () => setIsActive(false),
        onerror: () => setIsActive(false)
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    outputAudioContextRef.current?.close();
    setIsActive(false);
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col items-center justify-center space-y-12">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-600 text-[10px] font-black uppercase tracking-widest mb-4">
          <Brain size={14} /> Live Channel Coaching
        </div>
        <h1 className="text-5xl sm:text-7xl font-black text-white uppercase tracking-tighter">Elite Strategy Hub</h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto">Discuss viral hooks, channel growth, and content roadmaps with your AI strategist in real-time.</p>
      </div>

      <div className="relative">
        <AnimatePresence>
          {isActive && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 bg-red-600/20 rounded-full blur-[100px] animate-pulse"
            />
          )}
        </AnimatePresence>

        <button 
          onClick={isActive ? stopSession : startSession}
          disabled={isConnecting}
          className={`w-72 h-72 rounded-full flex flex-col items-center justify-center gap-6 transition-all z-10 relative border-8 ${
            isActive ? 'bg-black border-red-600 text-red-600' : 'bg-red-600 border-red-600 text-white'
          } shadow-[0_0_80px_rgba(255,0,0,0.3)] group`}
        >
          {isConnecting ? (
            <Loader2 size={80} className="animate-spin" />
          ) : isActive ? (
            <>
              <MicOff size={80} />
              <span className="font-black uppercase tracking-[0.3em] text-xs">End Briefing</span>
            </>
          ) : (
            <>
              <div className="relative">
                <Mic size={80} />
                <Sparkles size={24} className="absolute -top-4 -right-4 animate-bounce" />
              </div>
              <span className="font-black uppercase tracking-[0.3em] text-xs">Enter Studio</span>
            </>
          )}
        </button>
      </div>

      <div className="flex gap-16 text-slate-500">
        <div className="flex items-center gap-3">
          <Volume2 size={24} className={isActive ? 'text-red-600 animate-pulse' : ''} />
          <span className="text-[10px] font-black uppercase tracking-widest">Ultra Low Latency</span>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck size={24} />
          <span className="text-[10px] font-black uppercase tracking-widest">Creator Privacy v4.0</span>
        </div>
      </div>
    </div>
  );
};
