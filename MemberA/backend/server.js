const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI ||
      'mongodb+srv://zervic:zervic1@cluster0.v8zubag.mongodb.net/lendify?retryWrites=true&w=majority';  // local fallback
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};
connectDB();

// Routes — adjust as per your project
app.use('/api/students', require('./routes/students'));
app.use('/api/books', require('./routes/books'));

// Health-check endpoint (useful for Render / uptime checks)
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Service is running' });
});

// Global error handler (optional, for catching internal errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: { message: err.message || 'Internal Server Error', status: err.status || 500 }
  });
});

// Use PORT from environment (provided by Render), fallback to 5000 for local dev
const PORT = process.env.PORTA || 5000;
// Bind to '0.0.0.0' to accept external HTTP traffic (Render requires this) :contentReference[oaicite:2]{index=2}
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});

module.exports = app;
