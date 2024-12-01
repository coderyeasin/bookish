import { Request, Response } from 'express'

import ordersSchema from './order.validation'
import { ProductModel } from '../product/product.model'
import { BookOrdersServices } from './order.services'

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body
    const productsData = await ProductModel.findById(orderData.product)
    if (!productsData) {
      res.status(404).json({
        success: false,
        message: 'Product ID is not matched',
      })
      return
    }
    if (orderData.quantity > productsData.quantity) {
      res.status(400).json({
        success: false,
        message: 'Insufficient quantity available in inventory',
      })
      return
    }

    productsData.quantity -= orderData.quantity

    if (productsData.quantity === 0) {
      productsData.inStock = false
    }

    await productsData.save()

    const orderValidationData = await ordersSchema.parse(orderData)
    const result =
      await BookOrdersServices.createOrderIntoDB(orderValidationData)
    res.status(200).json({
      message: 'Order created successfully!',
      success: true,
      data: result,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: 'An error occurred while creating the order.',
    })
  }
}

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await BookOrdersServices.getAllOrderFromDB()
    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully!',
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const calTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await BookOrdersServices.calculateRevenue()
    res.status(200).json({
      success: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    })
  } catch (error) {
    console.log(error)
  }
}

export const BookOrderController = {
  createOrder,
  getAllOrder,
  calTotalRevenue,
}
