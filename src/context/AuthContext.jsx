import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check localStorage for user data on mount
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (error) {
      console.log("================================================")
      console.error("Failed to parse stored user:", error);
    }
    setLoading(false);

    
  }, []);

  const login = async (email, password) => {
    try {
      console.log("🔐 Login attempt for:", email);
      const { data } = await api.post("/auth/login", { email, password });
      console.log("✅ Login response received:", data);

      // Wait for cookie to be set
      await new Promise(resolve => setTimeout(resolve, 200));
      console.log("✅ Waited 200ms for cookie to be set");

      // Determine user role by making a test request
      let userData = { email, isAdmin: false, name: email.split("@")[0] };

      try {
        console.log("🔍 Checking if user is admin by testing /order/admin/orders...");
        // Try admin endpoint - if it works, user is admin
        await api.get("/order/admin/orders", { params: { limit: 1 } });
        userData.isAdmin = true;
        console.log("✅ User is ADMIN");
      } catch (error) {
        // Admin endpoint failed, user is regular user
        console.log("ℹ️ User is REGULAR USER (admin check failed with", error.response?.status, ")");
        userData.isAdmin = false;
      }

      localStorage.setItem("user", JSON.stringify(userData));
      console.log("💾 Stored user in localStorage:", userData);
      
      setUser(userData);
      console.log("✅ Set user state");
      
      console.log("✅ Login success, about to return", userData);
      return { success: true, isAdmin: userData.isAdmin };
    } catch (error) {
      console.error("❌ Login failed:", error.response?.status, error.response?.data || error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      await api.post("/auth/register", { name, email, password });
      return { success: true, message: "Registration successful. Please login." };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};


