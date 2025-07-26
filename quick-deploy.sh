#!/bin/bash

echo "🚀 Quick Deploy Script for Resume Analyzer"
echo "==========================================="

# Check if user wants to proceed
read -p "Do you want to proceed with deployment? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "📋 Prerequisites Check:"
echo "======================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
else
    echo "✅ Node.js is installed: $(node --version)"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
else
    echo "✅ npm is installed: $(npm --version)"
fi

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git."
    exit 1
else
    echo "✅ Git is installed: $(git --version)"
fi

echo ""
echo "🔧 Backend Setup:"
echo "================"

# Check if backend dependencies are installed
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
else
    echo "✅ Backend dependencies are installed"
fi

echo ""
echo "🌐 Frontend Setup:"
echo "================="

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ Frontend dependencies are installed"
fi

echo ""
echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. 🗄️  Set up PostgreSQL database:"
echo "   - Go to https://neon.tech (recommended)"
echo "   - Or use Railway/Render PostgreSQL"
echo "   - Copy connection details"
echo ""
echo "2. 🔑 Get Google Gemini API key:"
echo "   - Go to https://makersuite.google.com/app/apikey"
echo "   - Create new API key"
echo ""
echo "3. 🚂 Deploy Backend to Railway:"
echo "   cd backend"
echo "   npm install -g @railway/cli"
echo "   railway login"
echo "   railway init"
echo "   railway up"
echo ""
echo "4. 🌐 Deploy Frontend to Vercel:"
echo "   cd frontend"
echo "   npm install -g vercel"
echo "   vercel login"
echo "   vercel --prod"
echo ""
echo "5. ⚙️  Set Environment Variables:"
echo "   - Backend (Railway): DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT, GEMINI_API_KEY"
echo "   - Frontend (Vercel): REACT_APP_API_URL"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Good luck with your deployment!" 