const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// GET team statistics
router.get('/teams', async (req, res) => {
    try {
        const [teamStats] = await db.query(`
            SELECT Teams.name AS team_name, 
                   TeamStatistics.matches_played, 
                   TeamStatistics.wins, 
                   TeamStatistics.losses, 
                   TeamStatistics.points_scored, 
                   TeamStatistics.points_allowed
            FROM TeamStatistics
            JOIN Teams ON TeamStatistics.team_id = Teams.id
        `);
        res.json(teamStats);
    } catch (error) {
        console.error('Error fetching team statistics:', error.message);
        res.status(500).json({ error: 'Failed to fetch team statistics' });
    }
});

// GET player statistics
router.get('/players', async (req, res) => {
    try {
        const [playerStats] = await db.query(`
            SELECT Players.name AS player_name, 
                   PlayerStatistics.matches_played, 
                   PlayerStatistics.points, 
                   PlayerStatistics.assists, 
                   PlayerStatistics.rebounds
            FROM PlayerStatistics
            JOIN Players ON PlayerStatistics.player_id = Players.id
        `);
        res.json(playerStats);
    } catch (error) {
        console.error('Error fetching player statistics:', error.message);
        res.status(500).json({ error: 'Failed to fetch player statistics' });
    }
});

// POST update team statistics
router.post('/teams', async (req, res) => {
    const { team_id, matches_played, wins, losses, points_scored, points_allowed } = req.body;

    if (!team_id) {
        return res.status(400).json({ error: 'Team ID is required' });
    }

    try {
        const result = await db.query(`
            INSERT INTO TeamStatistics (team_id, matches_played, wins, losses, points_scored, points_allowed)
            VALUES (?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                matches_played = VALUES(matches_played),
                wins = VALUES(wins),
                losses = VALUES(losses),
                points_scored = VALUES(points_scored),
                points_allowed = VALUES(points_allowed)
        `, [team_id, matches_played, wins, losses, points_scored, points_allowed]);

        res.json({ message: 'Team statistics updated successfully' });
    } catch (error) {
        console.error('Error updating team statistics:', error.message);
        res.status(500).json({ error: 'Failed to update team statistics' });
    }
});

// POST update player statistics
router.post('/players', async (req, res) => {
    const { player_id, matches_played, points, assists, rebounds } = req.body;

    if (!player_id) {
        return res.status(400).json({ error: 'Player ID is required' });
    }

    try {
        const result = await db.query(`
            INSERT INTO PlayerStatistics (player_id, matches_played, points, assists, rebounds)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                matches_played = VALUES(matches_played),
                points = VALUES(points),
                assists = VALUES(assists),
                rebounds = VALUES(rebounds)
        `, [player_id, matches_played, points, assists, rebounds]);

        res.json({ message: 'Player statistics updated successfully' });
    } catch (error) {
        console.error('Error updating player statistics:', error.message);
        res.status(500).json({ error: 'Failed to update player statistics' });
    }
});

module.exports = router;