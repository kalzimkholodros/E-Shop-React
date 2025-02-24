import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ProductCard from './ProductCard';
import './Favorites.css';

const Favorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/favorites');
      const data = await response.json();
      setFavoriteProducts(data);
    } catch (error) {
      console.error('Favoriler yüklenirken hata:', error);
    }
  };

  return (
    <Container maxWidth="lg" className="favorites-container">
      <Typography variant="h4" className="favorites-title">
        Favorilerim
      </Typography>
      <Grid container spacing={2}>
        {favoriteProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Favorites; 