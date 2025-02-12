import "./App.css";
import { AuthProvider } from "./Components/Context/AuthContext";
import MainRoutes from "./Components/Routes/MainRoutes";
import { CartProvider } from "./Components/Context/CartContext";
import NavigationBar from "./Components/NavigationBar";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <NavigationBar/>
          <MainRoutes />
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
