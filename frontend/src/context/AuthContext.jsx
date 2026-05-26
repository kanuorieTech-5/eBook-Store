import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  loginUser,
  registerUser,
  getProfile,
} from "../services/authService";

// =========================
// CONTEXT
// =========================
const AuthContext =
  createContext();

// =========================
// PROVIDER
// =========================
export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // LOAD USER
  // =========================
  useEffect(() => {
    const loadUser =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) {
            setLoading(false);
            return;
          }

          const data =
            await getProfile();

          setUser(data.user);
        } catch (error) {
          console.log(error);

          localStorage.removeItem(
            "token"
          );
        } finally {
          setLoading(false);
        }
      };

    loadUser();
  }, []);

  // =========================
  // LOGIN
  // =========================
  const login = async (
    email,
    password
  ) => {
    try {
      const data =
        await loginUser({
          email,
          password,
        });

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,

        message:
          error.response?.data
            ?.message ||
          "Login failed",
      };
    }
  };

  // =========================
  // REGISTER
  // =========================
  const register = async (
    name,
    email,
    password
  ) => {
    try {
      const data =
        await registerUser({
          name,
          email,
          password,
        });

      localStorage.setItem(
        "token",
        data.token
      );

      setUser(data.user);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,

        message:
          error.response?.data
            ?.message ||
          "Registration failed",
      };
    }
  };

  // =========================
  // LOGOUT
  // =========================
  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        login,

        register,

        logout,

        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// =========================
// CUSTOM HOOK
// =========================
export const useAuth = () =>
  useContext(AuthContext);