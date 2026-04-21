import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

export default function Cart({ refreshTrigger }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const loadCart = () => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setItems(savedCart);
  };

  useEffect(() => {
    loadCart();
  }, [refreshTrigger]);

  const updateQuantity = (id, delta) => {
    let updated = items.map(item => {
      if (item.termekId === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    saveCart(updated);
  };

  const removeItem = (id) => {
    const updated = items.filter(item => item.termekId !== id);
    saveCart(updated);
  };

  const saveCart = (newItems) => {
    localStorage.setItem('cart', JSON.stringify(newItems));
    setItems(newItems);
  };

  const total = items.reduce((sum, item) => sum + (item.ar * item.quantity), 0);

  if (items.length === 0) {
    return (
      <aside className="cart-sidebar empty">
        <h2 className="cart-title">Kosár</h2>
        <div className="cart-empty-msg">
          <span className="material-icons">shopping_basket</span>
          <p>A kosarad még üres</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="cart-sidebar">
      <h2 className="cart-title">Kosár ({items.length})</h2>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.termekId} className="cart-item">
            <div className="cart-item-info">
              <span className="cart-item-name">{item.termekNev}</span>
              <span className="cart-item-price">{item.ar * item.quantity} Ft</span>
            </div>
            <div className="cart-item-controls">
              <button onClick={() => updateQuantity(item.termekId, -1)}>-</button>
              <span className="cart-item-qty">{item.quantity} db</span>
              <button onClick={() => updateQuantity(item.termekId, 1)}>+</button>
              <button className="cart-item-remove" onClick={() => removeItem(item.termekId)}>
                <span className="material-icons">delete_outline</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Összesen:</span>
          <span className="cart-total-value">{total} Ft</span>
        </div>
        <button className="cart-pay-btn" onClick={() => navigate('/payment', { state: { cart: items, total } })}>
          Fizetés <span className="material-icons">payments</span>
        </button>
      </div>
    </aside>
  );
}