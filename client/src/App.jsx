import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";

// Product display grid component defined outside App to prevent unnecessary re-renders
const ProductGrid = ({ products, onAddToCart }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
    {products.map((item, index) => (
      <div key={item.id || index} className="product-card">

        <div className="image-container">
          <img
            src={item.image_url}
            alt={item.name}
            className="product-image"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=No+Image'}
          />
        </div>

        <div className="product-info">
          <h3 className="product-title" style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
            {item.name}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textAlign: 'center' }}>
            {item.description}
          </p>
          <p style={{ fontWeight: '600', fontSize: '1.25rem', textAlign: 'center', color: 'var(--text-main)' }}>
            ₪{item.price}
          </p>

          <button
            className="btn-primary add-to-cart-btn"
            style={{ width: '100%' }}
            onClick={() => onAddToCart(item)}
          >
            Add to cart
          </button>
        </div>

      </div>
    ))}
  </div>
);

function App() {
  const [items, setItems] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true);
  // Cart state initialized from LocalStorage
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('baking_corner_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  // משתמש לדוגמה - בהמשך יגיע מטופס התחברות אמיתי
  const [currentUser] = useState({
    firstName: 'Shira Rachel',
    lastName: 'Tal',
    email: 'shira@thebakingcorner.com',
    role: 'admin' // שימי 'user' כדי לראות איך הכל נעלם למשתמש רגיל
  });
  // Automatically save cart updates to LocalStorage
  useEffect(() => {
    localStorage.setItem('baking_corner_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => {
        console.error("Error fetching data:", err);
        toast.error("Error loading products failed");
      });
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    toast.success(`"${product.name}" added to cart successfully!`, {
      duration: 3000,
      position: 'bottom-right',
    });
  };

  const decreaseQuantity = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter(item => item.id !== product.id);
      }

      return prevCart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const totalItemsInCart = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <Toaster />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', marginBottom: '10px' }}>
        <h1 style={{ margin: 0 }}>Welcome to The Baking Corner</h1>

        <Link to="/cart" style={{ position: 'absolute', right: 0, fontSize: '1.8rem', cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
          🛒
          {totalItemsInCart > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-12px',
              backgroundColor: '#e74c3c',
              color: 'white',
              borderRadius: '50%',
              padding: '2px 7px',
              fontSize: '1rem',
              fontWeight: 'bold',
              minWidth: '22px',
              textAlign: 'center',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              {totalItemsInCart}
            </span>
          )}
        </Link>
      </div>

      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Our high-quality baking products:</p>

      <nav style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>All Products</Link>
        <Link to="/ingredients" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>Ingredients</Link>
        <Link to="/equipment" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>Equipment</Link>
        {currentUser.role === 'admin' && (
          <Link to="/admin" style={{ textDecoration: 'none', color: '#e74c3c', fontWeight: 'bold', fontSize: '1.1rem' }}>Admin Panel</Link>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<ProductGrid products={items} onAddToCart={addToCart} />} />

        <Route path="/ingredients" element={
          <ProductGrid products={items.filter(item => item.category === 'ingredients')} onAddToCart={addToCart} />
        } />

        <Route path="/equipment" element={
          <ProductGrid products={items.filter(item => item.category === 'equipment')} onAddToCart={addToCart} />
        } />

        <Route path="/admin" element={
          currentUser.role === 'admin' ? <AdminPanel /> : <Navigate to="/" />
        } />

        <Route path="/cart" element={
          <Cart
            cart={cart}
            onIncrease={addToCart}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;