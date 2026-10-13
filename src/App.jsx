
import { useReducer } from "react";
import "./App.css";

const products = [
  { id: 1, name: "Headphones", price: 1500, emoji: "🎧" },
  { id: 2, name: "Smart Watch", price: 2500, emoji: "⌚" },
  { id: 3, name: "Shoes", price: 2000, emoji: "👟" },
  { id: 4, name: "Backpack", price: 1000, emoji: "🎒" }
];

const initialState = [];

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const found = state.find(
        item => item.id === action.product.id
      );

      if (found) {
        return state.map(item =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...state, { ...action.product, quantity: 1 }];
    }

    case "INCREASE":
      return state.map(item =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

    case "DECREASE":
      return state
        .map(item =>
          item.id === action.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0);

    case "REMOVE_ITEM":
      return state.filter(item => item.id !== action.id);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

function App() {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity, 0
  );

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  return (
    <div className="app">
      <header>
        <h1>ShopEasy 🛍️</h1>
        <p>Everything you need, in one place!</p>
        <h3>🛒 Cart: {totalItems} items</h3>
      </header>

      <main>
        <h2>Our Products</h2>

        <div className="products">
          {products.map(product => (
            <div className="product" key={product.id}>
              <div className="emoji">{product.emoji}</div>
              <h3>{product.name}</h3>
              <p>Price: ₹{product.price}</p>

              <button onClick={() =>
                dispatch({ type: "ADD_ITEM", product })
              }>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        <section className="cart">
          <h2>Shopping Cart</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty!</p>
          ) : (
            <>
              {cart.map(item => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>

                  <div className="controls">
                    <button onClick={() =>
                      dispatch({ type: "DECREASE", id: item.id })
                    }>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() =>
                      dispatch({ type: "INCREASE", id: item.id })
                    }>
                      +
                    </button>

                    <button className="remove" onClick={() =>
                      dispatch({ type: "REMOVE_ITEM", id: item.id })
                    }>
                      Remove
                    </button>
                  </div>
                </div>
              ))}

              <h3>Total Price: ₹{totalPrice}</h3>

              <button className="clear" onClick={() =>
                dispatch({ type: "CLEAR_CART" })
              }>
                Clear Cart
              </button>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
