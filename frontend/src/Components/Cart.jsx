import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Grid2 as Grid,
  Box,
  CircularProgress,
} from "@mui/material";
import { CartContext } from "./Context/CartContext";
import PlaceOrder from "./PlaceOrder";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  //State for the loading
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Fetch cart items based on userId
  const fetchCartBookings = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("No userId found in localStorage");
        setLoading(false);
        return;
      }

      const fetchApi = `${process.env.REACT_APP_API_BASE_URL}/get-cart/${userId}`;
      const response = await axios.get(fetchApi);

      if (response.data && response.data.cart) {
        setCart(response.data.cart.products || []);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartBookings();
  }, []);

    // Open the order dialog when clicking on btn
    const handleOpenDialog = (order) => {
      setSelectedProducts([
        {
          productId: order.productId,
          quantity: order.quantity,
          price: order.price,
        },
      ]);
      setOpenDialog(true);
    };

  // Loading condition
  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "10vh" }}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Grid container spacing={2}>
        {cart.length === 0 ? (
          <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
            Your cart is empty
          </Typography>
        ) : (
          cart.map((order, index) => (
            <Grid item xs={12} sm={6} md={6} lg={4} key={index}>
              <Card sx={{ maxWidth: 550, margin: "3rem", width: "17vw" }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={order.productId.images}
                  alt={order.productId.name}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      WebkitLineClamp: 2,
                      height: "3rem",
                      lineHeight: "1.5rem",
                    }}
                  >
                    {order.productId.name}
                  </Typography>
                  <Typography variant="body2" color="green">
                    Price: ₹ {order.productId.price}
                  </Typography>
                  <Typography variant="body2" color="green">
                    Quantity: {order.quantity}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <CardActions>
                    <Button size="small" color="primary" variant="contained" onClick={() => handleOpenDialog(order)}>
                      Order Item
                    </Button>
                  </CardActions>
                </Box>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <PlaceOrder
       open={openDialog} 
       handleClose={() => setOpenDialog(false)} 
       products={selectedProducts} 
      />
    </>
  );
};

export default Cart;
