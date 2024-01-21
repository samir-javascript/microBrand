import { 
    getAllOrders,
    getMyOrders, 
    getOrderByID,
     updateToPaid,
      updateToDeliver,
       addOrderItems
}
from '../controllers/orderController.js'
import express from 'express'
import { admin, protect} from '../midllewares/authMiddlewere.js'
const router = express.Router()
router.route('/').post(protect, addOrderItems)
router.route('/myorders').get(protect,getMyOrders)
router.route('/:id').get(protect,getOrderByID)
router.route('/:id/pay').put(protect,updateToPaid)
router.route('/:id/deliver').put(protect,updateToDeliver)
router.route('/').get(protect, admin, getAllOrders)
export default router;