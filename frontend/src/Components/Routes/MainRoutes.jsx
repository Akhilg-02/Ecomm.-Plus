import { Routes, Route } from "react-router-dom";
import Register from ".././Register";
import Login from ".././Login";
import Products from "../Products";
import PrivateRoute from "./PrivateRoutes";
import Cart from "../Cart";
import { Navigate } from "react-router-dom";
import BookingConfirmation from "../BookingConfirmation";


const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoute equiredRole="user" />}>
          <Route path="/products" element={<Products />} />
          <Route path="/cart-list" element={<Cart />} />
          <Route path="/booking-confirm" element={<BookingConfirmation />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
