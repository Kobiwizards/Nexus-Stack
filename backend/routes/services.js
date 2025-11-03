const express = require('express');
const router = express.Router();
const {
  createServiceBooking,
  getServiceBookings,
  getServiceBookingById,
  updateServiceBookingStatus,
  addCommunication,
  getServiceStatistics
} = require('../controllers/serviceController');
const { auth, adminAuth } = require('../middleware/auth');

// Public routes
router.post('/bookings', createServiceBooking);

// Admin routes
router.get('/bookings', auth, adminAuth, getServiceBookings);
router.get('/bookings/:id', auth, adminAuth, getServiceBookingById);
router.put('/bookings/:id/status', auth, adminAuth, updateServiceBookingStatus);
router.post('/bookings/:id/communication', auth, adminAuth, addCommunication);
router.get('/statistics', auth, adminAuth, getServiceStatistics);

module.exports = router;