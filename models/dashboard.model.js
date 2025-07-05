import pool from "../db";

export async function getDashboardData(payload) {
    const {user_id,pageNumber,noOfRecords}=payload;

    const query = `SELECT * FROM get_dashboard_data($1, $2, $3)`;

    try {
        const result = await pool.query(query, [user_id, pageNumber, noOfRecords]);
        return result.rows;  
    } catch (err) {
        console.error("Error get_dashboard_data:", err);
        throw err;
    }
    
}