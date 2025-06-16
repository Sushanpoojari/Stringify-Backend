// IMPORTS
import dotenv from 'dotenv';
dotenv.config();
import {Pool} from 'pg'
//SETTING UP PG DATABASE 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

pool.connect()
  .then(() => console.log('✅ Connected to Neon PostgreSQL DB'))
  .catch(err => console.error('❌ DB Connection Error:', err));

  
export default pool