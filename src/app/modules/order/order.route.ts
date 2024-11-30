import express from 'express'
import { BookOrderController } from './order.controller'

const router = express.Router()

router.post('/', BookOrderController.createOrder)
router.get('/', BookOrderController.getAllOrder)
router.get('/revenue', BookOrderController.calTotalRevenue)

export const BookOrderRouter = router
