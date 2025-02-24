import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Tab,
  Tabs,
  Box
} from '@mui/material';
import { Person, ShoppingBag, Favorite, Star } from '@mui/icons-material';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Kullanıcı bilgilerini localStorage'dan al
    const user = JSON.parse(localStorage.getItem('user'));
    setUserInfo(user);

    // Diğer verileri backend'den al
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // Siparişler
      const ordersResponse = await fetch('http://localhost:5000/api/orders');
      const ordersData = await ordersResponse.json();
      setOrders(ordersData);

      // Favoriler
      const favoritesResponse = await fetch('http://localhost:5000/api/favorites');
      const favoritesData = await favoritesResponse.json();
      setFavorites(favoritesData);

      // Değerlendirmeler
      const reviewsResponse = await fetch('http://localhost:5000/api/reviews');
      const reviewsData = await reviewsResponse.json();
      setReviews(reviewsData);
    } catch (error) {
      console.error('Veri yüklenirken hata:', error);
    }
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg" className="profile-container">
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper className="profile-sidebar">
            <div className="profile-header">
              <Avatar className="profile-avatar">
                {userInfo?.name?.[0] || 'U'}
              </Avatar>
              <Typography variant="h5">{userInfo?.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {userInfo?.email}
              </Typography>
            </div>
            <Button
              variant="outlined"
              fullWidth
              className="edit-profile-button"
            >
              Profili Düzenle
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper className="profile-content">
            <Tabs
              value={activeTab}
              onChange={(_, newValue) => setActiveTab(newValue)}
              variant="fullWidth"
            >
              <Tab icon={<ShoppingBag />} label="Siparişlerim" />
              <Tab icon={<Favorite />} label="Favorilerim" />
              <Tab icon={<Star />} label="Değerlendirmelerim" />
            </Tabs>

            <TabPanel value={activeTab} index={0}>
              <List>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <ListItem>
                      <ListItemText
                        primary={`Sipariş #${order.id}`}
                        secondary={`Tarih: ${new Date(order.date).toLocaleDateString()}`}
                      />
                      <Typography variant="body1">
                        {order.total.toFixed(2)} TL
                      </Typography>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
              <Grid container spacing={2}>
                {favorites.map((product) => (
                  <Grid item xs={12} sm={6} key={product.id}>
                    <Paper className="favorite-item">
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body1">
                        {product.price.toFixed(2)} TL
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
              <List>
                {reviews.map((review) => (
                  <React.Fragment key={review.id}>
                    <ListItem>
                      <ListItemText
                        primary={review.productName}
                        secondary={review.comment}
                      />
                      <Box className="review-rating">
                        <Star color="primary" />
                        <Typography>{review.rating}</Typography>
                      </Box>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Profile; 