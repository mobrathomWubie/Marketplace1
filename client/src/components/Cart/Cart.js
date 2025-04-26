import React from 'react';

const Cart = () => {
  // Placeholder for cart data - replace with actual data from Redux or context
  const cartItems = [
    { id: 1, name: 'Dataset 1', price: 10 },
    { id: 2, name: 'Dataset 2', price: 20 },
    { id: 3, name: 'Dataset 3', price: 15 },
  ];

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);

  // Calculate total (assuming no tax or discounts for now)
  const total = subtotal;

  const handleRemoveFromCart = (itemId) => {
    // Implement logic to remove item from cart (e.g., dispatch Redux action)
    console.log('Remove item with ID:', itemId);
  };

  const handleCheckout = () => {
    // Redirect to checkout page
    console.log('Redirecting to checkout...');
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - ${item.price}
                <button onClick={() => handleRemoveFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <p>Subtotal: ${subtotal}</p>
          <p>Total: ${total}</p>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default Cart;