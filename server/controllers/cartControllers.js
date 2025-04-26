const Cart = require('../models/Cart');
const Dataset = require('../models/dataset');

// Add a dataset to the cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user info in req.user from authentication middleware
    const datasetId = req.body.datasetId;

    // Check if the dataset exists
    const dataset = await Dataset.findById(datasetId);
    if (!dataset) {
      return res.status(404).json({ message: 'Dataset not found' });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if the dataset is already in the cart
    const existingItem = cart.items.find(item => item.datasetId.toString() === datasetId);
    if (existingItem) {
        return res.status(400).json({ message: 'Dataset is already in the cart' });
    }
    // Add the dataset to the cart
    cart.items.push({ datasetId });
    await cart.save();

    res.status(201).json({ message: 'Dataset added to cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all datasets from the cart
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId }).populate('items.datasetId');
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a dataset from the cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const datasetId = req.params.datasetId;

    // Find the cart for the user
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Remove the dataset from the cart
    cart.items = cart.items.filter(item => item.datasetId.toString() !== datasetId);
    await cart.save();

    res.status(200).json({ message: 'Dataset removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};