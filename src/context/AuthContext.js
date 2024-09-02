import { createContext, useContext, useState } from "react";

const AuthProvider = createContext();

const AuthContext = ({ children }) => {
  const [auth, setAuth] = useState({
    user:null,
    token:"",
    isAuthenticated:false,
  });

  return (
    <AuthProvider.Provider value={{ auth, setAuth }}>
      {children}
    </AuthProvider.Provider>
  );
};

const useAuth = () => useContext(AuthProvider);

export { useAuth, AuthContext };
