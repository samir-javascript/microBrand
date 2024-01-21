import mongoose from "mongoose"; 

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
},{
    timestamps: true,
});
const ProductModel = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    images: [{
        type: Object, // Assuming the image is stored as a URL. Change the type accordingly.
        required: true
    }],
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },
    reviews:[reviewSchema],
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    }
}, {
    timestamps: true,
})

const Product = mongoose.models.Product || mongoose.model('Product', ProductModel)
export default Product;