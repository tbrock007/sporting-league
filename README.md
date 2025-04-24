🏀 Sporting League

Sporting League is a full-stack basketball league management web application that displays teams, players, match results, league news, and more from professional and collegiate basketball associations. Built with a clean modular structure, this project separates frontend, backend, and database logic for streamlined development and future scalability.

⸻

📂 Project Structure  
• `frontend/` – Responsive user interface built with HTML and CSS for browsing teams, players, and recent matches  
• `backend/` – Placeholder folder for implementing server-side logic and APIs (can be extended with Node.js/Express)  
• `db/` – Contains SQL schema for initializing and populating a MySQL database with league data  

⸻

💡 Features  
• 🏆 Explore pro and collegiate leagues (NBA, NCAA, EuroLeague)  
• 👕 View team pages with logos, cities, and rosters  
• 📊 Player stats including age, height, PPG, APG, and RPG  
• 📰 News section featuring the latest league updates  
• 🗓️ Upcoming and past match fixtures with scores and venues  

⸻

🛠 Tech Stack  
• HTML5 / CSS3  
• MySQL (for structured relational data)  
• (Expandable) Node.js / Express for backend logic  
• (Optional) JavaScript for interactive elements  

⸻

🗃️ Database Schema Overview  
This project uses a normalized schema designed for clarity and efficient querying, with tables including:  
• `Leagues` – Stores league names like NBA, NCAA, etc.  
• `Teams` – Includes team name, league ID, logo URL, and city  
• `Players` – Tracks player age, height, and associated team  
• `Statistics` – Holds player performance metrics (PPG, APG, RPG)  
• `News` – Contains headlines and story content  
• `Matches` – Schedules with team matchups, dates, scores, and venues  

⸻

🚀 Getting Started  
1. Import the SQL schema in the `db/` folder into your MySQL environment  
2. Launch the `frontend/index.html` in your browser  
3. Explore teams, players, and league news!
