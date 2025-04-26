const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  datasetIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dataset',
  }],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;