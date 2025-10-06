const { analyzeResume } = require('../services/analysisService');
const databaseService = require('../services/databaseService');

async function uploadResume(req, res) {
  try {
    console.log('=== UPLOAD REQUEST START ===');
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('File details:', {
      name: req.file.originalname,
      size: req.file.size,
      mimetype: req.file.mimetype
    });

    // Analyze resume
    console.log('Starting analysis...');
    const analysis = await analyzeResume(req.file.buffer);
    console.log('Analysis completed');

    // Save to database
    console.log('Saving to database...');
    const resumeId = await databaseService.saveResumeAnalysis(analysis);
    console.log('Saved with ID:', resumeId);

    console.log('=== UPLOAD REQUEST SUCCESS ===');
    res.json({ ...analysis, id: resumeId });

  } catch (error) {
    console.error('=== UPLOAD REQUEST ERROR ===');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message });
  }
}

async function getAllResumes(req, res) {
  try {
    const resumes = await databaseService.getAllResumes();
    res.json(resumes);
  } catch (error) {
    console.error('Get all resumes error:', error);
    res.status(500).json({ error: error.message });
  }
}

async function getResumeById(req, res) {
  try {
    const { id } = req.params;
    const resume = await databaseService.getResumeById(id);
    
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    res.json(resume);
  } catch (error) {
    console.error('Get resume by ID error:', error);
    res.status(500).json({ error: error.message });
  }
}

async function deleteResume(req, res) {
  try {
    const { id } = req.params;
    const deleted = await databaseService.deleteResume(id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    
    res.json({ message: 'Resume deleted successfully' });
  } catch (error) {
    console.error('Delete resume error:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { 
  uploadResume, 
  getAllResumes, 
  getResumeById, 
  deleteResume 
};