import React, { useState, useEffect, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { Match } from './types';
import { INITIAL_MATCHES, INITIAL_LEAGUES } from './data/mockMatches';
import { Header, MainNavTab } from './components/Header';
import { TopLeagueGrid } from './components/TopLeagueGrid';
import { TopLigaSidebar } from './components/TopLigaSidebar';
import { RightStandingsWidget } from './components/RightStandingsWidget';
import { FilterBar, StatusFilterType } from './components/FilterBar';
import { MatchList } from './components/MatchList';
import { MatchDetailModal } from './components/MatchDetailModal';
import { LiveNotificationToast, LiveNotification } from './components/LiveNotificationToast';
import { StandingsTable } from './components/StandingsTable';
import { OfficialPartners } from './components/OfficialPartners';
import { soundService } from './utils/sound';

export default function App() {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [activeMainTab, setActiveMainTab] = useState<MainNavTab>('matches');
  const [statusFilter, setStatusFilter] = useState<StatusFilterType>('ALL');
  const [selectedLeagueId, setSelectedLeagueId] = useState<string | 'ALL'>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('2026-09-13');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOdds, setShowOdds] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [liveNotification, setLiveNotification] = useState<LiveNotification | null>(null);
  const [apiConnected, setApiConnected] = useState<boolean>(true);
  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiLastUpdated, setApiLastUpdated] = useState<string>('');

  // Fetch official live football matches from server API
  const loadApiMatches = async (force = false) => {
    try {
      setApiLoading(true);
      const res = await fetch(`/api/football/matches${force ? '?refresh=true' : ''}`);
      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        setMatches(data.data);
        setApiConnected(true);
        setApiLastUpdated(new Date().toLocaleTimeString('id-ID'));
      }
    } catch (err) {
      console.warn('Using local fallback matches due to API fetch error:', err);
      setApiConnected(false);
    } finally {
      setApiLoading(false);
    }
  };

  // Initial fetch and 60-second background polling
  useEffect(() => {
    loadApiMatches();
    const interval = setInterval(() => {
      loadApiMatches();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync sound service state
  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundService.setEnabled(next);
  };

  // Toggle favorite on match
  const handleToggleFavorite = (matchId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMatches((prev) =>
      prev.map((m) => (m.id === matchId ? { ...m, isFavorite: !m.isFavorite } : m))
    );
  };

  // Simulation effect: ticks minutes and triggers occasional live updates
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setMatches((prevMatches) => {
        return prevMatches.map((m) => {
          if (m.status !== 'LIVE' || !m.minute) return m;

          const nextMinute = m.minute + 1;
          
          const attackZones: Array<Match['currentAttackZone']> = [
            'midfield',
            'home_attack',
            'danger_home',
            'away_attack',
            'danger_away',
            'corner_home',
            'corner_away',
          ];
          const nextZone = attackZones[Math.floor(Math.random() * attackZones.length)];

          const roll = Math.random();
          let newHomeScore = m.homeScore;
          let newAwayScore = m.awayScore;
          let newEvents = m.events ? [...m.events] : [];
          let actionText = m.lastActionText;

          // 7% chance to trigger a goal event
          if (roll < 0.07) {
            const isHomeGoal = Math.random() > 0.45;
            if (isHomeGoal) {
              newHomeScore += 1;
              actionText = `GOOOL! ${m.homeTeam.name} berhasil mencetak gol spektakuler!`;
              newEvents.push({
                id: `evt-${Date.now()}`,
                minute: nextMinute,
                type: 'GOAL',
                team: 'home',
                player: `${m.homeTeam.shortName} Striker`,
                description: `Gol indah dari dalam kotak penalti`,
              });
              if (soundEnabled) soundService.playGoalWhistle();
              setLiveNotification({
                id: `notif-${Date.now()}`,
                title: '🚨 GOOOL!',
                message: `${m.homeTeam.name} ${newHomeScore} - ${newAwayScore} ${m.awayTeam.name}`,
                matchId: m.id,
                type: 'GOAL',
              });
            } else {
              newAwayScore += 1;
              actionText = `GOOOL! ${m.awayTeam.name} menyarangkan bola ke sudut gawang!`;
              newEvents.push({
                id: `evt-${Date.now()}`,
                minute: nextMinute,
                type: 'GOAL',
                team: 'away',
                player: `${m.awayTeam.shortName} Forward`,
                description: `Penyelesaian akhir sempurna`,
              });
              if (soundEnabled) soundService.playGoalWhistle();
              setLiveNotification({
                id: `notif-${Date.now()}`,
                title: '🚨 GOOOL!',
                message: `${m.homeTeam.name} ${newHomeScore} - ${newAwayScore} ${m.awayTeam.name}`,
                matchId: m.id,
                type: 'GOAL',
              });
            }
          }

          // Full time trigger at 90+
          if (nextMinute >= 93) {
            return {
              ...m,
              minute: 90,
              status: 'FT',
              homeScore: newHomeScore,
              awayScore: newAwayScore,
              events: newEvents,
              lastActionText: 'Peluit panjang berbunyi, pertandingan resmi selesai (Full Time)!',
            };
          }

          return {
            ...m,
            minute: nextMinute,
            homeScore: newHomeScore,
            awayScore: newAwayScore,
            events: newEvents,
            currentAttackZone: nextZone,
            lastActionText: actionText,
          };
        });
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isSimulating, soundEnabled]);

  // Filter logic (exclusive to football)
  const filteredMatches = useMemo(() => {
    return matches.filter((m) => {
      if (statusFilter === 'LIVE' && m.status !== 'LIVE') return false;
      if (statusFilter === 'ONGOING' && m.status !== 'LIVE' && m.status !== 'HT') return false;
      if (statusFilter === 'SCHEDULED' && m.status !== 'SCHEDULED') return false;
      if (statusFilter === 'FT' && m.status !== 'FT') return false;
      if (statusFilter === 'FAVORITES' && !m.isFavorite) return false;

      if (selectedLeagueId !== 'ALL' && m.leagueId !== selectedLeagueId) return false;

      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchHome = m.homeTeam.name.toLowerCase().includes(q);
        const matchAway = m.awayTeam.name.toLowerCase().includes(q);
        const matchLeague = m.leagueName.toLowerCase().includes(q);
        const matchCountry = m.leagueCountry.toLowerCase().includes(q);
        if (!matchHome && !matchAway && !matchLeague && !matchCountry) return false;
      }

      return true;
    });
  }, [matches, statusFilter, selectedLeagueId, searchQuery]);

  // Counts for status filter pills
  const counts = useMemo(() => {
    return {
      all: matches.length,
      live: matches.filter((m) => m.status === 'LIVE').length,
      ongoing: matches.filter((m) => m.status === 'LIVE' || m.status === 'HT').length,
      scheduled: matches.filter((m) => m.status === 'SCHEDULED').length,
      ft: matches.filter((m) => m.status === 'FT').length,
      favorites: matches.filter((m) => m.isFavorite).length,
    };
  }, [matches]);

  const liveMatchesCount = matches.filter((m) => m.status === 'LIVE').length;

  return (
    <div className="min-h-screen bg-[#090b10] text-slate-100 flex flex-col font-sans selection:bg-[#FFCC00] selection:text-slate-950">
      {/* Top Header with EXTRA TIME Branding */}
      <Header
        activeMainTab={activeMainTab}
        onSelectMainTab={setActiveMainTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSimulating={isSimulating}
        onToggleSimulation={() => setIsSimulating((prev) => !prev)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        liveMatchCount={liveMatchesCount}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-3 sm:px-6 py-5">
        
        {/* Tab 1: Live Score & Matches View (3-Column Layout matching Screenshot 2) */}
        {activeMainTab === 'matches' && (
          <div className="space-y-6">
            {/* Top 10 League Grid Carousel with 'Klasemen >' yellow pill button (Screenshot 1 & 2) */}
            <TopLeagueGrid
              leagues={INITIAL_LEAGUES}
              selectedLeagueId={selectedLeagueId}
              onSelectLeague={(id) => setSelectedLeagueId(id)}
              onOpenStandings={() => setActiveMainTab('standings')}
              showTitle={false}
            />

            {/* 3-Column Grid Layout matching Screenshot 2 */}
            <div className="flex flex-col lg:flex-row items-start gap-5">
              {/* 1. Left Column: Top Liga Sidebar */}
              <TopLigaSidebar
                leagues={INITIAL_LEAGUES}
                selectedLeagueId={selectedLeagueId}
                onSelectLeague={(id) => setSelectedLeagueId(id)}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {/* 2. Center Column: Filters & Match List */}
              <div className="flex-1 min-w-0 w-full">
                {/* Filter and Status Controls */}
                <FilterBar
                  statusFilter={statusFilter}
                  onSelectStatusFilter={setStatusFilter}
                  selectedLeagueId={selectedLeagueId}
                  onSelectLeague={setSelectedLeagueId}
                  leagues={INITIAL_LEAGUES}
                  counts={counts}
                  showOdds={showOdds}
                  onToggleOdds={() => setShowOdds((prev) => !prev)}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  apiConnected={apiConnected}
                  apiLoading={apiLoading}
                  onRefreshApi={() => loadApiMatches(true)}
                />

                {/* Match List Grouped by Leagues */}
                <MatchList
                  matches={filteredMatches}
                  leagues={INITIAL_LEAGUES}
                  showOdds={showOdds}
                  onSelectMatch={(m) => setSelectedMatch(m)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>

              {/* 3. Right Column: Champions League / League Standings Widget */}
              <RightStandingsWidget
                leagues={INITIAL_LEAGUES}
                activeLeagueId={selectedLeagueId === 'ALL' ? 'ucl' : selectedLeagueId}
                onLeagueChange={(id) => setSelectedLeagueId(id)}
                onViewFullStandings={(id) => {
                  setSelectedLeagueId(id);
                  setActiveMainTab('standings');
                }}
              />
            </div>
          </div>
        )}

        {/* Tab 2: Standings Table (Screenshot 3: Klasemen Sepak Bola + Grid + Full Table) */}
        {activeMainTab === 'standings' && (
          <StandingsTable
            leagues={INITIAL_LEAGUES}
            defaultLeagueId={selectedLeagueId === 'ALL' ? 'ucl' : selectedLeagueId}
            onLeagueChange={(id) => setSelectedLeagueId(id)}
          />
        )}

        {/* Official Partners & Sponsors Section at the bottom */}
        {/* Directly code-editable in /src/components/OfficialPartners.tsx */}
        <OfficialPartners />

      </main>

      {/* Footer with EXTRA TIME Branding */}
      <footer className="mt-auto bg-[#07090e] border-t border-[#181d2a] py-8 px-4 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFCC00] flex items-center justify-center text-slate-950 font-black text-base shadow-lg shadow-yellow-500/20">
                ⏱️
              </div>
              <div>
                <span className="font-score font-black text-xl tracking-tight">
                  <span className="text-white">EXTRA </span>
                  <span className="text-[#FFCC00]">TIME</span>
                </span>
                <span className="text-gray-400 text-xs block mt-0.5">
                  Pusat Live Score & Informasi Sepak Bola Terlengkap Indonesia
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 text-gray-300 font-semibold">
              <a
                href="https://www.tebakskor-extratime.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-3.5 py-1.5 rounded-xl bg-[#FFCC00] text-slate-950 font-black hover:bg-yellow-400 transition-all flex items-center gap-1.5 shadow-sm text-xs"
              >
                <span>🎯 Tebak Skor</span>
                <span className="text-[10px] bg-slate-950/20 px-1 py-0.2 rounded font-sans">Resmi</span>
              </a>
              <button
                onClick={() => setActiveMainTab('matches')}
                className={`transition-colors cursor-pointer ${activeMainTab === 'matches' ? 'text-[#FFCC00]' : 'hover:text-yellow-400'}`}
              >
                Live Score
              </button>
              <button
                onClick={() => setActiveMainTab('standings')}
                className={`transition-colors cursor-pointer ${activeMainTab === 'standings' ? 'text-[#FFCC00]' : 'hover:text-yellow-400'}`}
              >
                Klasemen Liga
              </button>
              <button
                onClick={() => {
                  setActiveMainTab('matches');
                  setStatusFilter('LIVE');
                }}
                className="hover:text-yellow-400 transition-colors cursor-pointer"
              >
                Laga Berlangsung (LIVE)
              </button>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-gray-500">
            <div>
              © 2026 EXTRA TIME. Seluruh hak cipta dilindungi undang-undang.
            </div>
            <div className="flex items-center gap-4">
              <span>Status API: {apiConnected ? '🟢 Terhubung (ESPN Feed)' : '🟡 Data Cache'}</span>
              {apiLastUpdated && <span>Update Terakhir: {apiLastUpdated}</span>}
            </div>
          </div>
        </div>
      </footer>

      {/* Match Detail Modal (Live Field Tracker, Lineups, Timeline, Stats) */}
      {selectedMatch && (
        <MatchDetailModal
          match={selectedMatch}
          onClose={() => setSelectedMatch(null)}
          onToggleFavorite={(e) => handleToggleFavorite(selectedMatch.id, e)}
        />
      )}

      {/* Live Goal & Red Card Notification Banner Toast */}
      {liveNotification && (
        <LiveNotificationToast
          notification={liveNotification}
          onClose={() => setLiveNotification(null)}
          onViewMatch={() => {
            const found = matches.find((m) => m.id === liveNotification.matchId);
            if (found) setSelectedMatch(found);
            setLiveNotification(null);
          }}
        />
      )}
    </div>
  );
}
