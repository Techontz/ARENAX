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

      <div className="relative mb-4">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        
        {/* HOME */}
        <div className="flex flex-col items-center justify-center min-w-0">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border border-[var(--color-border-main)] shadow-sm flex items-center justify-center mb-2">
            <img
              src={match.teamA.logo}
              alt={match.teamA.name}
              loading="lazy"
              className="w-9 h-9 lg:w-11 lg:h-11 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  '/images/default-team.png';
              }}
            />
          </div>

          <span className="w-full text-center text-[12px] lg:text-sm font-semibold text-[var(--color-text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
            {match.teamA.name}
          </span>
        </div>

        {/* SCORE */}
        <div className="flex flex-col items-center justify-center px-2">
          <div className="flex items-center gap-2 lg:gap-3">
            <span className="text-3xl lg:text-4xl font-black tracking-tight">
              {match.score.a}
            </span>

            <span className="text-xl lg:text-2xl font-light text-[var(--color-text-secondary)] opacity-40">
              —
            </span>

            <span className="text-3xl lg:text-4xl font-black tracking-tight">
              {match.score.b}
            </span>
          </div>

          <span className="mt-2 text-[11px] lg:text-xs font-bold text-[var(--color-live-red)] uppercase tracking-wide">
            {match.time}
          </span>
        </div>

        {/* AWAY */}
        <div className="flex flex-col items-center justify-center min-w-0">
          <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-full bg-white border border-[var(--color-border-main)] shadow-sm flex items-center justify-center mb-2">
            <img
              src={match.teamB.logo}
              alt={match.teamB.name}
              loading="lazy"
              className="w-9 h-9 lg:w-11 lg:h-11 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  '/images/default-team.png';
              }}
            />
          </div>

          <span className="w-full text-center text-[12px] lg:text-sm font-semibold text-[var(--color-text-primary)] whitespace-nowrap overflow-hidden text-ellipsis">
            {match.teamB.name}
          </span>
        </div>
      </div>

      {/* DESKTOP ARROW */}
      <button className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-3 w-8 h-8 items-center justify-center rounded-full bg-white border border-[var(--color-border-main)] shadow-sm hover:bg-[#F5F5F7] transition-all group-hover:translate-x-1">
        <ChevronRight
          size={15}
          className="text-[var(--color-text-secondary)]"
        />
      </button>
    </div>
    </div>
  );
};
