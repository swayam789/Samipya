const User = require('../models/User');
const UserProfile = require('../models/UserProfile');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controller methods
const register = async (req, res) => {
  try {
    const { 
      email, 
      password, 
      username, 
      shopName, 
      location, 
      latitude, 
      longitude, 
      landmarks, 
      contact, 
      description, 
      profileImage 
    } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ email, password, username });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    // Create user profile
    const userProfile = new UserProfile({
      userId: user._id,
      username,
      email,
      shopName,
      location,
      latitude,
      longitude,
      landmarks,
      contact,
      description,
      profileImage
    });
    await userProfile.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(201).json({ token, user: { ...user.toObject(), profile: userProfile.toObject() } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;
    
    // Find user by email or username in S_Users collection
    const user = await User.findOne({
      $or: [
        { email: emailOrUsername },
        { username: emailOrUsername }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Get user profile from S_UserProfile collection
    const userProfile = await UserProfile.findOne({ userId: user._id });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Combine user data with profile data
    const userData = {
      _id: user._id,
      email: user.email,
      username: user.username,
      ...(userProfile ? userProfile.toObject() : {})
    };

    res.json({ 
      token,
      user: userData
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error during login' });
  }
};

module.exports = {
  register,
  login
}; 