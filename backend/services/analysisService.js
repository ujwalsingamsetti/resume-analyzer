const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function analyzeResume(buffer) {
  try {
    console.log('Starting PDF parsing...');
    const data = await pdfParse(buffer);
    const resumeText = data.text;
    console.log('PDF parsed successfully, text length:', resumeText.length);

    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // First, let's list available models
    try {
      console.log('Fetching available models...');
      const models = await genAI.listModels();
      console.log('Available models:', models.map(m => m.name));
      
      // Find a working model
      const availableModel = models.find(m => 
        m.name.includes('gemini') && 
        m.supportedGenerationMethods?.includes('generateContent')
      );
      
      if (!availableModel) {
        throw new Error('No suitable Gemini model found');
      }
      
      console.log('Using model:', availableModel.name);
      const model = genAI.getGenerativeModel({ model: availableModel.name });
      console.log('Model initialized successfully');
      
      return await generateWithModel(model, prompt);
    } catch (listError) {
      console.log('Could not list models, trying fallback:', listError.message);
      
      // Fallback to basic model names
      const fallbackModels = ['text-bison-001', 'gemini-pro-vision', 'gemini-pro'];
      
      for (const modelName of fallbackModels) {
        try {
          console.log(`Trying fallback model: ${modelName}`);
          const model = genAI.getGenerativeModel({ model: modelName });
          return await generateWithModel(model, prompt);
        } catch (error) {
          console.log(`Fallback model ${modelName} failed:`, error.message);
          continue;
        }
      }
      
      throw new Error('All models failed. Please check your API key and region.');
    }
  } catch (error) {
    console.error('Analysis error:', error.message);
    throw error;
  }
}

async function generateWithModel(model, prompt) {
  try {

    const prompt = `Analyze this resume and return ONLY a valid JSON object with this exact structure:

{
  "name": "Full Name",
  "email": "email@example.com",
  "phone": "phone number",
  "linkedin_url": "linkedin url or null",
  "portfolio_url": "portfolio url or null", 
  "summary": "brief summary",
  "work_experience": [{"role": "Job Title", "company": "Company", "duration": "2020-2023", "description": ["responsibility 1", "responsibility 2"]}],
  "education": [{"degree": "Degree", "institution": "School", "graduation_year": "2023"}],
  "technical_skills": ["skill1", "skill2"],
  "soft_skills": ["skill1", "skill2"],
  "projects": [{"name": "Project Name", "description": "Project description"}],
  "certifications": ["cert1", "cert2"],
  "resume_rating": 7,
  "improvement_areas": "Areas to improve",
  "upskill_suggestions": ["suggestion1", "suggestion2"]
}

Resume text: ${resumeText}`;

    console.log('Calling Gemini API...');
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('Gemini response received');

    // Clean response
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) jsonText = jsonText.substring(7);
    if (jsonText.startsWith('```')) jsonText = jsonText.substring(3);
    if (jsonText.endsWith('```')) jsonText = jsonText.substring(0, jsonText.length - 3);

    console.log('Parsing JSON response...');
    const analysis = JSON.parse(jsonText.trim());
    console.log('Analysis completed successfully');
    
    return analysis;
  } catch (error) {
    console.error('Model generation error:', error.message);
    throw error;
  }
}

module.exports = { analyzeResume };