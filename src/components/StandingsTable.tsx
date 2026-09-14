import React, { useState, useEffect } from 'react';
import { Trophy, RefreshCw } from 'lucide-react';
import { League, StandingRow } from '../types';
import { TopLeagueGrid } from './TopLeagueGrid';
import { getStandingsForLeague } from '../data/mockMatches';

interface StandingsTableProps {
  leagues: League[];
  defaultLeagueId?: string;
  onLeagueChange?: (leagueId: string) => void;
}

export const StandingsTable: React.FC<StandingsTableProps> = ({
  leagues,
  defaultLeagueId = 'ucl',
  onLeagueChange,
}) => {
  const [selectedLeagueId, setSelectedLeagueId] = useState<string>(defaultLeagueId);
  const [standings, setStandings] = useState<StandingRow[]>(() =>
    getStandingsForLeague(defaultLeagueId)
  );
  const [loading, setLoading] = useState(false);

  const selectedLeague = leagues.find((l) => l.id === selectedLeagueId) || leagues[0];

  const handleSelectLeague = (id: string) => {
    setSelectedLeagueId(id);
    onLeagueChange?.(id);
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchStandings = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/football/standings/${selectedLeagueId}`);
        if (res.ok) {
          const data = await res.json();
          if (!isCancelled && data.success && Array.isArray(data.data) && data.data.length > 0) {
            setStandings(data.data);
            setLoading(false);
            return;
          }
        }
      } catch {
        // ignore
      }
      if (!isCancelled) {
        setStandings(getStandingsForLeague(selectedLeagueId));
        setLoading(false);
      }
    };

    fetchStandings();
    return () => {
      isCancelled = true;
    };
  }, [selectedLeagueId]);

  return (
    <div className="w-full space-y-6">
      {/* 1. Top 10 League Grid */}
      <TopLeagueGrid
        leagues={leagues}
        selectedLeagueId={selectedLeagueId}
        onSelectLeague={handleSelectLeague}
        showTitle={true}
        title="Klasemen Sepak Bola"
      />

      {/* 2. Standings Detailed Table */}
      <div className="bg-[#12151d] border border-[#202738] rounded-2xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#202738]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm">
              {selectedLeague?.logo && selectedLeague.logo.trim() !== '' ? (
                <img
                  src={selectedLeague.logo}
                  alt={selectedLeague.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <span className="text-xs font-black text-slate-800">
                  {selectedLeague?.shortName || selectedLeague?.name.slice(0, 2)}
                </span>
              )}
            </div>
            <div>
              <h3 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                <span>{selectedLeague.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-300 font-semibold">
                  {selectedLeague.country}
                </span>
              </h3>
              <p className="text-xs text-gray-400">Klasemen Resmi Terupdate</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setLoading(true);
                fetch(`/api/football/standings/${selectedLeagueId}`)
                  .then((res) => res.json())
                  .then((data) => {
                    if (data.data) setStandings(data.data);
                  })
                  .finally(() => setLoading(false));
              }}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#181d28] hover:bg-[#202738] text-xs font-bold text-gray-300 hover:text-white transition-colors border border-[#283248] cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase bg-[#181d28] text-gray-400 border-b border-[#202738]">
              <tr>
                <th className="py-3 px-3 w-12 text-center">#</th>
                <th className="py-3 px-3">Klub</th>
                <th className="py-3 px-2 text-center" title="Main">PL</th>
                <th className="py-3 px-2 text-center" title="Menang">M</th>
                <th className="py-3 px-2 text-center" title="Seri">S</th>
                <th className="py-3 px-2 text-center" title="Kalah">K</th>
                <th className="py-3 px-2 text-center" title="Gol Masuk">GM</th>
                <th className="py-3 px-2 text-center" title="Gol Kebobolan">GK</th>
                <th className="py-3 px-2 text-center" title="Selisih Gol">GD</th>
                <th className="py-3 px-3 text-center font-bold text-cyan-300" title="Poin">PTS</th>
                <th className="py-3 px-3 text-center hidden md:table-cell">5 Pertandingan Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1c2232] font-medium">
              {standings.map((row, idx) => {
                const pos = row.position || idx + 1;
                const isUcl = pos <= 4;
                const gd = row.goalDifference;
                const gdDisplay = gd > 0 ? `+${gd}` : gd;

                return (
                  <tr key={row.teamId || idx} className="hover:bg-[#181d28]/80 transition-colors">
                    <td className="py-2.5 px-3 text-center font-mono font-bold">
                      <span
                        className={`inline-block w-6 h-6 rounded-full leading-6 text-center text-xs ${
                          pos === 1
                            ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-sm'
                            : isUcl
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'text-gray-400'
                        }`}
                      >
                        {pos}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-bold text-white">
                      <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center p-0.5 flex-shrink-0 overflow-hidden">
                          {row.teamLogo && row.teamLogo.trim() !== '' ? (
                            <img
                              src={row.teamLogo}
                              alt={row.teamName}
                              referrerPolicy="no-referrer"
                              className="w-5 h-5 object-contain"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'https://a.espncdn.com/i/teamlogos/soccer/500/default-team-logo-500.png';
                              }}
                            />
                          ) : (
                            <span className="text-[10px] font-bold text-gray-300">
                              {row.shortName || row.teamName.slice(0, 2)}
                            </span>
                          )}
                        </div>
                        <span className="truncate max-w-[200px]">{row.teamName}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-2 text-center font-mono text-gray-300">{row.played}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-emerald-400 font-bold">{row.won}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-gray-400">{row.draw}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-red-400">{row.lost}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-gray-400">{row.goalsFor}</td>
                    <td className="py-2.5 px-2 text-center font-mono text-gray-400">{row.goalsAgainst}</td>
                    <td
                      className={`py-2.5 px-2 text-center font-mono font-bold ${
                        gd > 0 ? 'text-emerald-400' : gd < 0 ? 'text-red-400' : 'text-gray-400'
                      }`}
                    >
                      {gdDisplay}
                    </td>
                    <td className="py-2.5 px-3 text-center font-black text-sm text-cyan-300">
                      {row.points}
                    </td>
                    <td className="py-2.5 px-3 text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1">
                        {(row.form || ['W', 'D', 'W', 'W', 'L']).map((result, i) => (
                          <span
                            key={i}
                            className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black text-white ${
                              result === 'W'
                                ? 'bg-emerald-600'
                                : result === 'D'
                                ? 'bg-gray-600'
                                : 'bg-red-600'
                            }`}
                          >
                            {result}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
