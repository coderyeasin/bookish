

export type Order = {
    email: string;
    // mongoDB id
    product: Object;
    quantity: number;
    totalPrice: number;
}