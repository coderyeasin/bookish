"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const ordersSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1),
    product: zod_1.z.string().min(1),
    quantity: zod_1.z.number().int().positive(),
    totalPrice: zod_1.z.number().int().positive(),
});
exports.default = ordersSchema;
