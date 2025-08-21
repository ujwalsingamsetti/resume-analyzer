const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();

// Configure CORS to allow requests from Vercel frontend
// Optionally provide a comma-separated list of origins via CORS_ORIGINS
const defaultAllowedOrigins = [
  'https://resume-analyzer-cyan.vercel.app',
  'https://resume-analysis-two.vercel.app',
  'https://resume-analysis-o6m4t6e4v-ujwal-singamsettis-projects.vercel.app',
  'https://resume-analysis-5of5qzrjr-ujwal-singamsettis-projects.vercel.app',
  'https://resume-analysis-5a1jm32ma-ujwal-singamsettis-projects.vercel.app',
  'http://localhost:3000',
  'http://localhost:3001'
];

const parsedEnvOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

const allowedOrigins = parsedEnvOrigins.length > 0 ? parsedEnvOrigins : defaultAllowedOrigins;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? allowedOrigins : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Ensure preflight requests are handled
app.options('*', cors({ origin: allowedOrigins, credentials: true }));

app.use(express.json());
app.use('/api/resumes', resumeRoutes);

// Basic health endpoints for platform probes
app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 5050; // allow platforms to inject PORT
console.log('running');
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});