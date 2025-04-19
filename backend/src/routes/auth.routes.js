import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '../middleware/validate.js';
import User from '../models/postgresql/User.js';

const router = express.Router();

// Admin login
router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  validateRequest
], async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin user
    const user = await User.findOne({
      where: {
        email,
        role: 'admin',
        isActive: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { 
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Return user info and token
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get current admin user
router.get('/me', async (req, res) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find admin user
    const user = await User.findOne({
      where: {
        id: decoded.id,
        role: 'admin',
        isActive: true
      },
      attributes: ['id', 'email', 'firstName', 'lastName', 'role'] // Exclude sensitive data
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Auth error:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router; 