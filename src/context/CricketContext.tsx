import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  Match,
  BallCommentary,
  Player,
  ForumPost,
  LeaderboardUser,
  UserProfile,
  NotificationAlert,
  NotificationSettings,
  HistoricalTournament,
  ChatMessage,
  Prediction
} from '../types/cricket';
import {
  INITIAL_MATCHES,
  PLAYERS_DATABASE,
  INITIAL_FORUM_POSTS,
  INITIAL_LEADERBOARD,
  HISTORICAL_TOURNAMENTS,
  INITIAL_USER,
  TEAMS
} from '../data/mockCricketData';

interface CricketContextType {
  matches: Match[];
  players: Player[];
  forumPosts: ForumPost[];
  leaderboard: LeaderboardUser[];
  historicalTournaments: HistoricalTournament[];
  currentUser: UserProfile | null;
  notifications: NotificationAlert[];
  unreadNotificationCount: number;
  notificationSettings: NotificationSettings;
  activeMatchModal: Match | null;
  selectedLeague: string;
  searchQuery: string;
  selectedFormat: string;
  selectedStatus: string;
  darkMode: 'dark' | 'pitch' | 'light';
  isOfflineMode: boolean;
  offlineCachedMatchIds: string[];
  simulationActive: boolean;
  liveChatMessages: Record<string, ChatMessage[]>;
  userPredictions: Record<string, Prediction>;
  
  // Actions
  setActiveMatchModal: (match: Match | null) => void;
  setSelectedLeague: (league: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedFormat: (format: string) => void;
  setSelectedStatus: (status: string) => void;
  setDarkMode: (mode: 'dark' | 'pitch' | 'light') => void;
  toggleFavoriteTeam: (teamId: string) => void;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  clearNotifications: () => void;
  markNotificationAsRead: (id: string) => void;
  addForumPost: (title: string, content: string, category: ForumPost['category'], tags: string[]) => void;
  upvoteForumPost: (postId: string) => void;
  addForumReply: (postId: string, content: string) => void;
  sendChatMessage: (matchId: string, message: string) => void;
  reactToChatMessage: (matchId: string, messageId: string, emoji: string) => void;
  submitPrediction: (matchId: string, predictedWinnerId: string, predictedTopBatsman: string) => void;
  toggleSimulation: () => void;
  stepManualBall: (matchId: string) => void;
  toggleOfflineMode: () => void;
  cacheMatchForOffline: (matchId: string) => void;
  removeCachedMatch: (matchId: string) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  exportSyncData: () => string;
  importSyncData: (syncJson: string) => boolean;
  requestPushNotificationPermission: () => Promise<boolean>;
}

const CricketContext = createContext<CricketContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'cricpulse_app_state_v1';

export const CricketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [players] = useState<Player[]>(PLAYERS_DATABASE);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>(INITIAL_FORUM_POSTS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [historicalTournaments] = useState<HistoricalTournament[]>(HISTORICAL_TOURNAMENTS);
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);
  const [activeMatchModal, setActiveMatchModal] = useState<Match | null>(null);
  
  // Filters
  const [selectedLeague, setSelectedLeague] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  
  // Appearance & State
  const [darkMode, setDarkMode] = useState<'dark' | 'pitch' | 'light'>('dark');
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [offlineCachedMatchIds, setOfflineCachedMatchIds] = useState<string[]>(['match-1', 'match-2', 'match-6']);
  const [simulationActive, setSimulationActive] = useState<boolean>(true);

  // Predictions & Chat
  const [userPredictions, setUserPredictions] = useState<Record<string, Prediction>>({
    'match-1': {
      matchId: 'match-1',
      predictedWinnerId: 'ind',
      predictedTopBatsman: 'Virat Kohli',
      pointsEarned: 150
    }
  });

