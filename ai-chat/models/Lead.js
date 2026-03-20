const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },
    intention: {
      type: String,
      required: true,
      enum: ['quote', 'hire', 'pricing', 'automation', 'devops', 'website', 'general'],
      default: 'general',
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

module.exports = mongoose.model('Lead', LeadSchema);
