/**
 * Group cart items by id + product
 * Combines duplicate items and tracks quantity
 */
export const groupCartItems = (cart) => {
    return cart.reduce((acc, item) => {
        const groupKey = `${item.id}-${item.product}`;
        const existingItem = acc.find((i) => i.groupKey === groupKey);

        if (existingItem) {
            existingItem.quantity += 1;
            existingItem.totalPrice += Number(item.price);
        } else {
            acc.push({
                ...item,
                groupKey,
                quantity: 1,
                totalPrice: Number(item.price),
            });
        }

        return acc;
    }, []);
};

/**
 * Group cart items by product for user info display
 * Groups different user inputs per product
 */
export const groupCartByProduct = (cart) => {
    return cart.reduce((acc, item) => {
        const productKey = item.product;
        const existingProduct = acc.find((p) => p.product === productKey);

        if (existingProduct) {
            const inputDataKey = JSON.stringify(item.inputData);
            const hasInputData = existingProduct.inputs.some(
                (i) => JSON.stringify(i.inputData) === inputDataKey
            );
            if (!hasInputData) {
                existingProduct.inputs.push({
                    inputData: item.inputData,
                    inputFields: item.inputFields,
                });
            }
        } else {
            acc.push({
                product: productKey,
                category: item.category,
                inputs: [
                    {
                        inputData: item.inputData,
                        inputFields: item.inputFields,
                    },
                ],
            });
        }

        return acc;
    }, []);
};
