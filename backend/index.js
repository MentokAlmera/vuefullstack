import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import db from './models/index.js';
import commentRoutes from './routes/commentRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import apiRoutes from './routes/api.js';

const app = express();
const PORT = 3000; // Changed to match frontend expectations

// Connect to the database
db.sequelize.authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch(err => console.error("Database connection error:", err));

// Only sync without force to preserve data
db.sequelize.sync()
  .then(() => console.log("Database synced with Sequelize"))
  .catch(err => console.error("Sequelize sync error:", err));

app.use(cors());

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
app.use("/api", apiRoutes); // Added API routes
app.use("/comment", commentRoutes);
app.use('/category', categoryRoutes);

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: err.message 
  });
});

app.listen(PORT, '192.168.10.26', () => {
    console.log(`Server running at http://192.168.10.26:${PORT}`);
});
