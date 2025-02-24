import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Rating,
  IconButton,
  Snackbar 
} from '@mui/material';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { id, name, price, rating, discount, category } = product;
  const discountedPrice = price - (price * discount / 100);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    checkFavoriteStatus();
  }, [id]);

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/favorites/check/${id}`);
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Favori kontrolü hatası:', error);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation(); // Kartın tıklanmasını engelle
    try {
      const response = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id }),
      });
      const data = await response.json();
      setIsFavorite(data.isFavorite);
      setSnackbarMessage(data.message);
      setShowSnackbar(true);
    } catch (error) {
      console.error('Favori işlemi hatası:', error);
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Kartın tıklanmasını engelle
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: id, quantity: 1 }),
      });
      const data = await response.json();
      setSnackbarMessage(data.message);
      setShowSnackbar(true);
    } catch (error) {
      console.error('Sepete ekleme hatası:', error);
    }
  };

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Card className="product-card" onClick={handleCardClick}>
      <CardContent className="product-content">
        <div className="product-header">
          <Typography variant="h6" className="product-title">
            {name}
          </Typography>
          <IconButton 
            className="favorite-button"
            onClick={handleFavoriteClick}
            color={isFavorite ? "error" : "default"}
          >
            {isFavorite ? <Favorite /> : <FavoriteBorder />}
          </IconButton>
        </div>

        <Typography variant="body2" color="textSecondary" className="product-category">
          {category}
        </Typography>

        <div className="rating-container">
          <Rating value={rating} precision={0.5} readOnly size="small" />
          <Typography variant="body2" color="text.secondary">
            ({rating})
          </Typography>
        </div>

        <div className="price-container">
          {discount > 0 && (
            <Typography variant="body1" className="original-price">
              {price.toFixed(2)} TL
            </Typography>
          )}
          <Typography variant="h6" className="current-price">
            {discountedPrice.toFixed(2)} TL
          </Typography>
        </div>

        <Button
          variant="contained"
          startIcon={<ShoppingCart />}
          className="add-to-cart-button"
          fullWidth
          onClick={handleAddToCart}
        >
          Sepete Ekle
        </Button>
      </CardContent>
      
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Card>
  );
};

export default ProductCard; 