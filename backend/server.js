import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

const port = process.env.PORT || 8000;

connectDB() // Connect to mongodb

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.use('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
});

// router.put('/products/:productId/decrement', async (req, res) => {
//     const productId = req.params.productId;
//     const { qty } = req.body;
  
//     try {
//       // Find the product by its ID
//       const product = await Product.findById(productId);
  
//       if (!product) {
//         return res.status(404).json({ message: 'Product not found' });
//       }
  
//       // Decrement the product quantity
//       product.countInStock -= qty;
  
//       // Save the updated product
//       await product.save();
  
//       res.json({ message: 'Product quantity decremented successfully', product });
//     } catch (error) {
//       console.error('Error decrementing product quantity:', error);
//       res.status(500).json({ message: 'Internal server error' });
//     }
//   });

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))