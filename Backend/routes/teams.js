const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();


// GET all teams
router.get('/', async (req, res) => {
    try {
        const [teams] = await db.query(`
            SELECT Teams.id, Teams.name, Teams.description, Leagues.name AS league_name
            FROM Teams
            JOIN Leagues ON Teams.league_id = Leagues.id
        `);
        res.json(teams); // Return all teams with their associated league names
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ error: 'Failed to fetch teams' });
    }
});

// POST a new team
router.post('/', async (req, res) => {
    const { league_id, name, description } = req.body;

    if (!league_id || !name) {
        return res.status(400).json({ error: 'League ID and team name are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO Teams (league_id, name, description) VALUES (?, ?, ?)',
            [league_id, name, description]
        );
        res.json({ id: result.insertId, league_id, name, description }); // Return the new team details
    } catch (error) {
        console.error('Error creating team:', error.message);
        res.status(500).json({ error: 'Failed to create team' });
    }
});

module.exports = router;