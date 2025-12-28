// contexts/AuthContext.tsx or wherever your auth context is

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Make sure to install: npm install js-cookie @types/js-cookie

interface User {
  id: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  role: "attendee" | "organizer";
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = Cookies.get("access_token");

      if (accessToken) {
        try {
          // Fetch user details
          const response = await fetch(
            "http://localhost:8000/api/auth/users/me/",
            {
              credentials: "include", // Send cookies
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token invalid, clear cookies
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
          }
        } catch (error) {
          console.error("Auth check error:", error);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const BASEURL = "http://localhost:8000/api";

      // Step 1: Get JWT tokens (this will set cookies)
      const loginResponse = await fetch(`${BASEURL}/auth/jwt/create/`, {
        method: "POST",
        credentials: "include", // IMPORTANT: Receive cookies
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData.detail || "Invalid credentials");
      }

      const { access, refresh } = await loginResponse.json();

      console.log("✅ Login successful, cookies should be set");
      console.log("Check DevTools → Application → Cookies");

      // Step 2: Get user details using the token
      const userResponse = await fetch(`${BASEURL}/auth/users/me/`, {
        credentials: "include", // Send cookies
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user details");
      }

      const userData = await userResponse.json();
      setUser(userData);

      // Step 3: Redirect based on role
      if (userData.role === "attendee") {
        router.push("/home");
      } else if (userData.role === "organizer") {
        router.push("/dashboard");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Call logout endpoint to clear cookies on server
      await fetch("http://localhost:8000/api/auth/logout/", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear cookies on client side too
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setUser(null);
      router.push("/login");
    }
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
