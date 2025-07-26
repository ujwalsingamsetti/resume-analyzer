#!/bin/bash

echo "🚀 GitHub Deployment Setup for Resume Analyzer"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Check if user wants to proceed
read -p "Do you want to set up GitHub deployment? (y/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Setup cancelled."
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

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git."
    exit 1
else
    echo "✅ Git is installed: $(git --version)"
fi

echo ""
echo "🔧 Installing Dependencies:"
echo "=========================="

# Install backend dependencies
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    cd backend
    npm install
    cd ..
else
    echo "✅ Backend dependencies are installed"
fi

# Install frontend dependencies
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ Frontend dependencies are installed"
fi

echo ""
echo "📝 Next Steps for GitHub Deployment:"
echo "==================================="
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
echo "3. 📂 Create GitHub repository:"
echo "   - Go to https://github.com"
echo "   - Create new repository"
echo "   - Copy repository URL"
echo ""
echo "4. 🚂 Set up Railway backend:"
echo "   - Go to https://railway.app"
echo "   - Sign up with GitHub"
echo "   - Create new project"
echo "   - Connect your GitHub repository"
echo "   - Set environment variables"
echo ""
echo "5. 🌐 Set up Vercel frontend:"
echo "   - Go to https://vercel.com"
echo "   - Sign up with GitHub"
echo "   - Import your GitHub repository"
echo "   - Set root directory to 'frontend'"
echo ""
echo "6. ⚙️  Configure GitHub Secrets:"
echo "   - Go to your GitHub repository"
echo "   - Settings → Secrets and variables → Actions"
echo "   - Add the following secrets:"
echo "     * RAILWAY_TOKEN"
echo "     * RAILWAY_PROJECT_ID"
echo "     * VERCEL_TOKEN"
echo "     * VERCEL_ORG_ID"
echo "     * VERCEL_PROJECT_ID"
echo ""
echo "7. 🔄 Push to GitHub:"
echo "   git add ."
echo "   git commit -m 'Initial commit: Resume Analyzer with GitHub Actions'"
echo "   git remote add origin https://github.com/YOUR_USERNAME/resume-analyzer.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "📖 For detailed instructions, see GITHUB_DEPLOYMENT.md"
echo ""
echo "🎉 Your GitHub deployment will be ready!" 