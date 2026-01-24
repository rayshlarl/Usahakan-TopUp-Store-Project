// Script untuk menambah order_item baru ke order_id = 1
// Jalankan dengan: node src/scripts/addOrderItem.js

import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function addOrderItem() {
    try {
        // Tambah order item baru ke order_id = 1
        const newOrderItem = await prisma.order_items.create({
            data: {
                order_id: 2,
                product_id: 1,        // FK ke produk (sesuaikan jika perlu)
                product_item_id: 2,   // FK ke product_item (sesuaikan jika perlu)
                quantity: 1,
                price: 30000,
                input_data: {
                    user_id: "999888777",
                    zone_id: "5678",
                },
            },
        });

        console.log("✅ Order item berhasil ditambahkan:", newOrderItem);
    } catch (err) {
        console.error("❌ Error:", err);
    } finally {
        await prisma.$disconnect();
        await pool.end();
    }
}

addOrderItem();
