import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {

  const LOCAL_STORAGE_KEY = "user";

  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing auth user from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    if (authUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
