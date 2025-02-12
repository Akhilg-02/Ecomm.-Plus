import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  Container,
  Grid2 as Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { CartContext } from "./Context/CartContext";


const theme = createTheme({
  palette: {
    primary: {
      main: "#e91e63",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const AddtoCart = ({ event}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToCart } = useContext(CartContext);
  const userId =  localStorage.getItem("userId")

  const handleAddToCart = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const cartApi = `${process.env.REACT_APP_API_BASE_URL}/add-cart`;
      const requestData = {
        userId, 
        products: [
          { productId: event._id, quantity: 1 }
        ]
      };
      let response = await axios.post(cartApi,requestData);
      //console.log("Cart Response:", response.data);

      addToCart(response);
      alert("Seat added to cart");
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <ThemeProvider theme={theme}>
      <Container>
      <Box
          sx={{
            mt: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
          >
            {isSubmitting ? "Adding..." : "Confirm Selection"}
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default AddtoCart;
