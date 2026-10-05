export type MatchFormat = 'T20' | 'ODI' | 'TEST';
export type MatchStatus = 'LIVE' | 'UPCOMING' | 'FINISHED';

export interface BallCommentary {
  id: string;
  over: number;
  ball: number; // 1 to 6
  runs: number;
  isWicket: boolean;
  wicketType?: 'bowled' | 'caught' | 'lbw' | 'run out' | 'stumped';
  dismissedPlayer?: string;
  isBoundary: boolean; // 4 or 6
  boundaryType?: 'four' | 'six';
  isExtra?: boolean;
  extraType?: 'wide' | 'no-ball' | 'bye' | 'leg-bye';
  bowlerName: string;
  batsmanName: string;
  commentaryText: string;
  timestamp: string;
}

export interface BatsmanStats {
  id: string;
  name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  isOut: boolean;
  dismissalInfo?: string;
  isStriker?: boolean;
}

export interface BowlerStats {
  id: string;
  name: string;
  overs: number;
  ballsCurrentOver: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
  isCurrent?: boolean;
}

export interface InningsScore {
  teamId: string;
  teamName: string;
  teamShort: string;
  runs: number;
  wickets: number;
  overs: number;
  target?: number;
  runRate: number;
  batting: BatsmanStats[];
  bowling: BowlerStats[];
  fallOfWickets: { score: number; wicketNum: number; over: string; player: string }[];
  extras: { total: number; wides: number; noBalls: number; byes: number; legByes: number };
}

export interface Match {
  id: string;
  series: string;
  league: string; // 'IPL 2026' | 'ICC T20 World Cup' | 'The Ashes' | 'BBL' | 'Champions Trophy'
  matchNumber: string;
  format: MatchFormat;
  status: MatchStatus;
  venue: string;
  city: string;
  matchDate: string;
  toss: string;
  team1: {
    id: string;
    name: string;
    shortName: string;
    logoColor: string;
    flagEmoji: string;
  };
  team2: {
    id: string;
    name: string;
    shortName: string;
    logoColor: string;
    flagEmoji: string;
  };
  currentInnings: number; // 1 or 2
  innings1: InningsScore;
  innings2?: InningsScore;
  statusText: string; // e.g. "IND need 24 runs in 18 balls" or "AUS won by 4 wickets"
  requiredRunRate?: number;
  commentary: BallCommentary[];
  manOfTheMatch?: string;
  highlightMoments: {
    title: string;
    over: string;
    description: string;
    type: 'six' | 'wicket' | 'fifty' | 'catch' | 'turnaround';
  }[];
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  teamName: string;
  role: 'Batter' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  battingStyle: string;
  bowlingStyle: string;
  iccRank: {
    test?: number;
    odi?: number;
    t20i?: number;
  };
  stats: {
    matches: number;
    runs: number;
    highestScore: number;
    battingAverage: number;
    strikeRate: number;
    centuries: number;
    fifties: number;
    wickets: number;
    bowlingAverage?: number;
    bestBowling?: string;
    economyRate?: number;
  };
  recentForm: ('W' | 'L' | '50+' | '100' | '3W+' | 'DNB')[];
  avatarBg: string;
}

export interface ChatMessage {
  id: string;
  matchId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userTeamFlair?: string;
  message: string;
  timestamp: string;
  reactions: { [emoji: string]: number };
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: 'Match Discussion' | 'IPL Tactics' | 'World Cup' | 'Player Form' | 'Debates';
  author: {
    id: string;
    name: string;
    avatar: string;
    flairTeam: string;
  };
  timestamp: string;
  upvotes: number;
  userVote?: 'up' | 'down';
  replies: {
    id: string;
    author: string;
    flairTeam: string;
    avatar: string;
    content: string;
    timestamp: string;
    upvotes: number;
  }[];
  tags: string[];
}

export interface Prediction {
  matchId: string;
  predictedWinnerId: string;
  predictedTopBatsman: string;
  pointsEarned?: number;
  isResolved?: boolean;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  favoriteTeam: string;
  points: number;
  accuracy: number; // percentage
  predictionsCount: number;
  correctCount: number;
  badges: string[];
  isCurrentUser?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  favoriteTeams: string[]; // Team IDs
  joinedDate: string;
  stats: {
    matchesWatched: number;
    fantasyPoints: number;
    predictionsWon: number;
    predictionsTotal: number;
    forumPostsCount: number;
    streakDays: number;
  };
}

export interface NotificationAlert {
  id: string;
  matchId: string;
  matchTitle: string;
  type: 'WICKET' | 'BOUNDARY' | 'MILESTONE' | 'MATCH_FINISH' | 'CUSTOM';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface NotificationSettings {
  pushEnabled: boolean;
  inAppBanner: boolean;
  soundEnabled: boolean;
  favoriteTeamsOnly: boolean;
  wickets: boolean;
  sixes: boolean;
  fours: boolean;
  milestones: boolean; // 50s and 100s
  closeFinishes: boolean; // e.g. < 30 runs in last 3 overs
  matchStartEnd: boolean;
}

export interface HistoricalTournament {
  id: string;
  year: number;
  name: string;
  edition: string;
  format: MatchFormat;
  winner: string;
  runnerUp: string;
  finalScore: string;
  venue: string;
  playerOfTournament: string;
  summary: string;
  historicHighlights: string[];
}
