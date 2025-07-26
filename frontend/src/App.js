import React, { useState } from 'react';
import ResumeUploader from './components/ResumeUploader.js';
import PastResumesTable from './components/PastResumesTable.js';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('upload');

  return (
    <div className="App">
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <div className="logo">
              <div className="logo-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="currentColor"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1>Resume Analyzer</h1>
            </div>
            <p className="header-subtitle">AI-Powered Resume Analysis & Insights</p>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="app-nav">
          <div className="nav-container">
            <button 
              onClick={() => setActiveTab('upload')} 
              className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Upload Resume
            </button>
            <button 
              onClick={() => setActiveTab('history')} 
              className={`nav-tab ${activeTab === 'history' ? 'active' : ''}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
              View History
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="app-main">
          <div className="content-container">
            {activeTab === 'upload' && (
              <div className="fade-in">
                <ResumeUploader />
              </div>
            )}
            {activeTab === 'history' && (
              <div className="slide-in">
                <PastResumesTable />
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-content">
            <p>Powered by Google Gemini AI • Built with React & Node.js</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;