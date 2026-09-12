import React from 'react';
import { Match } from '../types';
import { Flame, Tv, Activity, ChevronRight } from 'lucide-react';

interface FeaturedMatchesProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

export const FeaturedMatches: React.FC<FeaturedMatchesProps> = ({
  matches,
  onSelectMatch,
}) => {
  // Pick featured matches (live or high profile)
  const featured = matches.filter((m) => m.isFavorite || m.status === 'LIVE').slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-emerald-400">
          <div className="w-5 h-5 rounded-md bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
          </div>
          <span>Pertandingan Utama (Hot Matches)</span>
        </div>
        <span className="text-[11px] text-slate-400 hidden sm:inline">
          Buka Match Center & Animasi Lapangan 2D
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {featured.map((match) => {
          const isLive = match.status === 'LIVE';
          const isFT = match.status === 'FT';
          const isHT = match.status === 'HT';

          return (
            <div
              key={match.id}
              onClick={() => onSelectMatch(match)}
              className="group relative bg-gradient-to-b from-[#0c1524] to-[#070e1b] hover:from-[#111e33] hover:to-[#0a1527] border border-[#1b2b42] hover:border-emerald-500/50 rounded-2xl p-3.5 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-emerald-950/30 flex flex-col justify-between hover:-translate-y-0.5 overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isLive
                    ? 'bg-gradient-to-r from-red-500 via-emerald-500 to-cyan-500'
                    : 'bg-transparent group-hover:bg-emerald-500/50'
                } transition-all`}
              />

              {/* Top League info & Status */}
              <div>
                <div className="flex items-center justify-between text-[11px] mb-2.5 pb-2 border-b border-[#18273d]">
                  <span className="text-slate-400 font-medium truncate max-w-[140px] flex items-center gap-1.5">
                    <span className="text-sm">{match.leagueFlag}</span>
                    <span className="truncate text-slate-300 font-semibold">{match.leagueName}</span>
                  </span>
                  
                  {isLive && (
                    <span className="flex items-center gap-1.5 text-red-400 font-bold bg-red-950/70 border border-red-700/60 px-2 py-0.5 rounded-md text-[10px] shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                      {match.minute}&apos;
                    </span>
                  )}
                  {isHT && (
                    <span className="text-cyan-400 font-bold bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded-md text-[10px]">
                      HT
                    </span>
                  )}
                  {isFT && (
                    <span className="text-slate-400 font-semibold bg-slate-800/80 px-2 py-0.5 rounded-md text-[10px]">
                      Selesai
                    </span>
                  )}
                  {match.status === 'SCHEDULED' && (
                    <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/50 px-2 py-0.5 rounded-md text-[10px]">
                      {match.kickoffTime}
                    </span>
                  )}
                </div>

                {/* Matchup row */}
                <div className="space-y-2 my-1">
                  {/* Home team */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-[10px] font-black text-emerald-400 shrink-0">
                        {match.homeTeam.shortName?.slice(0, 3) || match.homeTeam.name.slice(0, 3)}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-100 truncate group-hover:text-emerald-300 transition-colors">
                        {match.homeTeam.name}
                      </span>
                    </div>
                    <span className={`font-score font-black text-base shrink-0 ${isLive ? 'text-emerald-400' : 'text-white'}`}>
                      {match.status === 'SCHEDULED' ? '-' : match.homeScore}
                    </span>
                  </div>

                  {/* Away team */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 truncate">
                      <div className="w-6 h-6 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-[10px] font-black text-cyan-400 shrink-0">
                        {match.awayTeam.shortName?.slice(0, 3) || match.awayTeam.name.slice(0, 3)}
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-100 truncate group-hover:text-cyan-300 transition-colors">
                        {match.awayTeam.name}
                      </span>
                    </div>
                    <span className={`font-score font-black text-base shrink-0 ${isLive ? 'text-cyan-400' : 'text-white'}`}>
                      {match.status === 'SCHEDULED' ? '-' : match.awayScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer info: TV & Match Center hint */}
              <div className="mt-3 pt-2 border-t border-[#18273d] flex items-center justify-between text-[10px] text-slate-400">
                {match.tvChannel ? (
                  <span className="flex items-center gap-1 text-slate-400 truncate max-w-[120px]">
                    <Tv className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span className="truncate">{match.tvChannel}</span>
                  </span>
                ) : (
                  <span className="text-slate-400">{match.round || 'Reguler'}</span>
                )}

                <span className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-0.5 transition-transform">
                  <Activity className="w-3 h-3" />
                  <span>Match Center</span>
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
