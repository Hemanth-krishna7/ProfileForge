import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import profileRoutes from './routes/profileRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors({
  origin: '*', // Allow all origins for this project setup
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);

// Root path diagnostic message
app.get('/', (req, res) => {
  res.send('ProfileForge API is running.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'An internal server error occurred.'
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
