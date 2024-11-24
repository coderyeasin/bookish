import express from 'express'
import { BookController } from './product.controller'

const router = express.Router()

router.post('/', BookController.createProduct)
router.get('/', BookController.getAllProducts)
router.get('/:productId', BookController.getSingleProducts)
router.put('/:productId', BookController.updateSingleProducts)
router.delete('/:productId', BookController.deleteSingleProducts)

export const BookProductsRouter = router
