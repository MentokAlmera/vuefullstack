import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
const PORT = 5000;

// ✅ Create a MySQL database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Change if necessary
    password: "", // Add your password if applicable
    database: "user_comment"
});

// ✅ Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

app.use(cors());
app.use(express.json());

// ✅ Fetch non-deleted comments
app.get("/user_comment", (req, res) => {
    db.query(
        "SELECT id, firstName, lastName, comment FROM users WHERE deleted_at IS NULL",
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database query failed" });
            }
            res.json(results);
        }
    );
});

app.post("/user_comment", (req, res) => {
    const { firstName, lastName, comment } = req.body;
    db.query(
        "INSERT INTO users (firstName, lastName, comment) VALUES (?, ?, ?)",
        [firstName, lastName, comment],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to add comment" });
            }
            res.json({ message: "Comment added successfully" });
        }
    );
});

app.put("/user_comment/:id", (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, comment } = req.body;
    db.query(
        "UPDATE users SET firstName = ?, lastName = ?, comment = ? WHERE id = ?",
        [firstName, lastName, comment, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to update comment" });
            }
            res.json({ message: "Comment updated successfully" });
        }
    );
});

app.delete("/user_comment/:id", (req, res) => {
    const { id } = req.params;
    db.query(
        "UPDATE users SET deleted_at = NOW() WHERE id = ?",
        [id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete comment" });
            }
            res.json({ message: "Comment soft-deleted successfully" });
        }
    );
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
