import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './models/index.js'; // Ensure models/index.js exists
import userCommentRoutes from './routes/userCommentRoutes.js'; // Fixed import
import optionsRoutes from './routes/options.js';

const app = express();
const PORT = 5000;

// Connect to the database
db.sequelize.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

db.sequelize.sync({ force: true })
  .then(() => console.log("Database synced with Sequelize"))
  .catch(err => console.error("Sequelize sync error:", err));

app.use(cors({
  origin: 'http://localhost:8080', // Vue.js default dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// JSON parsing error handler
app.use(express.json({
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf);
    } catch(e) {
      res.status(400).json({ error: 'Invalid JSON' });
      throw new Error('Invalid JSON');
    }
  }
}));

// Routes
app.use("/user_comment", userCommentRoutes);
app.use('/options', optionsRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Error handling middleware - moved after routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: err.message 
  });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
