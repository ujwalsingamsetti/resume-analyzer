const pool = require('../db/index');

class DatabaseService {
  async withRetry(operation, maxRetries = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (attempt === maxRetries || !this.isRetryableError(error)) {
          throw error;
        }
        console.log(`Database operation failed (attempt ${attempt}/${maxRetries}):`, error.message);
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  isRetryableError(error) {
    return error.code === 'ECONNRESET' || 
           error.code === 'ENOTFOUND' || 
           error.code === 'ECONNREFUSED' ||
           error.message.includes('Connection terminated');
  }

  // Save resume analysis to database
  async saveResumeAnalysis(analysis) {
    return this.withRetry(async () => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
      
      // Insert main resume data
      const resumeResult = await client.query(`
        INSERT INTO resumes (name, email, phone, linkedin_url, portfolio_url, summary, resume_rating, improvement_areas)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
      `, [
        analysis.name,
        analysis.email,
        analysis.phone,
        analysis.linkedin_url,
        analysis.portfolio_url,
        analysis.summary,
        analysis.resume_rating,
        analysis.improvement_areas
      ]);
      
      const resumeId = resumeResult.rows[0].id;
      
      // Insert work experience
      if (analysis.work_experience && analysis.work_experience.length > 0) {
        for (const work of analysis.work_experience) {
          await client.query(`
            INSERT INTO work_experience (resume_id, role, company, duration, description)
            VALUES ($1, $2, $3, $4, $5)
          `, [
            resumeId,
            work.role,
            work.company,
            work.duration,
            work.description
          ]);
        }
      }
      
      // Insert education
      if (analysis.education && analysis.education.length > 0) {
        for (const edu of analysis.education) {
          await client.query(`
            INSERT INTO education (resume_id, degree, institution, graduation_year)
            VALUES ($1, $2, $3, $4)
          `, [
            resumeId,
            edu.degree,
            edu.institution,
            edu.graduation_year
          ]);
        }
      }
      
      // Insert technical skills
      if (analysis.technical_skills && analysis.technical_skills.length > 0) {
        for (const skill of analysis.technical_skills) {
          await client.query(`
            INSERT INTO skills (resume_id, skill_name, skill_type)
            VALUES ($1, $2, 'technical')
          `, [resumeId, skill]);
        }
      }
      
      // Insert soft skills
      if (analysis.soft_skills && analysis.soft_skills.length > 0) {
        for (const skill of analysis.soft_skills) {
          await client.query(`
            INSERT INTO skills (resume_id, skill_name, skill_type)
            VALUES ($1, $2, 'soft')
          `, [resumeId, skill]);
        }
      }
      
      // Insert projects
      if (analysis.projects && analysis.projects.length > 0) {
        for (const project of analysis.projects) {
          await client.query(`
            INSERT INTO projects (resume_id, name, description)
            VALUES ($1, $2, $3)
          `, [resumeId, project.name, project.description]);
        }
      }
      
      // Insert certifications
      if (analysis.certifications && analysis.certifications.length > 0) {
        for (const cert of analysis.certifications) {
          await client.query(`
            INSERT INTO certifications (resume_id, certification_name)
            VALUES ($1, $2)
          `, [resumeId, cert]);
        }
      }
      
      // Insert upskill suggestions
      if (analysis.upskill_suggestions && analysis.upskill_suggestions.length > 0) {
        for (const suggestion of analysis.upskill_suggestions) {
          await client.query(`
            INSERT INTO upskill_suggestions (resume_id, suggestion)
            VALUES ($1, $2)
          `, [resumeId, suggestion]);
        }
      }
      
        await client.query('COMMIT');
        return resumeId;
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      } finally {
        client.release();
      }
    });
  }
  
  // Get all resumes with basic info
  async getAllResumes() {
    return this.withRetry(async () => {
      const result = await pool.query(`
        SELECT id, name, email, resume_rating, created_at
        FROM resumes
        ORDER BY created_at DESC
      `);
      return result.rows;
    });
  }
  
  // Get detailed resume by ID
  async getResumeById(id) {
    return this.withRetry(async () => {
      const client = await pool.connect();
    try {
      // Get main resume data
      const resumeResult = await client.query(`
        SELECT * FROM resumes WHERE id = $1
      `, [id]);
      
      if (resumeResult.rows.length === 0) {
        return null;
      }
      
      const resume = resumeResult.rows[0];
      
      // Get work experience
      const workResult = await client.query(`
        SELECT role, company, duration, description
        FROM work_experience WHERE resume_id = $1
      `, [id]);
      
      // Get education
      const educationResult = await client.query(`
        SELECT degree, institution, graduation_year
        FROM education WHERE resume_id = $1
      `, [id]);
      
      // Get skills
      const skillsResult = await client.query(`
        SELECT skill_name, skill_type
        FROM skills WHERE resume_id = $1
      `, [id]);
      
      // Get projects
      const projectsResult = await client.query(`
        SELECT name, description
        FROM projects WHERE resume_id = $1
      `, [id]);
      
      // Get certifications
      const certificationsResult = await client.query(`
        SELECT certification_name
        FROM certifications WHERE resume_id = $1
      `, [id]);
      
      // Get upskill suggestions
      const suggestionsResult = await client.query(`
        SELECT suggestion
        FROM upskill_suggestions WHERE resume_id = $1
      `, [id]);
      
      // Organize skills by type
      const technicalSkills = skillsResult.rows
        .filter(skill => skill.skill_type === 'technical')
        .map(skill => skill.skill_name);
      
      const softSkills = skillsResult.rows
        .filter(skill => skill.skill_type === 'soft')
        .map(skill => skill.skill_name);
      
        return {
          ...resume,
          work_experience: workResult.rows,
          education: educationResult.rows,
          technical_skills: technicalSkills,
          soft_skills: softSkills,
          projects: projectsResult.rows,
          certifications: certificationsResult.rows.map(cert => cert.certification_name),
          upskill_suggestions: suggestionsResult.rows.map(suggestion => suggestion.suggestion)
        };
      } finally {
        client.release();
      }
    });
  }
  
  // Delete resume by ID
  async deleteResume(id) {
    return this.withRetry(async () => {
      const result = await pool.query(`
        DELETE FROM resumes WHERE id = $1
      `, [id]);
      return result.rowCount > 0;
    });
  }
}

module.exports = new DatabaseService(); 