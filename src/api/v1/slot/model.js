const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: { type: String, required: true },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'cancelled'],
    default: 'available',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

slotSchema.index({ ownerId: 1, startTime: 1 });

module.exports = mongoose.model('Slot', slotSchema);
