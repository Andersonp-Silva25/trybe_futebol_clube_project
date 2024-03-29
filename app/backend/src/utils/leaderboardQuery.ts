const leaderboardHome = `
SELECT 
  teams.team_name AS name,
  ((SUM(home_team_goals > away_team_goals) * 3) 
  +(SUM(home_team_goals = away_team_goals))) AS totalPoints,
  COUNT(*) AS totalGames,
  SUM(home_team_goals > away_team_goals) AS totalVictories,
  SUM(home_team_goals = away_team_goals) AS totalDraws,
  SUM(home_team_goals < away_team_goals) AS totalLosses,
  SUM(home_team_goals) AS goalsFavor,
  SUM(away_team_goals) AS goalsOwn,
  SUM(home_team_goals - away_team_goals) AS goalsBalance,
  ROUND(((
    ((SUM(home_team_goals > away_team_goals) * 3) 
    + SUM(home_team_goals = away_team_goals)) 
    / (COUNT(*) * 3)) 
    * 100), 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams
 ON teams.id = matches.home_team_id
WHERE in_progress = 0
GROUP BY teams.team_name
ORDER BY totalPoints DESC, totalVictories DESC, efficiency DESC, goalsFavor DESC, goalsOwn ASC;`;

const leaderboardAway = `
SELECT 
  teams.team_name AS name,
  ((SUM(away_team_goals > home_team_goals) * 3) 
  +(SUM(away_team_goals = home_team_goals))) AS totalPoints,
  COUNT(*) AS totalGames,
  SUM(away_team_goals > home_team_goals) AS totalVictories,
  SUM(away_team_goals = home_team_goals) AS totalDraws,
  SUM(away_team_goals < home_team_goals) AS totalLosses,
  SUM(away_team_goals) AS goalsFavor,
  SUM(home_team_goals) AS goalsOwn,
  SUM(away_team_goals - home_team_goals) AS goalsBalance,
  ROUND(((
    ((SUM(away_team_goals > home_team_goals) * 3) 
    + SUM(away_team_goals = home_team_goals)) 
    / (COUNT(*) * 3)) 
    * 100), 2) as efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS matches
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS teams
  ON teams.id = matches.away_team_id
WHERE in_progress = 0
GROUP BY teams.team_name
ORDER BY totalPoints DESC, goalsBalance DESC, goalsFavor DESC;`;

export { leaderboardHome, leaderboardAway };
