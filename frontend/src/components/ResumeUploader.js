import React, { useState } from 'react';
import axios from 'axios';
import ResumeDetails from './ResumeDetails';
import './ResumeUploader.css';

// API base URL - will use environment variable in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

function ResumeUploader() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setAnalysis(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/resumes/upload`, formData);
      setAnalysis(response.data);
    } catch (err) {
      setError('Failed to analyze resume: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="uploader-container">
      <div className="upload-card card">
        <div className="upload-header">
          <div className="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2>Upload Your Resume</h2>
          <p>Get AI-powered insights and analysis of your resume</p>
        </div>

        <div className="upload-area">
          <div className="file-input-container">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              id="file-input"
              className="file-input"
            />
            <label htmlFor="file-input" className="file-input-label">
              <div className="file-input-content">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Choose PDF File</span>
                <small>or drag and drop here</small>
              </div>
            </label>
          </div>

          {file && (
            <div className="file-selected">
              <div className="file-info">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                </svg>
                <span>{file.name}</span>
                <span className="file-size">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            </div>
          )}

          <button 
            onClick={handleUpload} 
            disabled={loading || !file}
            className={`btn btn-primary upload-btn ${loading ? 'loading' : ''}`}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Analyzing Resume...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Analyze Resume
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {error}
          </div>
        )}
      </div>

      {analysis && (
        <div className="analysis-container fade-in">
          <ResumeDetails analysis={analysis} />
        </div>
      )}
    </div>
  );
}

export default ResumeUploader;