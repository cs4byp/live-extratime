import React from 'react';
import { Search, Globe } from 'lucide-react';
import { League } from '../types';

interface TopLigaSidebarProps {
  leagues: League[];
  selectedLeagueId: string;
  onSelectLeague: (leagueId: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopLigaSidebar: React.FC<TopLigaSidebarProps> = ({
  leagues,
  selectedLeagueId,
  onSelectLeague,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <aside className="w-full lg:w-64 flex-shrink-0 flex flex-col gap-4">
      {/* Search Input matching Screenshot 2 */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Pencarian..."
          className="w-full pl-10 pr-4 py-2.5 bg-[#12151d] border border-[#222838] focus:border-[#FFCC00] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none transition-all"
        />
      </div>

      {/* Top Liga Box */}
      <div className="bg-[#12151d] border border-[#202738] rounded-2xl p-4 flex flex-col">
        <h3 className="text-base font-black text-white mb-3 tracking-tight">
          Top Liga
        </h3>

        <div className="flex flex-col gap-1">
          {/* Semua Liga Option */}
          <button
            onClick={() => onSelectLeague('all')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left font-bold text-xs transition-all cursor-pointer ${
              selectedLeagueId === 'all'
                ? 'bg-[#FFCC00] text-slate-950 shadow-md font-black'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
              selectedLeagueId === 'all' ? 'bg-slate-950 text-[#FFCC00]' : 'bg-white text-slate-900'
            }`}>
              <Globe className="w-4 h-4" />
            </div>
            <span className="truncate">Semua Liga</span>
          </button>

          {/* 10 Leagues List */}
          {leagues.slice(0, 10).map((league) => {
            const isSelected = selectedLeagueId === league.id;

            return (
              <button
                key={league.id}
                onClick={() => onSelectLeague(league.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left font-bold text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20 font-black'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Circular white logo badge */}
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-1 flex-shrink-0 shadow-sm">
                  {league.logo && league.logo.trim() !== '' ? (
                    <img
                      src={league.logo}
                      alt={league.name}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-[10px] font-black text-slate-800">
                      {league.shortName || league.name.slice(0, 2)}
                    </span>
                  )}
                </div>
                <span className="truncate">{league.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
