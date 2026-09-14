import React, { useState } from 'react';
import { Calendar, RefreshCw, Star, ChevronDown } from 'lucide-react';
import { League } from '../types';

export type StatusFilterType = 'ALL' | 'LIVE' | 'ONGOING' | 'FT' | 'SCHEDULED' | 'FAVORITES';

interface FilterBarProps {
  statusFilter: StatusFilterType;
  onSelectStatusFilter: (status: StatusFilterType) => void;
  selectedLeagueId: string | 'ALL';
  onSelectLeague: (leagueId: string | 'ALL') => void;
  leagues: League[];
  counts: {
    all: number;
    live: number;
    ongoing?: number;
    ft: number;
    scheduled: number;
    favorites: number;
  };
  showOdds: boolean;
  onToggleOdds: () => void;
  selectedDate: string;
  onSelectDate: (date: string) => void;
  apiConnected?: boolean;
  apiLoading?: boolean;
  onRefreshApi?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  statusFilter,
  onSelectStatusFilter,
  selectedLeagueId,
  onSelectLeague,
  leagues,
  counts,
  showOdds,
  onToggleOdds,
  selectedDate,
  onSelectDate,
  apiConnected = true,
  apiLoading = false,
  onRefreshApi,
}) => {
  // Days list:
  // HARI INI Minggu, 14/09 Senin, 15/09 Selasa, 16/09 Rabu, 17/09 Kamis, 18/09 Jumat, 19/09 Sabtu
  const days = [
    { date: '2026-09-13', isToday: true, dayLabel: 'HARI INI', dayName: 'Minggu' },
    { date: '2026-09-14', isToday: false, dayLabel: '14/09', dayName: 'Senin' },
    { date: '2026-09-15', isToday: false, dayLabel: '15/09', dayName: 'Selasa' },
    { date: '2026-09-16', isToday: false, dayLabel: '16/09', dayName: 'Rabu' },
    { date: '2026-09-17', isToday: false, dayLabel: '17/09', dayName: 'Kamis' },
    { date: '2026-09-18', isToday: false, dayLabel: '18/09', dayName: 'Jumat' },
    { date: '2026-09-19', isToday: false, dayLabel: '19/09', dayName: 'Sabtu' },
  ];

  // Country filter options
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [tempLeagueId, setTempLeagueId] = useState<string>(selectedLeagueId);

  const countries = [
    { id: 'all', name: 'Pilih Negara' },
    { id: 'Eropa', name: 'Eropa (UEFA)' },
    { id: 'Inggris', name: 'Inggris' },
    { id: 'Spanyol', name: 'Spanyol' },
    { id: 'Italia', name: 'Italia' },
    { id: 'Jerman', name: 'Jerman' },
    { id: 'Prancis', name: 'Prancis' },
    { id: 'Belanda', name: 'Belanda' },
    { id: 'Indonesia', name: 'Indonesia' },
  ];

  const handleApplyFilter = () => {
    onSelectLeague(tempLeagueId);
  };

  const handleResetFilter = () => {
    setSelectedCountry('all');
    setTempLeagueId('ALL');
    onSelectLeague('ALL');
  };

  return (
    <div className="w-full flex flex-col gap-3 mb-5">
      {/* 1. Status Pills Row & Date Display - Unified Cyan/Emerald Concept */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {/* Semua */}
          <button
            onClick={() => onSelectStatusFilter('ALL')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              statusFilter === 'ALL'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25 scale-100'
                : 'bg-[#141822] text-gray-300 hover:bg-[#1c2230] border border-[#22293b]'
            }`}
          >
            Semua
          </button>

          {/* Live */}
          <button
            onClick={() => onSelectStatusFilter('LIVE')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              statusFilter === 'LIVE'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25'
                : 'bg-[#141822] text-gray-300 hover:bg-[#1c2230] border border-[#22293b]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Live ({counts.live})</span>
          </button>

          {/* Berlangsung */}
          <button
            onClick={() => onSelectStatusFilter('ONGOING')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              statusFilter === 'ONGOING'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25'
                : 'bg-[#141822] text-gray-300 hover:bg-[#1c2230] border border-[#22293b]'
            }`}
          >
            Berlangsung ({counts.ongoing ?? counts.live + 3})
          </button>

          {/* Berakhir (FT) */}
          <button
            onClick={() => onSelectStatusFilter('FT')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              statusFilter === 'FT'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25'
                : 'bg-[#141822] text-gray-300 hover:bg-[#1c2230] border border-[#22293b]'
            }`}
          >
            Berakhir
          </button>

          {/* Dijadwalkan */}
          <button
            onClick={() => onSelectStatusFilter('SCHEDULED')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              statusFilter === 'SCHEDULED'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25'
                : 'bg-[#141822] text-gray-300 hover:bg-[#1c2230] border border-[#22293b]'
            }`}
          >
            Dijadwalkan
          </button>

          {/* Favorit */}
          <button
            onClick={() => onSelectStatusFilter('FAVORITES')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1 ${
              statusFilter === 'FAVORITES'
                ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/25'
                : 'bg-[#141822] text-gray-300 hover:bg-[#1c2230] border border-[#22293b]'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>({counts.favorites})</span>
          </button>
        </div>

        {/* Date Display (Min, 13 Sep 2026 📅) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141822] border border-[#22293b] text-xs font-bold text-gray-200">
            <span>Min, 13 Sep 2026</span>
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          </div>

          {onRefreshApi && (
            <button
              onClick={onRefreshApi}
              disabled={apiLoading}
              className="p-1.5 rounded-xl bg-[#141822] border border-[#22293b] text-gray-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${apiLoading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          )}
        </div>
      </div>

      {/* 2. Days Selector Row - Unified Cyan/Emerald Gradient */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5 bg-[#12151d] p-1.5 rounded-2xl border border-[#202738]">
        {days.map((d) => {
          const isSelected = selectedDate === d.date || (d.isToday && selectedDate === '2026-09-13');
          return (
            <button
              key={d.date}
              onClick={() => onSelectDate(d.date)}
              className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl transition-all cursor-pointer text-center ${
                isSelected
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-slate-950 font-black shadow-md shadow-emerald-500/25'
                  : 'bg-transparent text-gray-300 hover:bg-white/5'
              }`}
            >
              <span className={`text-[11px] font-black ${isSelected ? 'text-slate-950' : 'text-gray-200'}`}>
                {d.dayLabel}
              </span>
              <span className={`text-[10px] font-medium ${isSelected ? 'text-slate-900 font-bold' : 'text-gray-400'}`}>
                {d.dayName}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Filter Dropdown Row (Pilih Negara, Pilih Liga, Tampilkan, Reset, Odds) */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {/* Pilih Negara */}
        <div className="relative flex-1 min-w-[140px] max-w-[200px]">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full appearance-none bg-[#12151d] border border-[#222838] focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-200 focus:outline-none cursor-pointer pr-8"
          >
            {countries.map((c) => (
              <option key={c.id} value={c.id} className="bg-[#12151d] text-white">
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Pilih Liga */}
        <div className="relative flex-1 min-w-[140px] max-w-[220px]">
          <select
            value={tempLeagueId}
            onChange={(e) => setTempLeagueId(e.target.value)}
            className="w-full appearance-none bg-[#12151d] border border-[#222838] focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs font-bold text-gray-200 focus:outline-none cursor-pointer pr-8"
          >
            <option value="ALL" className="bg-[#12151d] text-white">
              Pilih Liga
            </option>
            {leagues.slice(0, 10).map((l) => (
              <option key={l.id} value={l.id} className="bg-[#12151d] text-white">
                {l.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        </div>

        {/* Tampilkan Button */}
        <button
          onClick={handleApplyFilter}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:opacity-95 text-slate-950 font-black text-xs tracking-wide shadow-md shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
        >
          Tampilkan
        </button>

        {/* Reset Button */}
        <button
          onClick={handleResetFilter}
          className="px-4 py-2 rounded-xl bg-[#141822] hover:bg-[#1b2230] text-gray-300 hover:text-white border border-[#22293b] font-bold text-xs transition-all cursor-pointer"
        >
          Reset
        </button>

        {/* Odds Pasaran Toggle */}
        <button
          onClick={onToggleOdds}
          className={`ml-auto px-3.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            showOdds
              ? 'bg-emerald-500/15 border-emerald-500/50 text-cyan-300 shadow-sm'
              : 'bg-[#141822] border-[#22293b] text-gray-400 hover:text-gray-200'
          }`}
        >
          Odds Pasaran
        </button>
      </div>
    </div>
  );
};
