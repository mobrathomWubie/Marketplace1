const PurchaseHistory = require('../models/PurchaseHistory');
const Cart = require('../models/Cart');
const Dataset = require('../models/dataset');
const paypal = require('../payments/paypal'); 
const binance = require('../payments/binance'); 

const completePurchase = async (req, res) => {
  try {
    const userId = req.user._id; 

    const cart = await Cart.findOne({ user: userId }).populate('items.dataset');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    const paymentMethod = req.body.paymentMethod;
    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method is required' });
    }
    let paymentResult;
    if (paymentMethod === 'paypal') {
        paymentResult = await paypal.createPayment(cart.items);
    } else if (paymentMethod === 'binance') {
        paymentResult = await binance.createPayment(cart.items);
    }
    if (!paymentResult || !paymentResult.success) {
        return res.status(400).json({ message: 'Payment failed' });
    }

    const purchaseHistory = new PurchaseHistory({
      user: userId,
      items: cart.items.map(item => ({
        dataset: item.dataset._id,
        price: item.dataset.price,
      })),
      total: cart.items.reduce((sum, item) => sum + item.dataset.price, 0),
      purchaseDate: new Date(),
    });

    await purchaseHistory.save();

    await cart.items.forEach(async (item) => {
      await Dataset.findByIdAndUpdate(
        item.dataset._id,
        { $push: { buyers: userId } }
      );
    });

    await Cart.findOneAndDelete({ user: userId });

    res.status(200).json({ message: 'Purchase completed successfully', purchaseHistory, paymentResult});
  } catch (error) {
    console.error('Error completing purchase:', error);
    res.status(500).json({ message: 'Error completing purchase', error: error.message });
  }
};

module.exports = {
  completePurchase,
};