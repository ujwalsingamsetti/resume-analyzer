const { analyzeResume } = require('../services/analysisService');
const databaseService = require('../services/databaseService');

async function uploadResume(req, res) {
  try {
    console.log('Upload request received');
    
    // Check environment variables
    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found');
      return res.status(500).json({ error: 'Server configuration error: Missing API key' });
    }
    
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log('File received:', req.file.originalname, 'Size:', req.file.size);
    
    console.log('Starting resume analysis...');
    const analysis = await analyzeResume(req.file.buffer);
    console.log('Analysis completed successfully');
    
    console.log('Saving to database...');
    const resumeId = await databaseService.saveResumeAnalysis(analysis);
    console.log('Saved to database with ID:', resumeId);
    
    // Return analysis with database ID
    res.json({
      ...analysis,
      id: resumeId
    });
  } catch (error) {
    console.error('Upload error:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}

async function getAllResumes(req, res) {
  try {
    const resumes = await databaseService.getAllResumes();
    res.json(resumes);
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { 
  uploadResume, 
  getAllResumes, 
  getResumeById, 
  deleteResume 
};