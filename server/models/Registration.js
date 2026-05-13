const mongoose = require('mongoose');

const RegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    organization: {
      type: String,
      required: [true, 'College/Organization is required'],
      trim: true,
    },
    eventName: {
      type: String,
      required: [true, 'Event name is required'],
      trim: true,
    },
    registrationType: {
      type: String,
      required: [true, 'Registration type is required'],
      enum: ['Individual', 'Group', 'Team', 'VIP', 'Student', 'Professional'],
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Registration', RegistrationSchema);
