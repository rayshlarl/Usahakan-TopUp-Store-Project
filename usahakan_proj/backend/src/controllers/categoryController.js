import { pool, categoryTable } from "../config/dbConnect.js";

// Get all categories
const loadCategories = async () => {
    try {
        const result = await pool.query(`SELECT * FROM ${categoryTable}`);
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get category id by name
const getCategoryId = async (categoryName) => {
    try {
        const result = await pool.query(
            `SELECT id FROM ${categoryTable} WHERE name = $1`,
            [categoryName]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

export { loadCategories, getCategoryId };
