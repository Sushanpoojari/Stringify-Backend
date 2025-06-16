// IMPORTS
import dotenv from 'dotenv';
dotenv.config();
import {Pool} from 'pg'
//SETTING UP PG DATABASE 
const pool = new Pool();

// CONNECTING TO DB
pool.connect()
  .then(client => {
    client.release(); 
  })
  .catch(err => console.error("PostgreSQL connection error:", err));

  
export default pool