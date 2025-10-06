const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Simple CORS configuration
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

app.use(express.json());
app.use('/api/resumes', resumeRoutes);

// Basic health endpoints for platform probes
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});

const PORT = process.env.PORT || 5050;
console.log('Starting server...');
console.log('Environment check:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');
console.log('- GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? 'SET' : 'NOT SET');
console.log('- CORS_ORIGINS:', process.env.CORS_ORIGINS);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});