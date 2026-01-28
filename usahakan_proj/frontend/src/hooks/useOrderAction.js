import { useState } from "react";
import { createOrder } from "../api";

export const useOrderAction = (clearCart) => {
  const [loading, setLoading] = useState(false);

  // Generate Invoice format: INV-YYMMDD-HHMMSS
  const generateInvoice = () => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mi = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    return `INV-${yy}${mm}${dd}-${hh}${mi}${ss}`;
  };

  const submitOrder = async (portalData, cartSelected, totalPrice, user) => {
    setLoading(true);
    const invoice = generateInvoice();

    // Construct order data
    const orderData = {
      userId: user?.id || null,
      guestEmail: user ? user.email : portalData.email,
      totalPrice: totalPrice,
      paymentMethod: "QRIS",
      paymentProof: portalData.fileName || null,
      invoice: invoice,
      items: cartSelected.map((item) => ({
        productId: item.productId,
        productItemId: item.id,
        quantity: 1,
        price: item.price,
        inputData: item.inputData,
      })),
    };

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("orderData", JSON.stringify(orderData));
    if (portalData.file) {
      formData.append("paymentProof", portalData.file);
    }

    try {
      await createOrder(formData);
      localStorage.removeItem("cartSelected");
      if (clearCart) clearCart();
      return invoice;
    } catch (err) {
      console.error("Gagal buat order:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { submitOrder, loading };
};
