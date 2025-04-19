import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchMenuItems } from '../store/slices/menuSlice';
import { addItem } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

function Menu() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenuItems());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    // Ensure we have all required fields
    if (!item || !item._id || !item.name || typeof item.price !== 'number') {
      console.error('Invalid menu item:', item);
      toast.error('Failed to add item to cart');
      return;
    }

    dispatch(addItem({ 
      item: {
        _id: item._id,
        id: item._id, // Add both _id and id for compatibility
        name: item.name,
        price: item.price,
        specialInstructions: item.specialInstructions
      }, 
      quantity: 1 
    }));
    toast.success(`Added ${item.name} to cart`);
  };

  if (status === 'loading') {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Error loading menu: {error}
      </Alert>
    );
  }

  // Group items by category
  const categories = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Our Menu
      </Typography>

      {Object.entries(categories).map(([category, items]) => (
        <Box key={category} mb={6}>
          <Typography variant="h5" component="h2" gutterBottom>
            {category}
          </Typography>
          <Divider sx={{ mb: 3 }} />

          <Grid container spacing={3}>
            {items.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card>
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {item.description}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${item.price.toFixed(2)}
                    </Typography>
                    {item.ingredients && item.ingredients.length > 0 && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Ingredients: {item.ingredients.join(', ')}
                      </Typography>
                    )}
                    {item.allergens && item.allergens.length > 0 && (
                      <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        Allergens: {item.allergens.join(', ')}
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                    >
                      Add to Cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default Menu; 