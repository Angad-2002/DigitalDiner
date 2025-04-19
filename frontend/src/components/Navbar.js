import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Badge,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Restaurant as RestaurantIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { selectIsAuthenticated } from '../store/slices/authSlice';
import { selectCartItemCount } from '../store/slices/cartSlice';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItemCount = useSelector(selectCartItemCount);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await dispatch(logout());
    navigate('/admin/login');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <RestaurantIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Digital Diner
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Button color="inherit" onClick={() => navigate('/menu')}>
            Menu
          </Button>

          <Button
            color="inherit"
            startIcon={<HistoryIcon />}
            onClick={() => navigate('/order-history')}
          >
            Order History
          </Button>

          <IconButton
            color="inherit"
            onClick={() => navigate('/cart')}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <CartIcon />
            </Badge>
          </IconButton>

          {isAuthenticated ? (
            <>
              <Button color="inherit" onClick={() => navigate('/admin/dashboard')}>
                Admin Dashboard
              </Button>
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                aria-label="account menu"
              >
                <PersonIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" onClick={() => navigate('/admin/login')}>
              Admin Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 