"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const zod_1 = require("zod");
const productValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, {
        message: 'Book title is required',
    }),
    author: zod_1.z.string().min(1, {
        message: 'Author name is required',
    }),
    price: zod_1.z.number().positive({
        message: 'Price must be a positive number',
    }),
    category: zod_1.z.enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        message: 'Product category is required',
    }),
    description: zod_1.z.string().min(1, {
        message: 'Product description is required',
    }),
    quantity: zod_1.z.number().int().positive({
        message: 'Quantity must be a positive number',
    }),
    inStock: zod_1.z.boolean().optional().default(false),
});
const productUpdateValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, {
        message: 'Book title is required',
    })
        .optional(),
    author: zod_1.z
        .string()
        .min(1, {
        message: 'Author name is required',
    })
        .optional(),
    price: zod_1.z.number().positive({
        message: 'Price must be a positive number',
    }),
    category: zod_1.z
        .enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
        message: 'Product category is required',
    })
        .optional(),
    description: zod_1.z
        .string()
        .min(1, {
        message: 'Product description is required',
    })
        .optional(),
    quantity: zod_1.z.number().int().positive({
        message: 'Quantity must be a positive number',
    }),
    inStock: zod_1.z.boolean().default(false).optional(),
});
exports.validationSchema = {
    productValidationSchema,
    productUpdateValidationSchema,
};
