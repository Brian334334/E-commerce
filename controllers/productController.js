import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

export const getAllProducts = async (req, res) => {
    try {
        const { category, search } = req.query;
        let query = {};

        // Filter by Category
        if (category) {
            query.category = category;
        }

        // Search by Name (Case-insensitive)
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        const products = await Product.find(query).sort({ createdAt: -1 });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const image = req.file ? req.file.filename : "";
        const product = await Product.create({ name, description, price, category, stock, image });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        const updatedData = { ...req.body };
        if (req.file) {
            // Delete old image if new one is uploaded
            if (product.image) {
                const oldPath = path.join('uploads', product.image);
                if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
            }
            updatedData.image = req.file.filename;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.image) {
            const imagePath = path.join('uploads', product.image);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        await product.deleteOne();
        res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};