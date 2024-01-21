import express from 'express'
import { removeFromWishlist, addToWishList, getWishlistProduct } from '../controllers/wishListController.js'
import { protect } from '../midllewares/authMiddlewere.js'
const router = express.Router()
router.route('/').post( protect, addToWishList)
router.route('/').get(protect, getWishlistProduct)
router.route('/').delete(protect, removeFromWishlist)
export default router;