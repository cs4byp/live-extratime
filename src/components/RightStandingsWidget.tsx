import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { League, StandingRow } from '../types';
import { getStandingsForLeague } from '../data/mockMatches';

interface RightStandingsWidgetProps {
  leagues: League[];
  activeLeagueId: string;
  onLeagueChange?: (leagueId: string) => void;
  onViewFullStandings?: (leagueId: string) => void;
}

export const RightStandingsWidget: React.FC<RightStandingsWidgetProps> = ({
  leagues,
  activeLeagueId,
  onLeagueChange,
  onViewFullStandings,
}) => {
  const top10Leagues = leagues.slice(0, 10);
  const [currentLeagueIndex, setCurrentLeagueIndex] = useState(() => {
    const idx = top10Leagues.findIndex((l) => l.id === activeLeagueId);
    return idx >= 0 ? idx : 0;
  });

  const currentLeague = top10Leagues[currentLeagueIndex] || top10Leagues[0];

  const [standings, setStandings] = useState<StandingRow[]>(() =>
    getStandingsForLeague(currentLeague.id)
  );
  const [loading, setLoading] = useState(false);

  // Sync when activeLeagueId changes from parent
  useEffect(() => {
    if (activeLeagueId && activeLeagueId !== 'all') {
      const idx = top10Leagues.findIndex((l) => l.id === activeLeagueId);
      if (idx >= 0) {
        setCurrentLeagueIndex(idx);
      }
    }
  }, [activeLeagueId]);

  // Fetch standings for current league
  useEffect(() => {
    let isCancelled = false;
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/football/standings/${currentLeague.id}`);
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled && data.success && Array.isArray(data.data) && data.data.length > 0) {
            setStandings(data.data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Fallback to local
      }
      if (!isCancelled) {
        setStandings(getStandingsForLeague(currentLeague.id));
        setLoading(false);
      }
    };

    fetchStandings();
    return () => {
      isCancelled = true;
    };
  }, [currentLeague.id]);

  const handlePrevLeague = () => {
    const nextIdx = (currentLeagueIndex - 1 + top10Leagues.length) % top10Leagues.length;
    setCurrentLeagueIndex(nextIdx);
    onLeagueChange?.(top10Leagues[nextIdx].id);
  };

  const handleNextLeague = () => {
    const nextIdx = (currentLeagueIndex + 1) % top10Leagues.length;
    setCurrentLeagueIndex(nextIdx);
    onLeagueChange?.(top10Leagues[nextIdx].id);
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 flex flex-col gap-4">
      <div className="bg-[#12151d] border border-[#202738] rounded-2xl p-4 flex flex-col shadow-lg">
        {/* League Selector Header: < Champions League Europe > */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
          <button
            onClick={handlePrevLeague}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Liga Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="text-center">
            <h4 className="text-sm font-black text-white tracking-tight flex items-center justify-center gap-1.5">
              <span>{currentLeague.name}</span>
            </h4>
            <p className="text-[11px] text-gray-400 font-medium">
              {currentLeague.country}
            </p>
          </div>

          <button
            onClick={handleNextLeague}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-cyan-300 transition-colors cursor-pointer"
            title="Liga Selanjutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Table Header: # Tim PL GD PTS */}
        <div className="grid grid-cols-12 gap-1 text-[11px] font-black text-gray-400 uppercase tracking-wider px-2 py-1.5 border-b border-white/5">
          <div className="col-span-2 text-center">#</div>
          <div className="col-span-5">Tim</div>
          <div className="col-span-1 text-center">PL</div>
          <div className="col-span-2 text-center">GD</div>
          <div className="col-span-2 text-center">PTS</div>
        </div>

        {/* Table Rows */}
        <div className="flex flex-col divide-y divide-white/5 max-h-[580px] overflow-y-auto pr-0.5 custom-scrollbar">
          {standings.slice(0, 16).map((team, idx) => {
            const rank = team.position || idx + 1;
            const isTop4 = rank <= 4;
            const gd = team.goalDifference;
            const gdDisplay = gd > 0 ? `+${gd}` : gd;

            return (
              <div
                key={team.teamId || idx}
                className={`grid grid-cols-12 gap-1 items-center px-2 py-2 text-xs transition-colors hover:bg-white/5 ${
                  isTop4 ? 'font-semibold' : 'text-gray-300'
                }`}
              >
                {/* Rank # */}
                <div className="col-span-2 flex items-center justify-center">
                  <span
                    className={`text-[11px] font-bold ${
                      rank === 1
                        ? 'text-cyan-300'
                        : isTop4
                        ? 'text-emerald-400'
                        : 'text-gray-400'
                    }`}
                  >
                    {rank}.
                  </span>
                </div>

                {/* Team Name + Logo */}
                <div className="col-span-5 flex items-center gap-2 min-w-0">
                  <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center p-0.5 flex-shrink-0 overflow-hidden">
                    {team.teamLogo && team.teamLogo.trim() !== '' ? (
                      <img
                        src={team.teamLogo}
                        alt={team.teamName}
                        referrerPolicy="no-referrer"
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          e.currentTarget.src =
                            'https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png';
                        }}
                      />
                    ) : (
                      <span className="text-[9px] font-bold text-gray-300">
                        {team.shortName || team.teamName.slice(0, 2)}
                      </span>
                    )}
                  </div>
                  <span className="truncate text-white font-medium text-xs">
                    {team.teamName}
                  </span>
                </div>

                {/* Played (PL) */}
                <div className="col-span-1 text-center text-gray-300 font-mono text-[11px]">
                  {team.played}
                </div>

                {/* Goal Difference (GD) */}
                <div
                  className={`col-span-2 text-center font-mono text-[11px] ${
                    gd > 0
                      ? 'text-emerald-400'
                      : gd < 0
                      ? 'text-red-400'
                      : 'text-gray-400'
                  }`}
                >
                  {gdDisplay}
                </div>

                {/* Points (PTS) */}
                <div className="col-span-2 text-center font-black text-cyan-300 text-xs">
                  {team.points}
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Standings Link */}
        {onViewFullStandings && (
          <button
            onClick={() => onViewFullStandings(currentLeague.id)}
            className="mt-3 pt-3 border-t border-white/10 text-center text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            <span>Lihat Klasemen Lengkap</span>
          </button>
        )}
      </div>
    </aside>
  );
};
