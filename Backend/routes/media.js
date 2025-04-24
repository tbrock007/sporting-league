const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Serve a list of uploaded files
router.get('/', (req, res) => {
    const directoryPath = path.join(__dirname, '../uploads');
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Unable to fetch media files.' });
        }
        // Return file paths relative to the server
        const fileUrls = files.map((file) => `/uploads/${file}`);
        res.json(fileUrls);
    });
});

module.exports = router;