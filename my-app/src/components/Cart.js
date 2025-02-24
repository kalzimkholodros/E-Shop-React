import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Button,
  Divider,
  IconButton 
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      const data = await response.json();
      setCartItems(data);
      calculateTotal(data);
    } catch (error) {
      console.error('Sepet yüklenirken hata:', error);
    }
  };

  const calculateTotal = (items) => {
    const totalPrice = items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 
      0
    );
    setTotal(totalPrice);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await fetch(`http://localhost:5000/api/cart/${productId}`, {
        method: 'DELETE'
      });
      fetchCart(); // Sepeti yeniden yükle
    } catch (error) {
      console.error('Ürün sepetten çıkarılırken hata:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="cart-container">
      <Typography variant="h4" className="cart-title">
        Sepetim
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Paper key={item.id} className="cart-item">
              <div className="cart-item-details">
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">
                  {item.price.toFixed(2)} TL x {item.quantity}
                </Typography>
                <Typography variant="h6">
                  Toplam: {(item.price * item.quantity).toFixed(2)} TL
                </Typography>
              </div>
              <IconButton 
                color="error" 
                onClick={() => handleRemoveFromCart(item.id)}
              >
                <Delete />
              </IconButton>
            </Paper>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className="cart-summary">
            <Typography variant="h6">Sipariş Özeti</Typography>
            <Divider />
            <Typography variant="h5">
              Toplam: {total.toFixed(2)} TL
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              className="checkout-button"
            >
              Ödemeye Geç
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart; 