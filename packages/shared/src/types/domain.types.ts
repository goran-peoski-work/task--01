export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
};

export type CartItem = {
    cartId: string;
    productId: string;
    quantity: number;
};
