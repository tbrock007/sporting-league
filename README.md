🏀 Sporting League

A full-stack sports league management web application that showcases teams, players, matches, news, and league details from professional and collegiate basketball associations. Designed with modular folders for frontend, backend, and database, this app provides a clean UI and organized structure for managing basketball league data.

📂 Project Structure
	•	frontend/ – Built with HTML/CSS (and optionally JS), this is the user interface for viewing teams, players, and recent games.
	•	backend/ – Handles server-side logic and potential API integrations (not included in current files, can be expanded).
	•	db/ – Contains SQL schema for initializing the MySQL database and populating it with sample data.

💡 Features
	•	Browse professional and collegiate basketball leagues like the NBA and NCAA.
	•	View detailed team pages with logos, city info, and player rosters.
	•	Player stats include age, height, and key performance metrics like points, assists, and rebounds per game.
	•	News section with recent league updates.
	•	Upcoming and past match fixtures with scores and venue details.

🛠 Tech Stack
	•	HTML5 / CSS3
	•	MySQL for structured relational data
	•	(Expandable) Node.js / Express for backend logic
	•	(Optional) JavaScript for future interactivity

🗃️ Database Schema Overview

This project uses a normalized SQL schema with the following tables:
	•	Leagues: NBA, NCAA, EuroLeague
	•	Teams: Associated with leagues, includes logos and cities
	•	Players: Player data including age, height, and team association
	•	Statistics: Individual player performance metrics
	•	News: Recent stories and announcements
	•	Matches: Fixtures with scores, dates, and venues
