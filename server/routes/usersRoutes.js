import  {
    getUserById,getUserProfile,getUsers,
    updateUser,updateUserProfile,deleteUser,
    registerUser,loginUser,logoutUser
} from '../controllers/userController.js'
import { protect, admin } from '../midllewares/authMiddlewere.js';
import express from 'express'
const router = express.Router()
// GET request for getting the user's profile

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

// Login route
router.route('/login').post(loginUser);

// Registration route
router.route('/register').post(registerUser);

// Routes for a specific user by ID
router
  .route('/:id')
  .get( protect, admin,  getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

// Additional routes
router.post('/logout',  logoutUser);
router.route('/').get(protect, admin, getUsers);
export default router;