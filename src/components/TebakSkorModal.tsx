import React, { useState } from 'react';
import { X, Trophy, Sparkles, CheckCircle2, ShieldCheck, Flame, Users, Gift } from 'lucide-react';
import { Match, UserPrediction } from '../types';

interface TebakSkorModalProps {
  match: Match | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitPrediction: (prediction: UserPrediction) => void;
}

export const TebakSkorModal: React.FC<TebakSkorModalProps> = ({
  match,
  isOpen,
  onClose,
  onSubmitPrediction,
}) => {
  const [homeScore, setHomeScore] = useState<number>(2);
  const [awayScore, setAwayScore] = useState<number>(1);
  const [firstScorer, setFirstScorer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen || !match) return null;

  // Preset quick score choices
  const quickScores = [
    { h: 1, a: 0 },
    { h: 2, a: 1 },
    { h: 2, a: 0 },
    { h: 3, a: 1 },
    { h: 1, a: 1 },
    { h: 2, a: 2 },
    { h: 0, a: 1 },
    { h: 1, a: 2 },
    { h: 0, a: 2 },
  ];

  // Candidates for first scorer
  const scorerCandidates = [
    match.homeTeam.name.includes('Persib') ? 'David da Silva' : 'Bukayo Saka',
    match.homeTeam.name.includes('Persib') ? 'Ciro Alves' : 'Kai Havertz',
    match.awayTeam.name.includes('Persija') ? 'Gustavo Almeida' : 'Erling Haaland',
    match.awayTeam.name.includes('Persija') ? 'Ryo Matsumura' : 'Phil Foden',
    'Pemain Lainnya / Tanpa Gol',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPrediction: UserPrediction = {
      id: `pred-${Date.now()}`,
      matchId: match.id,
      homeTeamName: match.homeTeam.name,
      awayTeamName: match.awayTeam.name,
      predictedHomeScore: homeScore,
      predictedAwayScore: awayScore,
      firstScorer: firstScorer || scorerCandidates[0],
      createdAt: 'Baru saja',
      status: 'pending',
    };

    onSubmitPrediction(newPrediction);
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1800);
  };

  const community = match.communityPredictions || {
    homeWinPct: 58,
    drawPct: 24,
    awayWinPct: 18,
    totalVotes: 3410,
    topScore: '2 - 1',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0f1522] border border-amber-500/40 rounded-2xl shadow-2xl shadow-amber-950/30 overflow-hidden flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#171e2e] via-[#1a2538] to-[#142327] border-b border-[#24334a] px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-black font-black text-sm shadow-md">
              🎯
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm sm:text-base text-white tracking-tight font-score">
                  TEBAK SKOR <span className="text-amber-400">EXTRATIME</span>
                </span>
                <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                  GRATIS
                </span>
              </div>
              <span className="text-[11px] text-gray-400">{match.leagueName} • {match.kickoffTime}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-[#223046] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          /* Submission Success View */
          <div className="p-8 text-center flex flex-col items-center justify-center space-y-3 bg-[#0d131d]">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 animate-bounce">
              <CheckCircle2 className="w-9 h-9 text-emerald-400" />
            </div>
            <h3 className="text-lg font-extrabold text-white">Prediksi Berhasil Disimpan!</h3>
            <p className="text-xs text-gray-300 max-w-xs">
              Tebakan Anda: <strong className="text-amber-400 font-bold">{match.homeTeam.name} {homeScore} - {awayScore} {match.awayTeam.name}</strong> telah tercatat di sistem Extra Time.
            </p>
            <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Potensi +30 Poin jika tebakan skor tepat!</span>
            </div>
          </div>
        ) : (
          /* Form Content */
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 space-y-4">
            
            {/* Matchup Header Card */}
            <div className="bg-[#141c2b] border border-[#233247] rounded-xl p-3 text-center">
              <div className="flex items-center justify-between gap-3">
                {/* Home */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-[#1b2638] border border-emerald-500/30 flex items-center justify-center font-score font-black text-sm text-emerald-400 mb-1">
                    {match.homeTeam.shortName}
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {match.homeTeam.name}
                  </span>
                  <span className="text-[10px] text-gray-400">Tuan Rumah</span>
                </div>

                {/* VS */}
                <div className="shrink-0 flex flex-col items-center px-2">
                  <span className="font-score font-black text-sm text-amber-400 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800">
                    VS
                  </span>
                  <span className="text-[10px] text-gray-400 mt-1">{match.date}</span>
                </div>

                {/* Away */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-xl bg-[#1b2638] border border-sky-500/30 flex items-center justify-center font-score font-black text-sm text-sky-400 mb-1">
                    {match.awayTeam.shortName}
                  </div>
                  <span className="text-xs font-bold text-white truncate max-w-[120px]">
                    {match.awayTeam.name}
                  </span>
                  <span className="text-[10px] text-gray-400">Tim Tamu</span>
                </div>
              </div>
            </div>

            {/* Score Stepper Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                <span>Masukkan Prediksi Skor Akhir:</span>
                <span className="text-[11px] text-amber-400 font-normal">Waktu Penuh 90 Menit</span>
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Home Stepper */}
                <div className="bg-[#141c2b] border border-[#24334a] rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[11px] text-gray-400 font-semibold mb-2 truncate max-w-full">
                    Gol {match.homeTeam.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setHomeScore((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-[#202c40] hover:bg-[#283850] text-white font-bold text-base flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="font-score font-black text-2xl sm:text-3xl text-emerald-400 w-10 text-center">
                      {homeScore}
                    </span>
                    <button
                      type="button"
                      onClick={() => setHomeScore((prev) => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-[#202c40] hover:bg-[#283850] text-white font-bold text-base flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Away Stepper */}
                <div className="bg-[#141c2b] border border-[#24334a] rounded-xl p-3 flex flex-col items-center">
                  <span className="text-[11px] text-gray-400 font-semibold mb-2 truncate max-w-full">
                    Gol {match.awayTeam.name}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setAwayScore((prev) => Math.max(0, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-[#202c40] hover:bg-[#283850] text-white font-bold text-base flex items-center justify-center transition-colors"
                    >
                      -
                    </button>
                    <span className="font-score font-black text-2xl sm:text-3xl text-sky-400 w-10 text-center">
                      {awayScore}
                    </span>
                    <button
                      type="button"
                      onClick={() => setAwayScore((prev) => prev + 1)}
                      className="w-8 h-8 rounded-lg bg-[#202c40] hover:bg-[#283850] text-white font-bold text-base flex items-center justify-center transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Preset Buttons */}
              <div className="pt-1.5">
                <span className="text-[10px] text-gray-400 block mb-1">Pilihan Cepat Skor Populer:</span>
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                  {quickScores.map((qs, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setHomeScore(qs.h);
                        setAwayScore(qs.a);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold shrink-0 transition-all border ${
                        homeScore === qs.h && awayScore === qs.a
                          ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                          : 'bg-[#151e2d] hover:bg-[#1d293d] border-[#24344b] text-gray-300'
                      }`}
                    >
                      {qs.h} - {qs.a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bonus: Pencetak Gol Pertama */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
                <span>Bonus: Tebak Pencetak Gol Pertama</span>
                <span className="text-[10px] text-emerald-400 font-bold">+15 Poin Tambahan</span>
              </label>
              <select
                value={firstScorer}
                onChange={(e) => setFirstScorer(e.target.value)}
                className="w-full bg-[#141c2b] border border-[#24334a] focus:border-amber-500 rounded-xl px-3 py-2 text-xs text-white outline-hidden transition-colors"
              >
                <option value="">-- Pilih Pemain Pencetak Gol --</option>
                {scorerCandidates.map((c, idx) => (
                  <option key={idx} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Community Consensus Bar */}
            <div className="bg-[#111723] border border-[#1e2a3c] rounded-xl p-3 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-gray-300 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-amber-400" />
                  <span>Prediksi Komunitas Extra Time ({community.totalVotes.toLocaleString()} Voter)</span>
                </span>
                <span className="text-amber-300 font-bold">Skor Terbanyak: {community.topScore}</span>
              </div>

              {/* Progress Bar 3 Segments */}
              <div className="w-full h-3 rounded-full bg-[#1b2536] overflow-hidden flex">
                <div
                  style={{ width: `${community.homeWinPct}%` }}
                  className="h-full bg-emerald-500 flex items-center justify-center text-[9px] font-bold text-black"
                  title={`${match.homeTeam.name} Menang: ${community.homeWinPct}%`}
                >
                  {community.homeWinPct}%
                </div>
                <div
                  style={{ width: `${community.drawPct}%` }}
                  className="h-full bg-amber-500 flex items-center justify-center text-[9px] font-bold text-black"
                  title={`Seri: ${community.drawPct}%`}
                >
                  {community.drawPct}%
                </div>
                <div
                  style={{ width: `${community.awayWinPct}%` }}
                  className="h-full bg-sky-500 flex items-center justify-center text-[9px] font-bold text-black"
                  title={`${match.awayTeam.name} Menang: ${community.awayWinPct}%`}
                >
                  {community.awayWinPct}%
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-400 font-medium">
                <span className="text-emerald-400 font-semibold">{match.homeTeam.shortName} Menang ({community.homeWinPct}%)</span>
                <span className="text-amber-400 font-semibold">Imbang ({community.drawPct}%)</span>
                <span className="text-sky-400 font-semibold">{match.awayTeam.shortName} Menang ({community.awayWinPct}%)</span>
              </div>
            </div>

            {/* Points Rules Summary */}
            <div className="bg-[#131b26] p-2.5 rounded-lg border border-[#232f3e] text-[11px] text-gray-400 flex items-center justify-around">
              <div>🎯 Skor Tepat: <strong className="text-amber-400 font-bold">+30 Poin</strong></div>
              <div>⚡ Hasil 1X2: <strong className="text-emerald-400 font-bold">+10 Poin</strong></div>
              <div>⚽ Gol Pertama: <strong className="text-teal-400 font-bold">+15 Poin</strong></div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#1b2434] hover:bg-[#222e42] text-gray-300 border border-[#2b3a50] transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-2 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black shadow-lg shadow-amber-500/30 transition-all flex items-center justify-center gap-1.5"
              >
                <span>🚀 Simpan Prediksi Extra Time</span>
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
