import { getProductById, getProducts, createProduct , createReview, deleteProduct, updateProduct, getProductsByCategory} from "../controllers/productController.js";

import express from 'express'
import { protect, admin } from "../midllewares/authMiddlewere.js";

const router = express.Router()
router.route('/').get(getProducts)
router.route('/:id').get(getProductById).delete(protect, admin,deleteProduct ).put(protect, admin,updateProduct )
router.route('/').post(protect, admin,  createProduct)
router.route('/:id/reviews').post(protect, createReview)
router.route('/category/:categoryName').get(getProductsByCategory)
export default router;