import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import productsRoutes from './routes/productsRoutes.js'

import usersRoutes from './routes/usersRoutes.js'
import ordersRoutes from './routes/ordersRoutes.js'
import wishlistRoutes from './routes/wishlistRoutes.js'
import verifyTokenRoutes from './routes/verifyTokenRoutes.js'
import { connectToDb } from './config/db.js'
import { errorHandler, notFound } from './midllewares/errorMiddleware.js'
const app = express()
dotenv.config()

app.use(express.json({ limit: '100mb' })); 
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    limit: '100mb',
    extended: true
    }));

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: '*' }));
const PORT = 5000;
 connectToDb()
app.get('/', async(req,res)=> {
    res.send('api is running succesufylly')
});
app.use('/api/products',productsRoutes )
app.use('/api/users', usersRoutes)
app.use('/api/add-to-wishlist', wishlistRoutes)
app.use('/api/verifyToken', verifyTokenRoutes)
app.use('/api/orders', ordersRoutes )

app.get('/api/config/paypal', (req,res)=> {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})
app.use(notFound)
app.use(errorHandler)
app.listen(PORT, ()=> console.log(`api is running port on ${PORT}`))