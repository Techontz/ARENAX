'use client';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

import { MatchCard } from './MatchCard';

import { fetchLiveMatches } from '@/services/matchService';

import { Match } from '@/types';

interface UpcomingMatch {
  id: number;
  league: string;
  time: string;

  teamA: {
    name: string;
    logo: string;
  };

  teamB: {
    name: string;
    logo: string;
  };
}

export const LiveMatchesView = () => {
  const [matches, setMatches] =
    useState<Match[]>([]);

  const [
    upcomingMatches,
    setUpcomingMatches,
  ] = useState<
    UpcomingMatch[]
  >([]);

  const [loading, setLoading] =
    useState(true);

  const [
    selectedLeague,
    setSelectedLeague,
  ] = useState('All');

  const [
    activeSection,
    setActiveSection,
  ] = useState<
    'live' | 'upcoming'
  >('live');

  const loadMatches =
    async () => {
      try {
        // LIVE MATCHES
        const response =
          await fetch(
            'https://www.sofascore.com/api/v1/sport/football/events/live',
            {
              cache: 'no-store',
            }
          );

        const data =
          await response.json();

        const liveData =
          data.events || [];

        const formattedMatches: Match[] =
          (liveData || [])
            .map(
              (
                item: any
              ): Match => {
                const getMatchTime =
                  (): string => {
                    try {
                      const status =
                        item.status
                          ?.type;

                      // FINISHED
                      if (
                        status ===
                        'finished'
                      ) {
                        return 'FT';
                      }

                      // HALFTIME
                      if (
                        status ===
                        'halftime'
                      ) {
                        return 'HT';
                      }

                      const start =
                        item.time
                          ?.currentPeriodStartTimestamp;

                      if (!start) {
                        return 'LIVE';
                      }

                      const now =
                        Math.floor(
                          Date.now() /
                            1000
                        );

                      const minutes =
                        Math.floor(
                          (now -
                            start) /
                            60
                        );

                      // EXTRA TIME
                      if (
                        minutes > 90
                      ) {
                        return `90+${
                          minutes -
                          90
                        }'`;
                      }

                      return `${minutes}'`;
                    } catch {
                      return 'LIVE';
                    }
                  };

                return {
                  id: item.id,

                  league:
                    item
                      .tournament
                      ?.name ||
                    'Football',

                  isLive: true,

                  isActive: false,

                  time:
                    getMatchTime(),

                  score: {
                    a:
                      item
                        .homeScore
                        ?.current ??
                      0,

                    b:
                      item
                        .awayScore
                        ?.current ??
                      0,
                  },

                  teamA: {
                    name:
                      item
                        .homeTeam
                        ?.name ||
                      'Home Team',

                    logo: `https://img.sofascore.com/api/v1/team/${item.homeTeam?.id}/image`,
                  },

                  teamB: {
                    name:
                      item
                        .awayTeam
                        ?.name ||
                      'Away Team',

                    logo: `https://img.sofascore.com/api/v1/team/${item.awayTeam?.id}/image`,
                  },
                };
              }
            )
            .sort(
              (
                a: Match,
                b: Match
              ) => {
                const getMinute =
                  (
                    time: string
                  ): number => {
                    // FT LAST
                    if (
                      time ===
                      'FT'
                    ) {
                      return 9999;
                    }

                    // HT AFTER LIVE
                    if (
                      time ===
                      'HT'
                    ) {
                      return 5000;
                    }

                    // LIVE MINUTES
                    const parsed =
                      parseInt(
                        time
                      );

                    return isNaN(
                      parsed
                    )
                      ? 4000
                      : parsed;
                  };

                // LOWEST MINUTE FIRST
                return (
                  getMinute(
                    a.time
                  ) -
                  getMinute(
                    b.time
                  )
                );
              }
            );

        setMatches(
          formattedMatches
        );

        // UPCOMING MATCHES
        const today =
          new Date()
            .toISOString()
            .split('T')[0];

          const upcomingRes =
            await fetch(
              `https://www.sofascore.com/api/v1/sport/football/scheduled-events/${today}`,
              {
                cache: 'no-store',
              }
            );

        const upcomingData =
          await upcomingRes.json();

        const formattedUpcoming: UpcomingMatch[] =
          (
            upcomingData.events ||
            []
          )
            .slice(0, 20)
            .map(
              (
                item: any
              ) => ({
                id: item.id,

                league:
                  item
                    .tournament
                    ?.name ||
                  'Football',

                time: new Date(
                  item.startTimestamp *
                    1000
                ).toLocaleTimeString(
                  [],
                  {
                    hour:
                      '2-digit',

                    minute:
                      '2-digit',
                  }
                ),

                teamA: {
                  name:
                    item
                      .homeTeam
                      ?.name ||
                    'Home Team',

                  logo: `https://img.sofascore.com/api/v1/team/${item.homeTeam?.id}/image`,
                },

                teamB: {
                  name:
                    item
                      .awayTeam
                      ?.name ||
                    'Away Team',

                  logo: `https://img.sofascore.com/api/v1/team/${item.awayTeam?.id}/image`,
                },
              })
            );

        setUpcomingMatches(
          formattedUpcoming
        );

        // CACHE
        localStorage.setItem(
          'live_matches',
          JSON.stringify(
            formattedMatches
          )
        );

        localStorage.setItem(
          'live_matches_time',
          Date.now().toString()
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
      const cachedMatches =
        localStorage.getItem(
          'live_matches'
        );
    
      const lastFetch =
        localStorage.getItem(
          'live_matches_time'
        );
    
      const now =
        Date.now();
    
      const CACHE_DURATION =
        2 * 60 * 1000;
    
      // LOAD LIVE CACHE
      if (
        cachedMatches &&
        lastFetch &&
        now -
          Number(lastFetch) <
          CACHE_DURATION
      ) {
        setMatches(
          JSON.parse(
            cachedMatches
          )
        );
    
        setLoading(false);
      }
    
      // ALWAYS FETCH FRESH DATA
      loadMatches();
    
      // AUTO REFRESH
      const interval =
        setInterval(() => {
          loadMatches();
        }, 120000);
    
      return () =>
        clearInterval(
          interval
        );
    }, []);

  const allLeagues =
    useMemo(() => {
      const source =
        activeSection ===
        'live'
          ? matches
          : upcomingMatches;

      return [
        'All',
        ...new Set(
          source.map(
            (m) =>
              m.league
          )
        ),
      ];
    }, [
      matches,
      upcomingMatches,
      activeSection,
    ]);

  const filteredLive =
    selectedLeague ===
    'All'
      ? matches
      : matches.filter(
          (m) =>
            m.league ===
            selectedLeague
        );

  const filteredUpcoming =
    selectedLeague ===
    'All'
      ? upcomingMatches
      : upcomingMatches.filter(
          (m) =>
            m.league ===
            selectedLeague
        );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <p className="text-sm text-[var(--color-text-secondary)]">
          Loading matches...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {/* TOP SWITCH */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          onClick={() =>
            setActiveSection(
              'live'
            )
          }
          className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
            activeSection ===
            'live'
              ? 'bg-[var(--color-brand)] text-white shadow-md'
              : 'bg-white border border-[var(--color-border-main)] text-[var(--color-text-secondary)]'
          }`}
        >
          Live Matches
        </button>

        <button
          onClick={() =>
            setActiveSection(
              'upcoming'
            )
          }
          className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
            activeSection ===
            'upcoming'
              ? 'bg-[var(--color-brand)] text-white shadow-md'
              : 'bg-white border border-[var(--color-border-main)] text-[var(--color-text-secondary)]'
          }`}
        >
          Today's Matches
        </button>
      </div>

      {/* LEAGUES */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {allLeagues.map(
          (league) => (
            <button
              key={league}
              onClick={() =>
                setSelectedLeague(
                  league
                )
              }
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedLeague ===
                league
                  ? 'bg-black text-white'
                  : 'bg-white border border-[var(--color-border-main)] text-[var(--color-text-secondary)] hover:border-black'
              }`}
            >
              {league}
            </button>
          )
        )}
      </div>

      {/* LIVE MATCHES */}
      {activeSection ===
      'live' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
          {filteredLive.map(
            (match) => (
              <MatchCard
                key={match.id}
                match={match}
              />
            )
          )}
        </div>
      ) : (
        // UPCOMING
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
          {filteredUpcoming.map(
            (match) => (
              <div
                key={match.id}
                className="premium-card p-5 flex flex-col gap-5 hover:border-black/20 transition-all"
              >
                {/* LEAGUE */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wide font-bold text-[var(--color-text-secondary)] truncate">
                    {match.league}
                  </span>

                  <span className="px-3 py-1 rounded-full bg-[var(--color-brand-light)] text-[var(--color-brand)] text-xs font-bold">
                    {match.time}
                  </span>
                </div>

                {/* TEAMS */}
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  {/* HOME */}
                  <div className="flex flex-col items-center min-w-0">
                    <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border-main)] shadow-sm flex items-center justify-center mb-2">
                      <img
                        src={
                          match.teamA
                            .logo
                        }
                        alt={
                          match.teamA
                            .name
                        }
                        className="w-9 h-9 object-contain"
                      />
                    </div>

                    <span className="text-[12px] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {
                        match
                          .teamA
                          .name
                      }
                    </span>
                  </div>

                  {/* VS */}
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-black text-[var(--color-text-secondary)]">
                      VS
                    </span>
                  </div>

                  {/* AWAY */}
                  <div className="flex flex-col items-center min-w-0">
                    <div className="w-14 h-14 rounded-full bg-white border border-[var(--color-border-main)] shadow-sm flex items-center justify-center mb-2">
                      <img
                        src={
                          match.teamB
                            .logo
                        }
                        alt={
                          match.teamB
                            .name
                        }
                        className="w-9 h-9 object-contain"
                      />
                    </div>

                    <span className="text-[12px] font-semibold text-center whitespace-nowrap overflow-hidden text-ellipsis w-full">
                      {
                        match
                          .teamB
                          .name
                      }
                    </span>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};