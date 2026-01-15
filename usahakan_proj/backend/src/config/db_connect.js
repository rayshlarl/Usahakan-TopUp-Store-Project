import "dotenv/config";
import { Pool } from "pg";

const user_db = process.env.DB_USER_TABLE;
const category_db = process.env.DB_CATEGORY;
const products_db = process.env.DB_PRODUCT_TABLE;
const product_items_db = process.env.DB_PRODUCT_ITEMS;
const input_types_db = "input_types";
const input_type_fields_db = "input_type_fields";

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export { pool, user_db, category_db, products_db, product_items_db, input_types_db, input_type_fields_db };

