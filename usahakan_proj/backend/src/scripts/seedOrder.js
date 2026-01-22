// Script untuk insert sample order
// Jalankan dengan: node src/scripts/seedOrder.js

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

async function seedOrder() {
  try {
    // Create sample order
    const order = await prisma.orders.create({
      data: {
        invoice_code: "INV-20260123-001",
        guest_email: "buyer2@example.com",
        total_price: 90000,
        payment_method: "QRIS",
        status: "selesai",
      },
    });

    console.log("✅ Order created:", order);

    // Create sample order item
    const orderItem = await prisma.order_items.create({
      data: {
        order_id: order.id,
        product_id: 1, // Mobile Legends
        product_item_id: 1, // Contoh: 86 Diamonds
        quantity: 2,
        price: 50000,
        input_data: {
          user_id: "123456789",
          zone_id: "1234",
        },
      },
    });

    console.log("✅ Order item created:", orderItem);

    console.log("\n🎉 Sample data inserted successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seedOrder();
