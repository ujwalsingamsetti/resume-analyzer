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

    const prompt = `Analyze this resume and return ONLY a valid JSON object with this exact structure:

{
  "name": "Full Name",
  "email": "email@example.com", 
  "phone": "phone number",
  "linkedin_url": "linkedin url or null",
  "portfolio_url": "portfolio url or null",
  "summary": "brief summary",
  "work_experience": [{"role": "Job Title", "company": "Company", "duration": "2020-2023", "description": ["responsibility 1"]}],
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