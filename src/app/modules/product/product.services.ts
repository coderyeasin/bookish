import { IProduct } from './product.interface'
import { ProductModel } from './product.model'

// Books-Products
const createProductsIntoDB = async (product: IProduct) => {
  const result = await ProductModel.create(product)
  return result
}

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find()
  return result
}

const getSingleProductsFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id })
  return result
}

const updateSingleProductsFromDB = async (
  id: string,
  productData: IProduct,
) => {
  const filterId = { _id: id }
  const options = { new: true }
  const updateDoc = {
    $set: {
      title: productData.title,
      author: productData.author,
      price: productData.price,
      category: productData.category,
      description: productData.description,
      quantity: productData.quantity,
      inStock: productData.inStock,
      timestamps: { createdAt: false },
    },
  }

  const result = await ProductModel.findOneAndUpdate(
    filterId,
    updateDoc,
    options,
  )
  return result
}
const deleteSingleProductsFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id })
  return result
}

export const BookServices = {
  createProductsIntoDB,
  getAllProductsFromDB,
  getSingleProductsFromDB,
  updateSingleProductsFromDB,
  deleteSingleProductsFromDB,
}
