import {
    Box,
    Typography,
    Toolbar,
    Tooltip,
    Badge,
  } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useContext } from "react";
import { CartContext } from "./Context/CartContext";


const NavigationBar = ()=> {
  
  const navigate = useNavigate();

  const {cart} = useContext(CartContext);
  
  // Getting logout function in form of Context-api
  const { logout } = useAuth();

  //Function to naviagte to specific hook
  const handleLogout = () => {
     logout();
    navigate('/login');

  };

  const handleCart = ()=>{
    navigate('/cart-list');
  }

  const handleHome = ()=>{
    navigate('/products');
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography 
          onClick={handleHome}
          variant="h6" component="div" sx={{ flexGrow: 1, cursor:"pointer" }}>
            Ecomm. Plus
          </Typography>
          <IconButton color="inherit" >

          <Badge onClick={handleCart} badgeContent={cart.length} color="secondary">
            <ShoppingCartIcon />
          </Badge>
          </IconButton>
          <Tooltip title="Logout">
          <IconButton
                size="large"
                aria-label="account of current user"
                
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleLogout}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigationBar;

