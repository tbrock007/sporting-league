const express = require('express');
const db = require('../db'); // Import the database connection
const router = express.Router();

// GET all news articles
router.get('/', async (req, res) => {
    try {
        const [news] = await db.query(`
            SELECT News.id, News.title, News.content, News.created_at,
                   Leagues.name AS league_name, Matches.id AS match_id
            FROM News
            LEFT JOIN Leagues ON News.league_id = Leagues.id
            LEFT JOIN Matches ON News.match_id = Matches.id
            ORDER BY News.created_at DESC
        `);
        res.json(news); // Return all news articles with league and match details
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news articles' });
    }
});

// POST a new news article
router.post('/', async (req, res) => {
    const { title, content, league_id, match_id } = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    try {
        const result = await db.query(
            'INSERT INTO News (title, content, league_id, match_id) VALUES (?, ?, ?, ?)',
            [title, content, league_id || null, match_id || null]
        );
        res.json({
            id: result.insertId,
            title,
            content,
            league_id,
            match_id,
            created_at: new Date(),
        });
    } catch (error) {
        console.error('Error creating news article:', error.message);
        res.status(500).json({ error: 'Failed to create news article' });
    }
});

// DELETE a news article by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM News WHERE id = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'News article not found' });
        }
        res.json({ message: 'News article deleted successfully' });
    } catch (error) {
        console.error('Error deleting news article:', error.message);
        res.status(500).json({ error: 'Failed to delete news article' });
    }
});

module.exports = router;