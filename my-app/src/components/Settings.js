import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  Switch,
  Divider,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Notifications,
  CreditCard,
  Person,
  Cake,
  ExitToApp,
  Save,
} from '@mui/icons-material';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    birthDate: '1990-01-01',
    cardNumber: '•••• •••• •••• 1234',
    cardExpiry: '12/24',
    cardCVV: '***',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
  });

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (name) => (event) => {
    setNotifications(prev => ({
      ...prev,
      [name]: event.target.checked
    }));
  };

  const handleSave = (section) => {
    setSuccessMessage(`${section} başarıyla güncellendi!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <Container className="settings-container">
      {successMessage && (
        <Alert severity="success" className="success-alert">
          {successMessage}
        </Alert>
      )}

      <Paper className="settings-paper">
        <Typography variant="h4" className="settings-title">
          Hesap Ayarları
        </Typography>

        <Box className="settings-section">
          <Typography variant="h6" className="section-title">
            <Person /> Kişisel Bilgiler
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Ad"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Soyad"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-posta"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Doğum Tarihi"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className="save-button"
            onClick={() => handleSave('Kişisel bilgiler')}
            startIcon={<Save />}
          >
            Kaydet
          </Button>
        </Box>

        <Divider className="section-divider" />

        <Box className="settings-section">
          <Typography variant="h6" className="section-title">
            <CreditCard /> Ödeme Bilgileri
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Kart Numarası"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Son Kullanma Tarihi"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="CVV"
                name="cardCVV"
                value={formData.cardCVV}
                onChange={handleInputChange}
                type="password"
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            className="save-button"
            onClick={() => handleSave('Ödeme bilgileri')}
            startIcon={<Save />}
          >
            Kaydet
          </Button>
        </Box>

        <Divider className="section-divider" />

        <Box className="settings-section">
          <Typography variant="h6" className="section-title">
            <Notifications /> Bildirim Ayarları
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box className="notification-setting">
                <Typography>E-posta Bildirimleri</Typography>
                <Switch
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange('emailNotifications')}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="notification-setting">
                <Typography>Push Bildirimleri</Typography>
                <Switch
                  checked={notifications.pushNotifications}
                  onChange={handleNotificationChange('pushNotifications')}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box className="notification-setting">
                <Typography>Pazarlama E-postaları</Typography>
                <Switch
                  checked={notifications.marketingEmails}
                  onChange={handleNotificationChange('marketingEmails')}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Divider className="section-divider" />

        <Box className="settings-section">
          <Button
            variant="outlined"
            color="error"
            startIcon={<ExitToApp />}
            onClick={() => setShowLogoutDialog(true)}
            className="logout-button"
          >
            Çıkış Yap
          </Button>
        </Box>
      </Paper>

      <Dialog
        open={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
      >
        <DialogTitle>Çıkış Yap</DialogTitle>
        <DialogContent>
          <Typography>
            Çıkış yapmak istediğinizden emin misiniz?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogoutDialog(false)}>
            İptal
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              // Çıkış işlemleri buraya
              setShowLogoutDialog(false);
            }}
          >
            Çıkış Yap
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Settings; 