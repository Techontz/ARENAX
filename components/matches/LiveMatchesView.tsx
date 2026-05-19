'use client';

import React, {
  useEffect,
  useState,
} from 'react';

import { MatchCard } from './MatchCard';

import { fetchLiveMatches } from '@/services/matchService';

import { Match } from '@/types';

export const LiveMatchesView = () => {
  const [matches, setMatches] =
    useState<Match[]>([]);

  const [loading, setLoading] =
    useState(true);

  const loadMatches = async () => {
    try {
      const data =
        await fetchLiveMatches();

      const formattedMatches: Match[] =
        (data || []).map(
          (item: any) => ({
            id: item.id,

            league:
              item.tournament?.name ||
              'Football',

            isLive: true,

            isActive: false,

            time:
              item.status
                ?.description ||
              item.status?.type ||
              'LIVE',

            score: {
              a:
                item.homeScore
                  ?.current ?? 0,

              b:
                item.awayScore
                  ?.current ?? 0,
            },

            teamA: {
              name:
                item.homeTeam?.name ||
                'Home Team',

              logo: `https://api.sofascore.app/api/v1/team/${item.homeTeam?.id}/image`,
            },

            teamB: {
              name:
                item.awayTeam?.name ||
                'Away Team',

              logo: `https://img.sofascore.com/api/v1/team/${item.awayTeam?.id}/image`,
            },
          })
        );

      setMatches(
        formattedMatches
      );
    } catch (error) {
      console.error(
        'Error loading matches:',
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Loading live
          matches...
        </p>
      </div>
    );
  }

  if (!matches.length) {
    return (
      <div className="flex items-center justify-center py-10">
        <p className="text-sm text-[var(--color-text-secondary)]">
          No live matches
          available.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
      {matches.map((match) => (
        <MatchCard
          key={match.id}
          match={match}
        />
      ))}
    </div>
  );
};