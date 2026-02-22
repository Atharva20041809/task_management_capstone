const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
const allowedOrigins = [
  'https://task-management-capstone.vercel.app',
  'http://localhost:5173', // local dev
];
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Simple root route
app.get('/', (req, res) => {
  res.send('Task Management API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
