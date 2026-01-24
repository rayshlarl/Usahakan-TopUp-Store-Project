import { prisma } from "../../config/prisma.js";

// Get all products with category name
const loadProducts = async () => {
  try {
    const result = await prisma.products.findMany({
      include: {
        categories: {
          select: {
            name: true,
          },
        },
      },
    });

    const rows = result.map((p) => ({
      ...p,
      category_name: p.categories.name,
    }));

    return { rows };
  } catch (err) {
    console.error(err);
  }
};

// Get product id by name
const getProductId = async (name) => {
  try {
    const result = await prisma.products.findFirst({
      where: { name },
      select: { id: true },
    });
    return { rows: result ? [result] : [] };
  } catch (err) {
    console.error(err);
  }
};

// Get product with category validation
const getProductIdWithCategory = async (productName, categoryName) => {
  try {
    const result = await prisma.products.findFirst({
      where: {
        name: productName,
        categories: { name: categoryName },
      },
      include: {
        categories: { select: { name: true } },
      },
    });

    if (result) {
      return {
        rows: [
          {
            id: result.id,
            name: result.name,
            category_name: result.categories.name,
          },
        ],
      };
    }
    return { rows: [] };
  } catch (err) {
    console.error(err);
  }
};

// Get total products count
const getTotalProduct = async () => {
  try {
    const result = await prisma.products.count();
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

//Get total product has been sell
const getTotalProductSold = async () => {
  try {
    const result = await prisma.order_items.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        orders: {
          status: "selesai",
        },
      },
    });
    return result._sum.quantity;
  } catch (err) {
    console.error(err);
  }
};

const getProductImage = async (productName) => {
  try {
    const result = await prisma.products.findFirst({
      where: {
        name: productName,
      },
      select: {
        image: true,
      },
    });
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

export {
  loadProducts,
  getProductId,
  getProductIdWithCategory,
  getTotalProduct,
  getTotalProductSold,
  getProductImage,
};
