// src/components/Appbar.js
import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Typography, Badge, Box } from '@mui/material';
import { 
  Home, 
  Settings, 
  Info, 
  Login, 
  AppRegistration,
  Favorite,
  ShoppingCart,
  Logout
} from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import './Appbar.css';

const Appbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  };

  return (
    <AppBar position="sticky" className="appbar">
      <Toolbar className="toolbar-content">
        <Typography variant="h6" component={Link} to="/" className="logo-text">
          E-Shop
        </Typography>
        
        <div style={{ flexGrow: 1 }} />
        
        <Box className="nav-buttons">
          <Button component={Link} to="/" startIcon={<Home />}>
            Ana Sayfa
          </Button>
          <Button component={Link} to="/favorites" startIcon={<Favorite />}>
            Favoriler
            <span className="badge">3</span>
          </Button>
          <Button component={Link} to="/cart" startIcon={<ShoppingCart />}>
            Sepet
            <span className="badge">2</span>
          </Button>
          <Button component={Link} to="/settings" startIcon={<Settings />}>
            Ayarlar
          </Button>
          
          {!isLoggedIn ? (
            <>
              <Button
                component={Link}
                to="/login"
                className="auth-button login-button"
                variant="outlined"
                size="small"
                sx={{
                  borderColor: 'var(--primary-color)',
                  color: 'var(--primary-color)',
                  '&:hover': {
                    borderColor: 'var(--accent-color)',
                    backgroundColor: 'rgba(139, 115, 85, 0.04)'
                  }
                }}
              >
                Giriş
              </Button>
              <Button
                component={Link}
                to="/signup"
                className="auth-button signup-button"
                variant="contained"
                size="small"
                sx={{
                  background: 'linear-gradient(45deg, var(--primary-color), var(--accent-color))',
                  color: 'white',
                  '&:hover': {
                    background: 'linear-gradient(45deg, var(--accent-color), var(--primary-color))'
                  }
                }}
              >
                Kayıt
              </Button>
            </>
          ) : (
            <Button
              onClick={handleLogout}
              className="logout-button"
              variant="outlined"
              size="small"
              color="error"
            >
              Çıkış
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
