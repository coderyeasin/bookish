import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { BookProductsRouter } from './app/modules/product/product.route'

const app: Application = express()

// parsers
app.use(express.json())
app.use(cors())

// APIs -Routes
app.use('/api/products', BookProductsRouter)

// initial message for users
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Bookish - to buy any books',
  })
})

// Error Handle for unused route
app.all('*', (req: Request, res: Response) => {
  res.status(200).json({
    success: false,
    message: 'Route Not Found',
  })
})

export default app
