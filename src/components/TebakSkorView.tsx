import React from 'react';
import { Trophy, Sparkles, CheckCircle2, Clock, Users, ArrowRight, ShieldCheck } from 'lucide-react';
import { Match, UserPrediction } from '../types';
import { TEBAK_SKOR_PRIZE_POOL } from '../data/tebakSkorData';

interface TebakSkorViewProps {
  matches: Match[];
  userPredictions: UserPrediction[];
  onOpenPredictionModal: (match: Match) => void;
  onViewLeaderboard: () => void;
}

export const TebakSkorView: React.FC<TebakSkorViewProps> = ({
  matches,
  userPredictions,
  onOpenPredictionModal,
  onViewLeaderboard,
}) => {
  // Football matches available for prediction (Scheduled or Live)
  const openMatches = matches.filter((m) => m.sport === 'football');

  // Total points earned
  const totalPoints = userPredictions.reduce((acc, curr) => acc + (curr.pointsEarned || 0), 210);

  return (
    <div className="space-y-4">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-[#171424] via-[#1a2035] to-[#122822] border-2 border-amber-400/50 rounded-2xl p-4 sm:p-6 shadow-2xl shadow-amber-950/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-400 text-black shadow-sm shadow-amber-400/30">
                🎯 TEBAK SKOR EXTRATIME
              </span>
              <span className="text-xs text-amber-300 font-extrabold bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
                {TEBAK_SKOR_PRIZE_POOL.currentRound}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Pusat Prediksi Pertandingan EXTRATIME
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-xl leading-relaxed">
              Pilih laga favorit Anda, tebak skor akhir, dan kumpulkan poin untuk memenangkan hadiah total <strong className="text-amber-400 font-extrabold">{TEBAK_SKOR_PRIZE_POOL.totalPrize}</strong> pekan ini!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-[#0a101c] border border-amber-500/40 p-3.5 rounded-xl shrink-0 shadow-lg">
            <div className="text-center px-2">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Poin Anda</span>
              <span className="font-score font-black text-amber-400 text-2xl">{totalPoints}</span>
            </div>
            <div className="w-px h-8 bg-amber-500/30" />
            <div className="text-center px-2">
              <span className="text-[10px] text-gray-400 uppercase font-bold block">Prediksi Aktif</span>
              <span className="font-score font-black text-emerald-400 text-2xl">{userPredictions.length}</span>
            </div>
            <button
              onClick={onViewLeaderboard}
              className="ml-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-black text-xs flex items-center gap-1.5 transition-all shadow-md shadow-amber-500/20"
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Leaderboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Matches Open for Prediction */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white">🔥 Pertandingan Siap Ditebak</span>
            <span className="text-xs text-gray-400">({openMatches.length} Laga Tersedia)</span>
          </div>
          <span className="text-xs text-amber-400">Tebakan ditutup saat kick-off</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {openMatches.map((match) => {
            const existingPred = userPredictions.find((p) => p.matchId === match.id);
            const comm = match.communityPredictions || {
              homeWinPct: 55,
              drawPct: 25,
              awayWinPct: 20,
              totalVotes: 3100,
              topScore: '2 - 1',
            };

            return (
              <div
                key={match.id}
                className="bg-[#131b28] hover:bg-[#162132] border border-[#233146] hover:border-amber-500/50 rounded-xl p-4 transition-all shadow-md flex flex-col justify-between"
              >
                {/* Top League & Match info */}
                <div>
                  <div className="flex items-center justify-between text-xs pb-2 mb-2 border-b border-[#1f2c3e]">
                    <div className="flex items-center gap-1.5 text-gray-300 font-semibold">
                      <span>{match.leagueFlag}</span>
                      <span className="truncate max-w-[180px]">{match.leagueName}</span>
                    </div>
                    <span className="font-mono text-emerald-400 text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                      {match.kickoffTime}
                    </span>
                  </div>

                  {/* Team matchup */}
                  <div className="flex items-center justify-between gap-3 my-2">
                    {/* Home Team */}
                    <div className="flex-1 flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-[#1b2638] border border-[#2c3d55] flex items-center justify-center font-score font-bold text-xs text-emerald-400 shrink-0">
                        {match.homeTeam.shortName}
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-white truncate">
                        {match.homeTeam.name}
                      </span>
                    </div>

                    <span className="font-score font-black text-xs text-gray-400 px-2 py-1 bg-[#0c121d] rounded border border-[#212d3f]">
                      VS
                    </span>

                    {/* Away Team */}
                    <div className="flex-1 flex items-center justify-end gap-2.5 text-right">
                      <span className="font-bold text-xs sm:text-sm text-white truncate">
                        {match.awayTeam.name}
                      </span>
                      <div className="w-9 h-9 rounded-xl bg-[#1b2638] border border-[#2c3d55] flex items-center justify-center font-score font-bold text-xs text-sky-400 shrink-0">
                        {match.awayTeam.shortName}
                      </div>
                    </div>
                  </div>

                  {/* Community Prediction Percentages Bar */}
                  <div className="my-2.5 pt-2 border-t border-[#1e2a3c]">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-amber-400" />
                        <span>Komunitas: {comm.totalVotes.toLocaleString()} vote</span>
                      </span>
                      <span>Skor Terbanyak: <strong className="text-amber-300">{comm.topScore}</strong></span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#0e1520] overflow-hidden flex">
                      <div style={{ width: `${comm.homeWinPct}%` }} className="bg-emerald-500" title={`${match.homeTeam.shortName} ${comm.homeWinPct}%`} />
                      <div style={{ width: `${comm.drawPct}%` }} className="bg-amber-500" title={`Seri ${comm.drawPct}%`} />
                      <div style={{ width: `${comm.awayWinPct}%` }} className="bg-sky-500" title={`${match.awayTeam.shortName} ${comm.awayWinPct}%`} />
                    </div>
                  </div>
                </div>

                {/* Bottom Action / Status */}
                <div className="mt-3 pt-2.5 border-t border-[#1f2c3e] flex items-center justify-between gap-2">
                  {existingPred ? (
                    <div className="flex items-center gap-2 text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-gray-300">
                        Tebakan Anda: <strong className="text-amber-400 font-bold">{existingPred.predictedHomeScore} - {existingPred.predictedAwayScore}</strong>
                      </span>
                    </div>
                  ) : (
                    <span className="text-[11px] text-gray-400">Belum ada tebakan skor</span>
                  )}

                  <button
                    onClick={() => onOpenPredictionModal(match)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      existingPred
                        ? 'bg-[#1e2a3c] hover:bg-[#28374d] text-amber-300 border border-amber-500/30'
                        : 'bg-amber-500 hover:bg-amber-400 text-black font-extrabold shadow-md shadow-amber-500/20'
                    }`}
                  >
                    {existingPred ? 'Ubah Tebakan' : '🎯 Tebak Skor'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* User's Prediction History */}
      <div className="bg-[#131b26] border border-[#232f3e] rounded-xl p-4 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#232f3e]">
          <div className="flex items-center gap-2">
            <span className="text-base">📋</span>
            <h3 className="font-bold text-white text-sm">Riwayat Tebakan Saya</h3>
          </div>
          <span className="text-xs text-gray-400">Total {userPredictions.length} Tebakan Tercatat</span>
        </div>

        {userPredictions.length === 0 ? (
          <div className="py-8 text-center text-gray-400 text-xs">
            Belum ada tebakan skor yang Anda simpan. Pilih laga di atas dan kirim prediksi pertama Anda!
          </div>
        ) : (
          <div className="space-y-2.5">
            {userPredictions.map((pred) => (
              <div
                key={pred.id}
                className="bg-[#182333] border border-[#232f3e] rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm">
                    {pred.homeTeamName} vs {pred.awayTeamName}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    Pencetak Gol: <span className="text-amber-300">{pred.firstScorer || 'Bebas'}</span> • Dibuat: {pred.createdAt}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-[#0f1520] rounded-lg border border-[#232f3e] text-center">
                    <span className="text-[10px] text-gray-400 block">Prediksi Skor</span>
                    <span className="font-score font-bold text-amber-400 text-sm">
                      {pred.predictedHomeScore} - {pred.predictedAwayScore}
                    </span>
                  </div>

                  {pred.status === 'correct' ? (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-emerald-400 border border-emerald-700">
                      ✅ Tepat (+30 Poin)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-950/60 text-amber-400 border border-amber-800">
                      ⏳ Menunggu Hasil Laga
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
