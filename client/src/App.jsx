import { useState, useEffect } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ textAlign: 'center' }}>Welcome to The Baking Corner</h1>
      <p style={{ textAlign: 'center', marginBottom: '40px' }}>Our high-quality baking products:</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
        gap: '24px'
      }}>
        {items.map((item, index) => (
          <div key={index} className="product-card">
            
            <img 
              src={item.image_url} 
              alt={item.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '16px' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=No+Image'} 
            />
            
            <h3 className="product-title" style={{ margin: '0 0 10px 0', textAlign: 'center' }}>
              {item.name}
            </h3>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textAlign: 'center', flexGrow: 1 }}>
              {item.description}
            </p>
            
            <p style={{ fontWeight: '600', fontSize: '1.25rem', textAlign: 'center', color: 'var(--text-main)' }}>
              ₪{item.price}
            </p>
            
            <button className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
              הוסף לסל
            </button>
            
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;