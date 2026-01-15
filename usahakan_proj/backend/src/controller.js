import {
  pool,
  user_db,
  category_db,
  products_db,
  product_items_db,
  input_types_db,
  input_type_fields_db,
} from "./config/db_connect.js";

//User section

const loadUser = async () => {
  try {
    const result = await pool.query(`SELECT * FROM ${user_db}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//Category Section

const loadCategory = async () => {
  try {
    const result = await pool.query(`SELECT * FROM ${category_db}`);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//Products Section

const loadProducts = async () => {
  try {
    const result = await pool.query(`
      SELECT p.*, c.name as category_name 
      FROM ${products_db} p
      JOIN ${category_db} c ON p.category_id = c.id
    `);
    return result;
  } catch (err) {
    console.error(err);
  }
};

//Product Items Section by Id

const loadProduct_items = async (product_id) => {
  try {
    const result = await pool.query(
      `
      SELECT pi.*, p.name as product_name, p.image as product_image
      FROM ${product_items_db} pi
      JOIN ${products_db} p ON pi.product_id = p.id
      WHERE pi.product_id = $1
    `,
      [product_id]
    );
    return result;
  } catch (err) {
    console.error(err);
  }
};

const getProduct_id = async (id) => {
  try {
    const getProductID_result = await pool.query(
      `SELECT id FROM ${products_db} WHERE name = $1`,
      [id]
    );
    return getProductID_result;
  } catch (err) {
    console.error(err);
  }
};
//Ngambil category id berdasarkan name url :cat (dengan parameterized query)
const getCat_id = async (cat_id) => {
  try {
    const getCategoryID = await pool.query(
      `SELECT id FROM ${category_db} WHERE name = $1`,
      [cat_id]
    );
    return getCategoryID;
  } catch (err) {
    console.error(err);
  }
};

// Validasi product ada di category yang benar (JOIN products + category)
const getProductWithCategory = async (product_name, category_name) => {
  try {
    const result = await pool.query(
      `
      SELECT p.id, p.name, c.name as category_name
      FROM ${products_db} p
      JOIN ${category_db} c ON p.category_id = c.id
      WHERE p.name = $1 AND c.name = $2
    `,
      [product_name, category_name]
    );
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Input Types Section

const getInputFieldsByProductId = async (product_id) => {
  try {
    // Get input_type_id from products, then get fields from input_type_fields
    const result = await pool.query(
      `
      SELECT itf.*
      FROM ${input_type_fields_db} itf
      JOIN ${products_db} p ON p.input_type_id = itf.input_type_id
      WHERE p.id = $1
      ORDER BY itf.field_order
    `,
      [product_id]
    );
    return result;
  } catch (err) {
    console.error(err);
  }
};

const getInputFieldsByProductName = async (product_name) => {
  try {
    // Get input_type_id from products by name, then get fields
    const result = await pool.query(
      `
      SELECT itf.*
      FROM ${input_type_fields_db} itf
      JOIN ${products_db} p ON p.input_type_id = itf.input_type_id
      WHERE p.name = $1
      ORDER BY itf.field_order
    `,
      [product_name]
    );
    return result;
  } catch (err) {
    console.error(err);
  }
};

export {
  loadUser,
  loadCategory,
  loadProducts,
  loadProduct_items,
  getProduct_id,
  getInputFieldsByProductId,
  getInputFieldsByProductName,
  getCat_id,
  getProductWithCategory,
};
