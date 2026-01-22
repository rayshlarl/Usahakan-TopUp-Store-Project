import { prisma } from "../config/prisma.js";

// Get all users
const loadUsers = async () => {
    try {
        const result = await prisma.user_db.findMany();
        return { rows: result };
    } catch (err) {
        console.error(err);
    }
};

// Get user by email and password (for login)
const getUserInformation = async (email, password) => {
    try {
        const result = await prisma.user_db.findFirst({
            where: {
                email: email,
                password: password,
            },
        });
        return { rows: result ? [result] : [] };
    } catch (err) {
        console.error(err);
    }
};

export { loadUsers, getUserInformation };
