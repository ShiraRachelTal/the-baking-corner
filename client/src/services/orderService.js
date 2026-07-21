const API_URL = 'http://localhost:5000/api/orders';

// שליחת הזמנה חדשה לשרת
export const createOrder = async (orderData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await response.json();
};