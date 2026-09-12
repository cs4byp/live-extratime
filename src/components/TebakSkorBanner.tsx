import React from 'react';
import { Trophy, Gift, ArrowRight, Sparkles, Award } from 'lucide-react';
import { TEBAK_SKOR_PRIZE_POOL, RECENT_PREDICTIONS_TICKER } from '../data/tebakSkorData';
import { Match } from '../types';

interface TebakSkorBannerProps {
  onOpenTebakSkor: (match?: Match) => void;
  onViewLeaderboard: () => void;
  featuredMatch?: Match;
}

export const TebakSkorBanner: React.FC<TebakSkorBannerProps> = ({
  onOpenTebakSkor,
  onViewLeaderboard,
  featuredMatch,
}) => {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#171424] via-[#1a1f33] to-[#122421] border-2 border-amber-400/50 p-4 sm:p-5 shadow-2xl shadow-amber-950/30 mb-4">
      {/* Subtle background glow & decorative soccer elements */}
      <div className="absolute -top-12 -right-12 w-56 h-56 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left side: Brand Title & Prize Promo */}
        <div className="flex-1 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-black shadow-lg shadow-amber-400/40">
              <Sparkles className="w-3.5 h-3.5 fill-black" />
              <span>EXTRATIME TEBAK SKOR</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/80 border border-emerald-500/60 text-emerald-300 shadow-sm shadow-emerald-950/50">
              <Gift className="w-3.5 h-3.5 text-emerald-400" />
              <span>Total Hadiah: <strong className="text-white font-extrabold">{TEBAK_SKOR_PRIZE_POOL.totalPrize}</strong></span>
            </span>

            <span className="text-[11px] text-amber-200/80 font-mono hidden sm:inline bg-black/40 px-2 py-0.5 rounded border border-amber-500/30">
              • {TEBAK_SKOR_PRIZE_POOL.currentRound}
            </span>
          </div>

          <div>
            <h2 className="text-base sm:text-lg lg:text-xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Prediksi Skor Big Match & Raih Hadiah Jutaan Rupiah!</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-200 max-w-2xl mt-0.5 leading-relaxed">
              Tebak skor akurat <strong className="text-amber-300">BRI Liga 1</strong> & <strong className="text-emerald-300">Premier League</strong>. 100% Gratis, kumpulkan poin juara, dan menangkan saldo e-wallet serta jersey original setiap pekan!
            </p>
          </div>

          {/* Live Recent Predictions Ticker */}
          <div className="flex items-center gap-2 text-[11px] text-gray-300 overflow-hidden pt-1">
            <span className="shrink-0 font-black text-amber-400 flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
              Aktivitas Tebakan Live:
            </span>
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-none whitespace-nowrap">
              {RECENT_PREDICTIONS_TICKER.slice(0, 3).map((item, idx) => (
                <span key={idx} className="bg-[#0b121e]/90 px-3 py-1 rounded-lg border border-amber-500/30 text-gray-200 shadow-xs">
                  <strong className="text-white">{item.user}</strong> tebak <span className="text-amber-400 font-extrabold">{item.match}</span> ({item.pred})
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side: Action Buttons */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 shrink-0 w-full sm:w-auto">
          <button
            onClick={() => onOpenTebakSkor(featuredMatch)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5"
          >
            <span>🎯 Ikut Tebak Sekarang</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>

          <button
            onClick={onViewLeaderboard}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1b2434] hover:bg-[#222e42] border border-[#2c3d55] text-amber-300 transition-all"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Klasemen Tipster</span>
          </button>
        </div>

      </div>
    </div>
  );
};
