import { prisma } from "../../config/prisma.js";

// Get product items by product id
const loadProductItemsById = async (productId) => {
  try {
    const result = await prisma.product_items.findMany({
      where: {
        product_id: parseInt(productId),
      },
      include: {
        products: {
          select: {
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        id: "asc",
      },
    });

    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

// Get total product items count
const getTotalItems = async () => {
  try {
    const result = await prisma.product_items.count();
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

//Delete selected item by id
const deleteItemById = async (itemId) => {
  try {
    const result = await prisma.product_items.delete({
      where: {
        id: parseInt(itemId),
      },
    });
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

// Create Item
const createItem = async (itemData, productId) => {
  try {
    const result = await prisma.product_items.create({
      data: {
        product_id: parseInt(productId),
        name: itemData.name,
        price: parseFloat(itemData.price),
        stock: parseInt(itemData.stock),
        is_unlimited_stock:
          itemData.isUnlimitedStock === "true" ||
          itemData.isUnlimitedStock === true,
        is_available:
          itemData.isAvailable === "true" || itemData.isAvailable === true,
        icon: itemData.iconName || null,
      },
    });
    return { data: result };
  } catch (err) {
    console.error(err);
  }
};

// Update Item
const updateItem = async (itemId, itemData) => {
  try {
    const result = await prisma.product_items.update({
      where: {
        id: parseInt(itemId),
      },
      data: {
        name: itemData.name,
        price: parseFloat(itemData.price),
        stock: itemData.isUnlimitedStock ? null : parseInt(itemData.stock),
        is_unlimited_stock:
          itemData.isUnlimitedStock === "true" ||
          itemData.isUnlimitedStock === true,
        is_available:
          itemData.isAvailable === "true" || itemData.isAvailable === true,
        icon: itemData.icon || null,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

export {
  loadProductItemsById,
  getTotalItems,
  deleteItemById,
  createItem,
  updateItem,
};
