const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile');

// Get all user profiles
router.get('/', async (req, res) => {
  try {
    const userProfiles = await UserProfile.find();
    res.json(userProfiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single user profile
router.get('/:id', async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) return res.status(404).json({ message: 'User profile not found' });
    res.json(userProfile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create user profile
router.post('/', async (req, res) => {
  const userProfile = new UserProfile(req.body);
  try {
    const newUserProfile = await userProfile.save();
    res.status(201).json(newUserProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const updatedProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete user profile
router.delete('/:id', async (req, res) => {
  try {
    await UserProfile.findByIdAndDelete(req.params.id);
    res.json({ message: 'User profile deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;