import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { bookServices } from './product.services'
import { ZodError } from 'zod'

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationData = await productValidationSchema.parse(req.body)

    const result = await bookServices.createProductsIntoDB(validationData)

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        name: (error.name = 'ValidationError'),
        error: error,
        Stack: error.stack,
      })
    }
    console.log(error)
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await bookServices.getAllProductsFromDB()
    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const result = await bookServices.getSingleProductsFromDB(productId)

    res.status(200).json({
      message: 'Books retrieved successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const updateSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    const updateData = req.body
    const validationData = await productValidationSchema.parse(updateData)
    const result = await bookServices.updateSingleProductsFromDB(
      productId,
      validationData
    )

    return res.status(200).json({
      message: 'Book updated successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const deleteSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params
    await bookServices.deleteSingleProductsFromDB(productId)

    res.status(200).json({
      message: 'Book deleted successfully',
      success: true,
      data: req.body,
    })
  } catch (error) {
    console.log(error)
  }
}

export const BookController = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateSingleProducts,
  deleteSingleProducts,
}
