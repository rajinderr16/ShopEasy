
import { useMemo, useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Everyday Sneakers",
    category: "Fashion",
    price: 2499,
    oldPrice: 3299,
    rating: 4.8,
    tag: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Minimal Wrist Watch",
    category: "Accessories",
    price: 1899,
    oldPrice: 2499,
    rating: 4.7,
    tag: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Classic Headphones",
    category: "Electronics",
    price: 3299,
    oldPrice: 4199,
    rating: 4.9,
    tag: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Daily Essential Bag",
    category: "Fashion",
    price: 1599,
    oldPrice: 2199,
    rating: 4.6,
    tag: "NEW",
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 5,
    name: "Modern Sunglasses",
    category: "Accessories",
    price: 999,
    oldPrice: 1499,
    rating: 4.5,
    tag: "SALE",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 6,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 2199,
    oldPrice: 2999,
    rating: 4.8,
    tag: "TOP PICK",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 7,
    name: "Everyday Backpack",
    category: "Fashion",
    price: 1799,
    oldPrice: 2299,
    rating: 4.7,
    tag: "ESSENTIAL",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 8,
    name: "Premium Smart Watch",
    category: "Electronics",
    price: 3999,
    oldPrice: 4999,
    rating: 4.9,
    tag: "PREMIUM",
    image:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85",
  },
];

const categories = ["All", "Fashion", "Electronics", "Accessories"];

function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function addToCart(product) {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setNotice(`${product.name} added to cart!`);
    setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  return (
    <div className="app">
      <div className="announcement">
        ✨ A little something for everyone — enjoy shopping!
      </div>

      <header className="navbar">
        <a className="logo" href="#home">
          shop<span>easy.</span>
        </a>

        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Shop</a>
          <a href="#why-us">Why ShopEasy?</a>
        </nav>

        <div className="nav-actions">
          <label className="search-box">
            <span>⌕</span>
            <input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </label>

          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
            aria-label="Toggle shopping cart"
          >
            ♧ Cart
            <span className="cart-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              YOUR EVERYDAY SHOPPING DESTINATION
            </span>

            <h1>
              Find your
              <br />
              next <span>favourite.</span>
            </h1>

            <p>
              Great finds. Lovely prices. A shopping experience
              that makes every day a little better.
            </p>

            <a className="primary-button" href="#products">
              Explore collection <span>↗</span>
            </a>

            <div className="hero-points">
              <span>✓ Carefully picked products</span>
              <span>✓ Great value, every day</span>
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1100&q=85"
              alt="Stylish modern shopping store"
            />
            <div className="floating-card">
              <span className="floating-icon">✦</span>
              <div>
                <strong>Good finds live here.</strong>
                <p>Discover something new</p>
              </div>
            </div>
            <div className="hero-sticker">SHOP<br />HAPPY.</div>
          </div>
        </section>

        <section className="benefits" id="why-us">
          <div>
            <span className="benefit-icon">✦</span>
            <div>
              <strong>Handpicked finds</strong>
              <p>Products worth discovering</p>
            </div>
          </div>
          <div>
            <span className="benefit-icon">♡</span>
            <div>
              <strong>Shopping made simple</strong>
              <p>Easy browsing, easy choices</p>
            </div>
          </div>
          <div>
            <span className="benefit-icon">₹</span>
            <div>
              <strong>Prices you'll love</strong>
              <p>Style meets value</p>
            </div>
          </div>
        </section>

        <section className="shop-section" id="products">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE SHOP EDIT</span>
              <h2>Something for you<span>.</span></h2>
              <p>Everyday favourites, all in one place.</p>
            </div>
            <span className="product-count">
              {filteredProducts.length} products
            </span>
          </div>

          <div className="category-list">
            {categories.map((item) => (
              <button
                key={item}
                className={`category-button ${
                  category === item ? "active" : ""
                }`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span className="product-tag">{product.tag}</span>
                  <button
                    className="quick-add"
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                    title="Add to cart"
                  >
                    +
                  </button>
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>
                  <h3>{product.name}</h3>

                  <div className="rating">
                    <span>★</span> {product.rating}
                    <span className="rating-note"> · Customer favourite</span>
                  </div>

                  <div className="price-row">
                    <div className="prices">
                      <strong>
                        ₹{product.price.toLocaleString("en-IN")}
                      </strong>
                      <del>
                        ₹{product.oldPrice.toLocaleString("en-IN")}
                      </del>
                    </div>
                    <button
                      className="add-button"
                      onClick={() => addToCart(product)}
                    >
                      Add +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="empty-results">
              <span>⌕</span>
              <h3>No products found</h3>
              <p>Try another search or choose a different category.</p>
              <button
                className="primary-button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
              >
                Show all products
              </button>
            </div>
          )}
        </section>

        <section className="newsletter">
          <div>
            <span className="eyebrow">A LITTLE NOTE FROM US</span>
            <h2>Good things are<br />worth sharing.</h2>
            <p>
              Keep an eye out for new finds, fresh favourites
              and more from ShopEasy.
            </p>
          </div>
          <a className="newsletter-link" href="#products">
            Find your favourite <span>↗</span>
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          shop<span>easy.</span>
        </a>
        <p>Making everyday shopping feel a little more special.</p>
        <span>© {new Date().getFullYear()} ShopEasy. All rights reserved.</span>
      </footer>

      {notice && <div className="toast">✓ {notice}</div>}

      {showCart && (
        <div
          className="cart-overlay"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR PICKS</span>
                <h2>Your cart ({cartCount})</h2>
              </div>
              <button
                className="close-cart"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>♡</span>
                <h3>Your cart is waiting.</h3>
                <p>Add something you love to get started.</p>
                <button
                  className="primary-button"
                  onClick={() => setShowCart(false)}
                >
                  Explore products
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <strong>{item.name}</strong>
                        <span>₹{item.price.toLocaleString("en-IN")}</span>
                        <div className="quantity-control">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        className="remove-item"
                        onClick={() =>
                          setCart((items) =>
                            items.filter((i) => i.id !== item.id)
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
                  </div>
                  <p>Delivery charges, if applicable, are not included.</p>
                  <button
                    className="checkout-button"
                    onClick={() =>
                      setNotice("Demo cart only — checkout is not connected yet.")
                    }
                  >
                    Proceed to checkout ↗
                  </button>
                  <button
                    className="continue-shopping"
                    onClick={() => setShowCart(false)}
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
