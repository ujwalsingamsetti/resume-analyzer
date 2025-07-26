import React from 'react';
import './ResumeDetails.css';

function ResumeDetails({ analysis }) {
  if (!analysis) return null;

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'success';
    if (rating >= 6) return 'warning';
    return 'danger';
  };

  return (
    <div className="resume-details">
      <div className="details-header">
        <h3>Resume Analysis Results</h3>
        <div className={`rating-badge badge-${getRatingColor(analysis.resume_rating)}`}>
          {analysis.resume_rating}/10
        </div>
      </div>

      <div className="details-grid">
        {/* Personal Information */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Personal Information</h4>
          </div>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{analysis.name || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="label">Email:</span>
              <span className="value">{analysis.email || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="label">Phone:</span>
              <span className="value">{analysis.phone || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="label">LinkedIn:</span>
              <span className="value">{analysis.linkedin_url || 'Not provided'}</span>
            </div>
            <div className="info-item">
              <span className="label">Portfolio:</span>
              <span className="value">{analysis.portfolio_url || 'Not provided'}</span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Professional Summary</h4>
          </div>
          <p className="summary-text">{analysis.summary || 'No summary provided'}</p>
        </div>

        {/* Work Experience */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7L10 17L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Work Experience</h4>
          </div>
          {analysis.work_experience && analysis.work_experience.length > 0 ? (
            <div className="experience-list">
              {analysis.work_experience.map((job, index) => (
                <div key={index} className="experience-item">
                  <div className="job-header">
                    <h5>{job.role || 'Role not specified'}</h5>
                    <span className="company">{job.company || 'Company not specified'}</span>
                    <span className="duration">{job.duration || 'Duration not specified'}</span>
                  </div>
                  {job.description && job.description.length > 0 && (
                    <ul className="job-description">
                      {job.description.map((desc, i) => (
                        <li key={i}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No work experience provided</p>
          )}
        </div>

        {/* Education */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 10V6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V10C2 11.1 2.9 12 4 12H20C21.1 12 22 11.1 22 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 10L12 16L22 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Education</h4>
          </div>
          {analysis.education && analysis.education.length > 0 ? (
            <div className="education-list">
              {analysis.education.map((edu, index) => (
                <div key={index} className="education-item">
                  <h5>{edu.degree || 'Degree not specified'}</h5>
                  <span className="institution">{edu.institution || 'Institution not specified'}</span>
                  <span className="year">{edu.graduation_year || 'Year not specified'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No education provided</p>
          )}
        </div>

        {/* Skills */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Skills</h4>
          </div>
          <div className="skills-container">
            <div className="skills-section">
              <h5>Technical Skills</h5>
              <div className="skills-tags">
                {analysis.technical_skills && analysis.technical_skills.length > 0 ? (
                  analysis.technical_skills.map((skill, index) => (
                    <span key={index} className="skill-tag badge-primary">{skill}</span>
                  ))
                ) : (
                  <span className="no-skills">None</span>
                )}
              </div>
            </div>
            <div className="skills-section">
              <h5>Soft Skills</h5>
              <div className="skills-tags">
                {analysis.soft_skills && analysis.soft_skills.length > 0 ? (
                  analysis.soft_skills.map((skill, index) => (
                    <span key={index} className="skill-tag badge-warning">{skill}</span>
                  ))
                ) : (
                  <span className="no-skills">None</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Projects */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 11H15M9 15H15M9 7H15M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Projects</h4>
          </div>
          {analysis.projects && analysis.projects.length > 0 ? (
            <div className="projects-list">
              {analysis.projects.map((project, index) => (
                <div key={index} className="project-item">
                  <h5>{project.name}</h5>
                  <p>{project.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No projects provided</p>
          )}
        </div>

        {/* Certifications */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h4>Certifications</h4>
          </div>
          {analysis.certifications && analysis.certifications.length > 0 ? (
            <div className="certifications-list">
              {analysis.certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <span className="certification-name">{cert}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No certifications provided</p>
          )}
        </div>

        {/* Improvement Areas */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Areas for Improvement</h4>
          </div>
          <p className="improvement-text">{analysis.improvement_areas || 'No specific areas identified'}</p>
        </div>

        {/* Upskill Suggestions */}
        <div className="detail-section card">
          <div className="section-header">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h4>Upskill Suggestions</h4>
          </div>
          {analysis.upskill_suggestions && analysis.upskill_suggestions.length > 0 ? (
            <ul className="suggestions-list">
              {analysis.upskill_suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          ) : (
            <p className="no-data">No suggestions provided</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeDetails;