import Order from '../models/orderModel.js'

import asyncHandler from '../midllewares/asyncHandler.js'
 // create order 
// POST REQUEST
// PRIVATE FOR ONLY LOGGED IN USERS
const addOrderItems =  asyncHandler( async (req,res)=> {
   const {
      shippingAddress,
      taxPrice,
      totalPrice,
      shippingPrice,
      itemsPrice,
      orderItems,
      paymentMethod,
   } = req.body;
   if(orderItems && orderItems.length === 0) {
      res.status(400)
      throw new Error('no order items');
   }else  {
       const order =  new Order({
          orderItems: orderItems.map(x => ({
             ...x,
             product: x._id,
             _id: undefined
          })),
          user: req.user._id,
          shippingAddress,
          taxPrice,
          totalPrice,
          paymentMethod,
          itemsPrice,
          shippingPrice,
       })
       const createdOrder = await order.save()
       res.status(201).json(createdOrder)
   }
}
)
 // GET LOGGED IN USER'D ORDERS
// GET REQUEST
// PRIVATE FOR ONLY LOGGED IN USERS
const getMyOrders = asyncHandler (async (req,res)=> {
   const orders = await Order.find({user:req.user._id})
   if(orders) {
     res.status(200).json(orders)
   }else {
     res.status(404)
     throw new Error('No order found')
   }
})

 // GET ALL ORDERS THAT HAVE BEEN MADE IN THE STORE
// GET REQUEST
// PRIVATE FOR ADMIN USERS
const getAllOrders = async (req,res)=> {
   const orders = await Order.find({}).populate('user', 'id name')
   if(orders) {
      res.status(200).json(orders)
   }else {
      res.status(404)
      throw new Error('Orders not found')
   }
}

 // GET ORDERS BY ID
// GET REQUEST
// PRIVATE FOR ADMIN USERS
const getOrderByID = asyncHandler (async (req,res)=> {
   const order = await Order.findById(req.params.id).populate({
      path: 'orderItems.product',
      model: 'Product',
    }).populate(
     'user', 'name email'
    )
   if(order) {
      res.status(200).json(order)
   }else {
      res.status(404)
      throw new Error('No order found')
   }
})

 // UPDATE ORDER TO PAID
// PUT REQUEST

const updateToPaid = async (req,res)=> {
   const order = await Order.findById(req.params.id)
   if(order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
         id: req.body.id,
         status: req.body.status,
         update_time: req.body.update_time,
         email_address: req.body.payer.email_address,
       };
       const updatedOrder = await order.save()
       res.status(200).json(updatedOrder)
   }else {
       res.status(404)
       throw new Error('Order not found')
   }
}

 // UPDATE ORDER TO DELIVERD
// PUT REQUEST
// PRIVATE FOR ADMIN USERS
const updateToDeliver = async (req,res)=> {
   const order = await Order.findById(req.params.id)
   if(order) {
       order.isDelivered = true;
       order.deliveredAt = Date.now();
       const updatedOrder = await order.save()
       res.status(200).json(updatedOrder)
   }else {
      res.status(404)
      throw new Error('Order not found')
   }
}

export {
    getAllOrders,
    getMyOrders, 
    getOrderByID,
    updateToPaid,
    updateToDeliver,
    addOrderItems
}