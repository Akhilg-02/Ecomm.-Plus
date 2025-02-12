import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext'; 

const PrivateRoute = ({ requiredRole }) => {
  const { isAuthenticated } = useAuth();
  const userRole = localStorage.getItem("role");

  if(!isAuthenticated){
    return <Navigate to="/login"/>
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

 return <Outlet />
};

export default PrivateRoute;