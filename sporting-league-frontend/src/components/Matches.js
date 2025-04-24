import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Matches.css';

const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        // Fetch matches from the API
        axios
            .get('http://localhost:4000/api/matches')
            .then((response) => setMatches(response.data))
            .catch((error) => console.error('Error fetching matches:', error));
    }, []);

    // Helper function to format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Helper function to format the time
    const formatTime = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const date = new Date();
        date.setHours(hours, minutes);
        return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="matches-page">
            {/* Page Header */}
            <header className="matches-header text-center text-white">
                <h1>Matches</h1>
                <p>Stay updated on upcoming match schedules and results!</p>
            </header>

            {/* Matches Grid */}
            <div className="container mt-5">
                <div className="row g-4">
                    {matches.map((match) => (
                        <div className="col-md-4" key={match.id}>
                            <div className="card match-card shadow">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        {/* Link home and away team names to their respective Teams page */}
                                        <a href={`/teams?teamId=${match.home_team_id}`} className="team-link">
                                            {match.home_team}
                                        </a>{' '}
                                        vs{' '}
                                        <a href={`/teams?teamId=${match.away_team_id}`} className="team-link">
                                            {match.away_team}
                                        </a>
                                    </h5>
                                    <p className="card-text">
                                        <strong>Date:</strong> {formatDate(match.match_date)} <br />
                                        <strong>Time:</strong> {formatTime(match.match_time)} <br />
                                        <strong>Venue:</strong> {match.venue}
                                    </p>
                                    <a
                                        href={`/statistics?matchId=${match.id}`}
                                        className="btn btn-warning btn-sm"
                                    >
                                        View Stats
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

export default Matches;