import React from 'react';
import { Trophy, Medal, Award, Crown, CheckCircle2, Flame, ShieldAlert, Gift } from 'lucide-react';
import { LEADERBOARD_DATA, TEBAK_SKOR_PRIZE_POOL } from '../data/tebakSkorData';

interface TebakSkorLeaderboardProps {
  onBackToMatches: () => void;
}

export const TebakSkorLeaderboard: React.FC<TebakSkorLeaderboardProps> = ({ onBackToMatches }) => {
  const top1 = LEADERBOARD_DATA[0];
  const top2 = LEADERBOARD_DATA[1];
  const top3 = LEADERBOARD_DATA[2];

  return (
    <div className="space-y-4">
      {/* Header Info Banner */}
      <div className="bg-gradient-to-r from-[#171d2b] via-[#1f283d] to-[#162923] border border-amber-500/40 rounded-2xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-gradient-to-r from-amber-400 to-yellow-400 text-black mb-2 shadow-lg shadow-amber-400/30">
              <Crown className="w-3.5 h-3.5 fill-black" />
              <span>KLASEMEN TIPSTER EXTRATIME</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">
              Peringkat Penebak Skor Terbaik
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-xl">
              Leaderboard resmi mingguan ({TEBAK_SKOR_PRIZE_POOL.currentRound}). Total hadiah <strong className="text-amber-400">{TEBAK_SKOR_PRIZE_POOL.totalPrize}</strong> dibagikan setiap Senin untuk para pemuncak klasemen!
            </p>
          </div>

          <div className="bg-[#0e1420]/90 border border-[#26374f] p-3 rounded-xl flex items-center gap-4 shrink-0 text-xs">
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Periode Berakhir</span>
              <span className="font-bold text-amber-400 font-mono">{TEBAK_SKOR_PRIZE_POOL.periodEnds}</span>
            </div>
            <div className="w-px h-8 bg-[#26374f]" />
            <div>
              <span className="text-gray-400 block text-[10px] uppercase">Total Peserta</span>
              <span className="font-bold text-emerald-400 font-mono">{TEBAK_SKOR_PRIZE_POOL.totalParticipants.toLocaleString()} User</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {/* Rank 2 (Silver) */}
        <div className="bg-[#131b28] border border-slate-400/40 rounded-2xl p-4 flex flex-col items-center text-center relative shadow-lg order-2 md:order-1">
          <div className="w-8 h-8 rounded-full bg-slate-300 text-slate-900 font-black text-sm flex items-center justify-center absolute -top-3.5 shadow-md">
            2
          </div>
          <img
            src={top2.avatar}
            alt={top2.name}
            className="w-16 h-16 rounded-full border-2 border-slate-300 object-cover mt-2 mb-2 shadow-md"
          />
          <h3 className="font-bold text-white text-sm">{top2.name}</h3>
          <span className="text-[11px] text-gray-400">{top2.city} • <strong className="text-slate-300">{top2.favoriteClub}</strong></span>
          <div className="mt-3 py-1 px-3 rounded-full bg-slate-800/80 border border-slate-600 text-xs font-extrabold text-slate-200 font-mono">
            {top2.points} POIN
          </div>
          <div className="mt-2 text-[11px] text-gray-400">
            <span>{top2.correctScores} Skor Tepat</span> • <span className="text-emerald-400">{top2.winRate}% Akurasi</span>
          </div>
          <span className="mt-2 text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
            {top2.rewardTier}
          </span>
        </div>

        {/* Rank 1 (Gold - Elevated) */}
        <div className="bg-gradient-to-b from-[#1c2538] to-[#121927] border-2 border-amber-400 rounded-2xl p-5 flex flex-col items-center text-center relative shadow-xl shadow-amber-950/40 order-1 md:order-2 md:-translate-y-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-black font-black text-base flex items-center justify-center absolute -top-5 shadow-lg border-2 border-[#121927]">
            👑 1
          </div>
          <img
            src={top1.avatar}
            alt={top1.name}
            className="w-20 h-20 rounded-full border-2 border-amber-400 object-cover mt-2 mb-2 shadow-lg"
          />
          <span className="inline-block px-2 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/50 mb-1">
            PEMUNCAK KLASEMEN
          </span>
          <h3 className="font-extrabold text-white text-base">{top1.name}</h3>
          <span className="text-xs text-gray-300">{top1.city} • <strong className="text-amber-400">{top1.favoriteClub}</strong></span>
          <div className="mt-3 py-1.5 px-4 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-sm font-black font-mono shadow-md">
            {top1.points} POIN JUARA
          </div>
          <div className="mt-2 text-xs text-gray-300">
            <span>{top1.correctScores} Skor Tepat</span> • <span className="text-emerald-400 font-bold">{top1.winRate}% Akurasi</span>
          </div>
          <span className="mt-2 text-xs font-black text-yellow-300 bg-yellow-950/90 px-3 py-1 rounded-full border border-yellow-500/60 shadow-sm">
            🏆 {top1.rewardTier}
          </span>
        </div>

        {/* Rank 3 (Bronze) */}
        <div className="bg-[#131b28] border border-amber-700/50 rounded-2xl p-4 flex flex-col items-center text-center relative shadow-lg order-3">
          <div className="w-8 h-8 rounded-full bg-amber-700 text-white font-black text-sm flex items-center justify-center absolute -top-3.5 shadow-md">
            3
          </div>
          <img
            src={top3.avatar}
            alt={top3.name}
            className="w-16 h-16 rounded-full border-2 border-amber-600 object-cover mt-2 mb-2 shadow-md"
          />
          <h3 className="font-bold text-white text-sm">{top3.name}</h3>
          <span className="text-[11px] text-gray-400">{top3.city} • <strong className="text-amber-500">{top3.favoriteClub}</strong></span>
          <div className="mt-3 py-1 px-3 rounded-full bg-amber-950/80 border border-amber-700 text-xs font-extrabold text-amber-300 font-mono">
            {top3.points} POIN
          </div>
          <div className="mt-2 text-[11px] text-gray-400">
            <span>{top3.correctScores} Skor Tepat</span> • <span className="text-emerald-400">{top3.winRate}% Akurasi</span>
          </div>
          <span className="mt-2 text-[10px] font-bold text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-700/50">
            {top3.rewardTier}
          </span>
        </div>
      </div>

      {/* Full Leaderboard Table (Ranks 4-10) */}
      <div className="bg-[#131b26] border border-[#232f3e] rounded-xl p-4 shadow-md overflow-hidden">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#232f3e]">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Peringkat 4 - 10 Besar</span>
          </h3>
          <span className="text-xs text-gray-400">Pembaruan Realtime Setiap Laga Berakhir</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-[11px] uppercase bg-[#182333] text-gray-400 border-b border-[#232f3e]">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center">#</th>
                <th className="py-2.5 px-3">Tipster / User</th>
                <th className="py-2.5 px-3">Klub Favorit</th>
                <th className="py-2.5 px-2 text-center">Tebakan</th>
                <th className="py-2.5 px-2 text-center">Tepat</th>
                <th className="py-2.5 px-2 text-center">Akurasi</th>
                <th className="py-2.5 px-3 text-center font-bold text-amber-400">Total Poin</th>
                <th className="py-2.5 px-3 text-center">Hadiah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1f2937]/50 font-medium">
              {LEADERBOARD_DATA.slice(3).map((u) => (
                <tr key={u.userId} className="hover:bg-[#182333]/70 transition-colors">
                  <td className="py-2.5 px-3 text-center font-bold text-gray-400 font-mono">
                    #{u.rank}
                  </td>
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-2.5">
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-[#2a3a50]" />
                      <div>
                        <span className="font-bold text-white block truncate max-w-[140px]">{u.name}</span>
                        <span className="text-[10px] text-gray-400">{u.city}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-gray-300 font-semibold">{u.favoriteClub}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-gray-300">{u.totalPredictions}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-emerald-400 font-bold">{u.correctScores}</td>
                  <td className="py-2.5 px-2 text-center font-mono text-gray-300">{u.winRate}%</td>
                  <td className="py-2.5 px-3 text-center font-mono font-black text-amber-400 text-sm">
                    {u.points}
                  </td>
                  <td className="py-2.5 px-3 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/60 text-amber-300 border border-amber-800">
                      {u.rewardTier}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User's own standing summary card */}
        <div className="mt-4 pt-3 border-t border-[#232f3e] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#182333]/60 p-3 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center font-bold text-amber-400 text-xs">
              Saya
            </div>
            <div>
              <span className="font-bold text-white text-xs block">Akun Anda: Penggemar Extra Time</span>
              <span className="text-[11px] text-gray-400">Peringkat Sementara: <strong className="text-amber-400 font-bold">#14</strong> dari 24.890 peserta</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="text-right">
              <span className="text-gray-400 text-[10px] block">Poin Terkumpul</span>
              <span className="font-score font-black text-amber-400 text-base">210 Poin</span>
            </div>
            <button
              onClick={onBackToMatches}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-colors"
            >
              Tambah Prediksi
            </button>
          </div>
        </div>
      </div>

      {/* Rules & Points System */}
      <div className="bg-[#111722] border border-[#202c3e] rounded-xl p-4 text-xs text-gray-300">
        <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
          <Gift className="w-4 h-4 text-amber-400" />
          <span>Sistem Penghitungan Poin & Syarat Hadiah Extra Time:</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
          <div className="bg-[#16202f] p-3 rounded-lg border border-[#25354a]">
            <span className="font-bold text-amber-400 block mb-1">🎯 Tebak Skor Tepat: +30 Poin</span>
            <p className="text-[11px] text-gray-400">Jika tebakan skor akhir 90 menit Anda 100% tepat sama dengan hasil laga.</p>
          </div>
          <div className="bg-[#16202f] p-3 rounded-lg border border-[#25354a]">
            <span className="font-bold text-emerald-400 block mb-1">⚡ Tebak Pemenang (1X2): +10 Poin</span>
            <p className="text-[11px] text-gray-400">Jika skor berbeda tapi hasil akhir (Menang, Seri, Kalah) berhasil Anda tebak.</p>
          </div>
          <div className="bg-[#16202f] p-3 rounded-lg border border-[#25354a]">
            <span className="font-bold text-teal-400 block mb-1">⚽ Pencetak Gol Pertama: +15 Poin</span>
            <p className="text-[11px] text-gray-400">Bonus tambahan jika berhasil menebak pemain yang mencetak gol pembuka.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
