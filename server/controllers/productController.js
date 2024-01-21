import asyncHandler from "../midllewares/asyncHandler.js"
import Product from "../models/productModel.js"
import cloudinary from "../utils/cloudinary.js"
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT; // 16 per page;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Product.countDocuments();  // number of products we have in DB;
  const { keyword } = req.query;
  const products = await Product.find({
    ...keyword ? { name: { $regex: keyword, $options: "i" } } : {},
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});
const getProductById = asyncHandler( async (req,res)=> {
    const product = await Product.findById(req.params.id)
    if(product) {
         res.status(200).json(product)
    }else {
        res.status(404).json({message: 'product not found'})
    }
})

const deleteProduct = asyncHandler( async (req,res)=> {
    const product = await Product.findById(req.params.id)
    if(product) {
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message:'product deleted'})
    }else {
        res.status(404)
        throw new Error('product not found')
    }
})
const getProductsByCategory = asyncHandler( async (req,res)=> {
   const {categoryName} = req.params;
   const products = await Product.find({category: categoryName})
   if(products) {
     res.status(200).json(products)
   }else {
     res.status(404)
     throw new Error('no product was found')
   }
})


const createReview = asyncHandler(async(req,res)=> {
  const { rating, comment} = req.body;
   const product = await Product.findById(req.params.id)
   if(product) {
       const alreadyReviewed = product.reviews.find((review)=> review.user.toString() === req.user._id.toString())
       if(alreadyReviewed) {
          res.status(400)
          throw new Error('Product already reviewed')
       }
       const review = {
          name: req.user.name,
          comment,
          rating,
          user: req.user._id
       }
       product.reviews.push(review)
       product.numReviews = product.reviews.length;
       product.rating = product.reviews.reduce((acc, review) => acc + review.rating,0) / product.reviews.length;
       await product.save()
       res.status(201).json({message: 'review Added'});
   }else {
      res.status(404)
      throw new Error('product not found')
   }
})


const createProduct = asyncHandler ( async (req,res)=> {
    const product = await new Product({
        name: 'sample name',
        user: req.user._id,
        rating: 0,
        description:'sample descrition',
        price: 0,
        countInStock: 0,
        brand: 'sample brand',
        category:'sample category',
        numReviews: 0,
        images: [
            "/images/micro_imagewhite.png",
           
            "/images/galleryImage2_blacjk-micro.jpg",
           
            "/images/imagegallery3.jpg",
        ],
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})




const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, countInStock, price, brand, category } = req.body;
  let images = [...req.body.images];
  const product = await Product.findById(req.params.id);
  
  if (product) {
    try {
      // Use Promise.all to handle multiple image uploads concurrently
      const uploadedImages = await Promise.all(images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          upload_preset: 'micro-brand'
        });
        return result.secure_url;
      }));

      product.name = name;
      product.images = uploadedImages;
      product.description = description;
      product.countInStock = countInStock;
      product.price = price;
      product.category = category;
      product.brand = brand;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading images' });
    }
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});





  
export { getProductById, getProducts, createProduct,
   deleteProduct, updateProduct, createReview , getProductsByCategory}