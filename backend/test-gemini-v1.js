const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGemini() {
  const genAI = new GoogleGenerativeAI('YOUR_NEW_API_KEY_HERE');
  
  // Try with different API versions and model names
  const testCases = [
    'gemini-1.5-flash-8b-exp-0827',
    'gemini-1.5-flash-exp-0827', 
    'gemini-1.5-pro-exp-0827',
    'text-bison-001',
    'chat-bison-001'
  ];
  
  for (const modelName of testCases) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent('Say "working"');
      const response = result.response.text();
      console.log(`✅ ${modelName}: ${response.trim()}`);
      return; // Exit on first success
    } catch (error) {
      console.log(`❌ ${modelName}: ${error.message.substring(0, 100)}...`);
    }
  }
  
  console.log('\n🔍 All models failed. Your API key might be restricted to a specific region.');
  console.log('Try creating a new API key at: https://aistudio.google.com/app/apikey');
  console.log('Make sure to select "Don\'t restrict key" when creating it.');
}

testGemini();