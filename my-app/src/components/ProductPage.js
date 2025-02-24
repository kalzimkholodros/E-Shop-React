import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Paper, 
  Rating, 
  Button,
  Divider,
  IconButton,
  Box,
  Avatar,
  Snackbar,
  TextField
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Favorite, FavoriteBorder } from '@mui/icons-material';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: ''
  });

  useEffect(() => {
    fetchProduct();
    checkFavoriteStatus();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Ürün detayı yüklenirken hata:', error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/favorites/check/${id}`);
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Favori kontrolü hatası:', error);
    }
  };

  const handleFavoriteClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: parseInt(id) }),
      });
      const data = await response.json();
      setIsFavorite(data.isFavorite);
      setSnackbarMessage(data.message);
      setShowSnackbar(true);
    } catch (error) {
      console.error('Favori işlemi hatası:', error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: parseInt(id), quantity: 1 }),
      });
      const data = await response.json();
      setSnackbarMessage(data.message);
      setShowSnackbar(true);
    } catch (error) {
      console.error('Sepete ekleme hatası:', error);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      setSnackbarMessage('Lütfen bir puan verin');
      setShowSnackbar(true);
      return;
    }

    if (!newReview.comment.trim()) {
      setSnackbarMessage('Lütfen bir yorum yazın');
      setShowSnackbar(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newReview,
          user: 'Kullanıcı', // Gerçek uygulamada giriş yapmış kullanıcının adı gelecek
          date: new Date().toISOString()
        }),
      });

      const data = await response.json();
      if (data.success) {
        setProduct(data.product);
        setNewReview({ rating: 0, comment: '' });
        setSnackbarMessage('Yorumunuz başarıyla eklendi');
        setShowSnackbar(true);
      }
    } catch (error) {
      console.error('Yorum eklenirken hata:', error);
      setSnackbarMessage('Yorum eklenirken bir hata oluştu');
      setShowSnackbar(true);
    }
  };

  if (!product) {
    return (
      <Container>
        <Typography>Yükleniyor...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="product-page">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper className="product-main">
            <Typography variant="h4" className="product-title">
              {product.name}
            </Typography>
            
            <Box className="product-header">
              <Box className="rating-section">
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2">
                  ({product.reviews.length} değerlendirme)
                </Typography>
              </Box>
              <Typography variant="h5" className="product-price">
                {product.price.toFixed(2)} TL
              </Typography>
            </Box>

            <Divider className="section-divider" />

            <Typography variant="body1" className="product-description">
              {product.description}
            </Typography>

            <Box className="action-buttons">
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                className="add-to-cart-button"
                onClick={handleAddToCart}
                fullWidth
              >
                Sepete Ekle
              </Button>
              <Button
                variant="outlined"
                startIcon={isFavorite ? <Favorite /> : <FavoriteBorder />}
                className="favorite-button"
                onClick={handleFavoriteClick}
                fullWidth
              >
                {isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
              </Button>
            </Box>
          </Paper>

          <Paper className="reviews-section">
            <Typography variant="h5" className="section-title">
              Değerlendirmeler
            </Typography>

            <Box className="add-review-section">
              <Typography variant="h6">Yorum Yap</Typography>
              <form onSubmit={handleReviewSubmit}>
                <Box className="rating-input">
                  <Typography component="legend">Puanınız</Typography>
                  <Rating
                    value={newReview.rating}
                    onChange={(_, value) => setNewReview(prev => ({ ...prev, rating: value }))}
                    precision={0.5}
                    size="large"
                  />
                </Box>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Yorumunuzu yazın..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  className="review-input"
                />
                <Button
                  type="submit"
                  variant="contained"
                  className="submit-review-button"
                >
                  Yorum Yap
                </Button>
              </form>
            </Box>

            <Divider className="section-divider" />

            <Box className="reviews-list">
              {product.reviews.map((review, index) => (
                <Box key={index} className="review-item">
                  <Box className="review-header">
                    <Box className="review-user">
                      <Avatar className="user-avatar">
                        {review.user[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" className="user-name">
                          {review.user}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Rating value={review.rating} readOnly precision={0.5} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className="product-sidebar">
            <Typography variant="h6">Ürün Bilgileri</Typography>
            <Box className="product-info">
              <Typography variant="body2">Kategori</Typography>
              <Typography variant="body1">{product.category}</Typography>
            </Box>
            
            <Divider className="section-divider" />
            
            <Typography variant="h6">Ortalama Puan</Typography>
            <Box className="average-rating">
              <Typography variant="h3">{product.rating}</Typography>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2">
                {product.reviews.length} değerlendirme
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default ProductPage; 