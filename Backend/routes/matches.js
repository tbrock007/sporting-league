const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// GET all matches
router.get('/', async (req, res) => {
    try {
        const [matches] = await db.query(`
            SELECT Matches.id, 
                   home_team.name AS home_team, 
                   away_team.name AS away_team, 
                   Matches.match_date, 
                   Matches.match_time, 
                   Matches.venue
            FROM Matches
            JOIN Teams AS home_team ON Matches.home_team_id = home_team.id
            JOIN Teams AS away_team ON Matches.away_team_id = away_team.id
        `);
        res.json(matches); // Return all matches with team names and details
    } catch (error) {
        console.error('Error fetching matches:', error.message);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
});

// POST a new match
router.post('/', async (req, res) => {
    const { home_team_id, away_team_id, match_date, match_time, venue } = req.body;

    // Validate required fields
    if (!home_team_id || !away_team_id || !match_date || !match_time || !venue) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Ensure home and away teams are not the same
    if (home_team_id === away_team_id) {
        return res.status(400).json({ error: 'Home and away teams cannot be the same' });
    }

    try {
        const result = await db.query(
            'INSERT INTO Matches (home_team_id, away_team_id, match_date, match_time, venue) VALUES (?, ?, ?, ?, ?)',
            [home_team_id, away_team_id, match_date, match_time, venue]
        );
        res.json({
            id: result.insertId,
            home_team_id,
            away_team_id,
            match_date,
            match_time,
            venue,
        }); // Return the new match details
    } catch (error) {
        console.error('Error scheduling match:', error.message);
        res.status(500).json({ error: 'Failed to schedule match' });
    }
});

module.exports = router;