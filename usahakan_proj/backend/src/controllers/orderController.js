import { prisma } from "../config/prisma.js";

//get all order
const getOrder = async () => {
  try {
    const result = await prisma.orders.findMany();
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

export { getOrder };
