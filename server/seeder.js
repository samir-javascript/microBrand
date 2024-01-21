import  { connectToDb } from './config/db.js'
import Order from './models/orderModel.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import  products from './info/products.js'
import user from './users.js'
import dotenv from 'dotenv'
dotenv.config()
connectToDb()
const importData = async () => {
    try {
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
      
        const createdUsers = await User.insertMany(user);
        const adminUser = createdUsers[0]._id;
        
        // Create sample Cart data (adjust the structure as per your Cart model)
       
      // Insert sample Cart data

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        await Product.insertMany(sampleProducts);
        
        console.log('data imported');
        process.exit();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};


const destroyData = async () => {
    try {
      await Order.deleteMany();
      await Product.deleteMany();
      await User.deleteMany();
     
      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  };
  
  if (process.argv[2] === '-d') {
    destroyData();
  } else {
    importData();
  }