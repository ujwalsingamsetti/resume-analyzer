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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});