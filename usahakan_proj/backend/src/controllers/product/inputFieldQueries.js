import { prisma } from "../../config/prisma.js";

// Get input fields by product id
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

// Get input fields by product name
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

export { getInputFieldsByProductId, getInputFieldsByProductName };
