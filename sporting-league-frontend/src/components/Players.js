import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Players.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [highlightedPlayerId, setHighlightedPlayerId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Fetch all players from the API
        axios
            .get('http://localhost:4000/api/players')
            .then((response) => {
                setPlayers(response.data);
            })
            .catch((error) => console.error('Error fetching players:', error));
    }, []);

    useEffect(() => {
        // Check for highlight parameter in the URL
        const params = new URLSearchParams(location.search);
        const highlightId = params.get('highlight');
        if (highlightId) {
            setHighlightedPlayerId(parseInt(highlightId, 10)); // Parse ID to ensure it's a number
            setTimeout(() => setHighlightedPlayerId(null), 3000); // Clear highlight after 3 seconds
        }
    }, [location.search]);

    const handleCardClick = (playerId) => {
        navigate(`/statistics?playerId=${playerId}`); // Navigate to stats page with playerId
    };

    return (
        <div className="players-page">
            {/* Page Header */}
            <header className="players-header text-center text-white">
                <h1>Players</h1>
                <p>Discover profiles of all players in our leagues!</p>
            </header>

            {/* Player Cards */}
            <div className="container mt-5">
                <div className="row g-4">
                    {players.length > 0 ? (
                        players.map((player) => (
                            <div
                                className={`col-md-4 ${
                                    highlightedPlayerId === player.id ? 'highlight-card' : ''
                                }`}
                                key={player.id}
                                onClick={() => handleCardClick(player.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card player-card shadow">
                                    <img
                                        src={`http://localhost:4000${player.photo}`}
                                        alt={player.name}
                                        className="card-img-top player-img"
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{player.name}</h5>
                                        <p className="card-text">
                                            <strong>Team:</strong> {player.team_name} <br />
                                            <strong>Age:</strong> {player.age} <br />
                                            <strong>Height:</strong> {player.height}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No players found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Players;