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

  
export default pool