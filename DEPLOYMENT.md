# 🚀 Resume Analyzer - Deployment Guide

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **Git** account
3. **Railway** account (for backend): https://railway.app
4. **Vercel** account (for frontend): https://vercel.com
5. **PostgreSQL** database (Railway/Render/Neon)
6. **Google Gemini API** key

## 🔧 Step-by-Step Deployment

### 1. Backend Deployment (Railway)

```bash
# Navigate to backend directory
cd backend

# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway project
railway init

# Deploy to Railway
railway up
```

### 1b. Backend Deployment (Render) — Recommended alternative

Option A: Use Render dashboard (simplest)

1. Create a Web Service from your GitHub repo
2. Root Directory: `backend`
3. Build Command: `npm ci`
4. Start Command: `npm start`
5. Health Check Path: `/api/resumes/test`
6. Add Environment Variables:
   - `NODE_ENV=production`
   - `GEMINI_API_KEY`
   - `CORS_ORIGINS` (comma-separated), e.g. `https://your-frontend.vercel.app,http://localhost:3000`
   - `DATABASE_URL` (use Render Postgres or Neon)

Option B: Use the provided `render.yaml` (Blueprint)

```bash
render blueprint deploy
```
This will provision a free Postgres and a Node Web Service using the settings above.

**Set Environment Variables in Railway Dashboard:**
- `DB_USER`: Your database username
- `DB_HOST`: Your database host
- `DB_DATABASE`: Your database name
- `DB_PASSWORD`: Your database password
- `DB_PORT`: 5432 (default PostgreSQL port)
- `GEMINI_API_KEY`: Your Google Gemini API key

### 2. Frontend Deployment (Vercel)

```bash
# Navigate to frontend directory
cd frontend

# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel --prod
```

**Set Environment Variable in Vercel Dashboard:**
- `REACT_APP_API_URL`: Your Railway backend URL (e.g., https://your-app.railway.app)

### 3. Database Setup

**Option A: Railway PostgreSQL**
1. Create new PostgreSQL service in Railway
2. Copy connection details to environment variables

**Option B: Neon (Recommended)**
1. Go to https://neon.tech
2. Create new project
3. Copy connection string to environment variables

**Option C: Render PostgreSQL**
1. Go to https://render.com
2. Create new PostgreSQL service
3. Copy connection details to environment variables

### 4. Database Schema Setup

After setting up the database, the application will automatically create the required tables on first run.

## 🔗 Alternative Deployment Options

### Option 2: Render (Full Stack)
- Deploy both frontend and backend to Render
- Use Render's PostgreSQL service
- Free tier available

### Option 3: Heroku
- Deploy backend to Heroku
- Deploy frontend to Vercel/Netlify
- Use Heroku Postgres addon

### Option 4: DigitalOcean App Platform
- Deploy both services to DigitalOcean
- Use managed PostgreSQL database
- More control but requires more setup

## 🛠️ Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure backend URL is correctly set in frontend
   - Check CORS configuration in backend

2. **Database Connection Issues**
   - Verify all database environment variables are set
   - Check database connection string format

3. **API Key Issues**
   - Ensure GEMINI_API_KEY is set correctly
   - Check API key permissions and quotas

4. **Build Errors**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## 📊 Monitoring

### Railway Backend:
- Monitor logs in Railway dashboard
- Check resource usage
- Set up alerts for errors

### Vercel Frontend:
- Monitor performance in Vercel dashboard
- Check build logs
- Set up analytics

## 🔒 Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **API Keys**: Use environment variables for all API keys
3. **CORS**: Configure CORS properly for production
4. **Database**: Use strong passwords and secure connections
5. **HTTPS**: Ensure all connections use HTTPS in production

## 🎉 Post-Deployment Checklist

- [ ] Test resume upload functionality
- [ ] Verify AI analysis is working
- [ ] Check database operations (save/retrieve/delete)
- [ ] Test responsive design on mobile
- [ ] Monitor error logs
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## 📞 Support

If you encounter issues during deployment:
1. Check the logs in your deployment platform
2. Verify all environment variables are set correctly
3. Test the application locally first
4. Check the troubleshooting section above

---

**Happy Deploying! 🚀** 