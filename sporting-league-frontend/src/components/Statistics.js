import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import './Statistics.css';

const Statistics = () => {
    const [teamStats, setTeamStats] = useState([]);
    const [playerStats, setPlayerStats] = useState([]);
    const navigate = useNavigate(); // Initialize navigate hook

    useEffect(() => {
        // Fetch team statistics
        axios
            .get('http://localhost:4000/api/statistics/teams')
            .then((response) => setTeamStats(response.data))
            .catch((error) => console.error('Error fetching team stats:', error));

        // Fetch player statistics
        axios
            .get('http://localhost:4000/api/statistics/players')
            .then((response) => setPlayerStats(response.data))
            .catch((error) => console.error('Error fetching player stats:', error));
    }, []);

    const handleTeamClick = (teamId) => {
        navigate(`/teams?teamId=${teamId}`); // Navigate to the team page
    };

    const handlePlayerClick = (playerId) => {
        navigate(`/players?playerId=${playerId}`); // Navigate to the player page
    };

    return (
        <div className="statistics-page">
            {/* Page Header */}
            <header className="statistics-header text-center text-white">
                <h1>Statistics</h1>
                <p>Explore team and player performance metrics!</p>
            </header>

            <div className="container mt-5">
                {/* Team Statistics Table */}
                <h2 className="text-center mb-4">Team Statistics</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-hover shadow">
                        <thead className="table-dark">
                            <tr>
                                <th>Team</th>
                                <th>Matches Played</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Points Scored</th>
                                <th>Points Allowed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamStats.map((team) => (
                                <tr
                                    key={team.team_id} // Use team_id as the key
                                    onClick={() => handleTeamClick(team.team_id)} // Add click handler
                                    style={{ cursor: 'pointer' }} // Indicate row is clickable
                                >
                                    <td>{team.team_name}</td>
                                    <td>{team.matches_played}</td>
                                    <td>{team.wins}</td>
                                    <td>{team.losses}</td>
                                    <td>{team.points_scored}</td>
                                    <td>{team.points_allowed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Player Statistics Table */}
                <h2 className="text-center mt-5 mb-4">Player Statistics</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-hover shadow">
                        <thead className="table-dark">
                            <tr>
                                <th>Player</th>
                                <th>Matches Played</th>
                                <th>Points</th>
                                <th>Assists</th>
                                <th>Rebounds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {playerStats.map((player) => (
                                <tr
                                    key={player.player_id} // Use player_id as the key
                                    onClick={() => handlePlayerClick(player.player_id)} // Add click handler
                                    style={{ cursor: 'pointer' }} // Indicate row is clickable
                                >
                                    <td>{player.player_name}</td>
                                    <td>{player.matches_played}</td>
                                    <td>{player.points}</td>
                                    <td>{player.assists}</td>
                                    <td>{player.rebounds}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Statistics;