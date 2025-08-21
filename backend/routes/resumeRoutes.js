const express = require('express');
const multer = require('multer');
const { 
  uploadResume, 
  getAllResumes, 
  getResumeById, 
  deleteResume 
} = require('../controllers/resumeController');
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// Root test route
router.get('/', (req, res) => {
  console.log('GET /api/resumes/ called');
  res.json({ message: 'Resume API root is working!' });
});

// /test route (must come before /:id to avoid parameter capture)
router.get('/test', (req, res) => {
  console.log('GET /api/resumes/test called');
  res.json({ message: 'Resume routes are working!' });
});

// Upload and analyze resume
router.post('/upload', upload.single('resume'), uploadResume);

// Get all resumes (for history)
router.get('/all', getAllResumes);

// Get specific resume by ID (must come after specific routes)
router.get('/:id', getResumeById);

// Delete resume by ID
router.delete('/:id', deleteResume);

module.exports = router;