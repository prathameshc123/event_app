const Registration = require('../models/Registration');

// @desc    Create a new registration
// @route   POST /api/registrations
// @access  Private
const createRegistration = async (req, res) => {
  const { fullName, email, phone, organization, eventName, registrationType, notes } = req.body;

  try {
    if (!fullName || !email || !phone || !organization || !eventName || !registrationType) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const registration = await Registration.create({
      user: req.user.id,
      fullName,
      email,
      phone,
      organization,
      eventName,
      registrationType,
      notes: notes || '',
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful!',
      registration,
    });
  } catch (error) {
    console.error('Create registration error:', error.message);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
};

// @desc    Get all registrations for logged-in user
// @route   GET /api/registrations
// @access  Private
const getRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: registrations.length, registrations });
  } catch (error) {
    console.error('Get registrations error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Get single registration
// @route   GET /api/registrations/:id
// @access  Private
const getRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied. Not your registration.' });
    }

    res.status(200).json({ success: true, registration });
  } catch (error) {
    console.error('Get registration error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Update registration
// @route   PUT /api/registrations/:id
// @access  Private
const updateRegistration = async (req, res) => {
  try {
    let registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied. Not your registration.' });
    }

    registration = await Registration.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ success: true, message: 'Registration updated successfully.', registration });
  } catch (error) {
    console.error('Update registration error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Delete registration
// @route   DELETE /api/registrations/:id
// @access  Private
const deleteRegistration = async (req, res) => {
  try {
    const registration = await Registration.findById(req.params.id);

    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found.' });
    }

    if (registration.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Access denied. Not your registration.' });
    }

    await Registration.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Registration deleted successfully.' });
  } catch (error) {
    console.error('Delete registration error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

// @desc    Search registrations
// @route   GET /api/registrations/search?query=
// @access  Private
const searchRegistrations = async (req, res) => {
  const { query } = req.query;

  try {
    if (!query) {
      return res.status(400).json({ success: false, message: 'Search query is required.' });
    }

    const registrations = await Registration.find({
      user: req.user.id,
      $or: [
        { fullName: { $regex: query, $options: 'i' } },
        { eventName: { $regex: query, $options: 'i' } },
        { organization: { $regex: query, $options: 'i' } },
        { registrationType: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: registrations.length, registrations });
  } catch (error) {
    console.error('Search error:', error.message);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
};

module.exports = {
  createRegistration,
  getRegistrations,
  getRegistration,
  updateRegistration,
  deleteRegistration,
  searchRegistrations,
};
