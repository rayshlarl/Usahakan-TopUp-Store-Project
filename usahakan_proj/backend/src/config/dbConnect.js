import "dotenv/config";
import { Pool } from "pg";

// Table names - using camelCase
const userTable = process.env.DB_USER_TABLE;
const categoryTable = process.env.DB_CATEGORY;
const productsTable = process.env.DB_PRODUCT_TABLE;
const productItemsTable = process.env.DB_PRODUCT_ITEMS;
const inputTypesTable = "input_types";
const inputTypeFieldsTable = "input_type_fields";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export {
  pool,
  userTable,
  categoryTable,
  productsTable,
  productItemsTable,
  inputTypesTable,
  inputTypeFieldsTable,
};
