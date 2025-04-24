import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Custom styles for additional design flair

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
            <div className="container">
                {/* Brand / Logo */}
                <Link className="navbar-brand" to="/">
                    <img
                        src="http://localhost:4000/uploads/Logo.jpg"
                        alt="Logo"
                        className="d-inline-block align-top me-2 navbar-logo"
                    />
                    BASKETBALL 101
                </Link>

                {/* Mobile Hamburger Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/leagues">
                                Leagues
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teams">
                            Teams
                            </Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/players">
                            Players
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/matches">
                                Matches
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/statistics">
                                Statistics
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">
                                News
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/media-gallery">
                                Media Gallery
                            </Link> 
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;