import { pool, userTable } from "../config/dbConnect.js";

// Get all users
const loadUsers = async () => {
    try {
        const result = await pool.query(`SELECT * FROM ${userTable}`);
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get user by email and password (for login)
const getUserInformation = async (email, password) => {
    try {
        const result = await pool.query(
            `SELECT * FROM ${userTable} WHERE email = $1 AND password = $2`,
            [email, password]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

export { loadUsers, getUserInformation };
