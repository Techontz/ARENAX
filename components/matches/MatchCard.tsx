'use client';
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Match } from '@/types';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className={`premium-card p-4 lg:p-5 transition-all group cursor-pointer ${match.isActive ? 'ring-1 ring-[var(--color-brand)] bg-[var(--color-brand-light)]/10' : 'hover:border-[var(--color-text-secondary)]/30'}`}>
      <div className="flex justify-between items-center mb-4 lg:mb-5 text-[10px] lg:text-[11px] font-bold tracking-wide uppercase text-[var(--color-text-secondary)]">
        <div className="flex-1 text-center pl-6">{match.league}</div>
        {match.isLive && (
          <span className="flex items-center gap-1.5 text-[var(--color-live-red)] bg-[#FFF1F0] px-1.5 lg:px-2 py-0.5 rounded-[2px] ml-auto">
            <div className="w-1 lg:w-1.5 h-1 lg:h-1.5 rounded-full bg-[var(--color-live-red)] animate-pulse" />
            LIVE
          </span>
        )}
      </div>

      <div className="flex items-center justify-between px-1 lg:px-2 mb-2 relative">
        <div className="flex flex-col items-center gap-2 w-12 lg:w-16">
          <img src={match.teamA.logo} alt={match.teamA.name} className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
        </div>
        
        <div className="flex items-center gap-3 lg:gap-4">
          <span className="text-2xl lg:text-3xl font-bold tracking-tight">{match.score.a}</span>
          <span className="text-2xl lg:text-3xl font-light text-[var(--color-text-secondary)] opacity-30">-</span>
          <span className="text-2xl lg:text-3xl font-bold tracking-tight">{match.score.b}</span>
        </div>

        <div className="flex flex-col items-center gap-2 w-12 lg:w-16">
          <img src={match.teamB.logo} alt={match.teamB.name} className="w-8 h-8 lg:w-10 lg:h-10 object-contain" />
        </div>

        <button className="hidden lg:flex absolute -right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white border border-[var(--color-border-main)] shadow-sm hover:bg-[#F0F0F5] transition-colors group-hover:translate-x-1">
          <ChevronRight size={14} className="text-[var(--color-text-secondary)]" />
        </button>
      </div>

      <div className="flex justify-between items-center px-1">
        <span className="text-[11px] lg:text-xs font-semibold text-[var(--color-text-primary)] w-16 lg:w-20 text-center truncate">{match.teamA.name}</span>
        <span className="text-[11px] lg:text-[12px] font-bold text-[var(--color-live-red)]">{match.time}</span>
        <span className="text-[11px] lg:text-xs font-semibold text-[var(--color-text-primary)] w-16 lg:w-20 text-center truncate">{match.teamB.name}</span>
      </div>
    </div>
  );
};
