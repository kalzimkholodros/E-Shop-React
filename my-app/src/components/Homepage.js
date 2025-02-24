// src/components/Homepage.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, InputAdornment, List, ListItem, ListItemText, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import './Homepage.css';

const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchTerm) {
        fetchSearchResults();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchSearchResults = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/search?query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error('Arama sonuçları yüklenirken hata:', error);
    }
  };

  const handleSearchItemClick = (productId) => {
    setShowResults(false);
    setSearchTerm('');
    navigate(`/product/${productId}`);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Ürünler yüklenirken hata:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Kategoriler yüklenirken hata:', error);
    }
  };

  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="homepage">
      <div className="hero-section">
        <Typography variant="h2" className="hero-title">
          Yeni Sezon İndirimleri
        </Typography>
        <Typography variant="h5" className="hero-subtitle">
          %50'ye varan indirimlerle sezon fırsatlarını kaçırmayın!
        </Typography>
      </div>

      <Container maxWidth="lg" className="main-content">
        <div className="search-section">
          <div className="search-container">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Ürün ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowResults(true)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              className="search-input"
            />
            {showResults && searchResults.length > 0 && (
              <Paper className="search-results">
                <List>
                  {searchResults.map((product) => (
                    <ListItem 
                      key={product.id}
                      button
                      onClick={() => handleSearchItemClick(product.id)}
                    >
                      <ListItemText 
                        primary={product.name}
                        secondary={`${product.category} - ${product.price.toFixed(2)} TL`}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </div>
        </div>

        <section className="categories-section">
          <Typography variant="h4" className="section-title">
            Popüler Kategoriler
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid item xs={6} sm={3} key={category}>
                <div 
                  className="category-card"
                  onClick={() => handleCategoryClick(category)}
                >
                  <Typography variant="h6">{category}</Typography>
                </div>
              </Grid>
            ))}
          </Grid>
        </section>

        <section className="featured-section">
          <Typography variant="h4" className="section-title">
            Öne Çıkan Ürünler
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </div>
  );
};

export default Homepage;
