import { prisma } from "../config/prisma.js";

//Get total Category
const getTotalCategory = async () => {
  try {
    const result = await prisma.categories.count();
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

export { getTotalCategory };
