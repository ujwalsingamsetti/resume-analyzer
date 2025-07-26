# 🚀 GitHub Deployment Guide for Resume Analyzer

## 📋 Prerequisites

1. **GitHub Account** - https://github.com
2. **Railway Account** - https://railway.app
3. **Vercel Account** - https://vercel.com
4. **PostgreSQL Database** - Neon/Railway/Render
5. **Google Gemini API Key** - https://makersuite.google.com/app/apikey

## 🔧 Step-by-Step GitHub Deployment

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit: Resume Analyzer with GitHub Actions"

# Create a new repository on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/resume-analyzer.git
git branch -M main
git push -u origin main
```

### Step 2: Set Up Railway Backend

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the `backend` folder

3. **Set Environment Variables in Railway**
   ```
   DB_USER=your_db_username
   DB_HOST=your_db_host
   DB_DATABASE=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Get Railway Token**
   - Go to Railway Dashboard → Account → Tokens
   - Create new token
   - Copy the token

### Step 3: Set Up Vercel Frontend

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend`
   - Deploy

3. **Get Vercel Tokens**
   - Go to Vercel Dashboard → Settings → Tokens
   - Create new token
   - Copy the token

4. **Get Project Details**
   - Go to your project settings in Vercel
   - Copy Project ID and Org ID

### Step 4: Configure GitHub Secrets

1. **Go to Your GitHub Repository**
   - Navigate to Settings → Secrets and variables → Actions

2. **Add Railway Secrets**
   ```
   RAILWAY_TOKEN=your_railway_token
   RAILWAY_PROJECT_ID=your_railway_project_id
   ```

3. **Add Vercel Secrets**
   ```
   VERCEL_TOKEN=your_vercel_token
   VERCEL_ORG_ID=your_vercel_org_id
   VERCEL_PROJECT_ID=your_vercel_project_id
   ```

### Step 5: Set Up Database

**Option A: Neon (Recommended)**
1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Update Railway environment variables

**Option B: Railway PostgreSQL**
1. In Railway dashboard, add PostgreSQL service
2. Copy connection details
3. Update environment variables

### Step 6: Test Deployment

1. **Make a small change to trigger deployment**
   ```bash
   # Edit any file
   echo "# Updated" >> README.md
   git add .
   git commit -m "Trigger deployment"
   git push
   ```

2. **Check GitHub Actions**
   - Go to Actions tab in your repository
   - Monitor the deployment process

3. **Verify Deployment**
   - Check Railway dashboard for backend
   - Check Vercel dashboard for frontend
   - Test the application

## 🔄 Continuous Deployment

### How It Works

1. **Push to Main Branch**
   - Any push to `main` triggers deployment
   - Backend changes deploy to Railway
   - Frontend changes deploy to Vercel

2. **Pull Requests**
   - Create feature branches
   - Make changes
   - Create PR to `main`
   - Tests run automatically
   - Deploy after merge

### Branch Strategy

```
main (production)
├── develop (staging)
├── feature/new-feature
└── hotfix/urgent-fix
```

## 🛠️ Troubleshooting

### Common Issues

1. **GitHub Actions Fail**
   - Check secrets are set correctly
   - Verify tokens are valid
   - Check logs for specific errors

2. **Railway Deployment Issues**
   - Verify environment variables
   - Check Railway project ID
   - Ensure Procfile is correct

3. **Vercel Deployment Issues**
   - Check build logs
   - Verify project settings
   - Ensure environment variables are set

4. **Database Connection Issues**
   - Verify connection string format
   - Check database credentials
   - Ensure database is accessible

### Debugging Steps

1. **Check GitHub Actions Logs**
   ```bash
   # Go to Actions tab in GitHub
   # Click on failed workflow
   # Check specific step logs
   ```

2. **Test Locally First**
   ```bash
   # Test backend
   cd backend
   npm install
   npm start
   
   # Test frontend
   cd frontend
   npm install
   npm start
   ```

3. **Verify Environment Variables**
   - Check all required variables are set
   - Ensure no typos in variable names
   - Verify values are correct

## 📊 Monitoring

### GitHub Actions
- Monitor workflow runs
- Set up notifications for failures
- Check deployment status

### Railway Backend
- Monitor logs in Railway dashboard
- Check resource usage
- Set up alerts

### Vercel Frontend
- Monitor performance
- Check build logs
- Set up analytics

## 🔒 Security Best Practices

1. **Never Commit Secrets**
   - Use GitHub Secrets for all sensitive data
   - Never hardcode API keys or passwords

2. **Environment Variables**
   - Use different values for dev/staging/prod
   - Rotate tokens regularly

3. **Access Control**
   - Limit who can deploy
   - Use branch protection rules
   - Require PR reviews

## 🎉 Post-Deployment Checklist

- [ ] Backend deployed successfully to Railway
- [ ] Frontend deployed successfully to Vercel
- [ ] Database connection working
- [ ] API endpoints responding
- [ ] Resume upload functionality working
- [ ] AI analysis working
- [ ] Database operations working
- [ ] Mobile responsiveness tested
- [ ] Error monitoring set up
- [ ] Performance monitoring configured

## 📞 Support

If you encounter issues:

1. **Check GitHub Actions logs** for specific error messages
2. **Verify all secrets** are set correctly
3. **Test locally** to isolate issues
4. **Check platform-specific logs** (Railway/Vercel)
5. **Review this guide** for common solutions

---

**Happy Deploying! 🚀** 