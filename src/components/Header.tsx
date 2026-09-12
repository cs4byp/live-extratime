import React from 'react';
import { Volume2, VolumeX, Play, Pause, Search, Clock, Trophy, ListFilter, Activity, ExternalLink } from 'lucide-react';
import { soundService } from '../utils/sound';

export type MainNavTab = 'matches' | 'standings';

interface HeaderProps {
  activeMainTab: MainNavTab;
  onSelectMainTab: (tab: MainNavTab) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  liveMatchCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeMainTab,
  onSelectMainTab,
  searchQuery,
  onSearchChange,
  isSimulating,
  onToggleSimulation,
  soundEnabled,
  onToggleSound,
  liveMatchCount,
}) => {

  const handleSoundToggle = () => {
    onToggleSound();
    if (!soundEnabled) {
      soundService.playTestBeep();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070d18]/95 backdrop-blur-md border-b border-[#17253a] shadow-xl">
      {/* Top Breaking Live Ticker Bar */}
      <div className="bg-gradient-to-r from-[#040810] via-[#091526] to-[#040810] border-b border-[#142236] py-1 px-3 text-[11px] text-slate-300 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-extrabold text-emerald-400 uppercase tracking-wider text-[10px]">
              EXTRA TIME LIVE
            </span>
          </div>

          <div className="flex-1 overflow-hidden whitespace-nowrap text-xs font-medium text-slate-300">
            <div className="inline-flex items-center gap-6 animate-marquee">
              <span className="text-slate-200">
                <span className="text-emerald-400 font-bold">Persib</span> 2 - 1 Persija <span className="text-red-400 font-bold text-[10px]">(74&apos;)</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200">
                <span className="text-cyan-400 font-bold">Man City</span> 3 - 1 Arsenal <span className="text-red-400 font-bold text-[10px]">(88&apos;)</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200">
                <span className="text-emerald-400 font-bold">Real Madrid</span> 1 - 0 Barcelona <span className="text-red-400 font-bold text-[10px]">(52&apos;)</span>
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-200">
                Inter Milan 0 - 0 Juventus <span className="text-cyan-400 font-bold text-[10px]">(HT)</span>
              </span>
            </div>
          </div>

          <a
            href="https://www.tebakskor-extratime.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold shrink-0 transition-colors"
          >
            <span>🎯 Main Tebak Skor Resmi</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4">
          
          {/* Brand & Logo (EXTRA TIME) - Sleek Emerald & Ice Cyan palette */}
          <div
            className="flex items-center gap-3 shrink-0 cursor-pointer"
            onClick={() => onSelectMainTab('matches')}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 flex items-center justify-center shadow-lg shadow-emerald-500/25 border border-emerald-300/30 text-slate-950 font-black">
                <span className="text-xl">⏱️</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-black text-xl sm:text-2xl tracking-tight font-score">
                    <span className="text-white">EXTRA </span>
                    <span className="text-emerald-400">TIME</span>
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-red-600 text-white tracking-wider animate-pulse shadow-xs shadow-red-600/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    LIVE
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium hidden sm:block">
                  Live Score Bola & Olahraga Terlengkap
                </span>
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Cari tim (Persib, Arsenal), liga, atau negara..."
                className="w-full bg-[#0d1626] border border-[#1e2f49] focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 outline-hidden transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Top Actions: Sound toggle & Live Simulation */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Live Clock */}
            <div className="hidden xl:flex items-center gap-1.5 text-[11px] font-mono text-slate-300 bg-[#0e1828] px-3 py-1.5 rounded-lg border border-[#1e2f48]">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>WIB (UTC+7)</span>
            </div>

            {/* Sound Alert Toggle */}
            <button
              onClick={handleSoundToggle}
              title={soundEnabled ? 'Suara gol aktif (Klik untuk bisukan)' : 'Suara gol nonaktif (Klik untuk aktifkan)'}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                soundEnabled
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/50'
                  : 'bg-[#0f192b] border-[#1d2d45] text-slate-400 hover:text-slate-200'
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Suara ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span className="hidden sm:inline">Suara OFF</span>
                </>
              )}
            </button>

            {/* Live Simulation Auto-Tick Button */}
            <button
              onClick={onToggleSimulation}
              title="Simulasikan pembaruan skor langsung, menit berjalan, & event gol"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                isSimulating
                  ? 'bg-red-950/60 border-red-600/60 text-red-300 hover:bg-red-900/70'
                  : 'bg-[#0f192b] border-[#1d2d45] text-slate-400 hover:text-slate-200'
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-red-400 fill-red-400" />
                  <span className="hidden sm:inline">Simulasi Aktif</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Mulai Simulasi</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="pb-2 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari tim atau liga..."
              className="w-full bg-[#0d1626] border border-[#1e2f49] focus:border-emerald-400 rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-hidden"
            />
          </div>
        </div>

        {/* Primary Navigation & Sports Bar */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-none py-2 border-t border-[#17253a]">
          {/* Main Views Toggle (Live Score vs Standings) */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.tebakskor-extratime.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-black whitespace-nowrap bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 shadow-md shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.02] active:scale-98 transition-all"
            >
              <span className="text-sm">🎯</span>
              <span>Tebak Skor</span>
              <span className="text-[10px] bg-slate-950/20 text-slate-950 font-bold px-1 py-0.2 rounded font-sans">
                Resmi
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-950 ml-0.5" />
            </a>

            <button
              onClick={() => onSelectMainTab('matches')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeMainTab === 'matches'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-[#121c2c]'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Daftar Pertandingan</span>
              {liveMatchCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-black bg-red-600 text-white">
                  {liveMatchCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onSelectMainTab('standings')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                activeMainTab === 'standings'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'text-slate-300 hover:text-white hover:bg-[#121c2c]'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Klasemen Liga</span>
            </button>
          </div>

          {/* Football Focus Badge */}
          <div className="flex items-center gap-2 pl-3 border-l border-[#19273c]">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#152338] text-emerald-300 border border-emerald-500/30 shadow-xs">
              <span className="text-sm">⚽</span>
              <span>Sepak Bola</span>
              {liveMatchCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-md text-[9px] font-black bg-red-600 text-white animate-pulse">
                  {liveMatchCount} LIVE
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
