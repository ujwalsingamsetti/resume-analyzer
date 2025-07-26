#!/bin/bash

echo "🚀 Resume Analyzer Deployment Script"
echo "====================================="

echo ""
echo "📋 Prerequisites:"
echo "1. Install Vercel CLI: npm i -g vercel"
echo "2. Create Railway account: https://railway.app"
echo "3. Create Vercel account: https://vercel.com"
echo "4. Set up PostgreSQL database (Railway/Render/Neon)"
echo ""

echo "🔧 Backend Deployment (Railway):"
echo "1. cd backend"
echo "2. railway login"
echo "3. railway init"
echo "4. railway up"
echo "5. Copy the deployed URL"
echo ""

echo "🌐 Frontend Deployment (Vercel):"
echo "1. cd frontend"
echo "2. vercel login"
echo "3. vercel --prod"
echo "4. Set environment variable REACT_APP_API_URL to your backend URL"
echo ""

echo "📝 Environment Variables to Set:"
echo "- DB_USER: Your database username"
echo "- DB_HOST: Your database host"
echo "- DB_DATABASE: Your database name"
echo "- DB_PASSWORD: Your database password"
echo "- DB_PORT: Your database port (usually 5432)"
echo "- GEMINI_API_KEY: Your Google Gemini API key"
echo ""

echo "✅ After deployment:"
echo "1. Test the application"
echo "2. Check all features work"
echo "3. Monitor logs for any issues"
echo ""

echo "🎉 Your Resume Analyzer will be live!" 