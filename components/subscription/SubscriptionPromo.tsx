import React from 'react';
import { Crown, Radio } from 'lucide-react';

interface SubscriptionPromoProps {
  onSubscribe: () => void;
  isPremium: boolean;
}

export const SubscriptionPromo = ({ onSubscribe, isPremium }: SubscriptionPromoProps) => {
  if (isPremium) return null;
  
  return (
    <div className="relative overflow-hidden group">
      {/* Dynamic Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand)] opacity-[0.03] rounded-full -mr-32 -mt-32 blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#7c5dff] opacity-[0.03] rounded-full -ml-24 -mb-24 blur-[60px]" />
      
      <div className="premium-card p-6 lg:p-10 flex flex-col lg:flex-row items-center justify-between bg-white relative z-10 gap-8 border-2 border-[var(--color-brand-light)]/20 shadow-xl shadow-gray-200/50">
        <div className="flex flex-col sm:flex-row items-center gap-6 lg:gap-10 text-center sm:text-left w-full">
          <div className="relative shrink-0">
            <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-[2rem] bg-gradient-to-br from-[var(--color-brand)] to-[#7c5dff] flex items-center justify-center shadow-2xl shadow-[var(--color-brand)]/30 -rotate-3 group-hover:rotate-0 transition-all duration-500">
               <Crown size={44} className="text-white drop-shadow-lg" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-2xl shadow-xl border border-gray-50">
               <Radio size={14} className="text-[var(--color-live-red)] animate-pulse" />
            </div>
          </div>
          
          <div className="flex flex-col gap-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-brand-light)]/50 text-[var(--color-brand)] text-[10px] font-black uppercase tracking-widest w-fit mx-auto sm:mx-0">
               Premium Access
            </div>
            <h3 className="text-2xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight">Elevate Your ArenaX Experience</h3>
            <div className="grid grid-cols-2 gap-3 mt-1 text-left">
              {['Unlimited matches', '4K UHD HDR', 'Zero buffer', 'Exclusive multi-view'].map(benefit => (
                <div key={benefit} className="flex items-center gap-2 text-xs font-bold text-[var(--color-text-secondary)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand)]" />
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-gray-100 lg:pl-10 lg:border-l">
          <div className="flex flex-col items-center lg:items-end">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-400 font-bold line-through tracking-tighter">$4.99</span>
              <span className="text-5xl lg:text-6xl font-black text-[var(--color-brand)] tracking-tighter">$1.99</span>
            </div>
            <span className="text-[10px] text-[var(--color-text-secondary)] font-black uppercase tracking-[0.2em] opacity-60">per Month</span>
          </div>
          
          <button 
            onClick={onSubscribe}
            className="group/btn relative inline-flex items-center justify-center px-12 py-5 bg-gray-900 text-white rounded-2xl font-black text-sm shadow-2xl hover:bg-[var(--color-brand)] hover:scale-105 active:scale-95 transition-all w-full sm:w-auto overflow-hidden"
          >
            <span className="relative z-10 tracking-widest">GET ACCESS</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover/btn:animate-shimmer" />
          </button>
        </div>
      </div>
    </div>
  );
};
