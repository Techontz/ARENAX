'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  Maximize2, 
  Minimize2, 
  MonitorPlay, 
  Settings, 
  Check, 
  Share2, 
  Plus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { QUALITIES, SPEEDS } from '@/constants';
import { useVideoPlayer } from '@/hooks/useVideoPlayer';

export const VideoPlayer = () => {
  const [showSettings, setShowSettings] = useState(false);
  const { 
    isFullScreen, 
    isFloating, 
    toggleFullScreen, 
    toggleFloating 
  } = useVideoPlayer();
  
  const [quality, setQuality] = useState('1080p');
  const [playbackSpeed, setPlaybackSpeed] = useState('1.0x');
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div className={`flex flex-col gap-4 lg:gap-6 transition-all duration-500 max-sm:-mx-4 
      ${isFullScreen ? 'fixed inset-0 z-[60] bg-black p-0 overflow-hidden' : ''} 
      ${isFloating ? 'fixed bottom-6 right-6 w-80 z-[60] shadow-2xl max-sm:w-56 max-sm:bottom-[80px] max-sm:right-4 pointer-events-auto' : ''}`}
    >
      <div className={`premium-card relative bg-black transition-all duration-500 
        ${isFullScreen ? 'h-full w-full rounded-none flex items-center justify-center overflow-hidden' : isFloating ? 'aspect-video rounded-xl border border-white/20 overflow-hidden' : 'aspect-video max-sm:rounded-none overflow-visible'}`}
      >
        <motion.div 
          animate={isFullScreen && typeof window !== 'undefined' && window.innerWidth < 640 && window.innerHeight > window.innerWidth ? { rotate: 90, width: '100vh', height: '100vw' } : { rotate: 0, width: '100%', height: '100%' }}
          className="relative flex flex-col items-center justify-center"
        >
          <img 
            src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2000&auto=format&fit=crop" 
            alt="stadium" 
            className="w-full h-full object-cover opacity-80 absolute inset-0"
          />
          
          <div className="absolute top-0 left-0 right-0 p-3 lg:p-6 flex items-start justify-between bg-gradient-to-b from-black/60 to-transparent z-10">
            <div className="flex items-center gap-2 lg:gap-4 scale-75 lg:scale-100 origin-left">
               <div className="w-8 h-8 lg:w-10 lg:h-10 bg-white/10 backdrop-blur-md rounded-[2px] flex items-center justify-center border border-white/20">
                 <img src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/1200px-UEFA_Champions_League.svg.png" className="w-5 h-5 lg:w-6 lg:h-6 invert" alt="UCL" />
               </div>
               <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/10 rounded-[2px] overflow-hidden">
                  <div className="px-2 lg:px-3 py-1 font-bold text-white text-xs lg:text-sm border-r border-white/10 italic">RMA</div>
                  <div className="px-3 lg:px-4 py-1 font-bold text-white text-xs lg:text-sm border-r border-white/10">1 - 0</div>
                  <div className="px-2 lg:px-3 py-1 font-bold text-white text-xs lg:text-sm border-r border-white/10 italic">MCI</div>
                  <div className="px-2 lg:px-3 py-1 font-medium text-white/80 text-[11px] lg:text-[13px]">45:21</div>
                  <div className="px-1.5 lg:px-2 py-1 flex items-center gap-1 lg:gap-1.5">
                     <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-[var(--color-live-red)]" />
                     <span className="text-[9px] lg:text-[10px] font-bold text-white uppercase tracking-wider">Live</span>
                  </div>
               </div>
            </div>

            {isFullScreen && (
              <button 
                onClick={toggleFullScreen}
                className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
              >
                <Minimize2 size={24} />
              </button>
            )}
          </div>

          <div className="relative z-10 flex items-center justify-center">
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 lg:w-20 lg:h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:scale-105 transition-transform"
            >
              <Play fill="white" size={24} className="lg:size-[32px] ml-1" />
            </motion.button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-6 pt-12 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2 lg:gap-4 z-10">
            <div className="flex items-center gap-4">
               <div className="w-full h-1 bg-white/20 rounded-full relative cursor-pointer overflow-hidden group/progress">
                  <div className="absolute inset-y-0 left-0 w-[45%] bg-[var(--color-brand)] h-full" />
                  <div className="absolute top-1/2 left-[45%] -translate-y-1/2 w-2 lg:w-3 h-2 lg:h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity" />
               </div>
            </div>
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4 lg:gap-6">
                <button className="hover:text-[var(--color-brand)] transition-colors"><Pause size={18} fill="currentColor" /></button>
                <button 
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[var(--color-brand)] transition-colors inline-flex"
                >
                  <Volume2 size={18} className={isMuted ? 'opacity-50' : ''} />
                </button>
              </div>
              
              <div className="flex items-center gap-4 lg:gap-6 text-white/70 relative">
                 <button 
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-[11px] lg:text-xs font-bold hover:text-white transition-colors py-2 px-1 -my-2"
                 >
                   {quality}
                 </button>
                 
                 <div className="relative">
                   <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className={`hover:text-white transition-colors p-2 -m-1 rounded-full ${showSettings ? 'text-[var(--color-brand)]' : ''}`}
                   >
                     <Settings size={18} className="lg:size-4" />
                   </button>

                   <AnimatePresence>
                     {showSettings && (
                       <>
                         <div className="fixed inset-0 z-10" onClick={() => setShowSettings(false)} />
                         <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className={`absolute bottom-full right-0 mb-3 w-48 bg-gray-900/100 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 flex flex-col gap-6 z-20 
                            ${isFullScreen ? 'max-sm:fixed max-sm:inset-0 max-sm:m-auto max-sm:h-fit max-sm:w-[280px] max-sm:max-h-[80%] max-sm:overflow-y-auto' : 'max-sm:absolute max-sm:bottom-full max-sm:right-0 max-sm:mb-4'}`}
                         >
                         <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#7c5dff]">Quality</span>
                           <div className="flex flex-col gap-1">
                             {QUALITIES.map(q => (
                               <button 
                                key={q}
                                onClick={() => { setQuality(q); setShowSettings(false); }}
                                className="flex items-center justify-between px-3 py-2.5 sm:py-1.5 rounded-xl sm:rounded-lg hover:bg-white/10 text-sm sm:text-xs font-medium transition-all group active:scale-95"
                               >
                                 <span className={quality === q ? 'text-white' : 'text-gray-400'}>{q}</span>
                                 {quality === q && <Check size={14} className="text-[var(--color-brand)]" />}
                               </button>
                             ))}
                           </div>
                         </div>

                         <div className="h-px bg-white/5" />

                         <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black uppercase tracking-widest text-[#7c5dff]">Speed</span>
                           <div className="flex flex-col gap-1">
                             {SPEEDS.map(s => (
                               <button 
                                key={s}
                                onClick={() => { setPlaybackSpeed(s); setShowSettings(false); }}
                                className="flex items-center justify-between px-3 py-2.5 sm:py-1.5 rounded-xl sm:rounded-lg hover:bg-white/10 text-sm sm:text-xs font-medium transition-all group active:scale-95"
                               >
                                 <span className={playbackSpeed === s ? 'text-white' : 'text-gray-400'}>{s}</span>
                                 {playbackSpeed === s && <Check size={14} className="text-[var(--color-brand)]" />}
                               </button>
                             ))}
                           </div>
                         </div>
                       </motion.div>
                     </>
                   )}
                 </AnimatePresence>
               </div>

               <button 
                onClick={toggleFloating}
                className={`hover:text-white transition-colors ${isFloating ? 'text-[var(--color-brand)]' : ''}`}
                title={isFloating ? "Dock video" : "Float video"}
               >
                 <MonitorPlay size={16} />
               </button>

               <button 
                onClick={toggleFullScreen}
                className="hover:text-white transition-colors"
               >
                 {isFullScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
               </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between px-1 gap-4">
        <div className="flex flex-col gap-1 lg:gap-2 text-center sm:text-left">
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight">Real Madrid vs Manchester City</h1>
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-[10px] lg:text-xs font-semibold px-2 lg:px-3 py-1 bg-[var(--color-brand-light)] text-[var(--color-brand)] rounded-[var(--radius-premium)]">UEFA Champions League</span>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-3">
          <button className="p-2 lg:p-3 border border-[var(--color-border-main)] rounded-[var(--radius-premium)] hover:bg-white transition-colors shadow-sm bg-[#F0F0F5]">
            <Share2 size={16} className="text-[var(--color-text-secondary)]" />
          </button>
          <button className="flex items-center gap-1.5 lg:gap-2 px-3 lg:px-5 py-2 lg:py-3 border border-[var(--color-border-main)] rounded-[var(--radius-premium)] hover:bg-white transition-colors shadow-sm bg-[#F0F0F5] text-xs lg:text-sm font-semibold text-[var(--color-text-secondary)]">
            <Plus size={16} />
            My List
          </button>
        </div>
      </div>
    </div>
  );
};
