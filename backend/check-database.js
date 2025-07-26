const pool = require('./db/index');

async function checkDatabase() {
  try {
    console.log('Checking database structure...');
    
    // Check if tables exist
    const result = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    
    console.log('Existing tables:', result.rows.map(row => row.table_name));
    
    // Drop existing tables if they exist
    console.log('Dropping existing tables...');
    await pool.query('DROP TABLE IF EXISTS upskill_suggestions CASCADE');
    await pool.query('DROP TABLE IF EXISTS certifications CASCADE');
    await pool.query('DROP TABLE IF EXISTS projects CASCADE');
    await pool.query('DROP TABLE IF EXISTS skills CASCADE');
    await pool.query('DROP TABLE IF EXISTS education CASCADE');
    await pool.query('DROP TABLE IF EXISTS work_experience CASCADE');
    await pool.query('DROP TABLE IF EXISTS resumes CASCADE');
    
    console.log('Database cleaned successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error checking database:', error);
    process.exit(1);
  }
}

checkDatabase(); 