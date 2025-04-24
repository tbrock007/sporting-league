const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
require('dotenv').config();

const leaguesRouter = require('./routes/leagues');
const teamsRouter = require('./routes/teams');
const playersRouter = require('./routes/players');
const matchesRouter = require('./routes/matches');
const statisticsRouter = require('./routes/statistics');
const newsRouter = require('./routes/news');

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve general site images
app.use('/image-gallery', express.static(path.join(__dirname, 'ImageGallery'))); // Serve Media Gallery images

// Set up multer for the uploads folder
const storageUploads = multer.diskStorage({
    destination: 'uploads', // For general site images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
    },
});

// Set up multer for the ImageGallery folder
const storageImageGallery = multer.diskStorage({
    destination: 'ImageGallery', // For Media Gallery images
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Add timestamp to filename
    },
});

// Multer upload handlers
const uploadUploads = multer({ storage: storageUploads });
const uploadImageGallery = multer({ storage: storageImageGallery });

// API Routes
app.use('/api/leagues', leaguesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/players', playersRouter);
app.use('/api/matches', matchesRouter);
app.use('/api/statistics', statisticsRouter);
app.use('/api/news', newsRouter);

// File Upload Endpoint for general site uploads
app.post('/api/uploads', uploadUploads.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const filePath = `/uploads/${req.file.filename}`;
    return res.status(200).json({ filePath });
});

// File Upload Endpoint for Media Gallery uploads
app.post('/api/image-gallery/upload', uploadImageGallery.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const filePath = `/image-gallery/${req.file.filename}`;
    return res.status(200).json({ filePath });
});

// Endpoint to fetch images from the uploads folder
app.get('/api/uploads', (req, res) => {
    const directoryPath = path.join(__dirname, 'uploads');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to fetch files from uploads.' });
        }
        const fileUrls = files
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // Only include valid image files
            .map((file) => `/uploads/${file}`);
        res.json(fileUrls);
    });
});

// Endpoint to fetch images from the ImageGallery folder
app.get('/api/image-gallery', (req, res) => {
    const directoryPath = path.join(__dirname, 'ImageGallery');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Unable to fetch files from ImageGallery.' });
        }
        const fileUrls = files
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // Only include valid image files
            .map((file) => `/image-gallery/${file}`);
        res.json(fileUrls);
    });
});

// Test Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// 404 Middleware for Unknown Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));