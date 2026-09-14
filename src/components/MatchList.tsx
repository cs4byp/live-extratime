import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Trophy } from 'lucide-react';
import { Match, League } from '../types';
import { MatchRow } from './MatchRow';

interface MatchListProps {
  matches: Match[];
  leagues: League[];
  showOdds: boolean;
  onSelectMatch: (match: Match) => void;
  onToggleFavorite: (matchId: string, e: React.MouseEvent) => void;
}

export const MatchList: React.FC<MatchListProps> = ({
  matches,
  leagues,
  showOdds,
  onSelectMatch,
  onToggleFavorite,
}) => {
  // Collapsed leagues state
  const [collapsedLeagues, setCollapsedLeagues] = useState<Record<string, boolean>>({});

  const toggleLeagueCollapse = (leagueId: string) => {
    setCollapsedLeagues((prev) => ({
      ...prev,
      [leagueId]: !prev[leagueId],
    }));
  };

  // Group matches by league
  const matchesByLeague: Record<string, Match[]> = {};
  matches.forEach((m) => {
    if (!matchesByLeague[m.leagueId]) {
      matchesByLeague[m.leagueId] = [];
    }
    matchesByLeague[m.leagueId].push(m);
  });

  // Sort leagues according to priority
  const sortedLeagueIds = Object.keys(matchesByLeague).sort((a, b) => {
    const leagueA = leagues.find((l) => l.id === a);
    const leagueB = leagues.find((l) => l.id === b);
    return (leagueA?.priority || 99) - (leagueB?.priority || 99);
  });

  if (matches.length === 0) {
    return (
      <div className="bg-[#12151d] border border-[#202738] rounded-2xl p-12 text-center text-gray-400 my-4 shadow-sm">
        <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-200 mb-1">
          Tidak Ada Pertandingan
        </h3>
        <p className="text-xs text-gray-500 max-w-md mx-auto">
          Tidak ada pertandingan yang sesuai dengan filter atau kata kunci saat ini. Silakan coba pilih filter &quot;Semua&quot; atau pilih liga lainnya.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedLeagueIds.map((leagueId) => {
        const leagueMatches = matchesByLeague[leagueId];
        const firstMatch = leagueMatches[0];
        const leagueObj = leagues.find((l) => l.id === leagueId);
        const isCollapsed = collapsedLeagues[leagueId];
        const liveCount = leagueMatches.filter((m) => m.status === 'LIVE').length;
        const leagueLogo =
          leagueObj?.logo && leagueObj.logo.trim() !== ''
            ? leagueObj.logo
            : 'https://a.espncdn.com/i/leaguelogos/soccer/500/2.png';

        return (
          <div
            key={leagueId}
            className="bg-[#12151d] border border-[#202738] rounded-2xl overflow-hidden shadow-md"
          >
            {/* League Header matching Screenshot 2 (White circular badge + Premier League + Round 4) */}
            <div
              onClick={() => toggleLeagueCollapse(leagueId)}
              className="flex items-center justify-between px-4 py-3 bg-[#151924] border-b border-[#202738] cursor-pointer hover:bg-[#1a202e] transition-colors select-none"
            >
              <div className="flex items-center gap-2.5 truncate">
                {/* Circular white logo badge */}
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
                  {leagueLogo ? (
                    <img
                      src={leagueLogo}
                      alt={leagueObj?.name || firstMatch.leagueName}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span className="font-black text-xs sm:text-sm text-white tracking-tight">
                    {leagueObj?.name || firstMatch.leagueName}
                  </span>
                  <span className="text-[11px] text-gray-400 font-medium">
                    {firstMatch.round || 'Pekan Liga'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {liveCount > 0 && (
                  <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-red-600/20 text-red-400 border border-red-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                    {liveCount} LIVE
                  </span>
                )}
                <span className="text-[11px] text-gray-400 bg-white/5 px-2.5 py-0.5 rounded-lg border border-white/5 font-semibold">
                  {leagueMatches.length} Laga
                </span>
                <button
                  type="button"
                  aria-label={isCollapsed ? 'Buka daftar pertandingan' : 'Tutup daftar pertandingan'}
                  className="p-1 text-gray-400 hover:text-white transition-colors"
                >
                  {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Match rows */}
            {!isCollapsed && (
              <div className="divide-y divide-[#1c2232]">
                {leagueMatches.map((match) => (
                  <MatchRow
                    key={match.id}
                    match={match}
                    showOdds={showOdds}
                    onSelectMatch={onSelectMatch}
                    onToggleFavorite={onToggleFavorite}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
