const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
const app = express();
const port = 8080;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error("Database opening error: ", err);
    } else {
        db.run(`CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            firstName TEXT,
            lastName TEXT,
            email TEXT,
            phone TEXT,
            interest TEXT,
            message TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
        console.log("Connected to SQLite Database.");
    }
});

// API endpoint to handle contact form submission
app.post('/api/contact', (req, res) => {
    const { firstName, lastName, email, phone, interest, message } = req.body;
    
    const query = `INSERT INTO contacts (firstName, lastName, email, phone, interest, message) VALUES (?, ?, ?, ?, ?, ?)`;
    db.run(query, [firstName, lastName, email, phone, interest, message], function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send("An error occurred while saving your message.");
        }
        // Redirect user to the Thank You page after successful submission
        res.redirect('/thankyou.html');
    });
});

// API endpoint to fetch all registrations for the Admin Dashboard
app.get('/api/admin/contacts', (req, res) => {
    db.all(`SELECT * FROM contacts ORDER BY created_at DESC`, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Failed to fetch data" });
        }
        res.json(rows);
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
