import { prisma } from "../../config/prisma.js";

// Get product items by product id
const loadProductItems = async (productId) => {
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
        });

        const rows = result.map((pi) => ({
            ...pi,
            product_name: pi.products.name,
            product_image: pi.products.image,
        }));

        return { rows };
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

export { loadProductItems, getTotalItems };
