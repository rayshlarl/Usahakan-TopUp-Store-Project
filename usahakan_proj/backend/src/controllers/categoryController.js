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

//Ambil category berdasarkan nama cat nya
const getCategoryId = async (catName) => {
  try {
    const result = await prisma.categories.findFirst({
      where: {
        name: catName,
      },
    });
    return { data: result };
  } catch (err) {
    console.error(err);
  }
};

export { getTotalCategory, getCategoryId };
