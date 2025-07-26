import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ResumeDetails from './ResumeDetails';
import './PastResumesTable.css';

// API base URL - will use environment variable in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5050';

function PastResumesTable() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/resumes/all`);
      setResumes(response.data);
    } catch (err) {
      setError('Failed to fetch resumes: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewResume = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/resumes/${id}`);
      setSelectedResume(response.data);
    } catch (err) {
      setError('Failed to fetch resume details: ' + err.message);
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/resumes/${id}`);
        setResumes(resumes.filter(resume => resume.id !== id));
        if (selectedResume && selectedResume.id === id) {
          setSelectedResume(null);
        }
      } catch (err) {
        setError('Failed to delete resume: ' + err.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'success';
    if (rating >= 6) return 'warning';
    return 'danger';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading resumes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 9V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 17H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="history-container">
      <div className="history-header">
        <div className="header-content">
          <div className="header-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <h2>Resume History</h2>
          <p>View and manage your analyzed resumes</p>
        </div>
      </div>

      {resumes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3>No Resumes Yet</h3>
          <p>Upload your first resume to get started with AI-powered analysis</p>
        </div>
      ) : (
        <div className="history-content">
          <div className="resumes-section">
            <div className="section-header">
              <h3>Uploaded Resumes</h3>
              <span className="resume-count">{resumes.length} resume{resumes.length !== 1 ? 's' : ''}</span>
            </div>
            
            <div className="resumes-grid">
              {resumes.map((resume) => (
                <div key={resume.id} className="resume-card card">
                  <div className="resume-header">
                    <div className="resume-info">
                      <h4>{resume.name || 'Unnamed Resume'}</h4>
                      <p className="resume-email">{resume.email || 'No email provided'}</p>
                      <p className="resume-date">{formatDate(resume.created_at)}</p>
                    </div>
                    <div className={`rating-badge badge-${getRatingColor(resume.resume_rating)}`}>
                      {resume.resume_rating}/10
                    </div>
                  </div>
                  
                  <div className="resume-actions">
                    <button 
                      onClick={() => handleViewResume(resume.id)}
                      className="btn btn-primary action-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 12S5 4 12 4S23 12 23 12S19 20 12 20S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      View Details
                    </button>
                    <button 
                      onClick={() => handleDeleteResume(resume.id)}
                      className="btn btn-danger action-btn"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {selectedResume && (
            <div className="details-section">
              <div className="details-header">
                <h3>Resume Details</h3>
                <button 
                  onClick={() => setSelectedResume(null)}
                  className="btn btn-secondary close-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Close
                </button>
              </div>
              <ResumeDetails analysis={selectedResume} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PastResumesTable;