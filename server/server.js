const express = require('express');
const cors = require('cors');
require('dotenv').config(); 
const pool = require('./config/db'); 

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

const productRoutes = require('./routes/productRoutes');

app.get('/', (req, res) => {
    res.send('The Baking Corner Server is running!');
});

app.use('/api/products', productRoutes);

// ==========================================
// ADMIN & ORDERS API ENDPOINTS
// ==========================================

// GET: Fetch all users for Admin Panel
app.get('/api/users', async (req, res) => {
  try {
    const [users] = await pool.query('SELECT id, first_name, last_name, email, role FROM users');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET: Fetch all orders for Admin Panel
app.get('/api/orders', async (req, res) => {
  try {
    const [orders] = await pool.query('SELECT id, user_id, total_amount, status, order_date FROM orders ORDER BY order_date DESC');
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// POST: Create a new order from cart (Checkout)
app.post('/api/orders', async (req, res) => {
  const { cart, totalPrice, userId = 1 } = req.body;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Insert main order
    const [orderResult] = await connection.query(
      'INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, ?)',
      [userId, totalPrice, 'pending']
    );
    const orderId = orderResult.insertId;

    // 2. Insert order items
    for (const item of cart) {
      await connection.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)',
        [orderId, item.id, item.quantity, item.price]
      );
    }

    await connection.commit();
    connection.release();
    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Server error processing order' });
  }
});

// POST: Add a new product from Admin Panel
app.post('/api/products', async (req, res) => {
  const { name, description, price, category, image_url, stock = 10 } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO products (name, description, price, category, image_url, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, price, category, image_url, stock]
    );
    res.status(201).json({ id: result.insertId, name, description, price, category, image_url, stock });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
});

// PUT: Update an existing product
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price, stock, category, image_url, description } = req.body;

    try {
        // SQL query to update the product fields
        const updateQuery = `
            UPDATE products 
            SET name = ?, price = ?, stock = ?, category = ?, image_url = ?, description = ? 
            WHERE id = ?
        `;
        
        // Execute the query using your database pool
        const [result] = await pool.query(updateQuery, [name, price, stock, category, image_url, description, id]);

        // Check if a row was actually updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product in DB:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE: Delete a product
app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error.message);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// ==========================================
// SERVER LISTENER
// ==========================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});