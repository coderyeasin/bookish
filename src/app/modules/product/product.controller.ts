import { Request, Response } from 'express'
import productValidationSchema from './product.validation'
import { BookServices } from './product.services'

const createProduct = async (req: Request, res: Response) => {
  try {
    const validationData = await productValidationSchema.safeParse(req.body)
    if (!validationData.success) {
      const errorMessages = validationData.error.errors.map(issue => ({
        name: 'ValidationError',
        errors: {
          error: issue,
          path: issue.path.join('.'),
          message: issue.message,
        },
      }))
      return res.status(400).json({
        message: 'Validation failed',
        success: false,
        error: errorMessages,
        Stack: validationData.error.stack,
      })
    }
    const result = await BookServices.createProductsIntoDB(validationData.data)

    res.status(200).json({
      message: 'Book created successfully',
      success: true,
      data: result,
    })
  } catch (error) {
    console.log(error)
  }
}

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await BookServices.getAllProductsFromDB()
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
    const result = await BookServices.getSingleProductsFromDB(productId)

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
    const result = await BookServices.updateSingleProductsFromDB(
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
    await BookServices.deleteSingleProductsFromDB(productId)

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
