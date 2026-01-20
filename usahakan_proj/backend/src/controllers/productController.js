import {
    pool,
    productsTable,
    productItemsTable,
    categoryTable,
    inputTypeFieldsTable,
} from "../config/dbConnect.js";

// Get all products with category name
const loadProducts = async () => {
    try {
        const result = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM ${productsTable} p
      JOIN ${categoryTable} c ON p.category_id = c.id
    `);
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get product items by product id
const loadProductItems = async (productId) => {
    try {
        const result = await pool.query(
            `
      SELECT pi.*, p.name as product_name, p.image as product_image
      FROM ${productItemsTable} pi
      JOIN ${productsTable} p ON pi.product_id = p.id
      WHERE pi.product_id = $1
      `,
            [productId]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get product id by name
const getProductId = async (name) => {
    try {
        const result = await pool.query(
            `SELECT id FROM ${productsTable} WHERE name = $1`,
            [name]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get product with category validation
const getProductIdWithCategory = async (productName, categoryName) => {
    try {
        const result = await pool.query(
            `
      SELECT p.id, p.name, c.name as category_name
      FROM ${productsTable} p
      JOIN ${categoryTable} c ON p.category_id = c.id
      WHERE p.name = $1 AND c.name = $2
      `,
            [productName, categoryName]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get input fields by product id
const getInputFieldsByProductId = async (productId) => {
    try {
        const result = await pool.query(
            `
      SELECT itf.*
      FROM ${inputTypeFieldsTable} itf
      JOIN ${productsTable} p ON p.input_type_id = itf.input_type_id
      WHERE p.id = $1
      ORDER BY itf.field_order
      `,
            [productId]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

// Get input fields by product name
const getInputFieldsByProductName = async (productName) => {
    try {
        const result = await pool.query(
            `
      SELECT itf.*
      FROM ${inputTypeFieldsTable} itf
      JOIN ${productsTable} p ON p.input_type_id = itf.input_type_id
      WHERE p.name = $1
      ORDER BY itf.field_order
      `,
            [productName]
        );
        return result;
    } catch (err) {
        console.error(err);
    }
};

export {
    loadProducts,
    loadProductItems,
    getProductId,
    getProductIdWithCategory,
    getInputFieldsByProductId,
    getInputFieldsByProductName,
};
