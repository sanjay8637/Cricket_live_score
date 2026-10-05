import { Match, Player, ForumPost, LeaderboardUser, HistoricalTournament, UserProfile } from '../types/cricket';

export const TEAMS = [
  { id: 'ind', name: 'India', shortName: 'IND', color: '#0055A5', flagEmoji: '🇮🇳' },
  { id: 'aus', name: 'Australia', shortName: 'AUS', color: '#008751', flagEmoji: '🇦🇺' },
  { id: 'eng', name: 'England', shortName: 'ENG', color: '#0B2341', flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { id: 'sa', name: 'South Africa', shortName: 'SA', color: '#007A4D', flagEmoji: '🇿🇦' },
  { id: 'nz', name: 'New Zealand', shortName: 'NZ', color: '#1A1A1A', flagEmoji: '🇳🇿' },
  { id: 'pak', name: 'Pakistan', shortName: 'PAK', color: '#004A26', flagEmoji: '🇵🇰' },
  { id: 'csk', name: 'Chennai Super Kings', shortName: 'CSK', color: '#FDB913', flagEmoji: '🦁' },
  { id: 'mi', name: 'Mumbai Indians', shortName: 'MI', color: '#004BA0', flagEmoji: '⚡' },
  { id: 'rcb', name: 'Royal Challengers Bengaluru', shortName: 'RCB', color: '#DA171E', flagEmoji: '👑' },
  { id: 'kkr', name: 'Kolkata Knight Riders', shortName: 'KKR', color: '#3A225D', flagEmoji: '⚔️' },
];

export const INITIAL_MATCHES: Match[] = [
  {
    id: 'match-1',
    series: 'ICC Champions Trophy 2026',
    league: 'ICC Champions Trophy',
    matchNumber: 'Final',
    format: 'ODI',
    status: 'LIVE',
    venue: 'Melbourne Cricket Ground',
    city: 'Melbourne',
    matchDate: 'Today, 19:30 Local',
    toss: 'Australia won the toss and elected to bowl',
    team1: {
      id: 'ind',
      name: 'India',
      shortName: 'IND',
      logoColor: '#0055A5',
      flagEmoji: '🇮🇳'
    },
    team2: {
      id: 'aus',
      name: 'Australia',
      shortName: 'AUS',
      logoColor: '#008751',
      flagEmoji: '🇦🇺'
    },
    currentInnings: 2,
    innings1: {
      teamId: 'ind',
      teamName: 'India',
      teamShort: 'IND',
      runs: 298,
      wickets: 7,
      overs: 50.0,
      runRate: 5.96,
      batting: [
        { id: 'p-1', name: 'Rohit Sharma (c)', runs: 74, balls: 68, fours: 8, sixes: 3, strikeRate: 108.8, isOut: true, dismissalInfo: 'c Maxwell b Starc' },
        { id: 'p-2', name: 'Shubman Gill', runs: 38, balls: 44, fours: 4, sixes: 0, strikeRate: 86.4, isOut: true, dismissalInfo: 'lbw b Hazlewood' },
        { id: 'p-3', name: 'Virat Kohli', runs: 89, balls: 84, fours: 9, sixes: 1, strikeRate: 105.9, isOut: true, dismissalInfo: 'c Carey b Cummins' },
        { id: 'p-4', name: 'Shreyas Iyer', runs: 28, balls: 31, fours: 2, sixes: 1, strikeRate: 90.3, isOut: true, dismissalInfo: 'b Zampa' },
        { id: 'p-5', name: 'KL Rahul (wk)', runs: 42, balls: 36, fours: 3, sixes: 2, strikeRate: 116.7, isOut: false, dismissalInfo: 'not out' },
        { id: 'p-6', name: 'Hardik Pandya', runs: 16, balls: 10, fours: 1, sixes: 1, strikeRate: 160.0, isOut: true, dismissalInfo: 'c Warner b Starc' },
      ],
      bowling: [
        { id: 'p-10', name: 'Mitchell Starc', overs: 10.0, ballsCurrentOver: 0, maidens: 1, runs: 62, wickets: 2, economy: 6.2 },
        { id: 'p-11', name: 'Josh Hazlewood', overs: 10.0, ballsCurrentOver: 0, maidens: 2, runs: 48, wickets: 1, economy: 4.8 },
        { id: 'p-12', name: 'Pat Cummins (c)', overs: 10.0, ballsCurrentOver: 0, maidens: 0, runs: 58, wickets: 2, economy: 5.8 },
        { id: 'p-13', name: 'Adam Zampa', overs: 10.0, ballsCurrentOver: 0, maidens: 0, runs: 59, wickets: 1, economy: 5.9 },
        { id: 'p-14', name: 'Glenn Maxwell', overs: 10.0, ballsCurrentOver: 0, maidens: 0, runs: 65, wickets: 1, economy: 6.5 },
      ],
      fallOfWickets: [
        { score: 68, wicketNum: 1, over: '11.2', player: 'Shubman Gill' },
        { score: 142, wicketNum: 2, over: '24.1', player: 'Rohit Sharma' },
        { score: 215, wicketNum: 3, over: '37.4', player: 'Shreyas Iyer' },
        { score: 262, wicketNum: 4, over: '44.3', player: 'Virat Kohli' },
      ],
      extras: { total: 11, wides: 6, noBalls: 1, byes: 1, legByes: 3 }
    },
    innings2: {
      teamId: 'aus',
      teamName: 'Australia',
      teamShort: 'AUS',
      runs: 264,
      wickets: 5,
      overs: 46.2,
      target: 299,
      runRate: 5.69,
      batting: [
        { id: 'p-15', name: 'Travis Head', runs: 82, balls: 74, fours: 10, sixes: 2, strikeRate: 110.8, isOut: true, dismissalInfo: 'c Rahul b Bumrah' },
        { id: 'p-16', name: 'David Warner', runs: 24, balls: 28, fours: 3, sixes: 0, strikeRate: 85.7, isOut: true, dismissalInfo: 'b Shami' },
        { id: 'p-17', name: 'Mitchell Marsh', runs: 45, balls: 42, fours: 4, sixes: 2, strikeRate: 107.1, isOut: true, dismissalInfo: 'c Jadeja b Kuldeep' },
        { id: 'p-18', name: 'Steve Smith', runs: 61, balls: 68, fours: 5, sixes: 0, strikeRate: 89.7, isOut: false, dismissalInfo: 'not out', isStriker: true },
        { id: 'p-19', name: 'Glenn Maxwell', runs: 32, balls: 19, fours: 3, sixes: 2, strikeRate: 168.4, isOut: false, dismissalInfo: 'not out' },
      ],
      bowling: [
        { id: 'p-20', name: 'Jasprit Bumrah', overs: 9.2, ballsCurrentOver: 2, maidens: 1, runs: 44, wickets: 2, economy: 4.71, isCurrent: true },
        { id: 'p-21', name: 'Mohammed Shami', overs: 9.0, ballsCurrentOver: 0, maidens: 0, runs: 58, wickets: 1, economy: 6.44 },
        { id: 'p-22', name: 'Kuldeep Yadav', overs: 10.0, ballsCurrentOver: 0, maidens: 0, runs: 54, wickets: 1, economy: 5.40 },
        { id: 'p-23', name: 'Ravindra Jadeja', overs: 10.0, ballsCurrentOver: 0, maidens: 1, runs: 52, wickets: 1, economy: 5.20 },
        { id: 'p-24', name: 'Hardik Pandya', overs: 8.0, ballsCurrentOver: 0, maidens: 0, runs: 51, wickets: 0, economy: 6.37 },
      ],
      fallOfWickets: [
        { score: 38, wicketNum: 1, over: '6.4', player: 'David Warner' },
        { score: 134, wicketNum: 2, over: '21.5', player: 'Mitchell Marsh' },
        { score: 178, wicketNum: 3, over: '31.2', player: 'Travis Head' },
        { score: 198, wicketNum: 4, over: '35.1', player: 'Marnus Labuschagne' },
        { score: 216, wicketNum: 5, over: '38.4', player: 'Josh Inglis' },
      ],
      extras: { total: 10, wides: 5, noBalls: 1, byes: 0, legByes: 4 }
    },
    statusText: 'AUS need 35 runs in 22 balls to win',
    requiredRunRate: 9.55,
    commentary: [
      {
        id: 'c-1',
        over: 46,
        ball: 2,
        runs: 4,
        isWicket: false,
        isBoundary: true,
        boundaryType: 'four',
        bowlerName: 'Jasprit Bumrah',
        batsmanName: 'Glenn Maxwell',
        commentaryText: 'FOUR! Sliced over backward point! Maxwell carves the slower off-cutter brilliantly with rapid wrists, beats third man running to his right.',
        timestamp: 'Just now'
      },
      {
        id: 'c-2',
        over: 46,
        ball: 1,
        runs: 1,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Jasprit Bumrah',
        batsmanName: 'Steve Smith',
        commentaryText: 'Single taken. Yorker fired on middle stump, dug out cleanly towards long-on for a brisk run.',
        timestamp: '1 min ago'
      },
      {
        id: 'c-3',
        over: 45,
        ball: 6,
        runs: 6,
        isWicket: false,
        isBoundary: true,
        boundaryType: 'six',
        bowlerName: 'Mohammed Shami',
        batsmanName: 'Glenn Maxwell',
        commentaryText: 'SIX! High, handsome and deep into the Southern Stand! Right in the arc for the Big Show, swivel pulled with immense power!',
        timestamp: '2 mins ago'
      },
      {
        id: 'c-4',
        over: 45,
        ball: 5,
        runs: 0,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Mohammed Shami',
        batsmanName: 'Glenn Maxwell',
        commentaryText: 'Dot ball. Good length outside off, Maxwell swings hard through the line and misses.',
        timestamp: '3 mins ago'
      },
      {
        id: 'c-5',
        over: 45,
        ball: 4,
        runs: 2,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Mohammed Shami',
        batsmanName: 'Glenn Maxwell',
        commentaryText: 'Tucked nicely into the vacant mid-wicket pocket, energetic sprinting turns one into two.',
        timestamp: '4 mins ago'
      },
    ],
    highlightMoments: [
      { title: 'Virat Kohli masterclass fifty', over: '28.4', description: 'Kohli drove through covers to notch up his 73rd ODI fifty.', type: 'fifty' },
      { title: 'Bumrah clean bowls Head', over: '31.2', description: 'A 144kph reverse-swinging missile shattered the off stump.', type: 'wicket' },
      { title: 'Maxwell reverse sweep six', over: '43.1', description: 'Audacious switch hit sailing 88 meters into the MCG crowd.', type: 'six' }
    ]
  },
  {
    id: 'match-2',
    series: 'Indian Premier League 2026',
    league: 'IPL 2026',
    matchNumber: 'Match 28',
    format: 'T20',
    status: 'LIVE',
    venue: 'Wankhede Stadium',
    city: 'Mumbai',
    matchDate: 'Today, 20:00 IST',
    toss: 'Chennai Super Kings won the toss and elected to bat',
    team1: {
      id: 'csk',
      name: 'Chennai Super Kings',
      shortName: 'CSK',
      logoColor: '#FDB913',
      flagEmoji: '🦁'
    },
    team2: {
      id: 'mi',
      name: 'Mumbai Indians',
      shortName: 'MI',
      logoColor: '#004BA0',
      flagEmoji: '⚡'
    },
    currentInnings: 1,
    innings1: {
      teamId: 'csk',
      teamName: 'Chennai Super Kings',
      teamShort: 'CSK',
      runs: 182,
      wickets: 3,
      overs: 17.4,
      runRate: 10.30,
      batting: [
        { id: 'p-30', name: 'Ruturaj Gaikwad (c)', runs: 68, balls: 41, fours: 7, sixes: 3, strikeRate: 165.8, isOut: true, dismissalInfo: 'c Rohit b Bumrah' },
        { id: 'p-31', name: 'Rachin Ravindra', runs: 32, balls: 20, fours: 4, sixes: 1, strikeRate: 160.0, isOut: true, dismissalInfo: 'c Ishan b Coetzee' },
        { id: 'p-32', name: 'Shivam Dube', runs: 54, balls: 28, fours: 3, sixes: 5, strikeRate: 192.8, isOut: false, dismissalInfo: 'not out', isStriker: true },
        { id: 'p-33', name: 'MS Dhoni (wk)', runs: 16, balls: 6, fours: 1, sixes: 2, strikeRate: 266.7, isOut: false, dismissalInfo: 'not out' },
      ],
      bowling: [
        { id: 'p-34', name: 'Jasprit Bumrah', overs: 3.4, ballsCurrentOver: 4, maidens: 0, runs: 24, wickets: 1, economy: 6.54, isCurrent: true },
        { id: 'p-35', name: 'Gerald Coetzee', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 45, wickets: 1, economy: 11.25 },
        { id: 'p-36', name: 'Hardik Pandya (c)', overs: 3.0, ballsCurrentOver: 0, maidens: 0, runs: 38, wickets: 0, economy: 12.67 },
        { id: 'p-37', name: 'Piyush Chawla', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 41, wickets: 1, economy: 10.25 },
      ],
      fallOfWickets: [
        { score: 52, wicketNum: 1, over: '5.2', player: 'Rachin Ravindra' },
        { score: 124, wicketNum: 2, over: '12.6', player: 'Daryl Mitchell' },
        { score: 158, wicketNum: 3, over: '16.1', player: 'Ruturaj Gaikwad' },
      ],
      extras: { total: 8, wides: 5, noBalls: 1, byes: 0, legByes: 2 }
    },
    statusText: 'CSK 182/3 (17.4 ov) · Shivam Dube 54*(28) & Dhoni 16*(6)',
    commentary: [
      {
        id: 'c-mi-1',
        over: 17,
        ball: 4,
        runs: 6,
        isWicket: false,
        isBoundary: true,
        boundaryType: 'six',
        bowlerName: 'Jasprit Bumrah',
        batsmanName: 'Shivam Dube',
        commentaryText: 'SIX! Monster hit into the second tier! Slower ball picked up early, launched with ferocious bottom-hand power straight back over bowler’s head!',
        timestamp: 'Just now'
      },
      {
        id: 'c-mi-2',
        over: 17,
        ball: 3,
        runs: 1,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Jasprit Bumrah',
        batsmanName: 'MS Dhoni',
        commentaryText: 'Dhoni drops it to backward point with soft hands, calls for a quick single. The Wankhede decibel level is deafening!',
        timestamp: '1 min ago'
      },
    ],
    highlightMoments: [
      { title: 'Dube reaches 26-ball Fifty', over: '16.5', description: 'Massive six against spin seals his half-century in style.', type: 'fifty' },
      { title: 'Dhoni enters to thunderous ovation', over: '16.2', description: 'First ball whipped off his pads for an outrageous six.', type: 'six' }
    ]
  },
  {
    id: 'match-3',
    series: 'ICC Men T20 World Cup 2026',
    league: 'ICC T20 World Cup',
    matchNumber: 'Super 8 - Group 1',
    format: 'T20',
    status: 'LIVE',
    venue: "Lord's Cricket Ground",
    city: 'London',
    matchDate: 'Today, 18:00 BST',
    toss: 'South Africa won the toss and elected to field',
    team1: {
      id: 'eng',
      name: 'England',
      shortName: 'ENG',
      logoColor: '#0B2341',
      flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
    },
    team2: {
      id: 'sa',
      name: 'South Africa',
      shortName: 'SA',
      logoColor: '#007A4D',
      flagEmoji: '🇿🇦'
    },
    currentInnings: 2,
    innings1: {
      teamId: 'eng',
      teamName: 'England',
      teamShort: 'ENG',
      runs: 176,
      wickets: 8,
      overs: 20.0,
      runRate: 8.80,
      batting: [
        { id: 'p-40', name: 'Jos Buttler (c)', runs: 58, balls: 38, fours: 6, sixes: 2, strikeRate: 152.6, isOut: true },
        { id: 'p-41', name: 'Phil Salt', runs: 28, balls: 16, fours: 3, sixes: 2, strikeRate: 175.0, isOut: true },
        { id: 'p-42', name: 'Harry Brook', runs: 44, balls: 29, fours: 4, sixes: 1, strikeRate: 151.7, isOut: true },
      ],
      bowling: [
        { id: 'p-43', name: 'Kagiso Rabada', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 32, wickets: 3, economy: 8.0 },
        { id: 'p-44', name: 'Anrich Nortje', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 38, wickets: 2, economy: 9.5 },
      ],
      fallOfWickets: [],
      extras: { total: 6, wides: 4, noBalls: 0, byes: 1, legByes: 1 }
    },
    innings2: {
      teamId: 'sa',
      teamName: 'South Africa',
      teamShort: 'SA',
      runs: 148,
      wickets: 4,
      overs: 16.0,
      target: 177,
      runRate: 9.25,
      batting: [
        { id: 'p-45', name: 'Quinton de Kock', runs: 65, balls: 42, fours: 7, sixes: 3, strikeRate: 154.7, isOut: true },
        { id: 'p-46', name: 'Heinrich Klaasen', runs: 48, balls: 24, fours: 3, sixes: 4, strikeRate: 200.0, isOut: false, isStriker: true },
        { id: 'p-47', name: 'David Miller', runs: 18, balls: 12, fours: 1, sixes: 1, strikeRate: 150.0, isOut: false },
      ],
      bowling: [
        { id: 'p-48', name: 'Jofra Archer', overs: 3.0, ballsCurrentOver: 0, maidens: 0, runs: 29, wickets: 1, economy: 9.66, isCurrent: true },
        { id: 'p-49', name: 'Adil Rashid', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 34, wickets: 2, economy: 8.5 },
      ],
      fallOfWickets: [],
      extras: { total: 7, wides: 4, noBalls: 1, byes: 0, legByes: 2 }
    },
    statusText: 'SA need 29 runs in 24 balls · Klaasen 48*(24)',
    requiredRunRate: 7.25,
    commentary: [
      {
        id: 'c-sa-1',
        over: 16,
        ball: 1,
        runs: 6,
        isWicket: false,
        isBoundary: true,
        boundaryType: 'six',
        bowlerName: 'Jofra Archer',
        batsmanName: 'Heinrich Klaasen',
        commentaryText: 'SIX! Klaasen takes on 148kph heat! Stands tall and smashes it over long-off with pure ferocity.',
        timestamp: 'Just now'
      }
    ],
    highlightMoments: [
      { title: 'De Kock dynamic 65', over: '12.4', description: 'Blistering innings setting the chase platform.', type: 'fifty' }
    ]
  },
  {
    id: 'match-4',
    series: 'Indian Premier League 2026',
    league: 'IPL 2026',
    matchNumber: 'Match 29',
    format: 'T20',
    status: 'UPCOMING',
    venue: 'M. Chinnaswamy Stadium',
    city: 'Bengaluru',
    matchDate: 'Tomorrow, 19:30 IST',
    toss: 'Toss scheduled at 19:00 IST',
    team1: {
      id: 'rcb',
      name: 'Royal Challengers Bengaluru',
      shortName: 'RCB',
      logoColor: '#DA171E',
      flagEmoji: '👑'
    },
    team2: {
      id: 'kkr',
      name: 'Kolkata Knight Riders',
      shortName: 'KKR',
      logoColor: '#3A225D',
      flagEmoji: '⚔️'
    },
    currentInnings: 1,
    innings1: {
      teamId: 'rcb',
      teamName: 'Royal Challengers Bengaluru',
      teamShort: 'RCB',
      runs: 0,
      wickets: 0,
      overs: 0,
      runRate: 0,
      batting: [],
      bowling: [],
      fallOfWickets: [],
      extras: { total: 0, wides: 0, noBalls: 0, byes: 0, legByes: 0 }
    },
    statusText: 'Match starts tomorrow at 19:30 IST · Bengaluru',
    commentary: [],
    highlightMoments: []
  },
  {
    id: 'match-5',
    series: 'The Ashes 2026',
    league: 'The Ashes',
    matchNumber: '4th Test',
    format: 'TEST',
    status: 'UPCOMING',
    venue: 'Sydney Cricket Ground',
    city: 'Sydney',
    matchDate: 'Oct 8, 10:30 AEST',
    toss: 'Toss on Day 1 morning',
    team1: {
      id: 'aus',
      name: 'Australia',
      shortName: 'AUS',
      logoColor: '#008751',
      flagEmoji: '🇦🇺'
    },
    team2: {
      id: 'eng',
      name: 'England',
      shortName: 'ENG',
      logoColor: '#0B2341',
      flagEmoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿'
    },
    currentInnings: 1,
    innings1: {
      teamId: 'aus',
      teamName: 'Australia',
      teamShort: 'AUS',
      runs: 0,
      wickets: 0,
      overs: 0,
      runRate: 0,
      batting: [],
      bowling: [],
      fallOfWickets: [],
      extras: { total: 0, wides: 0, noBalls: 0, byes: 0, legByes: 0 }
    },
    statusText: 'Series tied 1-1 · 4th Test kicks off at SCG',
    commentary: [],
    highlightMoments: []
  },
  {
    id: 'match-6',
    series: 'ICC Men T20 World Cup 2024 Final',
    league: 'ICC T20 World Cup',
    matchNumber: 'Final',
    format: 'T20',
    status: 'FINISHED',
    venue: 'Kensington Oval',
    city: 'Bridgetown, Barbados',
    matchDate: 'June 29, 2024',
    toss: 'India won the toss and elected to bat',
    team1: {
      id: 'ind',
      name: 'India',
      shortName: 'IND',
      logoColor: '#0055A5',
      flagEmoji: '🇮🇳'
    },
    team2: {
      id: 'sa',
      name: 'South Africa',
      shortName: 'SA',
      logoColor: '#007A4D',
      flagEmoji: '🇿🇦'
    },
    currentInnings: 2,
    innings1: {
      teamId: 'ind',
      teamName: 'India',
      teamShort: 'IND',
      runs: 176,
      wickets: 7,
      overs: 20.0,
      runRate: 8.80,
      batting: [
        { id: 'p-1', name: 'Virat Kohli', runs: 76, balls: 59, fours: 6, sixes: 2, strikeRate: 128.8, isOut: true },
        { id: 'p-2', name: 'Axar Patel', runs: 47, balls: 31, fours: 1, sixes: 4, strikeRate: 151.6, isOut: true },
        { id: 'p-3', name: 'Shivam Dube', runs: 27, balls: 16, fours: 3, sixes: 1, strikeRate: 168.7, isOut: true },
      ],
      bowling: [
        { id: 'p-4', name: 'Keshav Maharaj', overs: 3.0, ballsCurrentOver: 0, maidens: 0, runs: 23, wickets: 2, economy: 7.67 },
        { id: 'p-5', name: 'Anrich Nortje', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 26, wickets: 2, economy: 6.50 },
      ],
      fallOfWickets: [],
      extras: { total: 5, wides: 3, noBalls: 0, byes: 0, legByes: 2 }
    },
    innings2: {
      teamId: 'sa',
      teamName: 'South Africa',
      teamShort: 'SA',
      runs: 169,
      wickets: 8,
      overs: 20.0,
      target: 177,
      runRate: 8.45,
      batting: [
        { id: 'p-6', name: 'Heinrich Klaasen', runs: 52, balls: 27, fours: 2, sixes: 5, strikeRate: 192.5, isOut: true },
        { id: 'p-7', name: 'Quinton de Kock', runs: 39, balls: 31, fours: 4, sixes: 1, strikeRate: 125.8, isOut: true },
        { id: 'p-8', name: 'David Miller', runs: 21, balls: 17, fours: 1, sixes: 1, strikeRate: 123.5, isOut: true },
      ],
      bowling: [
        { id: 'p-9', name: 'Jasprit Bumrah', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 18, wickets: 2, economy: 4.50 },
        { id: 'p-10', name: 'Hardik Pandya', overs: 3.0, ballsCurrentOver: 0, maidens: 0, runs: 20, wickets: 3, economy: 6.67 },
        { id: 'p-11', name: 'Arshdeep Singh', overs: 4.0, ballsCurrentOver: 0, maidens: 0, runs: 20, wickets: 2, economy: 5.00 },
      ],
      fallOfWickets: [],
      extras: { total: 7, wides: 4, noBalls: 1, byes: 0, legByes: 2 }
    },
    statusText: 'India won by 7 runs · World Champions!',
    manOfTheMatch: 'Virat Kohli (76 off 59 balls)',
    commentary: [
      {
        id: 'c-hist-1',
        over: 20,
        ball: 6,
        runs: 1,
        isWicket: false,
        isBoundary: false,
        bowlerName: 'Hardik Pandya',
        batsmanName: 'Kagiso Rabada',
        commentaryText: 'INDIA WIN THE T20 WORLD CUP! Tears of absolute ecstasy in Barbados! A 17-year wait ends in glorious triumph!',
        timestamp: 'Historic'
      },
      {
        id: 'c-hist-2',
        over: 20,
        ball: 1,
        runs: 0,
        isWicket: true,
        isBoundary: false,
        wicketType: 'caught',
        dismissedPlayer: 'David Miller',
        bowlerName: 'Hardik Pandya',
        batsmanName: 'David Miller',
        commentaryText: 'WICKET! SURYAKUMAR YADAV PULLS OFF A MIRACLE AT LONG-OFF! Flicked back into play while airborne! One of cricket’s greatest catches!',
        timestamp: 'Historic'
      }
    ],
    highlightMoments: [
      { title: 'Suryakumar Yadav boundary catch', over: '19.1', description: 'Incredible juggling boundary catch to dismiss David Miller.', type: 'catch' },
      { title: 'Bumrah unplayable 18th over', over: '17.6', description: 'Gave away just 2 runs and cleaned up Marco Jansen.', type: 'wicket' }
    ]
  }
];

export const PLAYERS_DATABASE: Player[] = [
  {
    id: 'ply-1',
    name: 'Virat Kohli',
    teamId: 'ind',
    teamName: 'India / RCB',
    role: 'Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm medium',
    iccRank: { test: 6, odi: 3, t20i: 8 },
    stats: {
      matches: 535,
      runs: 27140,
      highestScore: 254,
      battingAverage: 53.6,
      strikeRate: 93.8,
      centuries: 80,
      fifties: 140,
      wickets: 9,
      bowlingAverage: 62.4,
      bestBowling: '1/13',
    },
    recentForm: ['100', '50+', '50+', 'W', '100'],
    avatarBg: '#0055A5'
  },
  {
    id: 'ply-2',
    name: 'Jasprit Bumrah',
    teamId: 'ind',
    teamName: 'India / MI',
    role: 'Bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    iccRank: { test: 1, odi: 2, t20i: 1 },
    stats: {
      matches: 210,
      runs: 620,
      highestScore: 35,
      battingAverage: 8.5,
      strikeRate: 72.0,
      centuries: 0,
      fifties: 0,
      wickets: 418,
      bowlingAverage: 19.8,
      bestBowling: '6/19',
      economyRate: 4.6
    },
    recentForm: ['3W+', '3W+', 'W', '3W+', 'W'],
    avatarBg: '#004BA0'
  },
  {
    id: 'ply-3',
    name: 'Pat Cummins',
    teamId: 'aus',
    teamName: 'Australia / SRH',
    role: 'Bowler',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm fast',
    iccRank: { test: 2, odi: 7, t20i: 14 },
    stats: {
      matches: 220,
      runs: 2150,
      highestScore: 68,
      battingAverage: 18.2,
      strikeRate: 88.0,
      centuries: 0,
      fifties: 4,
      wickets: 495,
      bowlingAverage: 22.4,
      bestBowling: '6/23',
      economyRate: 4.8
    },
    recentForm: ['3W+', 'W', '3W+', 'W', '3W+'],
    avatarBg: '#008751'
  },
  {
    id: 'ply-4',
    name: 'Travis Head',
    teamId: 'aus',
    teamName: 'Australia / SRH',
    role: 'Batter',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm off break',
    iccRank: { test: 12, odi: 5, t20i: 1 },
    stats: {
      matches: 175,
      runs: 6720,
      highestScore: 175,
      battingAverage: 42.8,
      strikeRate: 138.4,
      centuries: 14,
      fifties: 34,
      wickets: 32,
      bowlingAverage: 48.0,
      bestBowling: '2/19',
    },
    recentForm: ['100', '50+', 'W', '50+', '100'],
    avatarBg: '#008751'
  },
  {
    id: 'ply-5',
    name: 'Heinrich Klaasen',
    teamId: 'sa',
    teamName: 'South Africa / SRH',
    role: 'Wicket-Keeper',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm off break',
    iccRank: { odi: 4, t20i: 3 },
    stats: {
      matches: 140,
      runs: 4180,
      highestScore: 174,
      battingAverage: 41.2,
      strikeRate: 162.7,
      centuries: 6,
      fifties: 23,
      wickets: 0,
    },
    recentForm: ['50+', '50+', '100', 'W', '50+'],
    avatarBg: '#007A4D'
  },
  {
    id: 'ply-6',
    name: 'Rashid Khan',
    teamId: 'afg',
    teamName: 'Afghanistan / GT',
    role: 'All-Rounder',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm leg break',
    iccRank: { odi: 1, t20i: 2 },
    stats: {
      matches: 230,
      runs: 2190,
      highestScore: 79,
      battingAverage: 19.4,
      strikeRate: 144.2,
      centuries: 0,
      fifties: 5,
      wickets: 395,
      bowlingAverage: 18.2,
      bestBowling: '7/18',
      economyRate: 4.15
    },
    recentForm: ['3W+', '3W+', 'W', '3W+', 'W'],
    avatarBg: '#002B7F'
  },
  {
    id: 'ply-7',
    name: 'Ben Stokes',
    teamId: 'eng',
    teamName: 'England',
    role: 'All-Rounder',
    battingStyle: 'Left-hand bat',
    bowlingStyle: 'Right-arm fast-medium',
    iccRank: { test: 15, odi: 20 },
    stats: {
      matches: 260,
      runs: 9850,
      highestScore: 258,
      battingAverage: 36.5,
      strikeRate: 85.0,
      centuries: 18,
      fifties: 52,
      wickets: 298,
      bowlingAverage: 32.1,
      bestBowling: '6/22',
      economyRate: 4.9
    },
    recentForm: ['50+', 'W', '3W+', '50+', 'W'],
    avatarBg: '#0B2341'
  },
  {
    id: 'ply-8',
    name: 'Rohit Sharma',
    teamId: 'ind',
    teamName: 'India / MI',
    role: 'Batter',
    battingStyle: 'Right-hand bat',
    bowlingStyle: 'Right-arm off break',
    iccRank: { test: 10, odi: 2 },
    stats: {
      matches: 485,
      runs: 19200,
      highestScore: 264,
      battingAverage: 48.9,
      strikeRate: 92.4,
      centuries: 48,
      fifties: 106,
      wickets: 15,
      bowlingAverage: 58.2,
      bestBowling: '2/27',
    },
    recentForm: ['50+', '100', 'W', '50+', '50+'],
    avatarBg: '#0055A5'
  }
];

export const INITIAL_FORUM_POSTS: ForumPost[] = [
  {
    id: 'fp-1',
    title: 'Can Jasprit Bumrah defend 35 in the last 22 balls at the MCG?',
    content: 'Maxwell and Smith are batting with ice in their veins, but Bumrah still has 4 balls in this over plus another potential over. What is Rohit’s bowling plan here?',
    category: 'Match Discussion',
    author: {
      id: 'usr-2',
      name: 'BleedBlue99',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
      flairTeam: 'India'
    },
    timestamp: '12 mins ago',
    upvotes: 42,
    tags: ['INDvsAUS', 'Bumrah', 'ChampionsTrophy', 'DeathOvers'],
    replies: [
      {
        id: 'fr-1',
        author: 'AussieRules',
        flairTeam: 'Australia',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
        content: 'Maxwell is in god-mode today. If Shami bowls the 48th, Aussies will seal it with an over to spare!',
        timestamp: '8 mins ago',
        upvotes: 14
      },
      {
        id: 'fr-2',
        author: 'SpinWizard',
        flairTeam: 'India',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        content: 'Bumrah’s yorkers are unhittable. One toe-crusher and this match turns right back around.',
        timestamp: '5 mins ago',
        upvotes: 19
      }
    ]
  },
  {
    id: 'fp-2',
    title: 'IPL 2026: Why Shivam Dube is the most destructive spin-hitter in T20 history',
    content: 'Against spin this season, Dube is striking at an astonishing 214.6 with only 1 dismissal in 18 innings. His reach and posture make standard boundary dimensions look like backyard cricket.',
    category: 'IPL Tactics',
    author: {
      id: 'usr-3',
      name: 'WhistlePoduFan',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
      flairTeam: 'Chennai Super Kings'
    },
    timestamp: '2 hours ago',
    upvotes: 88,
    tags: ['IPL2026', 'CSK', 'ShivamDube', 'Analytics'],
    replies: [
      {
        id: 'fr-3',
        author: 'MumbaiPaltan',
        flairTeam: 'Mumbai Indians',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        content: 'True, but pacers who hit high 140s short into his chest still bother him. Bumrah just showed how to test him.',
        timestamp: '1 hour ago',
        upvotes: 27
      }
    ]
  },
  {
    id: 'fp-3',
    title: 'T20 World Cup Super 8s: Group of Death pitch analysis',
    content: 'Lords and Kensington Oval are offering sharp early swing under lights. Captains winning the toss are opting to chase in 78% of evening fixtures. Is toss advantage becoming too decisive?',
    category: 'World Cup',
    author: {
      id: 'usr-4',
      name: 'PitchWhisperer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
      flairTeam: 'England'
    },
    timestamp: '4 hours ago',
    upvotes: 64,
    tags: ['PitchReport', 'T20WorldCup', 'CricketTactics'],
    replies: []
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    userId: 'usr-top-1',
    name: 'Arjun CricGuru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    favoriteTeam: 'India',
    points: 4820,
    accuracy: 86.4,
    predictionsCount: 52,
    correctCount: 45,
    badges: ['Century Club', 'Hat-trick Hero', 'Grand Master']
  },
  {
    rank: 2,
    userId: 'usr-top-2',
    name: 'Liam AussiePunter',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
    favoriteTeam: 'Australia',
    points: 4450,
    accuracy: 82.0,
    predictionsCount: 50,
    correctCount: 41,
    badges: ['Century Club', 'Tactician']
  },
  {
    rank: 3,
    userId: 'usr-current',
    name: 'Sanjay P (You)',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    favoriteTeam: 'India',
    points: 3980,
    accuracy: 78.5,
    predictionsCount: 42,
    correctCount: 33,
    badges: ['Century Club', 'Clutch Forecaster'],
    isCurrentUser: true
  },
  {
    rank: 4,
    userId: 'usr-top-4',
    name: 'Kavita YorkerQueen',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
    favoriteTeam: 'Chennai Super Kings',
    points: 3740,
    accuracy: 76.2,
    predictionsCount: 42,
    correctCount: 32,
    badges: ['Death Overs Specialist']
  },
  {
    rank: 5,
    userId: 'usr-top-5',
    name: 'Hamza PaceLover',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80',
    favoriteTeam: 'Pakistan',
    points: 3510,
    accuracy: 73.1,
    predictionsCount: 37,
    correctCount: 27,
    badges: ['Pace Battery']
  }
];

export const HISTORICAL_TOURNAMENTS: HistoricalTournament[] = [
  {
    id: 't-2024-t20',
    year: 2024,
    name: "ICC Men's T20 World Cup 2024",
    edition: '9th Edition',
    format: 'T20',
    winner: 'India',
    runnerUp: 'South Africa',
    finalScore: 'IND 176/7 (20 ov) beat SA 169/8 (20 ov) by 7 runs',
    venue: 'Kensington Oval, Bridgetown, Barbados',
    playerOfTournament: 'Jasprit Bumrah (15 wickets, econ 4.17)',
    summary: 'An undefeated tournament run by Rohit Sharma’s Men in Blue. Virat Kohli’s clutch 76 set a fighting target, before Bumrah and Hardik Pandya’s nerve-shredding final overs clinched India’s first ICC trophy in 11 years.',
    historicHighlights: [
      'Suryakumar Yadav’s boundary-skimming catch to dismiss David Miller in the final over',
      'Jasprit Bumrah’s 18th over conceding only 2 runs with a peach to bowl Marco Jansen',
      'Virat Kohli announcing retirement from T20 internationals as Player of the Match'
    ]
  },
  {
    id: 't-2023-odi',
    year: 2023,
    name: "ICC Men's Cricket World Cup 2023",
    edition: '13th Edition',
    format: 'ODI',
    winner: 'Australia',
    runnerUp: 'India',
    finalScore: 'AUS 241/4 (43 ov) beat IND 240 (50 ov) by 6 wickets',
    venue: 'Narendra Modi Stadium, Ahmedabad, India',
    playerOfTournament: 'Virat Kohli (765 runs in 11 innings, record-breaker)',
    summary: 'Australia lifted their record 6th ODI World Cup. Pat Cummins’ inspired bowling changes restricted India, followed by a scintillating match-winning 137 from Travis Head in front of 100,000 spectators.',
    historicHighlights: [
      'Glenn Maxwell’s 201* off 128 balls vs Afghanistan while severely cramping',
      'Mohammed Shami taking 7/57 against New Zealand in the semi-final',
      'Travis Head’s diving catch to dismiss Rohit Sharma in the final'
    ]
  },
  {
    id: 't-2025-ipl',
    year: 2025,
    name: 'Indian Premier League 2025',
    edition: '18th Edition',
    format: 'T20',
    winner: 'Chennai Super Kings',
    runnerUp: 'Kolkata Knight Riders',
    finalScore: 'CSK 204/5 (19.4 ov) beat KKR 203/6 (20 ov) by 5 wickets',
    venue: 'MA Chidambaram Stadium, Chennai',
    playerOfTournament: 'Ruturaj Gaikwad (710 runs, 63 avg)',
    summary: 'A dramatic high-scoring final at Chepauk where MS Dhoni’s iconic 12-ball cameo in the penultimate over set up a last-over victory to seal CSK’s sixth IPL crown.',
    historicHighlights: [
      'Last over thriller with 11 runs needed off 4 balls',
      'Record aggregate of 520 sixes struck across the tournament',
      'Young uncapped talent breakout season'
    ]
  },
  {
    id: 't-2019-odi',
    year: 2019,
    name: "ICC Men's Cricket World Cup 2019",
    edition: '12th Edition',
    format: 'ODI',
    winner: 'England',
    runnerUp: 'New Zealand',
    finalScore: 'Match tied (241 all out), Super Over tied (15 runs), ENG won on boundary countback',
    venue: "Lord's, London",
    playerOfTournament: 'Kane Williamson (578 runs, visionary captaincy)',
    summary: 'Widely regarded as the greatest ODI ever played. Ben Stokes fought back from the brink, leading to the only Super Over in World Cup final history.',
    historicHighlights: [
      'Ben Stokes 84* and the accidental ricochet boundary off his diving bat',
      'Jofra Archer bowling the high-pressure Super Over for England',
      'Martin Guptill run out off the final ball by Jos Buttler by mere millimeters'
    ]
  }
];

export const INITIAL_USER: UserProfile = {
  id: 'usr-current',
  name: 'Sanjay P',
  email: 'sanjaysanjayp20@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
  favoriteTeams: ['ind', 'csk', 'aus'],
  joinedDate: 'October 2025',
  stats: {
    matchesWatched: 128,
    fantasyPoints: 3980,
    predictionsWon: 33,
    predictionsTotal: 42,
    forumPostsCount: 14,
    streakDays: 9
  }
};