  const [liveChatMessages, setLiveChatMessages] = useState<Record<string, ChatMessage[]>>({
    'match-1': [
      {
        id: 'msg-1',
        matchId: 'match-1',
        userId: 'fan-1',
        userName: 'AussieFanatic',
        userAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
        userTeamFlair: 'AUS',
        message: 'Maxwell is on fire! If he survives this Bumrah over, game is ours! 🦘',
        timestamp: '19:42',
        reactions: { '🔥': 8, '👏': 5 }
      },
      {
        id: 'msg-2',
        matchId: 'match-1',
        userId: 'fan-2',
        userName: 'KohliStorm',
        userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
        userTeamFlair: 'IND',
        message: 'Never doubt Bumrah at the death! Toe crusher coming next ball 🎯',
        timestamp: '19:43',
        reactions: { '🏏': 12, '🎯': 9 }
      }
    ],
    'match-2': [
      {
        id: 'msg-mi-1',
        matchId: 'match-2',
        userId: 'csk-fan',
        userName: 'ThalaDhoni',
        userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
        userTeamFlair: 'CSK',
        message: 'MSD is in the middle! Wankhede is shaking! 🦁💛',
        timestamp: '20:15',
        reactions: { '🔥': 15, '🏆': 11 }
      }
    ]
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationAlert[]>([
    {
      id: 'notif-1',
      matchId: 'match-1',
      matchTitle: 'India vs Australia',
      type: 'BOUNDARY',
      title: 'FOUR! Glenn Maxwell',
      message: 'Maxwell carves Bumrah past backward point for four! AUS need 35 off 22.',
      timestamp: '2 mins ago',
      read: false
    },
    {
      id: 'notif-2',
      matchId: 'match-2',
      matchTitle: 'CSK vs MI',
      type: 'MILESTONE',
      title: 'FIFTY for Shivam Dube!',
      message: 'Shivam Dube smashes fifty in just 26 balls with 5 monstrous sixes!',
      timestamp: '6 mins ago',
      read: true
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    pushEnabled: true,
    inAppBanner: true,
    soundEnabled: true,
    favoriteTeamsOnly: false,
    wickets: true,
    sixes: true,
    fours: true,
    milestones: true,
    closeFinishes: true,
    matchStartEnd: true
  });

  // Sound effect synthesizer for stadium cricket sound (boundary chime / wicket roar)
  const playAudioCue = useCallback((type: 'boundary' | 'wicket' | 'cheer') => {
    if (!notificationSettings.soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      if (type === 'boundary') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wicket') {
        // Dramatic descent
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.4);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.4);
      }
    } catch {
      // AudioContext could be blocked until interaction; ignore gracefully
    }
  }, [notificationSettings.soundEnabled]);

