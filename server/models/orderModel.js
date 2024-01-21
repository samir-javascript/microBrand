import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    // this is the user that holds the cart,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    // these are the products inside the cart
    orderItems: [
        {
            name: { type: String, },
            price: { type: Number, },
            qty: { type: Number, },
            images: [ {type: String,}] ,
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
           
        }
    ],
    shippingAddress: {
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        address: { type: String, required: true }
    },
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    itemsPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        default: 0.0,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false,
        required: true
    },
    paidAt: {
        type: Date,
    },
    deliveredAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
        required: true
    },
}, {
    timestamps: true
});

const Order = mongoose.models.Order || mongoose.model('Order', OrderSchema);
export default Order;
