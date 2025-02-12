import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = ({ open, handleClose, products }) => {
  const userId =  localStorage.getItem("userId");
  const getRandomStatus = (statuses) => statuses[Math.floor(Math.random() * statuses.length)];  
    
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shippingAddress: "",
    paymentStatus: "Pending",
    orderStatus: "Pending",
  });

    // Reset formData when dialog opens
    useEffect(() => {
      if (open) {
        setFormData({
          paymentStatus: getRandomStatus(["Pending", "Failed"]),             // "Paid"
          orderStatus: getRandomStatus(["Pending", "Processing"]), //, "Shipped", "Delivered"
        });
      }
    }, [open]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const OrderUrl = `${process.env.REACT_APP_API_BASE_URL}/place-order`;
    try {
      const orderData = {
        userId,
        products,
        shippingAddress: formData.shippingAddress,
        paymentStatus: formData.paymentStatus,
        orderStatus: formData.orderStatus,
      };
      
      await axios.post(OrderUrl, orderData);
      alert("Order placed successfully!");
      handleClose();
      setTimeout(() => {
        navigate("/booking-confirm");
        window.reload()
      }, 1500);
      
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Place Order</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Shipping Address"
          name="shippingAddress"
          value={formData.shippingAddress}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Payment Status"
          name="paymentStatus"
          value={formData.paymentStatus}
          margin="normal"
          disabled
        />
        <TextField
          fullWidth
          label="Order Status"
          name="orderStatus"
          value={formData.orderStatus}
          margin="normal"
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Place Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PlaceOrder;
