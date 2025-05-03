import mongoose from 'mongoose';

const datasetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  format: {
    type: String,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  preview: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  seller: {
    type: String,
    required: true,
  },
  numberOfRecords: {
    type: Number,
  },
  size: {
    type: String,
  },
  license: {
    type: String,
  },
  sample: {
    type: String,
  },
});

const Dataset = mongoose.model('Dataset', datasetSchema);

export default Dataset;