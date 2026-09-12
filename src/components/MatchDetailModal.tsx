import React, { useState } from 'react';
import { X, Activity, BarChart2, Users, History, DollarSign, Calendar, MapPin, Tv, Shield } from 'lucide-react';
import { Match } from '../types';
import { PitchTracker } from './PitchTracker';

interface MatchDetailModalProps {
  match: Match | null;
  onClose: () => void;
}

type DetailTab = 'tracker' | 'timeline' | 'stats' | 'lineups' | 'h2h' | 'odds';

export const MatchDetailModal: React.FC<MatchDetailModalProps> = ({ match, onClose }) => {
  const [activeTab, setActiveTab] = useState<DetailTab>('tracker');

  if (!match) return null;

  const isLive = match.status === 'LIVE';
  const isHT = match.status === 'HT';
  const isFT = match.status === 'FT';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-[#09101c] border border-[#1b2b42] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Header */}
        <div className="bg-[#0e1726] border-b border-[#1b2b42] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-base">{match.leagueFlag}</span>
            <span className="font-bold text-white">{match.leagueName}</span>
            {match.round && <span className="text-slate-400">• {match.round}</span>}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1b2b42] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scoreboard Big Banner */}
        <div className="bg-gradient-to-b from-[#0e1726] to-[#09101c] px-4 py-5 border-b border-[#1b2b42]">
          <div className="flex items-center justify-around gap-2 text-center">
            
            {/* Home Team */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#142032] border border-[#23354f] flex items-center justify-center shadow-lg mb-2">
                <span className="text-base font-extrabold text-emerald-400 font-score">
                  {match.homeTeam.shortName}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">{match.homeTeam.name}</h3>
              {match.homeTeam.redCards ? (
                <span className="mt-1 px-1.5 py-0.2 rounded bg-red-600 text-white text-[10px] font-bold">
                  {match.homeTeam.redCards} Kartu Merah
                </span>
              ) : null}
            </div>

            {/* Score & Status Center */}
            <div className="flex flex-col items-center px-4">
              {/* Status Badge */}
              <div className="mb-1">
                {isLive && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold text-red-400 bg-red-950/80 border border-red-700 font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    LIVE {match.minute}&apos;
                  </span>
                )}
                {isHT && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-cyan-300 bg-cyan-950/70 border border-cyan-800">
                    Babak Pertama (HT)
                  </span>
                )}
                {isFT && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700">
                    Selesai (FT)
                  </span>
                )}
                {match.status === 'SCHEDULED' && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800">
                    {match.kickoffTime}
                  </span>
                )}
              </div>

              {/* Large Score */}
              <div className="font-score font-extrabold text-3xl sm:text-4xl text-white tracking-wider flex items-center gap-3">
                <span>{match.status === 'SCHEDULED' ? '-' : match.homeScore}</span>
                <span className="text-slate-500 text-2xl">:</span>
                <span>{match.status === 'SCHEDULED' ? '-' : match.awayScore}</span>
              </div>

              {match.halfTimeScore && (
                <span className="text-[11px] text-slate-400 font-mono mt-1">
                  (Babak Pertama: {match.halfTimeScore.home} - {match.halfTimeScore.away})
                </span>
              )}
            </div>

            {/* Away Team */}
            <div className="flex-1 flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#142032] border border-[#23354f] flex items-center justify-center shadow-lg mb-2">
                <span className="text-base font-extrabold text-cyan-400 font-score">
                  {match.awayTeam.shortName}
                </span>
              </div>
              <h3 className="font-bold text-sm sm:text-base text-white">{match.awayTeam.name}</h3>
              {match.awayTeam.redCards ? (
                <span className="mt-1 px-1.5 py-0.2 rounded bg-red-600 text-white text-[10px] font-bold">
                  {match.awayTeam.redCards} Kartu Merah
                </span>
              ) : null}
            </div>
          </div>

          {/* Venue & Broadcast meta bar */}
          <div className="mt-4 pt-3 border-t border-[#1b2b42]/70 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
            {match.venue && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{match.venue}</span>
              </span>
            )}
            {match.referee && (
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Wasit: {match.referee}</span>
              </span>
            )}
            {match.tvChannel && (
              <span className="flex items-center gap-1 text-emerald-400">
                <Tv className="w-3.5 h-3.5" />
                <span>Siaran: {match.tvChannel}</span>
              </span>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 px-4 bg-[#0b1322] border-b border-[#1b2b42] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('tracker')}
            className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'tracker'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Animasi Lapangan 2D</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'timeline'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Linimasa & Gol</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'stats'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Statistik</span>
          </button>

          <button
            onClick={() => setActiveTab('lineups')}
            className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'lineups'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Susunan Pemain</span>
          </button>

          <button
            onClick={() => setActiveTab('h2h')}
            className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === 'h2h'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Head to Head</span>
          </button>

          {match.odds && (
            <button
              onClick={() => setActiveTab('odds')}
              className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-bold border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'odds'
                  ? 'border-emerald-500 text-emerald-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <DollarSign className="w-4 h-4" />
              <span>Pasaran / Odds</span>
            </button>
          )}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-4 overflow-y-auto">
          
          {/* 1. 2D PITCH TRACKER TAB */}
          {activeTab === 'tracker' && (
            <div className="space-y-4">
              <PitchTracker match={match} />

              {/* Text commentary / latest feed */}
              <div className="bg-[#0e1728] border border-[#1b2b42] rounded-xl p-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                  Komentar Langsung Terbaru
                </h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2.5 text-xs bg-[#132034] p-2.5 rounded-lg border border-[#1e304c]">
                    <span className="font-mono font-bold text-emerald-400 shrink-0">
                      {match.minute || '45'}&apos;
                    </span>
                    <span className="text-slate-200">
                      {match.lastActionText || 'Permainan berlanjut dengan tempo tinggi dan perebutan bola sengit di lini tengah.'}
                    </span>
                  </div>
                  {match.events && match.events.length > 0 && (
                    <div className="flex items-start gap-2.5 text-xs bg-[#132034]/60 p-2 rounded-lg text-slate-300">
                      <span className="font-mono text-slate-400 shrink-0">{match.events[match.events.length - 1].minute}&apos;</span>
                      <span>
                        {match.events[match.events.length - 1].player} - {match.events[match.events.length - 1].description || 'Peristiwa penting dalam pertandingan.'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 2. TIMELINE TAB */}
          {activeTab === 'timeline' && (
            <div className="space-y-3">
              {match.events && match.events.length > 0 ? (
                <div className="relative border-l-2 border-[#1b2b42] ml-6 pl-4 space-y-4 py-2">
                  {match.events.map((event) => {
                    const isHome = event.team === 'home';
                    return (
                      <div key={event.id} className="relative flex items-center gap-3">
                        {/* Event icon dot */}
                        <div className="absolute -left-[25px] w-6 h-6 rounded-full bg-[#132034] border border-[#23354f] flex items-center justify-center text-xs shadow-md">
                          {event.type === 'goal' && '⚽'}
                          {event.type === 'yellow_card' && '🟨'}
                          {event.type === 'red_card' && '🟥'}
                          {event.type === 'sub' && '🔄'}
                        </div>

                        {/* Content box */}
                        <div
                          className={`flex-1 p-2.5 rounded-xl border text-xs ${
                            isHome
                              ? 'bg-emerald-950/20 border-emerald-600/30'
                              : 'bg-cyan-950/20 border-cyan-600/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-white flex items-center gap-1.5">
                              <span>{event.player}</span>
                              <span className="text-[10px] text-slate-400">
                                ({isHome ? match.homeTeam.shortName : match.awayTeam.shortName})
                              </span>
                            </span>
                            <span className="font-mono font-bold text-emerald-400">
                              {event.minute}&apos;{event.extraMinute ? `+${event.extraMinute}` : ''}
                            </span>
                          </div>

                          {event.assistPlayer && (
                            <div className="text-slate-400 text-[11px]">
                              Assist: <span className="text-slate-200">{event.assistPlayer}</span>
                            </div>
                          )}

                          {event.description && (
                            <div className="text-slate-400 text-[11px] mt-0.5">{event.description}</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Belum ada catatan gol atau kartu pada pertandingan ini.
                </div>
              )}
            </div>
          )}

          {/* 3. STATS TAB */}
          {activeTab === 'stats' && match.stats && (
            <div className="space-y-3">
              {[
                { label: 'Penguasaan Bola', home: match.stats.possession[0], away: match.stats.possession[1], unit: '%' },
                { label: 'Tembakan Tepat Sasaran', home: match.stats.shotsOnTarget[0], away: match.stats.shotsOnTarget[1] },
                { label: 'Total Tembakan', home: match.stats.totalShots[0], away: match.stats.totalShots[1] },
                { label: 'Tendangan Sudut', home: match.stats.corners[0], away: match.stats.corners[1] },
                { label: 'Pelanggaran', home: match.stats.fouls[0], away: match.stats.fouls[1] },
                { label: 'Offside', home: match.stats.offsides[0], away: match.stats.offsides[1] },
                { label: 'Kartu Kuning', home: match.stats.yellowCards[0], away: match.stats.yellowCards[1] },
                { label: 'Kartu Merah', home: match.stats.redCards[0], away: match.stats.redCards[1] },
                { label: 'Penyelamatan Kiper', home: match.stats.goalkeeperSaves[0], away: match.stats.goalkeeperSaves[1] },
                { label: 'Akurasi Operan', home: match.stats.passesAccuracy[0], away: match.stats.passesAccuracy[1], unit: '%' },
                { label: 'Serangan Berbahaya', home: match.stats.dangerousAttacks[0], away: match.stats.dangerousAttacks[1] },
              ].map((stat, idx) => {
                const total = (stat.home + stat.away) || 1;
                const homePercent = Math.round((stat.home / total) * 100);

                return (
                  <div key={idx} className="bg-[#0e1728] border border-[#1b2b42] rounded-xl p-2.5 text-xs">
                    <div className="flex items-center justify-between mb-1.5 font-bold">
                      <span className="text-emerald-400 font-mono">
                        {stat.home}{stat.unit || ''}
                      </span>
                      <span className="text-slate-300 font-medium">{stat.label}</span>
                      <span className="text-cyan-400 font-mono">
                        {stat.away}{stat.unit || ''}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-2 w-full bg-[#142032] rounded-full overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full transition-all duration-500"
                        style={{ width: `${homePercent}%` }}
                      ></div>
                      <div
                        className="bg-cyan-500 h-full transition-all duration-500"
                        style={{ width: `${100 - homePercent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 4. LINEUPS TAB */}
          {activeTab === 'lineups' && (
            <div className="space-y-4">
              {match.lineups ? (
                <div className="space-y-4">
                  {/* Formations and Coaches Header */}
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="bg-[#0e1728] p-2.5 rounded-xl border border-[#1b2b42]">
                      <div className="text-slate-400 font-medium mb-0.5">{match.homeTeam.name}</div>
                      <div className="text-emerald-400 font-bold font-score text-sm">
                        {match.lineups.home.formation}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Pelatih: {match.lineups.home.coach}</div>
                    </div>
                    <div className="bg-[#0e1728] p-2.5 rounded-xl border border-[#1b2b42]">
                      <div className="text-slate-400 font-medium mb-0.5">{match.awayTeam.name}</div>
                      <div className="text-cyan-400 font-bold font-score text-sm">
                        {match.lineups.away.formation}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">Pelatih: {match.lineups.away.coach}</div>
                    </div>
                  </div>

                  {/* Starting XI List Side-by-Side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    {/* Home Starting XI */}
                    <div className="bg-[#0e1728] border border-[#1b2b42] rounded-xl p-3">
                      <h4 className="font-bold text-white mb-2 pb-1 border-b border-[#1b2b42] flex items-center justify-between">
                        <span>Starting XI ({match.homeTeam.shortName})</span>
                        <span className="text-[10px] text-emerald-400">{match.lineups.home.formation}</span>
                      </h4>
                      <div className="space-y-1.5">
                        {match.lineups.home.startingXI.map((p) => (
                          <div key={p.number} className="flex items-center justify-between py-1 px-1.5 hover:bg-[#132034] rounded">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/50 flex items-center justify-center font-mono font-bold text-[10px]">
                                {p.number}
                              </span>
                              <span className="text-slate-200">{p.name}</span>
                            </div>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-900/50 text-emerald-300 font-bold">
                              {p.rating}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Away Starting XI */}
                    <div className="bg-[#0e1728] border border-[#1b2b42] rounded-xl p-3">
                      <h4 className="font-bold text-white mb-2 pb-1 border-b border-[#1b2b42] flex items-center justify-between">
                        <span>Starting XI ({match.awayTeam.shortName})</span>
                        <span className="text-[10px] text-cyan-400">{match.lineups.away.formation}</span>
                      </h4>
                      <div className="space-y-1.5">
                        {match.lineups.away.startingXI.map((p) => (
                          <div key={p.number} className="flex items-center justify-between py-1 px-1.5 hover:bg-[#132034] rounded">
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/50 flex items-center justify-center font-mono font-bold text-[10px]">
                                {p.number}
                              </span>
                              <span className="text-slate-200">{p.name}</span>
                            </div>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900/50 text-cyan-300 font-bold">
                              {p.rating}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Susunan pemain resmi akan dikonfirmasi 1 jam sebelum sepak mula.
                </div>
              )}
            </div>
          )}

          {/* 5. H2H TAB */}
          {activeTab === 'h2h' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Riwayat Pertemuan Terakhir (Head-to-Head)
              </h4>
              {match.h2h && match.h2h.length > 0 ? (
                <div className="space-y-2">
                  {match.h2h.map((h) => (
                    <div
                      key={h.id}
                      className="bg-[#0e1728] border border-[#1b2b42] rounded-xl p-2.5 text-xs flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500 font-mono text-[11px]">{h.date}</span>
                        <span className="px-1.5 py-0.2 bg-[#17253b] rounded text-[10px] text-slate-400">
                          {h.competition}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 font-semibold text-white">
                        <span>{h.homeTeam}</span>
                        <span className="font-score font-bold px-2 py-0.5 bg-[#080d16] rounded border border-[#1b2b42] text-emerald-400">
                          {h.homeScore} - {h.awayScore}
                        </span>
                        <span>{h.awayTeam}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  Data pertemuan langsung untuk kedua tim ini akan segera diperbarui.
                </div>
              )}
            </div>
          )}

          {/* 6. ODDS TAB */}
          {activeTab === 'odds' && match.odds && (
            <div className="space-y-3">
              <div className="bg-[#0e1728] border border-[#1b2b42] rounded-xl p-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3">
                  Pasaran Asian Handicap & Over/Under
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Handicap card */}
                  <div className="bg-[#132034] p-3 rounded-lg border border-[#1e304c]">
                    <div className="text-slate-400 font-medium mb-1">Asian Handicap (HDP)</div>
                    <div className="text-lg font-bold font-score text-white mb-2">
                      Voor: <span className="text-cyan-400">{match.odds.handicap.line}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 font-mono">
                      <span>{match.homeTeam.name}: {match.odds.handicap.homeOdds.toFixed(2)}</span>
                      <span>{match.awayTeam.name}: {match.odds.handicap.awayOdds.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Over Under card */}
                  <div className="bg-[#132034] p-3 rounded-lg border border-[#1e304c]">
                    <div className="text-slate-400 font-medium mb-1">Over / Under (O/U)</div>
                    <div className="text-lg font-bold font-score text-white mb-2">
                      Pasaran Gol: <span className="text-emerald-400">{match.odds.overUnder.line}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300 font-mono">
                      <span>Besar (Over): {match.odds.overUnder.overOdds.toFixed(2)}</span>
                      <span>Kecil (Under): {match.odds.overUnder.underOdds.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* 1X2 Odds */}
                <div className="mt-3 pt-3 border-t border-[#1e304c] flex items-center justify-around text-center text-xs">
                  <div>
                    <div className="text-slate-400 text-[10px]">1 (Home)</div>
                    <div className="font-score font-bold text-emerald-400 text-sm">
                      {match.odds.euro1X2.home.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">X (Seri / Draw)</div>
                    <div className="font-score font-bold text-slate-200 text-sm">
                      {match.odds.euro1X2.draw.toFixed(2)}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">2 (Away)</div>
                    <div className="font-score font-bold text-cyan-400 text-sm">
                      {match.odds.euro1X2.away.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
