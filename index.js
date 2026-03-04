
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS BEFORE routes
app.use(cors());

// Parse JSON
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
// Serve images from uploads
app.use('/uploads', express.static('uploads'));

// Use API routes (required by assignment)
app.use('/products', productRoutes);

// Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});