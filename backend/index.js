import 'dotenv'; // dotenv config doesn't need an explicit call
import express from 'express';
import cors from 'cors';
import db from './models/index.js'; // Ensure models/index.js exists
import userCommentRoutes from './routes/userCommentRoutes.js'; // Fixed import

const app = express();
const PORT = 5000;

// Connect to the database
db.sequelize.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

db.sequelize.sync({ force: false })
  .then(() => console.log("Database synced with Sequelize"))
  .catch(err => console.error("Sequelize sync error:", err));

app.use(cors());
app.use(express.json());

// Routes
app.use("/user_comment", userCommentRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
