const { Pool } = require('pg');
require('dotenv').config();

// Prefer DATABASE_URL (Render/Heroku/Neon/etc). Fallback to discrete vars.
// Enable SSL in production unless explicitly disabled.
const isProduction = process.env.NODE_ENV === 'production';

let poolConfig;

if (process.env.DATABASE_URL) {
    poolConfig = {
        connectionString: process.env.DATABASE_URL,
        ssl: isProduction ? { rejectUnauthorized: false } : false,
    };
} else {
    poolConfig = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: Number(process.env.DB_PORT) || 5432,
        ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    };
}

const pool = new Pool(poolConfig);

module.exports = pool;

