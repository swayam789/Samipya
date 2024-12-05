const express = require('express');
const router = express.Router();
const UserProfile = require('../models/S_UserProfile');

router.get('/api/seller-location/:sellerId', async (req, res) => {
    try {
        console.log('Looking for seller ID:', req.params.sellerId);
        
        let sellerProfile;
        try {
            sellerProfile = await UserProfile.findOne({ 
                $or: [
                    { _id: req.params.sellerId },
                    { userId: req.params.sellerId }
                ]
            });
        } catch (findError) {
            console.log('Error finding seller:', findError.message);
        }
        
        if (!sellerProfile) {
            console.log('Seller profile not found for ID:', req.params.sellerId);
            return res.json({
                location: 'Location not available',
                latitude: 20.2961,
                longitude: 85.8245,
                isDefault: true
            });
        }
        
        console.log('Found seller profile:', sellerProfile);
        res.json({
            location: sellerProfile.location || sellerProfile.address || 'No address available',
            latitude: sellerProfile.latitude || 20.2961,
            longitude: sellerProfile.longitude || 85.8245,
            isDefault: false
        });
    } catch (error) {
        console.error('Error in seller location route:', error);
        res.status(500).json({ message: 'Error fetching seller location' });
    }
});

module.exports = router; 