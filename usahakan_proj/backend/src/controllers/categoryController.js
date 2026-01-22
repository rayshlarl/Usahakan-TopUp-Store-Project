import { prisma } from "../config/prisma.js";

// Get all categories
const loadCategories = async () => {
  try {
    const result = await prisma.categories.findMany();
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

// Get category id by name
const getCategoryId = async (categoryName) => {
  try {
    const result = await prisma.categories.findFirst({
      where: {
        name: categoryName,
      },
      select: {
        id: true,
      },
    });
    return { rows: result ? [result] : [] };
  } catch (err) {
    console.error(err);
  }
};

//Get total Category
const getTotalCategory = async () => {
  try {
    const result = await prisma.categories.count();
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

export { loadCategories, getCategoryId, getTotalCategory };
