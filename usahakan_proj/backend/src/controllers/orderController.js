import { prisma } from "../config/prisma.js";

//get all order with order_items and related data
const getOrder = async () => {
  try {
    const result = await prisma.orders.findMany({
      include: {
        order_items: {
          include: {
            products: true,
            product_items: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });
    return { rows: result };
  } catch (err) {
    console.error(err);
  }
};

//-->create new orders when user submit order
const createNewOrders = async (orderData) => {
  //--> setup data yang mau dikrim duls
  const {
    userId,
    guestEmail,
    totalPrice,
    paymentMethod,
    paymentProof,
    invoice,
    items,
  } = orderData;

  try {
    const result = await prisma.$transaction(async (tx) => {
      //--> Order
      const newOrderData = await tx.orders.create({
        data: {
          guest_email: guestEmail || null,
          invoice_code: invoice,
          payment_method: paymentMethod,
          payment_proof: paymentProof || null,
          status: "diproses",
          total_price: totalPrice,
          user_id: userId || null,
        },
      });
      //--> Order Items
      const orderItemsData = items.map((item) => ({
        input_data: item.inputData,
        order_id: newOrderData.id,
        price: item.price,
        product_id: item.productId,
        product_item_id: item.productItemId,
        quantity: item.quantity || 1,
      }));
      await tx.order_items.createMany({
        data: orderItemsData,
      });
      return newOrderData;
    });
    return { success: true, order: result };
  } catch (err) {
    console.error("Error creating order:", err);
    throw err;
  }
};

export { getOrder, createNewOrders };