  // Push notifications helper
  const sendPushNotification = useCallback((title: string, body: string) => {
    if (!notificationSettings.pushEnabled) return;
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      } catch {
        // Fallback silently
      }
    }
  }, [notificationSettings.pushEnabled]);

  // Request browser push notification permission
  const requestPushNotificationPermission = async (): Promise<boolean> => {
    if (typeof window === 'undefined' || !('Notification' in window)) return false;
    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setNotificationSettings(prev => ({ ...prev, pushEnabled: granted }));
      return granted;
    } catch {
      return false;
    }
  };

  // Add in-app notification
  const triggerNotification = useCallback((alert: Omit<NotificationAlert, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: NotificationAlert = {
      ...alert,
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: 'Just now',
      read: false
    };

    setNotifications(prev => [newNotif, ...prev.slice(0, 19)]);
    sendPushNotification(alert.title, alert.message);
  }, [sendPushNotification]);

  // Keep HTML root dark mode class synced
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode === 'pitch') {
      root.classList.add('dark', 'pitch-mode');
      root.classList.remove('light');
    } else if (darkMode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('pitch-mode', 'light');
    } else {
      root.classList.remove('dark', 'pitch-mode');
      root.classList.add('light');
    }
  }, [darkMode]);

  // Simulation engine: advance live matches periodically
  const advanceBallForMatch = useCallback((targetMatchId: string) => {
    setMatches(prevMatches => {
      return prevMatches.map(m => {
        if (m.id !== targetMatchId || m.status !== 'LIVE') return m;

        // Choose innings to update
        const innings = m.currentInnings === 2 && m.innings2 ? m.innings2 : m.innings1;
        const currentBalls = Math.round((innings.overs % 1) * 10);
        let newOvers = Math.floor(innings.overs);
        let nextBalls = currentBalls + 1;

        if (nextBalls >= 6) {
          newOvers += 1;
          nextBalls = 0;
        }
        const updatedOverDecimal = Number(`${newOvers}.${nextBalls}`);

        // Outcomes: weighted random (0, 1, 2, 4, 6, wicket, extra)
        const rand = Math.random();
        let runsScored = 0;
        let isBoundary = false;
        let boundaryType: 'four' | 'six' | undefined;
        let isWicket = false;
        let isExtra = false;
        let wicketDesc = '';

        if (rand < 0.28) {
          runsScored = 1;
        } else if (rand < 0.44) {
          runsScored = 0;
        } else if (rand < 0.58) {
          runsScored = 2;
        } else if (rand < 0.72) {
          runsScored = 4;
          isBoundary = true;
          boundaryType = 'four';
        } else if (rand < 0.84) {
          runsScored = 6;
          isBoundary = true;
          boundaryType = 'six';
        } else if (rand < 0.94) {
          isWicket = true;
          wicketDesc = 'c Rahul b Bumrah';
        } else {
          isExtra = true;
          runsScored = 1;
        }

        const newTotalRuns = innings.runs + runsScored;
        const newTotalWickets = isWicket ? Math.min(10, innings.wickets + 1) : innings.wickets;

        // Active bowler and batsman
        const activeBowler = innings.bowling.find(b => b.isCurrent) || innings.bowling[0];
        const activeBatsman = innings.batting.find(b => b.isStriker) || innings.batting[0];

        // Generate commentary text
        let commentaryText = '';
        if (isWicket) {
          commentaryText = `OUT! Caught! Massive breakthrough! ${activeBatsman?.name || 'Batsman'} tries to go big over long-off, slices it high into the twilight sky and is safely held!`;
          playAudioCue('wicket');
          triggerNotification({
            matchId: m.id,
            matchTitle: `${m.team1.shortName} vs ${m.team2.shortName}`,
            type: 'WICKET',
            title: `WICKET! ${m.team1.shortName} strike!`,
            message: `${activeBatsman?.name || 'Batsman'} dismissed! ${newTotalRuns}/${newTotalWickets} (${updatedOverDecimal} ov)`
          });
        } else if (boundaryType === 'six') {
          commentaryText = `SIX! Cracking sound off the willow! Clean swing through the line, sailing into the spectators beyond cow corner! What a shot!`;
          playAudioCue('boundary');
          triggerNotification({
            matchId: m.id,
            matchTitle: `${m.team1.shortName} vs ${m.team2.shortName}`,
            type: 'BOUNDARY',
            title: `HUGE SIX! (${runsScored} Runs)`,
            message: `${activeBatsman?.name || 'Batsman'} launches maximum into the stands!`
          });
        } else if (boundaryType === 'four') {
          commentaryText = `FOUR! Precision placement! Leans into a full delivery and threads the gap between cover and mid-off with absolute surgical timing!`;
          playAudioCue('boundary');
        } else if (runsScored === 0) {
          commentaryText = `Dot ball. Excellent tight length on off stump, defended solidly right back down the pitch.`;
        } else {
          commentaryText = `${runsScored} run${runsScored > 1 ? 's' : ''}. Pushed down to long-on with soft hands, brisk calling between the wickets.`;
        }

        const newCommentaryItem: BallCommentary = {
          id: `ball-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
          over: Math.floor(updatedOverDecimal),
          ball: nextBalls === 0 ? 6 : nextBalls,
          runs: runsScored,
          isWicket,
          isBoundary,
          boundaryType,
          isExtra,
          bowlerName: activeBowler?.name || 'Bowler',
          batsmanName: activeBatsman?.name || 'Batsman',
          commentaryText,
          timestamp: 'Just now'
        };

        // Update batting stats
        const updatedBatting = innings.batting.map(b => {
          if (b.name === activeBatsman?.name) {
            const addedRuns = isExtra ? 0 : runsScored;
            const newRuns = b.runs + addedRuns;
            const newBalls = b.balls + 1;
            return {
              ...b,
              runs: newRuns,
              balls: newBalls,
              fours: boundaryType === 'four' ? b.fours + 1 : b.fours,
              sixes: boundaryType === 'six' ? b.sixes + 1 : b.sixes,
              strikeRate: Number(((newRuns / Math.max(1, newBalls)) * 100).toFixed(1)),
              isOut: isWicket ? true : b.isOut,
              dismissalInfo: isWicket ? wicketDesc : b.dismissalInfo
            };
          }
          return b;
        });

        // Update status text
        let newStatusText = m.statusText;
        if (m.currentInnings === 2 && innings.target) {
          const needed = Math.max(0, innings.target - newTotalRuns);
          const ballsLeft = Math.max(0, (50 * 6) - (Math.floor(updatedOverDecimal) * 6 + nextBalls));
          if (needed === 0) {
            newStatusText = `${innings.teamShort} won by ${10 - newTotalWickets} wickets!`;
          } else {
            newStatusText = `${innings.teamShort} need ${needed} runs in ${ballsLeft} balls to win`;
          }
        } else {
          newStatusText = `${innings.teamShort} ${newTotalRuns}/${newTotalWickets} (${updatedOverDecimal} ov)`;
        }

        const updatedInnings: typeof innings = {
          ...innings,
          runs: newTotalRuns,
          wickets: newTotalWickets,
          overs: updatedOverDecimal,
          runRate: Number((newTotalRuns / Math.max(0.1, newOvers + nextBalls / 6)).toFixed(2)),
          batting: updatedBatting,
        };

        const updatedMatch: Match = {
          ...m,
          statusText: newStatusText,
          commentary: [newCommentaryItem, ...m.commentary.slice(0, 19)],
          ...(m.currentInnings === 2 ? { innings2: updatedInnings } : { innings1: updatedInnings })
        };

        // If the active modal is this match, update modal state too
        if (activeMatchModal && activeMatchModal.id === m.id) {
          setActiveMatchModal(updatedMatch);
        }

        return updatedMatch;
      });
    });
  }, [activeMatchModal, playAudioCue, triggerNotification]);

  // Periodic simulation loop (every 5 seconds)
  useEffect(() => {
    if (!simulationActive || isOfflineMode) return;
    const interval = setInterval(() => {
      // Advance match-1 (IND vs AUS)
      advanceBallForMatch('match-1');
      // Sometimes advance match-2 (CSK vs MI)
      if (Math.random() > 0.4) {
        advanceBallForMatch('match-2');
      }
    }, 5500);

    return () => clearInterval(interval);
  }, [simulationActive, isOfflineMode, advanceBallForMatch]);

  // Step manual ball
  const stepManualBall = (matchId: string) => {
    advanceBallForMatch(matchId);
  };

  // Toggle favorite team
  const toggleFavoriteTeam = (teamId: string) => {
    if (!currentUser) return;
    const currentFavs = currentUser.favoriteTeams || [];
    const updated = currentFavs.includes(teamId)
      ? currentFavs.filter(t => t !== teamId)
      : [...currentFavs, teamId];

    const updatedUser = {
      ...currentUser,
      favoriteTeams: updated
    };
    setCurrentUser(updatedUser);
  };

  // Notification actions
  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    setNotificationSettings(prev => ({ ...prev, ...settings }));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter(n => !n.read).length;
  }, [notifications]);

  // Forum actions
  const addForumPost = (title: string, content: string, category: ForumPost['category'], tags: string[]) => {
    const newPost: ForumPost = {
      id: `fp-${Date.now()}`,
      title,
      content,
      category,
      author: {
        id: currentUser?.id || 'guest',
        name: currentUser?.name || 'Cricket Fan',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        flairTeam: currentUser?.favoriteTeams?.[0] ? (TEAMS.find(t => t.id === currentUser.favoriteTeams[0])?.name || 'Cricket Fan') : 'Neutral'
      },
      timestamp: 'Just now',
      upvotes: 1,
      userVote: 'up',
      replies: [],
      tags
    };

    setForumPosts(prev => [newPost, ...prev]);

    // Give user forum contribution point
    if (currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          forumPostsCount: prev.stats.forumPostsCount + 1,
          fantasyPoints: prev.stats.fantasyPoints + 50
        }
      } : null);
    }
  };

  const upvoteForumPost = (postId: string) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const isUpvoted = post.userVote === 'up';
      return {
        ...post,
        upvotes: isUpvoted ? post.upvotes - 1 : post.upvotes + 1,
        userVote: isUpvoted ? undefined : 'up'
      };
    }));
  };

  const addForumReply = (postId: string, content: string) => {
    setForumPosts(prev => prev.map(post => {
      if (post.id !== postId) return post;
      const newReply = {
        id: `reply-${Date.now()}`,
        author: currentUser?.name || 'Cricket Fan',
        flairTeam: currentUser?.favoriteTeams?.[0] ? (TEAMS.find(t => t.id === currentUser.favoriteTeams[0])?.name || 'Fan') : 'Supporter',
        avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        content,
        timestamp: 'Just now',
        upvotes: 0
      };
      return {
        ...post,
        replies: [...post.replies, newReply]
      };
    }));
  };

  // Live Match Chat
  const sendChatMessage = (matchId: string, message: string) => {
    if (!message.trim()) return;
    const newMsg: ChatMessage = {
      id: `chat-${Date.now()}`,
      matchId,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Cricket Fan',
      userAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80',
      userTeamFlair: currentUser?.favoriteTeams?.[0]?.toUpperCase() || 'FAN',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      reactions: {}
    };

    setLiveChatMessages(prev => ({
      ...prev,
      [matchId]: [...(prev[matchId] || []), newMsg]
    }));
  };

  const reactToChatMessage = (matchId: string, messageId: string, emoji: string) => {
    setLiveChatMessages(prev => {
      const messages = prev[matchId] || [];
      const updated = messages.map(m => {
        if (m.id !== messageId) return m;
        const currentCount = m.reactions[emoji] || 0;
        return {
          ...m,
          reactions: {
            ...m.reactions,
            [emoji]: currentCount + 1
          }
        };
      });
      return { ...prev, [matchId]: updated };
    });
  };

  // Prediction system
  const submitPrediction = (matchId: string, predictedWinnerId: string, predictedTopBatsman: string) => {
    setUserPredictions(prev => ({
      ...prev,
      [matchId]: {
        matchId,
        predictedWinnerId,
        predictedTopBatsman,
        pointsEarned: 100
      }
    }));

    // Update user fantasy points and leaderboard
    if (currentUser) {
      setCurrentUser(prev => prev ? {
        ...prev,
        stats: {
          ...prev.stats,
          fantasyPoints: prev.stats.fantasyPoints + 100,
          predictionsTotal: prev.stats.predictionsTotal + 1,
          predictionsWon: prev.stats.predictionsWon + 1
        }
      } : null);

      setLeaderboard(prev => prev.map(u => {
        if (u.isCurrentUser) {
          return {
            ...u,
            points: u.points + 100,
            predictionsCount: u.predictionsCount + 1,
            correctCount: u.correctCount + 1,
            accuracy: Number((((u.correctCount + 1) / (u.predictionsCount + 1)) * 100).toFixed(1))
          };
        }
        return u;
      }));
    }

    triggerNotification({
      matchId,
      matchTitle: 'Prediction Locked!',
      type: 'CUSTOM',
      title: 'Prediction Submitted! +100 Pts',
      message: `You backed ${TEAMS.find(t => t.id === predictedWinnerId)?.name || 'Team'} and ${predictedTopBatsman}!`
    });
  };

  // Offline Caching
  const toggleOfflineMode = () => {
    setIsOfflineMode(prev => !prev);
  };

  const cacheMatchForOffline = (matchId: string) => {
    if (!offlineCachedMatchIds.includes(matchId)) {
      setOfflineCachedMatchIds(prev => [...prev, matchId]);
      triggerNotification({
        matchId,
        matchTitle: 'Offline Storage',
        type: 'CUSTOM',
        title: 'Scorecard Saved Offline',
        message: 'Match scorecard & ball-by-ball commentary downloaded to local cache.'
      });
    }
  };

  const removeCachedMatch = (matchId: string) => {
    setOfflineCachedMatchIds(prev => prev.filter(id => id !== matchId));
  };

  // User auth
  const login = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setCurrentUser(prev => prev ? { ...prev, ...profile } : null);
  };

  // Multi-device sync export/import
  const exportSyncData = (): string => {
    const payload = {
      version: 1,
      timestamp: Date.now(),
      currentUser,
      userPredictions,
      notificationSettings,
      offlineCachedMatchIds,
      darkMode
    };
    return btoa(JSON.stringify(payload));
  };

  const importSyncData = (syncJson: string): boolean => {
    try {
      const decoded = atob(syncJson.trim());
      const parsed = JSON.parse(decoded);
      if (parsed.currentUser) setCurrentUser(parsed.currentUser);
      if (parsed.userPredictions) setUserPredictions(parsed.userPredictions);
      if (parsed.notificationSettings) setNotificationSettings(parsed.notificationSettings);
      if (parsed.offlineCachedMatchIds) setOfflineCachedMatchIds(parsed.offlineCachedMatchIds);
      if (parsed.darkMode) setDarkMode(parsed.darkMode);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <CricketContext.Provider
      value={{
        matches,
        players,
        forumPosts,
        leaderboard,
        historicalTournaments,
        currentUser,
        notifications,
        unreadNotificationCount,
        notificationSettings,
        activeMatchModal,
        selectedLeague,
        searchQuery,
        selectedFormat,
        selectedStatus,
        darkMode,
        isOfflineMode,
        offlineCachedMatchIds,
        simulationActive,
        liveChatMessages,
        userPredictions,
        setActiveMatchModal,
        setSelectedLeague,
        setSearchQuery,
        setSelectedFormat,
        setSelectedStatus,
        setDarkMode,
        toggleFavoriteTeam,
        updateNotificationSettings,
        clearNotifications,
        markNotificationAsRead,
        addForumPost,
        upvoteForumPost,
        addForumReply,
        sendChatMessage,
        reactToChatMessage,
        submitPrediction,
        toggleSimulation: () => setSimulationActive(prev => !prev),
        stepManualBall,
        toggleOfflineMode,
        cacheMatchForOffline,
        removeCachedMatch,
        login,
        logout,
        updateUserProfile,
        exportSyncData,
        importSyncData,
        requestPushNotificationPermission
      }}
    >
      {children}
    </CricketContext.Provider>
  );
};

export const useCricket = () => {
  const context = useContext(CricketContext);
  if (!context) {
    throw new Error('useCricket must be used within a CricketProvider');
  }
  return context;
};
