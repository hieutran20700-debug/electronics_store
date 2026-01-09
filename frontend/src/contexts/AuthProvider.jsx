import React, { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { setAccessToken } from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../api/axiosClient";
import userService from "../services/user.service";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      const token = getAccessToken();
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await userService.getMe();
        setUser(res.data);
       
      } catch (error) {
        console.error("Init auth failed", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async ({ phone, password }) => {
    try {
      setLoading(true);
      const res = await authService.login({ phone, password });
      const user = res.data.user;
      const token = res.data.accessToken;
      setUser(user);
      setAccessToken(token);

      if (user.roles.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ phone, password }) => {
    try {
      setLoading(true);
      const res = await authService.register({ phone, password });
      return res;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      localStorage.removeItem("accessToken");
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ register, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
