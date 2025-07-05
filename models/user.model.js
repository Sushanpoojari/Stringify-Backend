
import pool from "../db.js";

//Checking if user exists
export async function checkIfUserExists  (email)  {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

//Registration
export async function createUser (userData)  {
  const { first_name, last_name, email, password, dob } = userData;
  const query = `INSERT INTO users (first_name, last_name, email, password, dob) 
                 VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const result = await pool.query(query, [first_name, last_name, email, password, dob]);
  return result.rows;
};

//Login 
export async function loginUser (email, password)  {
  const result = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
  return result.rows[0];
};

//Fetch User Data
export async function getUserDetails(user_id) {

  const query='SELECT * FROM getUserData($1)'
  try {
    const result= await pool.query(query,[user_id])
    return result.rows[0];
  } catch (error) {
    console.log("fetchUserDetails Error:: ",err)

  }
}