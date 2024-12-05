const Product = require('../../../Shared/backend/models/Product');
const UserProfile = require('../models/S_UserProfile');

/**
 * Search Products Controller
 * Finds products based on search query and location coordinates
 * Uses MongoDB's geospatial queries to find nearby sellers
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.query - Query parameters
 * @param {string} req.query.query - Search term for products
 * @param {string} req.query.latitude - Latitude coordinate
 * @param {string} req.query.longitude - Longitude coordinate
 * @param {Object} res - Express response object
 */
exports.searchProducts = async (req, res) => {
    try {
        const { query, latitude, longitude } = req.query;
        
        if (!query || !latitude || !longitude) {
            return res.status(400).json({ 
                error: 'Missing required parameters'
            });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        console.log('Search parameters:', { query, lat, lon });

        // Find nearby sellers
        const nearbyProfiles = await UserProfile.aggregate([
            {
                $match: {
                    latitude: { 
                        $gte: lat - 5,
                        $lte: lat + 5
                    },
                    longitude: {
                        $gte: lon - 5,
                        $lte: lon + 5
                    }
                }
            }
        ]);

        console.log('Found nearby profiles:', nearbyProfiles.length);

        if (!nearbyProfiles.length) {
            return res.json([]);
        }

        // Extract seller IDs
        const sellerIds = nearbyProfiles.map(profile => profile._id);
        console.log('Seller IDs:', sellerIds);

        // // Search in products collection
        // const products = await Product.find({
        //     sellerId: { $in: sellerIds },  // Changed from seller to sellerId
        //     name: { $regex: query, $options: 'i' },
        //     stock: { $gt: 0 }
        // });
        const products = await Product.aggregate([
            {
                $search: {
                    index: 'aa',
                    text: {
                        query: query,
                        path: ['name', 'description'],
                        fuzzy: { maxEdits: 2 },
                    },
                },
            },
            { $match: { sellerId: { $in: sellerIds }, stock: { $gt: 0 } } },
            { $limit: 20 }
        ]);// <-- Add .lean() here to return plain JavaScript objects
        
        console.log('Found products:', products.length);
        // Add distance information
        const productsWithDistance = products.map(product => {
            const sellerProfile = nearbyProfiles.find(
                profile => profile.userId.toString() === product.sellerId.toString()
            );
            return {
                ...product,
                distance: sellerProfile ? sellerProfile.distance * 111.12 : null
            };
        });

        res.json(productsWithDistance);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            error: 'Failed to search products',
            details: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

exports.getSellerProducts = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const products = await Product.find({ seller: sellerId })
      .sort('-createdAt');
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 