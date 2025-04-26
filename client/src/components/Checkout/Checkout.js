import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // Assuming you have auth state with user info
  const [paymentMethod, setPaymentMethod] = useState('');
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const [cartItems, setCartItems] = useState([]); // You'll need to get this from Redux or local storage

  useEffect(() => {
    if (!user) {
      navigate('/login'); // Redirect if not authenticated
    }

    // Fetch cart items (replace this with your actual cart data retrieval)
    const fetchedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(fetchedCartItems);

  }, [user, navigate]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleShippingInfoChange = (event) => {
    setShippingInfo({ ...shippingInfo, [event.target.name]: event.target.value });
  };

  const handleCompletePurchase = () => {
    fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include authentication token if needed
        },
        body: JSON.stringify({
          paymentMethod: paymentMethod,
          shippingInfo: shippingInfo,
          cartItems: cartItems,
        }),
      })
      .then(response => response.json())
      .then(data => {
        console.log('Purchase completed:', data);
      })
      .catch(error => {
        console.error('Error during purchase:', error);
      });

    console.log('Payment Method:', paymentMethod);
    console.log('Shipping Info:', shippingInfo);
    localStorage.removeItem('cart');
    navigate('/confirmation');
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  if (!user) {
    return <div>Loading...</div>; // Or a spinner
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Checkout</h2>
      <div className="checkout-section">
        <h3 className="checkout-subtitle">Items to Purchase:</h3>
        <ul className="checkout-items-list">
          {cartItems.map((item) => (
            <li key={item.id} className="checkout-item">
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
        <p className="checkout-total">Total Price: ${totalPrice}</p>
      </div>
  
      <div className="checkout-section">
        <h3 className="checkout-subtitle">Payment Method</h3>
        <select className="checkout-select" value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="">Select Payment Method</option>
          <option value="paypal">PayPal</option>
          <option value="binance">Binance</option>
          {/* Add more payment methods here */}
        </select>
      </div>
  
      <div className="checkout-section">
        <h3 className="checkout-subtitle">Shipping Information</h3>
        <div className="checkout-form-group">
          <label htmlFor="address" className="checkout-label">Address:</label>
          <input type="text" id="address" name="address" value={shippingInfo.address} onChange={handleShippingInfoChange} className="checkout-input" />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="city" className="checkout-label">City:</label>
          <input type="text" id="city" name="city" value={shippingInfo.city} onChange={handleShippingInfoChange} className="checkout-input" />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="postalCode" className="checkout-label">Postal Code:</label>
          <input type="text" id="postalCode" name="postalCode" value={shippingInfo.postalCode} onChange={handleShippingInfoChange} className="checkout-input" />
        </div>
        <div className="checkout-form-group">
          <label htmlFor="country" className="checkout-label">Country:</label>
          <input type="text" id="country" name="country" value={shippingInfo.country} onChange={handleShippingInfoChange} className="checkout-input" />
        </div>
      </div>
  
      <div className="checkout-button-container">
        <button onClick={handleCompletePurchase} className="checkout-button">Complete Purchase</button>
      </div>
    </div>
  );
};

export default Checkout;