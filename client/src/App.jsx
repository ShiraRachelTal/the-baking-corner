import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  // פונקציית עזר להצגת רשת המוצרים
  const ProductGrid = ({ products }) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
      {products.map((item, index) => (
        <div key={index} className="product-card">
          
          {/* עטיפת התמונה בשביל אפקט הזום */}
          <div className="image-container">
            <img 
              src={item.image_url} 
              alt={item.name} 
              className="product-image"
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=No+Image'} 
            />
          </div>

          {/* עטיפת המידע שדוחפת את הכפתור למטה בעזרת flex-grow */}
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
            
            {/* הכפתור עכשיו מחזיק גם את הקלאס של העיצוב שלך וגם את זה של המיקום */}
            <button className="btn-primary add-to-cart-btn" style={{ width: '100%' }}>
              הוסף לסל
            </button>
          </div>

        </div>
      ))}
    </div>
  );
  
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <h1 style={{ textAlign: 'center' }}>Welcome to The Baking Corner</h1>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Our high-quality baking products:</p>
      
      {/* תפריט ניווט */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginBottom: '40px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>All Products</Link>
        <Link to="/ingredients" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>Ingredients</Link>
        <Link to="/equipment" style={{ textDecoration: 'none', color: 'var(--text-main)', fontWeight: 'bold', fontSize: '1.1rem' }}>Equipment</Link>
      </nav>

      {/* הראוטר מנווט איזה מוצרים להעביר לרשת לפי הקטגוריה */}
      <Routes>
        <Route path="/" element={<ProductGrid products={items} />} />
        
        <Route path="/ingredients" element={
          <ProductGrid products={items.filter(item => item.category === 'ingredients')} />
        } />
        
        <Route path="/equipment" element={
          <ProductGrid products={items.filter(item => item.category === 'equipment')} />
        } />
      </Routes>
      
    </div>
  );
}

export default App;