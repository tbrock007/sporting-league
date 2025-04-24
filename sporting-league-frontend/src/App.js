import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Leagues from './components/Leagues';
import Teams from './components/Teams';
import Players from './components/Players';
import Matches from './components/Matches';
import Statistics from './components/Statistics';
import News from './components/News';
import MediaGallery from './components/MediaGallery';

const App = () => {
    return (
        <Router>
            <div className="app-wrapper">
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/leagues" element={<Leagues />} />
                    <Route path="/teams" element={<Teams />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/matches" element={<Matches />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/media-gallery" element={<MediaGallery />} />
                    <Route path="*" element={<div>404 - Page Not Found</div>} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
};

export default App;