const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// GET all leagues
router.get('/', async (req, res) => {
    try {
        const [leagues] = await db.query('SELECT * FROM Leagues');
        res.json(leagues); // Return all leagues as JSON
    } catch (error) {
        console.error('Error fetching leagues:', error.message);
        res.status(500).json({ error: 'Failed to fetch leagues' });
    }
});

// POST a new league
router.post('/', async (req, res) => {
    const { name, description, sport_type } = req.body;
    if (!name || !sport_type) {
        return res.status(400).json({ error: 'Name and sport type are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO Leagues (name, description, sport_type) VALUES (?, ?, ?)',
            [name, description, sport_type]
        );
        res.json({ id: result.insertId, name, description, sport_type }); // Return the newly created league
    } catch (error) {
        console.error('Error creating league:', error.message);
        res.status(500).json({ error: 'Failed to create league' });
    }
});

module.exports = router;