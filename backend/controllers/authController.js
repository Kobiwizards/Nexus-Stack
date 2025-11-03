const User = require('../models/User');
const { createResponse, isValidEmail } = require('../utils/helpers');

// Register new admin/user
const register = async (req, res) => {
  try {
    const { name, email, password, position, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(
        createResponse(false, 'User with this email already exists')
      );
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json(
        createResponse(false, 'Please provide a valid email address')
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      position,
      role: role || 'developer'
    });

    await user.save();

    // Generate auth token
    const token = user.generateAuthToken();

    res.status(201).json(
      createResponse(true, 'User registered successfully', {
        user: user.toJSON(),
        token
      })
    );

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to register user', null, error.message)
    );
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json(
        createResponse(false, 'Invalid email or password')
      );
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json(
        createResponse(false, 'Invalid email or password')
      );
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate auth token
    const token = user.generateAuthToken();

    res.json(
      createResponse(true, 'Login successful', {
        user: user.toJSON(),
        token
      })
    );

  } catch (error) {
    console.error('Login error:', error);
    if (error.message === 'Account is temporarily locked due to too many failed login attempts') {
      return res.status(423).json(
        createResponse(false, error.message)
      );
    }
    res.status(500).json(
      createResponse(false, 'Failed to login', null, error.message)
    );
  }
};

// Get current user profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    res.json(
      createResponse(true, 'Profile retrieved successfully', {
        user: user.toJSON()
      })
    );

  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve profile', null, error.message)
    );
  }
};

// Update user profile
const updateProfile = async (req, res) => {
  try {
    const { name, position, bio, skills, socialLinks, avatar } = req.body;
    
    const user = await User.findById(req.user.id);
    
    if (name) user.name = name;
    if (position) user.position = position;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;
    if (socialLinks) user.socialLinks = socialLinks;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json(
      createResponse(true, 'Profile updated successfully', {
        user: user.toJSON()
      })
    );

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to update profile', null, error.message)
    );
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id);
    
    // Verify current password
    const isCurrentPasswordValid = await user.comparePassword(currentPassword);
    if (!isCurrentPasswordValid) {
      return res.status(400).json(
        createResponse(false, 'Current password is incorrect')
      );
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json(
      createResponse(true, 'Password changed successfully')
    );

  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to change password', null, error.message)
    );
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword
};