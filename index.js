import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Routes
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Swagger packages
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS BEFORE routes
app.use(cors());

// Parse JSON
app.use(express.json());

// -----------------------------
// ⭐ SWAGGER CONFIG
// -----------------------------
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "E-commerce API",
            version: "1.0.0",
            description: "API documentation for the E-commerce project"
        },
    },
    apis: ["./routes/*.js"], // <-- Swagger scans all route files
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Swagger UI Route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log("📘 Swagger docs available at: http://localhost:3000/api-docs");

// -----------------------------
// ROUTES
// -----------------------------
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/products', productRoutes);

// -----------------------------
// SERVER START
// -----------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});