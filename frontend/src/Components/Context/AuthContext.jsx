import { createContext, useContext, useState,} from 'react';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to check the token is in local storange by boolean conditiion (!!)
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  
  //Function for login 
  const login = () => {
    setIsAuthenticated(true);
  };

  //Function for logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
