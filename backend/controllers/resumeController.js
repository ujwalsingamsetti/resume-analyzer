const { analyzeResume } = require('../services/analysisService');
const databaseService = require('../services/databaseService');

async function uploadResume(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const analysis = await analyzeResume(req.file.buffer);
    
    // Save to database
    const resumeId = await databaseService.saveResumeAnalysis(analysis);
    
    // Return analysis with database ID
    res.json({
      ...analysis,
      id: resumeId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
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