import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [players, setPlayers] = useState([]);
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    // Fetch players and teams for search
    useEffect(() => {
        axios
            .get('http://localhost:4000/api/players')
            .then((response) => setPlayers(response.data))
            .catch((error) => console.error('Error fetching players:', error));

        axios
            .get('http://localhost:4000/api/teams')
            .then((response) => setTeams(response.data))
            .catch((error) => console.error('Error fetching teams:', error));
    }, []);

    // Handle Search
    const handleSearch = () => {
        const foundPlayer = players.find((player) =>
            player.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const foundTeam = teams.find((team) =>
            team.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (foundPlayer) {
            navigate(`/players?highlight=${foundPlayer.id}`);
        } else if (foundTeam) {
            navigate(`/teams?highlight=${foundTeam.id}`);
        } else {
            alert('No matching player or team found.');
        }
    };

    return (
        <div className="home">
            {/* Search Bar */}
            <div className="search-bar-container text-center my-4">
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search players or teams..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-warning mx-2" onClick={handleSearch}>
                    Search
                </button>
            </div>

            {/* Hero Section */}
            <header className="hero-banner text-white text-center d-flex align-items-center justify-content-center">
                <div className="hero-content">
                    <h1>Welcome to the World of Basketball</h1>
                    <p>Keep up on the action for all Leagues, Matches, and Players!</p>
                    <a href="/leagues" className="btn btn-warning btn-lg">
                        Explore Leagues
                    </a>
                </div>
            </header>

            {/* Features Section */}
            <div className="container my-5">
                <h2 className="text-center mb-4">What We Offer</h2>
                <div className="row">
                    {/* Card 1: Leagues */}
                    <div className="col-md-4">
                        <div className="card shadow">
                            <img
                                src="http://localhost:4000/uploads/Stats.jpg"
                                className="card-img-top"
                                alt="Leagues"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Leagues</h5>
                                <p className="card-text">
                                    Discover and manage leagues from NBA to NCAA.
                                </p>
                                <a href="/leagues" className="btn btn-dark">
                                    Learn More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow">
                            <img
                                src="http://localhost:4000/uploads/BBALL.jpg"
                                className="card-img-top"
                                alt="Teams"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Teams</h5>
                                <p className="card-text">
                                    Discover and explore teams from every league.
                                </p>
                                <a href="/teams" className="btn btn-dark">
                                    View Teams
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow">
                            <img
                                src="http://localhost:4000/uploads/Players.jpg"
                                className="card-img-top"
                                alt="Players"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Players</h5>
                                <p className="card-text">
                                    Learn more about the talented players in our league.
                                </p>
                                <a href="/players" className="btn btn-dark">
                                    View Players
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Card 2: Matches */}
                    <div className="col-md-4">
                        <div className="card shadow">
                            <img
                                src="http://localhost:4000/uploads/Matches.jpg"
                                className="card-img-top"
                                alt="Matches"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Matches</h5>
                                <p className="card-text">
                                    Stay updated on schedules, venues, and results.
                                </p>
                                <a href="/matches" className="btn btn-dark">
                                    View Matches
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Card 3: Statistics */}
                    <div className="col-md-4">
                        <div className="card shadow">
                            <img
                                src="http://localhost:4000/uploads/Leagues.jpg"
                                className="card-img-top"
                                alt="Statistics"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">Statistics</h5>
                                <p className="card-text">
                                    Dive into player and team performance stats.
                                </p>
                                <a href="/statistics" className="btn btn-dark">
                                    See Stats
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* News Card */}
                    <div className="col-md-4">
                        <div className="card shadow">
                            <img
                                src="http://localhost:4000/uploads/News.jpg"
                                className="card-img-top"
                                alt="Statistics"
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">News</h5>
                                <p className="card-text">
                                    Catch up on the latest league updates.
                                </p>
                                <a href="/news" className="btn btn-dark">
                                    View News
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;