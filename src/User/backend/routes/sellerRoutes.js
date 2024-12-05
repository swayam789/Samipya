const express = require('express');
const router = express.Router();
const UserProfile = require('../models/S_UserProfile');
const Product = require('../../../Shared/backend/models/Product');

router.get('/api/sellers/:id', async (req, res) => {
    try {
        const seller = await UserProfile.findOne({ 
            $or: [
                { _id: req.params.id },
                { userId: req.params.id }
            ]
        });

        if (!seller) {
            return res.status(404).json({ message: 'Seller not found' });
        }

        res.json(seller);
    } catch (error) {
        console.error('Error fetching seller:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add new route for fetching seller's products
router.get('/api/products/seller/:id', async (req, res) => {
    try {
        console.log('Fetching products for seller ID:', req.params.id);
        
        const products = await Product.find({
            $or: [
                { seller: req.params.id },
                { sellerId: req.params.id }
            ]
        }).sort('-createdAt');

        console.log(`Found ${products.length} products for seller`);
        res.json(products);
    } catch (error) {
        console.error('Error fetching seller products:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;