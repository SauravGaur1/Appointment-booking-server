const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  slotId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true,
    unique: true,
  },
  professionalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  }
}, { versionKey: false });

bookingSchema.index({ professionalId: 1 });
bookingSchema.index({ slotId: 1 }, { unique: true });

module.exports = mongoose.model('Booking', bookingSchema);