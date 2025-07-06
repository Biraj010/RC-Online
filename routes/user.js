/**
 * User routes
 * Handles user-specific operations and data access
 */

const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

/**
 * @route   GET /api/user/data
 * @desc    Get user-specific data
 * @access  Private (authenticated users only)
 */
router.get('/data', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Sample user data - replace with actual user-specific data
    const userData = {
      profile: user,
      dashboard: {
        totalOrders: 0,
        pendingOrders: 0,
        completedOrders: 0,
        favoriteItems: []
      },
      recentActivity: [],
      settings: {
        notifications: true,
        darkMode: false,
        language: 'en'
      }
    };

    res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      data: userData
    });

  } catch (error) {
    console.error('Get user data error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving user data',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   PUT /api/user/profile
 * @desc    Update user profile
 * @access  Private (authenticated users only)
 */
router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.userId;

    // Check if new email/username already exists (excluding current user)
    if (email || username) {
      const existingUser = await User.findOne({
        $and: [
          { _id: { $ne: userId } },
          {
            $or: [
              ...(email ? [{ email }] : []),
              ...(username ? [{ username }] : [])
            ]
          }
        ]
      });

      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Email or username already exists'
        });
      }
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...(username && { username }),
        ...(email && { email }),
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { user: updatedUser }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating profile',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * @route   GET /api/user/orders
 * @desc    Get user's orders
 * @access  Private (authenticated users only)
 */
router.get('/orders', auth, async (req, res) => {
  try {
    // Sample orders data - replace with actual order retrieval logic
    const orders = [
      {
        id: 'order_001',
        status: 'pending',
        total: 99.99,
        items: 3,
        createdAt: new Date(),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: {
        orders,
        total: orders.length
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving orders',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;