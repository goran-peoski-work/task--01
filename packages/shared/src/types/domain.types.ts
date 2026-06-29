// FIXME: split this into a DTO and a domain models, one for the API and one for the DB
export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
};

// FIXME: split this into a DTO and a domain models, one for the API and one for the DB
export type CartItem = {
    cartId: string;
    productId: string;
    quantity: number;
};
