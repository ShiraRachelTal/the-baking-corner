import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#ff66a3' }}>Welcome to The Baking Corner 🧁</h1>
      <p style={{ textAlign: 'center' }}>Our high-quality baking products:</p>
      
      {/* תצוגת רשת (Grid) של המוצרים */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
        gap: '20px',
        marginTop: '30px'
      }}>
        {items.map((item, index) => (
          <div key={index} style={{ 
            border: '1px solid #eee', 
            borderRadius: '10px', 
            padding: '15px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#fff'
          }}>
            {/* הצגת התמונה */}
            <img 
              src={item.image_url} 
              alt={item.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
              onError={(e) => e.target.src = 'https://via.placeholder.com/200?text=No+Image'} // גיבוי למקרה שהתמונה חסרה
            />
            
            <h3 style={{ margin: '15px 0 5px 0', textAlign: 'center' }}>{item.name}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', textAlign: 'center' }}>{item.description}</p>
            <p style={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#333' }}>₪{item.price}</p>
            
            <button style={{
              marginTop: 'auto',
              padding: '10px 15px',
              backgroundColor: '#ff66a3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}>
              הוסף לסל
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;