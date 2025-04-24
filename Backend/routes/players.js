const express = require('express');
const db = require('../db'); // Import the database connection
const upload = require('../middleware/fileUpload'); // Import the file upload middleware
const path = require('path');
const router = express.Router();

// GET all players
router.get('/', async (req, res) => {
    try {
        const [players] = await db.query(`
            SELECT Players.id, Players.name, Players.age, Players.height, Players.photo, Teams.name AS team_name
            FROM Players
            JOIN Teams ON Players.team_id = Teams.id
        `);
        res.json(players); // Return all players with their associated team names
    } catch (error) {
        console.error('Error fetching players:', error.message);
        res.status(500).json({ error: 'Failed to fetch players' });
    }
});

// POST a new player with image upload
router.post('/', upload.single('photo'), async (req, res) => {
    const { team_id, name, age, height } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null; // Store relative file path

    if (!team_id || !name) {
        return res.status(400).json({ error: 'Team ID and player name are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO Players (team_id, name, age, height, photo) VALUES (?, ?, ?, ?, ?)',
            [team_id, name, age, height, photo]
        );
        res.json({ id: result.insertId, team_id, name, age, height, photo }); // Return the new player details
    } catch (error) {
        console.error('Error creating player:', error.message);
        res.status(500).json({ error: 'Failed to create player' });
    }
});

module.exports = router;