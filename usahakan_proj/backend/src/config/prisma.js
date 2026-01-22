import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

// Create pg pool with existing env variables
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

// Create Prisma adapter from pool
const adapter = new PrismaPg(pool);

// Create PrismaClient with the adapter
const prisma = new PrismaClient({ adapter });

export { prisma };
