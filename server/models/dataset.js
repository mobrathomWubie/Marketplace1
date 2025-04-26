const mongoose = require('mongoose');

const datasetSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Agriculture', 'Health', 'Education', 'Economy', 'Demographics', 'Environment']
  },
  dataTypes: {
    type: [String], // Array of strings like ['CSV', 'JSON', 'Images']
    required: true
  },
  size: {
    type: Number, // Size in bytes
    required: true
  },
  sampleDataLink: { type: String }, // Optional link to sample data
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, default: 0, min: 0, max: 5 }, // Dataset rating from 0 to 5
  reviews: [{ type: String }], // Array of review texts
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' }, // Add a default value
  isApproved: { type: Boolean, default: false }, // Add a default value
  downloads: { type: Number, default: 0 }, // Add a default value
}, { timestamps: true });

module.exports = mongoose.model('Dataset', datasetSchema);