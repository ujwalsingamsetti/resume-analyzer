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

    const prompt = `You are an expert HR recruiter. Analyze this resume thoroughly and provide specific, actionable feedback. Return ONLY a valid JSON object:

{
  "name": "Extract full name",
  "email": "Extract email or null",
  "phone": "Extract phone or null",
  "linkedin_url": "Extract LinkedIn URL or null",
  "portfolio_url": "Extract portfolio/GitHub URL or null",
  "summary": "Write a 2-3 sentence professional summary of this candidate",
  "work_experience": [Extract all work experience with specific roles, companies, durations, and key responsibilities],
  "education": [Extract all education with degrees, institutions, and graduation years],
  "technical_skills": [List all technical skills mentioned],
  "soft_skills": [Identify soft skills from experience descriptions],
  "projects": [Extract all projects with names and descriptions],
  "certifications": [List all certifications mentioned],
  "resume_rating": Rate from 1-10 based on completeness, relevance, and presentation,
  "improvement_areas": "Provide 3-4 specific areas where this resume could be improved (e.g., 'Add quantifiable achievements', 'Include more technical details', 'Improve formatting consistency')",
  "upskill_suggestions": ["Suggest 4-5 specific skills or technologies this candidate should learn based on their field and current skills"]
}

IMPORTANT: 
- Be specific and detailed in improvement_areas and upskill_suggestions
- Base suggestions on the actual content and field of work
- Don't use placeholder text like 'suggestion1' or 'Areas to improve'
- Provide actionable, personalized advice

Resume text:
${resumeText}`;

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