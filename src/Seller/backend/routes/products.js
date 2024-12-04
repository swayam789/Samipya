const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { handleUpload } = require('../config/gridfs');
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');

// Get all products
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all products...');
    const products = await Product.find()
      .populate('sellerId', 'shopName email')
      .sort({ createdAt: -1 });
    console.log('Products fetched:', products.length);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get product image
router.get('/image/:filename', async (req, res) => {
  try {
    const filepath = path.join(__dirname, '..', 'uploads', req.params.filename);
    console.log('Attempting to send file:', filepath);
    
    // Check if file exists
    if (!fs.existsSync(filepath)) {
      console.log('File not found:', filepath);
      return res.status(404).json({ message: 'Image not found' });
    }
    
    res.sendFile(filepath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending image' });
      }
    });
  } catch (err) {
    console.error('Error in image route:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product with image
router.post('/', handleUpload, async (req, res) => {
  try {
    console.log('=== DEBUG INFO ===');
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('MongoDB Connection State:', mongoose.connection.readyState);
    console.log('================');

    // Check if any data was received
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'No data received' });
    }

    // Create product data object first
    const productData = {
      name: req.body.name,
      stock: parseInt(req.body.stock),
      price: parseFloat(req.body.price),
      category: req.body.category,
      description: req.body.description,
      sellerId: req.body.sellerId,
      seller: JSON.parse(req.body.seller)
    };

    // Validate required fields after data processing
    const requiredFields = ['name', 'stock', 'price', 'category', 'description', 'sellerId'];
    const missingFields = requiredFields.filter(field => {
      const value = productData[field];
      return value === undefined || value === null || value === '';
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Add image path if file was uploaded
    if (req.file) {
      productData.imagePath = req.file.filename;
    }

    console.log('Creating product with data:', productData);

    // Create and save the product
    const product = new Product(productData);
    
    // Add this debug log
    console.log('Product model:', product);
    
    const savedProduct = await product.save();
    console.log('Product saved successfully:', savedProduct);
    
    res.status(201).json(savedProduct);

  } catch (error) {
    console.error('Error creating product:', error);
    console.error('Error details:', error.errors || error);
    res.status(400).json({ message: error.message });
  }
});

// Update product
router.put('/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all products for a seller
router.get('/seller/:sellerId', async (req, res) => {
  try {
    console.log('Fetching products for seller:', req.params.sellerId);
    const products = await Product.find({ sellerId: req.params.sellerId })
      .populate('sellerId', 'shopName email')
      .sort({ createdAt: -1 });
    console.log('Products fetched:', products.length);
    res.json(products);
  } catch (err) {
    console.error('Error fetching seller products:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    console.log('Fetching product:', req.params.id);
    const product = await Product.findById(req.params.id)
      .populate('sellerId', 'shopName email');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    console.log('Product fetched:', product);
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 