import { isValidObjectId } from "mongoose";
import Wishlist from "../models/wishListModel.js";
import asyncHandler from '../midllewares/asyncHandler.js'

const addToWishList = asyncHandler(async (req, res) => {
  const { productId, userId } = req.body;

  if (!isValidObjectId(productId)) {
    return res.status(403).json({ error: 'Invalid product ID' });
  }

  try {
    const wishlist = await Wishlist.findOne({ userId, products: productId });
       /* if wishlist exists then remove it */
    if (wishlist) {
      await Wishlist.findByIdAndUpdate(wishlist._id, { $pull: { products: productId } });
    } else {
      await Wishlist.findOneAndUpdate(
        { userId },
        { $push: { products: productId } },
        { upsert: true }
      );
    }

    res.status(200).json({ message: 'Product added to wishlist successfully' });
  } catch (error) {
    console.error(error);
    res.status(500)
    throw new Error('Not authorized')
  }
});

 const getWishlistProduct = asyncHandler(async (req, res) => {
  if(!isValidObjectId(req.user._id))  {
      res.status(403)
      throw new Error('Invalid user ID')
  }
    try {
       
      const wishlist = await Wishlist.findOne({ userId: req.user._id })
        .populate({
          path: 'products',
        })
        .sort({ createdAt: -1 });
  
      
        res.status(200).json(wishlist);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  

  const removeFromWishlist = asyncHandler(async (req, res) => {
     const { productId, userId } = req.body;
     if(!isValidObjectId(productId)) {
         res.status(403)
         throw new Error('Invalid object ID')
     }
    try {
        const wishlist = await Wishlist.findOne({userId, products: productId})
        if(wishlist) {
             await Wishlist.findByIdAndUpdate(wishlist._id, { $pull: { products: productId}});
             res.status(200).json({message: 'product deleted from wishlist successfuly'})
        }else {
            // If the product is not in the wishlist, return an error
            res.status(404).json({ error: 'Product not found in wishlist' });
          }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  
  export {  getWishlistProduct, addToWishList, removeFromWishlist }
  