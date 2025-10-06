const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const genAI = new GoogleGenerativeAI('AIzaSyC-U6nMWtMvJiUghf1rH_RcSFMFLpy8aJw');
  
  const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
  
  for (const modelName of models) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Hello, respond with just "working"');
      const response = result.response.text();
      console.log(`✅ ${modelName}: ${response}`);
      break;
    } catch (error) {
      console.log(`❌ ${modelName}: ${error.message}`);
    }
  }
}

testGemini();
