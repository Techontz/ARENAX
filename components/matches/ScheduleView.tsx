// 'use client';

// import React, { useEffect, useState } from 'react';
// import { Calendar } from 'lucide-react';

// interface UpcomingMatch {
//   id: number;

//   league: string;

//   date: string;

//   time: string;

//   teamA: string;

//   teamB: string;

//   logoA: string;

//   logoB: string;
// }

// interface ScheduleViewProps {
//   showHeader?: boolean;
// }

// export const ScheduleView = ({
//   showHeader = true,
// }: ScheduleViewProps) => {
//   const [matches, setMatches] = useState<
//     UpcomingMatch[]
//   >([]);

//   const [loading, setLoading] =
//     useState(true);

//   const fetchUpcomingMatches =
//     async () => {
//       try {
//         // USER LOCAL DATE
//         const today = new Date();

//         // YYYY-MM-DD
//         const formattedDate =
//           today.toISOString().split('T')[0];

//         const response = await fetch(
//           `https://sportapi7.p.rapidapi.com/api/v1/sport/football/scheduled-events/${formattedDate}`,
//           {
//             method: 'GET',

//             headers: {
//               'X-RapidAPI-Key':
//                 process.env
//                   .NEXT_PUBLIC_RAPID_API_KEY || '',
            
//               'X-RapidAPI-Host':
//                 process.env
//                   .NEXT_PUBLIC_RAPID_API_HOST || '',
//             },
//           }
//         );

//         const data =
//           await response.json();

//         // FILTER OUT FINISHED MATCHES
//         const upcomingOnly = (
//           data.events || []
//         ).filter((m: any) => {
//           const status =
//             m.status?.type?.toLowerCase();

//           return (
//             status !== 'finished' &&
//             status !== 'afterpenalties' &&
//             status !== 'aet'
//           );
//         });

//         const formattedMatches: UpcomingMatch[] =
//           upcomingOnly.map((m: any) => ({
//             id: m.id,

//             league:
//               m.tournament?.name ||
//               'Football',

//             date: new Date(
//               m.startTimestamp * 1000
//             ).toLocaleDateString(
//               undefined,
//               {
//                 weekday: 'short',
//                 month: 'short',
//                 day: 'numeric',
//               }
//             ),

//             // USER LOCAL TIMEZONE
//             time: new Date(
//               m.startTimestamp * 1000
//             ).toLocaleTimeString(
//               undefined,
//               {
//                 hour: '2-digit',
//                 minute: '2-digit',
//               }
//             ),

//             teamA:
//               m.homeTeam?.name ||
//               'Home Team',

//             teamB:
//               m.awayTeam?.name ||
//               'Away Team',

//             logoA: `https://img.sofascore.com/api/v1/team/${m.homeTeam?.id}/image`,

//             logoB: `https://img.sofascore.com/api/v1/team/${m.awayTeam?.id}/image`,
//           }));

//         setMatches(formattedMatches);
//       } catch (error) {
//         console.error(
//           'Error fetching fixtures:',
//           error
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//   useEffect(() => {
//     fetchUpcomingMatches();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-10">
//         <p className="text-sm text-[var(--color-text-secondary)]">
//           Loading fixtures...
//         </p>
//       </div>
//     );
//   }

//   if (!matches.length) {
//     return (
//       <div className="flex items-center justify-center py-10">
//         <p className="text-sm text-[var(--color-text-secondary)]">
//           No upcoming fixtures available.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       {/* HEADER */}
//       {showHeader && (
//         <div className="flex flex-col gap-1 px-1">
//           <h2 className="text-xl font-bold flex items-center gap-2">
//             <Calendar
//               size={24}
//               className="text-[var(--color-brand)]"
//             />

//             Match Schedule
//           </h2>

//           <p className="text-xs text-[var(--color-text-secondary)] font-medium">
//             Upcoming football fixtures
//           </p>
//         </div>
//       )}

//       {/* MATCH GRID */}
// <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6">
//   {matches.map((m) => (
//     <div
//       key={m.id}
//       className="premium-card p-3 lg:p-6 flex flex-col gap-4 lg:gap-6 group hover:shadow-md transition-all"
//     >
//       {/* TOP */}
//       <div className="flex justify-between items-center text-[9px] lg:text-[11px] font-bold text-[var(--color-text-secondary)] uppercase gap-2">
//         <span className="truncate">
//           {m.league}
//         </span>

//         <span className="bg-[var(--color-brand-light)] text-[var(--color-brand)] px-1.5 lg:px-2 py-0.5 rounded-[2px] whitespace-nowrap">
//           {m.date}
//         </span>
//       </div>

//       {/* TEAMS */}
//       <div className="flex items-center justify-between gap-2">
//         {/* HOME */}
//         <div className="flex flex-col items-center gap-1.5 lg:gap-2 flex-1 min-w-0">
//           <img
//             src={m.logoA}
//             alt={m.teamA}
//             className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
//           />

//           <span className="text-[10px] lg:text-xs font-bold text-center truncate w-full">
//             {m.teamA}
//           </span>
//         </div>

//         {/* TIME */}
//         <div className="flex flex-col items-center gap-1 shrink-0">
//           <span className="text-sm lg:text-lg font-bold text-[var(--color-brand)]">
//             {m.time}
//           </span>

//           <span className="text-[8px] lg:text-[10px] text-[var(--color-text-secondary)] uppercase tracking-widest">
//             VS
//           </span>
//         </div>

//         {/* AWAY */}
//         <div className="flex flex-col items-center gap-1.5 lg:gap-2 flex-1 min-w-0">
//           <img
//             src={m.logoB}
//             alt={m.teamB}
//             className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
//           />

//           <span className="text-[10px] lg:text-xs font-bold text-center truncate w-full">
//             {m.teamB}
//           </span>
//         </div>
//       </div>

//       {/* BUTTON */}
//       <button className="w-full py-2 lg:py-2.5 rounded-[var(--radius-premium)] border border-[var(--color-border-main)] text-[10px] lg:text-xs font-bold hover:bg-[var(--color-brand)] hover:text-white hover:border-[var(--color-brand)] transition-all">
//         Set Reminder
//       </button>
//     </div>
//   ))}
// </div>
//     </div>
//   );
// };