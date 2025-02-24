import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Paper, 
  FormControl, Select, MenuItem, 
  Slider, Box, Checkbox, FormGroup, 
  FormControlLabel 
} from '@mui/material';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';
import './CategoryPage.css';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showDiscount, setShowDiscount] = useState(false);
  const [ratings, setRatings] = useState({
    4: false,
    3: false,
    2: false,
    1: false
  });

  useEffect(() => {
    fetchCategoryProducts();
  }, [category]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, sortBy, priceRange, showDiscount, ratings]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products?category=${category}`);
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Kategori ürünleri yüklenirken hata:', error);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Fiyat filtresi
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // İndirim filtresi
    if (showDiscount) {
      filtered = filtered.filter(product => product.discount > 0);
    }

    // Puan filtresi
    const selectedRatings = Object.entries(ratings)
      .filter(([_, checked]) => checked)
      .map(([rating]) => Number(rating));

    if (selectedRatings.length > 0) {
      filtered = filtered.filter(product => 
        selectedRatings.some(rating => product.rating >= rating)
      );
    }

    // Sıralama
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container maxWidth="lg" className="category-container">
      <Typography variant="h4" className="category-title">
        {category}
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Paper className="filters-paper">
            <Typography variant="h6">Filtreler</Typography>
            
            <Box className="filter-section">
              <Typography variant="subtitle1">Sıralama</Typography>
              <FormControl fullWidth size="small">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <MenuItem value="default">Varsayılan</MenuItem>
                  <MenuItem value="price-asc">Fiyat (Düşükten Yükseğe)</MenuItem>
                  <MenuItem value="price-desc">Fiyat (Yüksekten Düşüğe)</MenuItem>
                  <MenuItem value="rating">Puan</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box className="filter-section">
              <Typography variant="subtitle1">Fiyat Aralığı</Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={5000}
              />
              <Box className="price-range-display">
                <Typography>{priceRange[0]} TL</Typography>
                <Typography>{priceRange[1]} TL</Typography>
              </Box>
            </Box>

            <Box className="filter-section">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showDiscount}
                    onChange={(e) => setShowDiscount(e.target.checked)}
                  />
                }
                label="Sadece İndirimli Ürünler"
              />
            </Box>

            <Box className="filter-section">
              <Typography variant="subtitle1">Minimum Puan</Typography>
              <FormGroup>
                {[4, 3, 2, 1].map((rating) => (
                  <FormControlLabel
                    key={rating}
                    control={
                      <Checkbox
                        checked={ratings[rating]}
                        onChange={(e) => setRatings(prev => ({
                          ...prev,
                          [rating]: e.target.checked
                        }))}
                      />
                    }
                    label={`${rating} ve üzeri`}
                  />
                ))}
              </FormGroup>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            {filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryPage; 