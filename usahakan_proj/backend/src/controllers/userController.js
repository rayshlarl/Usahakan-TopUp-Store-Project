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
//--> create new user
const createNewUser = async (fullName, email, password) => {
  try {
    const userExist = await prisma.user_db.findFirst({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return { error: "Email sudah terdaftar kak :(" };
    }

    const newUser = await prisma.user_db.create({
      data: {
        fullName,
        email,
        password,
        isVerified: true,
        role: "buyer",
      },
    });

    return { success: true, user: newUser };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { loadUsers, getUserInformation, createNewUser };
