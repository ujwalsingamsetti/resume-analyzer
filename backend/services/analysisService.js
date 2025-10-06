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

    const prompt = `Analyze this resume and return ONLY valid JSON:

{
  "name": "full name",
  "email": "email or null",
  "phone": "phone or null",
  "linkedin_url": "linkedin url or null",
  "portfolio_url": "portfolio url or null",
  "summary": "professional summary",
  "work_experience": [{"role": "title", "company": "company", "duration": "dates", "description": ["tasks"]}],
  "education": [{"degree": "degree", "institution": "school", "graduation_year": "year"}],
  "technical_skills": ["skills from resume"],
  "soft_skills": ["soft skills"],
  "projects": [{"name": "project name", "description": "description"}],
  "certifications": ["certifications"],
  "resume_rating": 8,
  "improvement_areas": "Add quantifiable achievements and specific technical details",
  "upskill_suggestions": ["Cloud Computing", "Machine Learning", "DevOps", "System Design"]
}

Resume: ${resumeText}`;

    console.log('Initializing Gemini AI...');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    console.log('Calling Gemini API...');
    
    // Add timeout
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('API timeout after 30 seconds')), 30000)
    );
    
    const apiPromise = model.generateContent(prompt);
    const result = await Promise.race([apiPromise, timeoutPromise]);
    
    const responseText = result.response.text();
    console.log('Gemini response received, length:', responseText.length);
    console.log('First 200 chars:', responseText.substring(0, 200));

    // Clean response
    let jsonText = responseText.trim();
    if (jsonText.startsWith('```json')) jsonText = jsonText.substring(7);
    if (jsonText.startsWith('```')) jsonText = jsonText.substring(3);
    if (jsonText.endsWith('```')) jsonText = jsonText.substring(0, jsonText.length - 3);

    console.log('Cleaned JSON text length:', jsonText.length);
    
    try {
      const analysis = JSON.parse(jsonText.trim());
      console.log('Analysis completed successfully');
      return analysis;
    } catch (parseError) {
      console.error('JSON parse error:', parseError.message);
      console.error('Raw response:', responseText);
      
      // Return a basic analysis if JSON parsing fails
      const emailMatch = resumeText.match(/[\w\.-]+@[\w\.-]+\.\w+/);
      const phoneMatch = resumeText.match(/[\+]?[1-9]?[\d\s\-\(\)]{10,}/);
      const nameMatch = resumeText.split('\n')[0]?.trim();
      
      return {
        name: nameMatch || "Resume Holder",
        email: emailMatch ? emailMatch[0] : null,
        phone: phoneMatch ? phoneMatch[0] : null,
        linkedin_url: null,
        portfolio_url: null,
        summary: "Analysis completed with basic parsing",
        work_experience: [],
        education: [],
        technical_skills: [],
        soft_skills: [],
        projects: [],
        certifications: [],
        resume_rating: 6,
        improvement_areas: "AI analysis encountered formatting issues",
        upskill_suggestions: ["Please try uploading again"]
      };
    }

  } catch (error) {
    console.error('Analysis error:', error.message);
    throw error;
  }
}

module.exports = { analyzeResume };