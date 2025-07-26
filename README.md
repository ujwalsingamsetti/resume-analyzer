# 🚀 Resume Analyzer

An AI-powered resume analysis application built with React, Node.js, and Google Gemini AI. Upload your resume and get detailed insights, skill analysis, and improvement suggestions.

## ✨ Features

- **📄 PDF Resume Upload** - Upload and parse PDF resumes
- **🤖 AI-Powered Analysis** - Detailed analysis using Google Gemini AI
- **📊 Skill Assessment** - Technical and soft skills evaluation
- **💼 Experience Analysis** - Work experience and project insights
- **🎓 Education Tracking** - Academic background analysis
- **📈 Improvement Suggestions** - Personalized recommendations
- **💾 History Management** - View and manage past analyses
- **📱 Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Frontend
- **React.js** - User interface
- **CSS3** - Modern styling with gradients and animations
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **Google Gemini AI** - AI analysis
- **Multer** - File upload handling
- **PDF-Parse** - PDF text extraction

### Deployment
- **Railway** - Backend hosting
- **Vercel** - Frontend hosting
- **GitHub Actions** - CI/CD pipeline

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- Google Gemini API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/resume-analyzer.git
   cd resume-analyzer
   ```

2. **Set up backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your database and API credentials
   npm start
   ```

3. **Set up frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5050

## 🌐 Deployment

### GitHub Deployment (Recommended)

1. **Fork/Clone this repository**
2. **Set up Railway backend**
   - Create Railway account
   - Connect GitHub repository
   - Set environment variables
3. **Set up Vercel frontend**
   - Create Vercel account
   - Import GitHub repository
   - Configure build settings
4. **Configure GitHub Secrets**
   - Add Railway and Vercel tokens
   - Set up GitHub Actions

For detailed deployment instructions, see [GITHUB_DEPLOYMENT.md](./GITHUB_DEPLOYMENT.md)

### Manual Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for manual deployment options.

## 📁 Project Structure

```
resume-analyzer/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── db/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── public/
├── .github/
│   └── workflows/
└── docs/
```

## 🔧 Environment Variables

### Backend (.env)
```env
DB_USER=your_db_username
DB_HOST=your_db_host
DB_DATABASE=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
GEMINI_API_KEY=your_gemini_api_key
```

### Frontend
```env
REACT_APP_API_URL=your_backend_url
```

## 📊 API Endpoints

- `POST /api/resumes/upload` - Upload and analyze resume
- `GET /api/resumes/all` - Get all resumes
- `GET /api/resumes/:id` - Get specific resume
- `DELETE /api/resumes/:id` - Delete resume

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Railway](https://railway.app/) for backend hosting
- [Vercel](https://vercel.com/) for frontend hosting
- [React](https://reactjs.org/) for the frontend framework
- [Express.js](https://expressjs.com/) for the backend framework

## 📞 Support

If you have any questions or need help:

1. Check the [deployment guides](./DEPLOYMENT.md)
2. Review the [GitHub deployment guide](./GITHUB_DEPLOYMENT.md)
3. Open an issue on GitHub
4. Check the troubleshooting sections in the guides

---

**Made with ❤️ and ☕** 