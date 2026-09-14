import React from 'react';
import { Star, Tv } from 'lucide-react';
import { Match } from '../types';

interface MatchRowProps {
  match: Match;
  showOdds: boolean;
  onSelectMatch: (match: Match) => void;
  onToggleFavorite: (matchId: string, e: React.MouseEvent) => void;
}

export const MatchRow: React.FC<MatchRowProps> = ({
  match,
  showOdds,
  onSelectMatch,
  onToggleFavorite,
}) => {
  const isLive = match.status === 'LIVE';
  const isHT = match.status === 'HT';
  const isFT = match.status === 'FT';
  const isScheduled = match.status === 'SCHEDULED';

  const homeWon = isFT && match.homeScore > match.awayScore;
  const awayWon = isFT && match.awayScore > match.homeScore;

  const homeLogo =
    match.homeTeam.logo && match.homeTeam.logo.trim() !== ''
      ? match.homeTeam.logo
      : 'https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png';

  const awayLogo =
    match.awayTeam.logo && match.awayTeam.logo.trim() !== ''
      ? match.awayTeam.logo
      : 'https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png';

  return (
    <div
      onClick={() => onSelectMatch(match)}
      className={`group relative flex flex-col md:flex-row md:items-center justify-between px-3.5 py-3 sm:px-5 sm:py-3.5 border-b border-[#1c2232] hover:bg-[#151a26] transition-colors cursor-pointer ${
        isLive ? 'bg-[#141924]' : 'bg-[#0f121a]'
      }`}
    >
      {/* 1. Left: Kickoff Time / Status */}
      <div className="flex items-center gap-3 mb-2 md:mb-0 shrink-0 w-24 sm:w-28">
        {/* Favorite Star */}
        <button
          onClick={(e) => onToggleFavorite(match.id, e)}
          className="p-1 text-gray-500 hover:text-cyan-400 transition-colors shrink-0"
          title={match.isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit'}
        >
          <Star
            className={`w-4 h-4 ${
              match.isFavorite ? 'text-cyan-400 fill-cyan-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          />
        </button>

        {/* Status Indicator */}
        <div className="flex flex-col">
          {isLive && (
            <div className="flex items-center gap-1.5 font-mono text-xs font-black text-red-400">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>LIVE {match.minute}&apos;</span>
            </div>
          )}

          {isHT && (
            <span className="text-xs font-black text-cyan-400 font-mono">
              HT
            </span>
          )}

          {isFT && (
            <div className="flex flex-col">
              <span className="text-xs font-black text-gray-300 font-mono">
                FT
              </span>
              <span className="text-[11px] text-gray-500 font-mono">
                {match.kickoffTime.split(' ')[0]}
              </span>
            </div>
          )}

          {isScheduled && (
            <span className="text-xs font-bold text-gray-200 font-mono">
              {match.kickoffTime.split(' ')[0]}
            </span>
          )}
        </div>
      </div>

      {/* 2. Center: Teams & Scoreboard with Unified Cyan/Emerald Concept */}
      <div className="flex-1 flex items-center justify-between md:justify-center gap-3 sm:gap-6 px-1 sm:px-4">
        {/* Home Team */}
        <div className="flex-1 flex items-center justify-end gap-2.5 text-right min-w-0">
          {/* Red Card Indicator if any */}
          {Boolean(match.homeTeam.redCards) && (
            <span
              className="w-2.5 h-3.5 bg-red-600 rounded-[2px] shadow-sm shrink-0 inline-block"
              title={`${match.homeTeam.redCards} Kartu Merah`}
            />
          )}

          {/* Home Team Name: If winner, highlighted in signature Cyan/Emerald pill */}
          {homeWon ? (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm tracking-tight truncate shadow-md shadow-emerald-500/20">
              {match.homeTeam.name}
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-bold text-gray-200 truncate group-hover:text-cyan-300 transition-colors">
              {match.homeTeam.name}
            </span>
          )}

          {/* Home Team Logo (Circular) */}
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shrink-0 shadow-sm overflow-hidden border border-white/20">
            <img
              src={homeLogo}
              alt={match.homeTeam.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  'https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png';
              }}
            />
          </div>
        </div>

        {/* Score Pill / VS: Curved dark pill */}
        <div className="shrink-0 flex items-center justify-center px-3.5 py-1.5 bg-[#0b0e14] rounded-full border border-[#232a3b] shadow-inner min-w-[70px]">
          {isScheduled ? (
            <span className="text-xs font-black text-gray-400 font-mono tracking-wider">
              VS
            </span>
          ) : (
            <div className="flex items-center gap-1.5 font-mono font-black text-sm sm:text-base">
              <span className={homeWon ? 'text-cyan-400' : 'text-white'}>
                {match.homeScore}
              </span>
              <span className="text-gray-500">:</span>
              <span className={awayWon ? 'text-cyan-400' : 'text-white'}>
                {match.awayScore}
              </span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex-1 flex items-center justify-start gap-2.5 text-left min-w-0">
          {/* Away Team Logo (Circular) */}
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center p-1 shrink-0 shadow-sm overflow-hidden border border-white/20">
            <img
              src={awayLogo}
              alt={match.awayTeam.name}
              referrerPolicy="no-referrer"
              className="w-6 h-6 object-contain"
              onError={(e) => {
                e.currentTarget.src =
                  'https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png';
              }}
            />
          </div>

          {/* Away Team Name: If winner, highlighted in signature Cyan/Emerald pill */}
          {awayWon ? (
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black text-xs sm:text-sm tracking-tight truncate shadow-md shadow-emerald-500/20">
              {match.awayTeam.name}
            </span>
          ) : (
            <span className="text-xs sm:text-sm font-bold text-gray-200 truncate group-hover:text-cyan-300 transition-colors">
              {match.awayTeam.name}
            </span>
          )}

          {/* Red Card Indicator if any */}
          {Boolean(match.awayTeam.redCards) && (
            <span
              className="w-2.5 h-3.5 bg-red-600 rounded-[2px] shadow-sm shrink-0 inline-block"
              title={`${match.awayTeam.redCards} Kartu Merah`}
            />
          )}
        </div>
      </div>

      {/* 3. Right: Odds & Live Button */}
      <div className="flex items-center justify-between md:justify-end gap-3 mt-2 md:mt-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/5 shrink-0">
        {/* Optional Odds display */}
        {showOdds && match.odds && (
          <div className="hidden xl:flex items-center gap-2 font-mono text-[11px] text-gray-300 bg-[#12151d] px-2.5 py-1 rounded-lg border border-[#202738]">
            <span className="text-gray-500 text-[10px]">HDP:</span>
            <span className="text-cyan-400 font-bold">{match.odds.handicap.line}</span>
            <span className="text-gray-500 text-[10px]">O/U:</span>
            <span className="text-emerald-400 font-bold">{match.odds.overUnder.line}</span>
          </div>
        )}

        {/* Unified Cyan/Emerald 'Live' Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectMatch(match);
          }}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 font-black text-xs tracking-wider transition-all shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer ml-auto md:ml-0"
        >
          <Tv className="w-3.5 h-3.5 text-slate-950 stroke-[2.5]" />
          <span>Live</span>
        </button>
      </div>
    </div>
  );
};
