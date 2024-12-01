import { z } from 'zod'

const productValidationSchema = z.object({
  title: z.string().min(1, {
    message: 'Book title is required',
  }),
  author: z.string().min(1, {
    message: 'Author name is required',
  }),
  price: z.number().positive({
    message: 'Price must be a positive number',
  }),
  category: z.enum(
    ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
    {
      message: 'Product category is required',
    }
  ),
  description: z.string().min(1, {
    message: 'Product description is required',
  }),
  quantity: z.number().int().positive({
    message: 'Quantity must be a positive number',
  }),
  inStock: z.boolean().optional().default(false),
})

const productUpdateValidationSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: 'Book title is required',
    })
    .optional(),
  author: z
    .string()
    .min(1, {
      message: 'Author name is required',
    })
    .optional(),
  price: z.number().positive({
    message: 'Price must be a positive number',
  }),
  category: z
    .enum(['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'], {
      message: 'Product category is required',
    })
    .optional(),
  description: z
    .string()
    .min(1, {
      message: 'Product description is required',
    })
    .optional(),
  quantity: z.number().int().positive({
    message: 'Quantity must be a positive number',
  }),
  inStock: z.boolean().default(false).optional(),
})

export const validationSchema = {
  productValidationSchema,
  productUpdateValidationSchema,
}
