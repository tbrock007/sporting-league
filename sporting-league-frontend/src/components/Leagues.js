import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Leagues.css';

const Leagues = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        // Fetch leagues from the API
        axios
            .get('http://localhost:4000/api/leagues')
            .then((response) => setLeagues(response.data))
            .catch((error) => console.error('Error fetching leagues:', error));
    }, []);

    return (
        <div className="leagues-page">
            {/* Page Header */}
            <header className="leagues-header text-center text-white">
                <h1>Leagues</h1>
                <p>Explore leagues from the NBA to the NCAA and more!</p>
            </header>

            {/* Leagues Grid */}
            <div className="container mt-5">
                <div className="row g-4">
                    {leagues.map((league) => (
                        <div className="col-md-4" key={league.id}>
                            <div className="card league-card shadow">
                                {/* League Logo */}
                                <div className="league-logo-container text-center">
                                    {league.name.toLowerCase().includes('nba') && (
                                        <img
                                            src="http://localhost:4000/uploads/NBAlogo.jpg"
                                            alt="NBA Logo"
                                            className="league-logo nba-logo"
                                        />
                                    )}
                                    {league.name.toLowerCase().includes('ncaa') && (
                                        <img
                                            src="http://localhost:4000/uploads/NCAAlogo.jpg"
                                            alt="NCAA Logo"
                                            className="league-logo ncaa-logo"
                                        />
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="card-body text-center">
                                    <h5 className="card-title">{league.name}</h5>
                                    <p className="card-text">{league.description}</p>
                                    <a
                                        href={`/teams?leagueId=${league.id}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        View Teams
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Leagues;