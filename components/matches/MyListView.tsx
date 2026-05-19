'use client';
import React from 'react';
import { List, Plus } from 'lucide-react';
import { MatchCard } from './MatchCard';
import { Match } from '@/types';

interface MyListViewProps {
  matches: Match[];
}

export const MyListView = ({ matches }: MyListViewProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1 px-1">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <List size={24} className="text-[var(--color-brand)]" />
          My Watchlist
        </h2>
        <p className="text-xs text-[var(--color-text-secondary)] font-medium">Your pinned matches and teams</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(match => (
          <MatchCard key={match.id} match={match} />
        ))}
        <div className="premium-card p-6 flex flex-col items-center justify-center text-center gap-3 border-dashed border-2 hover:border-[var(--color-brand)] transition-colors cursor-pointer group">
           <div className="w-12 h-12 rounded-full bg-[var(--color-bg-main)] flex items-center justify-center group-hover:bg-[var(--color-brand-light)] transition-colors">
              <Plus size={24} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-brand)]" />
           </div>
           <span className="text-sm font-bold">Add Team to List</span>
        </div>
      </div>
    </div>
  );
};
