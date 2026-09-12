import React from 'react';
import { ChevronRight } from 'lucide-react';
import { League } from '../types';

interface TopLeagueGridProps {
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  onOpenStandings?: () => void;
  showTitle?: boolean;
  title?: string;
}

export const TopLeagueGrid: React.FC<TopLeagueGridProps> = ({
  leagues,
  selectedLeagueId,
  onSelectLeague,
  onOpenStandings,
  showTitle = true,
  title = 'Klasemen Sepak Bola',
}) => {
  return (
    <div className="w-full mb-6">
      {/* Header with 'Klasemen >' pill button or Title */}
      <div className="flex items-center justify-between mb-4">
        {showTitle && title ? (
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {title}
          </h2>
        ) : (
          <div />
        )}

        {onOpenStandings && (
          <button
            onClick={onOpenStandings}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFCC00] hover:bg-yellow-400 text-slate-950 font-black text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Klasemen</span>
            <ChevronRight className="w-4 h-4 stroke-[3]" />
          </button>
        )}
      </div>

      {/* 10 Leagues Grid (Matching Screenshot 1 & 3) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
        {leagues.slice(0, 10).map((league) => {
          const isSelected = selectedLeagueId === league.id;

          return (
            <button
              key={league.id}
              onClick={() => onSelectLeague(league.id)}
              className={`group flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-200 cursor-pointer text-center relative overflow-hidden ${
                isSelected
                  ? 'bg-[#181d28] border-2 border-[#FFCC00] shadow-lg shadow-yellow-500/10'
                  : 'bg-[#12151d] hover:bg-[#181d28] border border-[#202738] hover:border-yellow-400/60'
              }`}
            >
              {/* White circular logo container matching screenshot */}
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center p-2 mb-2.5 shadow-md group-hover:scale-105 transition-transform">
                <img
                  src={league.logo}
                  alt={league.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    // Fallback to league flag
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>

              {/* League Name */}
              <span className="text-xs sm:text-sm font-bold text-white tracking-tight line-clamp-1 group-hover:text-yellow-400 transition-colors">
                {league.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
