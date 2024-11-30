import { Order } from './order.interface'
import { OrderModel } from './order.model'

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order)
  return result
}

const getAllOrderFromDB = async () => {
  const result = await OrderModel.find()
  return result
}

const calculateRevenue = async () => {
  try {
    const result = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: '$totalPrice',
          },
        },
      },
    ])
    return result.length > 0 ? result[0].totalRevenue : 0
  } catch (error) {
    console.log('Can not get Revenue', error)
  }
}

export const BookOrdersServices = {
  createOrderIntoDB,
  getAllOrderFromDB,
  calculateRevenue,
}
