import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Teams.css';
import { useLocation } from 'react-router-dom';

const Teams = () => {
    const [nbaTeams, setNbaTeams] = useState([]);
    const [ncaaTeams, setNcaaTeams] = useState([]);
    const [highlightedTeamId, setHighlightedTeamId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();

    const teamLogos = {
        'Los Angeles Lakers': 'http://localhost:4000/uploads/lakers_logo.jpg',
        'Boston Celtics': 'http://localhost:4000/uploads/celtics_logo.jpg',
        'Duke Blue Devils': 'http://localhost:4000/uploads/duke_logo.jpg',
        'Kansas Jayhawks': 'http://localhost:4000/uploads/kansas_logo.jpg',
        'North Carolina Tar Heels': 'http://localhost:4000/uploads/nc_logo.jpg',
        'Golden State Warriors': 'http://localhost:4000/uploads/warriors_logo.jpg',
    };

    useEffect(() => {
        axios
            .get('http://localhost:4000/api/teams')
            .then((response) => {
                const nba = response.data.filter((team) => team.league_name === 'NBA');
                const ncaa = response.data.filter((team) => team.league_name === 'NCAA');
                setNbaTeams(nba);
                setNcaaTeams(ncaa);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching teams:', error);
                setError('Failed to load teams.');
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Check for highlight parameter in the URL
        const params = new URLSearchParams(location.search);
        const highlightId = params.get('highlight');
        if (highlightId) {
            setHighlightedTeamId(parseInt(highlightId, 10));
            setTimeout(() => setHighlightedTeamId(null), 3000); // Remove highlight after 3 seconds
        }
    }, [location.search]);

    if (loading) {
        return <div className="text-center mt-5">Loading teams...</div>;
    }

    if (error) {
        return <div className="text-center mt-5">{error}</div>;
    }

    return (
        <div className="teams-page">
            <header className="teams-header text-center text-white">
                <h1>Teams</h1>
                <p>Explore all the teams in our leagues!</p>
            </header>

            {/* NBA Teams */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">NBA Teams</h2>
                <div className="row g-4">
                    {nbaTeams.map((team) => (
                        <div
                            className={`col-md-4 ${highlightedTeamId === team.id ? 'highlight-card' : ''}`}
                            key={team.id}
                        >
                            <div className="card team-card shadow">
                                <div className="team-logo-container text-center">
                                    <img
                                        src={teamLogos[team.name] || 'http://localhost:4000/uploads/default_logo.jpg'}
                                        alt={`${team.name} logo`}
                                        className="team-logo"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{team.name}</h5>
                                    <p className="card-text">{team.description}</p>
                                    <a
                                        href={`/matches?teamId=${team.id}`}
                                        className="btn btn-warning mt-3"
                                    >
                                        View Matches
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* NCAA Teams */}
            <div className="container mt-5">
                <h2 className="text-center mb-4">NCAA Teams</h2>
                <div className="row g-4">
                    {ncaaTeams.map((team) => (
                        <div
                            className={`col-md-4 ${highlightedTeamId === team.id ? 'highlight-card' : ''}`}
                            key={team.id}
                        >
                            <div className="card team-card shadow">
                                <div className="team-logo-container text-center">
                                    <img
                                        src={teamLogos[team.name] || 'http://localhost:4000/uploads/default_logo.jpg'}
                                        alt={`${team.name} logo`}
                                        className="team-logo"
                                    />
                                </div>
                                <div className="card-body text-center">
                                    <h5 className="card-title">{team.name}</h5>
                                    <p className="card-text">{team.description}</p>
                                    <a
                                        href={`/matches?teamId=${team.id}`}
                                        className="btn btn-warning mt-3"
                                    >
                                        View Matches
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

export default Teams;