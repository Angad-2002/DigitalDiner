import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  ShoppingCart as CartIcon,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Browse Menu',
      description: 'Explore our delicious menu items and find your favorites',
      icon: <RestaurantIcon fontSize="large" color="primary" />,
      action: () => navigate('/menu'),
    },
    {
      title: 'Order Online',
      description: 'Place your order online and get it delivered to your doorstep',
      icon: <CartIcon fontSize="large" color="primary" />,
      action: () => navigate('/menu'),
    },
  ];

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: { xs: 6, md: 8 },
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ typography: { xs: 'h3', md: 'h2' } }}
          >
            Welcome to Digital Diner
          </Typography>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ typography: { xs: 'h6', md: 'h5' } }}
          >
            Delicious food delivered to your doorstep
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => navigate('/menu')}
            sx={{ mt: 4 }}
          >
            Order Now
          </Button>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 8 } }}>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h5" component="h2" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {feature.description}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={feature.action}
                    sx={{ mt: 2 }}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 