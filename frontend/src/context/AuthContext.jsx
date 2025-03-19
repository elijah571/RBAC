import { createContext, useContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// AuthContextProvider to provide authUser to your app
export const AuthContextProvider = ({ children }) => {
  // Use "user" as the localStorage key
  const LOCAL_STORAGE_KEY = "user";

  // Load authUser from localStorage safely
  const [authUser, setAuthUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY);
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing auth user from localStorage:", error);
      return null;
    }
  });

  // Persist authUser changes to localStorage
  useEffect(() => {
    if (authUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Correct key when removing
    }
  }, [authUser]);

  // Provide authUser and setAuthUser through context
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
