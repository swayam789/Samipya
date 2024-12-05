const express = require('express');
const mongoose = require('mongoose');
const { handleUpload } = require('../config/gridfs');
const UserProfile = require('../models/UserProfile');

const router = express.Router();
let gfs;

mongoose.connection.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: 'uploads'
    });
});

router.post('/upload-profile-image', handleUpload, async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const userId = req.body.userId;
        const imagePath = req.file.filename;

        console.log('File uploaded:', req.file); // Debug log

        const userProfile = await UserProfile.findOneAndUpdate(
            { userId: userId },
            { profileImage: imagePath },
            { new: true }
        );

        if (!userProfile) {
            // If profile not found, delete the uploaded file
            if (gfs && req.file.id) {
                await gfs.delete(new mongoose.Types.ObjectId(req.file.id));
            }
            return res.status(404).json({ error: 'User profile not found' });
        }

        res.json({ 
            imagePath: imagePath,
            message: 'Image uploaded successfully' 
        });
    } catch (error) {
        console.error('Error uploading profile image:', error);
        if (gfs && req.file && req.file.id) {
            await gfs.delete(new mongoose.Types.ObjectId(req.file.id));
        }
        res.status(500).json({ error: 'Error uploading image' });
    }
});

// Add route to serve images
router.get('/image/:filename', async (req, res) => {
    try {
        const file = await gfs.find({ filename: req.params.filename }).toArray();
        if (!file || file.length === 0) {
            return res.status(404).json({ error: 'Image not found' });
        }

        const readStream = gfs.openDownloadStreamByName(req.params.filename);
        readStream.pipe(res);
    } catch (error) {
        console.error('Error retrieving image:', error);
        res.status(500).json({ error: 'Error retrieving image' });
    }
});
    // for finding seller location
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
                latitude: 0,
                longitude: 0,
                isDefault: true
            });
        }
        
        console.log('Found seller profile:', sellerProfile);
        res.json({
            location: sellerProfile.location || sellerProfile.address || 'No address available',
            latitude: sellerProfile.latitude || 0,
            longitude: sellerProfile.longitude || 0,
            isDefault: true
        });
    } catch (error) {
        console.error('Error in seller location route:', error);
        res.status(500).json({ message: 'Error fetching seller location' });
    }
});


module.exports = router; 