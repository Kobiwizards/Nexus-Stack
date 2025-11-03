const ServiceBooking = require('../models/ServiceBooking');
const { createResponse, generateProjectId } = require('../utils/helpers');

// Create service booking
const createServiceBooking = async (req, res) => {
  try {
    const { clientInfo, serviceType, package, projectDetails, payment } = req.body;

    const serviceBooking = new ServiceBooking({
      clientInfo,
      serviceType,
      package,
      projectDetails,
      payment
    });

    await serviceBooking.save();

    res.status(201).json(
      createResponse(true, 'Service booking created successfully', {
        booking: serviceBooking
      })
    );

  } catch (error) {
    console.error('Create service booking error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to create service booking', null, error.message)
    );
  }
};

// Get all service bookings (admin only)
const getServiceBookings = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (status) query.status = status;

    const bookings = await ServiceBooking.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('assignedTeam.memberId', 'name email position');

    const total = await ServiceBooking.countDocuments(query);

    res.json(
      createResponse(true, 'Service bookings retrieved successfully', {
        bookings,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      })
    );

  } catch (error) {
    console.error('Get service bookings error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve service bookings', null, error.message)
    );
  }
};

// Get service booking by ID
const getServiceBookingById = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await ServiceBooking.findById(id)
      .populate('assignedTeam.memberId', 'name email position avatar');

    if (!booking) {
      return res.status(404).json(
        createResponse(false, 'Service booking not found')
      );
    }

    res.json(
      createResponse(true, 'Service booking retrieved successfully', {
        booking
      })
    );

  } catch (error) {
    console.error('Get service booking error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve service booking', null, error.message)
    );
  }
};

// Update service booking status
const updateServiceBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assignedTeam, milestones } = req.body;

    const booking = await ServiceBooking.findById(id);
    if (!booking) {
      return res.status(404).json(
        createResponse(false, 'Service booking not found')
      );
    }

    if (status) booking.status = status;
    if (assignedTeam) booking.assignedTeam = assignedTeam;
    if (milestones) booking.milestones = milestones;

    await booking.save();

    res.json(
      createResponse(true, 'Service booking updated successfully', {
        booking
      })
    );

  } catch (error) {
    console.error('Update service booking error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to update service booking', null, error.message)
    );
  }
};

// Add communication to service booking
const addCommunication = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, summary, details, participants } = req.body;

    const booking = await ServiceBooking.findById(id);
    if (!booking) {
      return res.status(404).json(
        createResponse(false, 'Service booking not found')
      );
    }

    booking.communications.push({
      type,
      summary,
      details,
      participants,
      date: new Date()
    });

    await booking.save();

    res.json(
      createResponse(true, 'Communication added successfully', {
        booking
      })
    );

  } catch (error) {
    console.error('Add communication error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to add communication', null, error.message)
    );
  }
};

// Get service statistics
const getServiceStatistics = async (req, res) => {
  try {
    const totalBookings = await ServiceBooking.countDocuments();
    const completedBookings = await ServiceBooking.countDocuments({ status: 'completed' });
    const inProgressBookings = await ServiceBooking.countDocuments({ status: 'in_progress' });
    
    const revenue = await ServiceBooking.aggregate([
      { $match: { 'payment.status': 'paid' } },
      { $group: { _id: null, total: { $sum: '$payment.amount' } } }
    ]);

    const serviceDistribution = await ServiceBooking.aggregate([
      { $group: { _id: '$serviceType', count: { $sum: 1 } } }
    ]);

    res.json(
      createResponse(true, 'Service statistics retrieved successfully', {
        statistics: {
          totalBookings,
          completedBookings,
          inProgressBookings,
          totalRevenue: revenue[0]?.total || 0,
          serviceDistribution
        }
      })
    );

  } catch (error) {
    console.error('Get service statistics error:', error);
    res.status(500).json(
      createResponse(false, 'Failed to retrieve service statistics', null, error.message)
    );
  }
};

module.exports = {
  createServiceBooking,
  getServiceBookings,
  getServiceBookingById,
  updateServiceBookingStatus,
  addCommunication,
  getServiceStatistics
};