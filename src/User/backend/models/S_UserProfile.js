const mongoose = require('mongoose');

const S_UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  shopName: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  }
}, { 
  timestamps: true,
  collection: 'S_UserProfile'  // Explicitly set collection name
});

// Create the 2dsphere index for geospatial queries
S_UserProfileSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('S_UserProfile', S_UserProfileSchema);