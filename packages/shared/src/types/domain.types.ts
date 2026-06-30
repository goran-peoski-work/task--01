// FIXME: split this into a DTO and a domain models, one for the API and one for the DB
export type Product = {
    id: string;
    name: string;
    price: number;
    stock: number;
};

export type AddToCartRequestDto = {
    productId: string;
    quantity: number;
    userId: string;
};
