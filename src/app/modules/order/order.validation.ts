import { z } from 'zod'

const ordersSchema = z.object({
  email: z.string().email().min(1),
  product: z.string().min(1),
  quantity: z.number().int().positive(),
  totalPrice: z.number().int().positive(),
})

export default ordersSchema
