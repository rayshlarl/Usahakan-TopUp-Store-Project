import { prisma } from "../../config/prisma.js";

// Get all Input types
const loadInputFields = async () => {
  try {
    const result = await prisma.input_types.findMany({
      select: {
        id: true,
        name: true,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

//Get inputTypes id based on input type name
const getInputTypesId = async (inputTypesName) => {
  try {
    const result = await prisma.input_types.findFirst({
      where: {
        name: inputTypesName,
      },
    });
    return result;
  } catch (err) {
    console.error(err);
  }
};

// Get input types fields by product id
const getInputFieldsByProductId = async (productId) => {
  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(productId) },
      select: { input_type_id: true },
    });

    if (!product?.input_type_id) {
      return { rows: [] };
    }

    const result = await prisma.input_type_fields.findMany({
      where: { input_type_id: product.input_type_id },
      orderBy: { field_order: "asc" },
    });

    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

// Get input types fields by product name
const getInputFieldsByProductName = async (productName) => {
  try {
    const product = await prisma.products.findFirst({
      where: { name: productName },
      select: { input_type_id: true },
    });

    if (!product?.input_type_id) {
      return { rows: [] };
    }

    const result = await prisma.input_type_fields.findMany({
      where: { input_type_id: product.input_type_id },
      orderBy: { field_order: "asc" },
    });

    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

export {
  getInputFieldsByProductId,
  getInputFieldsByProductName,
  loadInputFields,
  getInputTypesId,
};
