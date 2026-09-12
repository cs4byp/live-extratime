export type SportType = 'football';

export type MatchStatus = 'LIVE' | 'HT' | 'FT' | 'SCHEDULED' | 'POSTPONED';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  country?: string;
  redCards?: number;
  yellowCards?: number;
}

export interface MatchEvent {
  id: string;
  minute: number;
  extraMinute?: number;
  type: 'goal' | 'penalty_goal' | 'missed_penalty' | 'yellow_card' | 'red_card' | 'sub' | 'var';
  team: 'home' | 'away';
  player: string;
  assistPlayer?: string;
  subIn?: string;
  subOut?: string;
  description?: string;
}

export interface MatchStats {
  possession: [number, number]; // [Home, Away] percentage
  shotsOnTarget: [number, number];
  totalShots: [number, number];
  corners: [number, number];
  fouls: [number, number];
  offsides: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  goalkeeperSaves: [number, number];
  passesAccuracy: [number, number]; // percentage
  dangerousAttacks: [number, number];
}

export interface Player {
  number: number;
  name: string;
  position: 'GK' | 'DF' | 'MF' | 'FW';
  rating: number;
  x?: number; // 0-100 for pitch positioning
  y?: number; // 0-100 for pitch positioning
}

export interface LineupData {
  formation: string;
  startingXI: Player[];
  substitutes: Player[];
  coach: string;
}

export interface MatchOdds {
  handicap: {
    line: string; // e.g. "0 / -0.5" or "+0.5"
    homeOdds: number;
    awayOdds: number;
  };
  overUnder: {
    line: string; // e.g. "2.5 / 3"
    overOdds: number;
    underOdds: number;
  };
  euro1X2: {
    home: number;
    draw: number;
    away: number;
  };
}

export interface H2HMatch {
  id: string;
  date: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: 'home' | 'draw' | 'away';
}

export interface Match {
  id: string;
  sport: SportType;
  leagueId: string;
  leagueName: string;
  leagueCountry: string;
  leagueFlag: string;
  round?: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  halfTimeScore?: { home: number; away: number };
  status: MatchStatus;
  minute?: number;
  extraTime?: number;
  kickoffTime: string;
  date: string; // YYYY-MM-DD
  isFavorite?: boolean;
  hasLiveStream?: boolean;
  tvChannel?: string;
  venue?: string;
  referee?: string;
  odds?: MatchOdds;
  stats?: MatchStats;
  events?: MatchEvent[];
  lineups?: {
    home: LineupData;
    away: LineupData;
  };
  h2h?: H2HMatch[];
  currentAttackZone?: 'home_attack' | 'away_attack' | 'danger_home' | 'danger_away' | 'midfield' | 'corner_home' | 'corner_away' | 'freekick';
  lastActionText?: string;
  communityPredictions?: {
    homeWinPct: number;
    drawPct: number;
    awayWinPct: number;
    totalVotes: number;
    topScore: string;
  };
}

export interface UserPrediction {
  id: string;
  matchId: string;
  homeTeamName: string;
  awayTeamName: string;
  predictedHomeScore: number;
  predictedAwayScore: number;
  firstScorer?: string;
  createdAt: string;
  pointsEarned?: number;
  status: 'pending' | 'correct' | 'partial' | 'wrong';
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  city: string;
  favoriteClub: string;
  points: number;
  correctScores: number;
  totalPredictions: number;
  winRate: number;
  rewardTier: string;
}

export interface League {
  id: string;
  name: string;
  shortName?: string;
  country: string;
  flag: string;
  logo?: string;
  priority: number;
  isFavorite?: boolean;
}

export interface StandingRow {
  position: number;
  teamId: string;
  teamName: string;
  teamLogo: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}
