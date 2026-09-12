import React from 'react';
import { Match } from '../types';

interface PitchTrackerProps {
  match: Match;
}

export const PitchTracker: React.FC<PitchTrackerProps> = ({ match }) => {
  const isHomeAttacking = match.currentAttackZone?.includes('home');
  const isDanger = match.currentAttackZone?.includes('danger');

  // Calculate ball positioning on 100x64 coordinate system
  let ballX = 50;
  let ballY = 32;
  let statusText = match.lastActionText || 'Pertandingan sedang berlangsung';
  let zoneLabel = 'Lini Tengah';
  let attackingTeam = '';

  if (match.currentAttackZone === 'home_attack') {
    ballX = 72;
    ballY = 25;
    zoneLabel = `Serangan ${match.homeTeam.shortName}`;
    attackingTeam = match.homeTeam.name;
  } else if (match.currentAttackZone === 'danger_home') {
    ballX = 88;
    ballY = 32;
    zoneLabel = '⚠️ Serangan Berbahaya!';
    attackingTeam = match.homeTeam.name;
  } else if (match.currentAttackZone === 'away_attack') {
    ballX = 28;
    ballY = 40;
    zoneLabel = `Serangan ${match.awayTeam.shortName}`;
    attackingTeam = match.awayTeam.name;
  } else if (match.currentAttackZone === 'danger_away') {
    ballX = 12;
    ballY = 32;
    zoneLabel = '⚠️ Serangan Berbahaya!';
    attackingTeam = match.awayTeam.name;
  } else if (match.currentAttackZone === 'corner_home') {
    ballX = 96;
    ballY = 4;
    zoneLabel = '🚩 Tendangan Sudut';
    attackingTeam = match.homeTeam.name;
  } else if (match.currentAttackZone === 'corner_away') {
    ballX = 4;
    ballY = 60;
    zoneLabel = '🚩 Tendangan Sudut';
    attackingTeam = match.awayTeam.name;
  }

  return (
    <div className="bg-[#09101c] border border-[#18273d] rounded-xl p-4 text-white overflow-hidden shadow-lg">
      {/* Tracker Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#18273d]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Pelacak Lapangan 2D (Live Match Tracker)
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="px-2 py-0.5 rounded bg-[#121c2e] text-slate-300 font-medium border border-[#1e2f47]">
            {zoneLabel}
          </span>
          {match.status === 'LIVE' && (
            <span className="px-2 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800 font-mono font-bold">
              {match.minute}&apos;
            </span>
          )}
        </div>
      </div>

      {/* 2D Pitch Graphic */}
      <div className="relative w-full aspect-[16/9] max-h-72 bg-gradient-to-b from-[#144727] to-[#0f361d] rounded-lg border-2 border-[#1f5c34] shadow-inner overflow-hidden flex items-center justify-center">
        {/* Grass stripes pattern */}
        <div className="absolute inset-0 grid grid-cols-10 pointer-events-none opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className={i % 2 === 0 ? 'bg-black/30' : 'bg-transparent'}></div>
          ))}
        </div>

        {/* Pitch Lines (SVG) */}
        <svg viewBox="0 0 100 64" className="absolute inset-0 w-full h-full stroke-white/40 fill-none stroke-[0.8]">
          {/* Outer Boundary */}
          <rect x="2" y="2" width="96" height="60" rx="1" />
          
          {/* Halfway line */}
          <line x1="50" y1="2" x2="50" y2="62" />
          {/* Center Circle & Spot */}
          <circle cx="50" cy="32" r="9.15" />
          <circle cx="50" cy="32" r="0.8" className="fill-white/60" />

          {/* Left Penalty Area (Home Defense) */}
          <rect x="2" y="14" width="16" height="36" />
          <rect x="2" y="22" width="6" height="20" />
          <path d="M 18,26 A 9.15,9.15 0 0,1 18,38" />
          <circle cx="12" cy="32" r="0.8" className="fill-white/60" />
          <rect x="0.5" y="27" width="1.5" height="10" className="fill-white/20 stroke-white/60" />

          {/* Right Penalty Area (Away Defense) */}
          <rect x="82" y="14" width="16" height="36" />
          <rect x="92" y="22" width="6" height="20" />
          <path d="M 82,26 A 9.15,9.15 0 0,0 82,38" />
          <circle cx="88" cy="32" r="0.8" className="fill-white/60" />
          <rect x="98" y="27" width="1.5" height="10" className="fill-white/20 stroke-white/60" />

          {/* Corner arcs */}
          <path d="M 2,4 A 2,2 0 0,0 4,2" />
          <path d="M 2,60 A 2,2 0 0,1 4,62" />
          <path d="M 98,4 A 2,2 0 0,1 96,2" />
          <path d="M 98,60 A 2,2 0 0,0 96,62" />
        </svg>

        {/* Dynamic Attack Direction Gradient Overlay */}
        {isDanger && (
          <div
            className={`absolute inset-y-0 ${
              isHomeAttacking ? 'right-0 w-1/3 bg-gradient-to-l from-red-600/30 to-transparent' : 'left-0 w-1/3 bg-gradient-to-r from-red-600/30 to-transparent'
            } pointer-events-none animate-pulse`}
          />
        )}

        {/* Team Labels on Pitch */}
        <div className="absolute left-4 top-3 text-[11px] font-bold text-white/70 uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
          {match.homeTeam.shortName}
        </div>
        <div className="absolute right-4 top-3 text-[11px] font-bold text-white/70 uppercase tracking-wider bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
          {match.awayTeam.shortName}
        </div>

        {/* Animated Ball */}
        <div
          className="absolute w-4 h-4 -ml-2 -mt-2 bg-white rounded-full border-2 border-slate-900 shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-700 ease-out z-10 flex items-center justify-center"
          style={{ left: `${ballX}%`, top: `${ballY}%` }}
        >
          <div className="w-1.5 h-1.5 bg-black rounded-full animate-ping opacity-75"></div>
        </div>

        {/* Attack Radar Waves */}
        <div
          className="absolute w-12 h-12 -ml-6 -mt-6 rounded-full border border-emerald-300/50 pointer-events-none transition-all duration-700 animate-ping opacity-40"
          style={{ left: `${ballX}%`, top: `${ballY}%` }}
        ></div>

        {/* Bottom Banner on Pitch */}
        <div className="absolute bottom-2 inset-x-4 bg-slate-950/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700/60 flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 truncate">
            <span className="font-semibold text-emerald-400 shrink-0">
              {attackingTeam ? `${attackingTeam}:` : 'Status:'}
            </span>
            <span className="text-slate-200 truncate">{statusText}</span>
          </div>
          <div className="shrink-0 text-[10px] text-slate-400 font-mono font-bold">
            {match.homeScore} - {match.awayScore}
          </div>
        </div>
      </div>

      {/* Mini Stats under pitch */}
      {match.stats && (
        <div className="grid grid-cols-3 gap-2 mt-3 pt-2 text-center text-xs">
          <div className="bg-[#0e1728] p-2 rounded-lg border border-[#18273d]">
            <div className="text-slate-400 text-[10px] mb-0.5">Penguasaan Bola</div>
            <div className="font-bold font-score text-sm text-white">
              {match.stats.possession[0]}% - {match.stats.possession[1]}%
            </div>
          </div>
          <div className="bg-[#0e1728] p-2 rounded-lg border border-[#18273d]">
            <div className="text-slate-400 text-[10px] mb-0.5">Tendangan Sudut</div>
            <div className="font-bold font-score text-sm text-cyan-400">
              {match.stats.corners[0]} - {match.stats.corners[1]}
            </div>
          </div>
          <div className="bg-[#0e1728] p-2 rounded-lg border border-[#18273d]">
            <div className="text-slate-400 text-[10px] mb-0.5">Serangan Berbahaya</div>
            <div className="font-bold font-score text-sm text-red-400">
              {match.stats.dangerousAttacks[0]} - {match.stats.dangerousAttacks[1]}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
