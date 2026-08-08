import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { User, AuthContextValue, SignupData, LoginData } from "@/types/common";
import { MOCK_USERS as MOCK_USER_DB } from "@/types/common";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "vingo_auth_user";
const STORAGE_TOKEN_KEY = "vingo_auth_token";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const storedToken = localStorage.getItem(STORAGE_TOKEN_KEY);

    if (storedUser && storedToken) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (data: LoginData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      const mockEntry = MOCK_USER_DB[data.email];

      if (!mockEntry || mockEntry.password !== data.password) {
        throw new Error("Invalid email or password");
      }

      const userData = mockEntry.user;
      const token = `token-${userData.id}-${Date.now()}`;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
      localStorage.setItem(STORAGE_TOKEN_KEY, token);

      setUser(userData);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    setError(null);

    try {
      // Validate input
      if (!data.email || !data.password || !data.name) {
        throw new Error("Missing required fields");
      }

      if (data.password !== data.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (data.password.length < 8) {
        throw new Error("Password must be at least 8 characters");
      }

      // Check if user already exists
      if (MOCK_USER_DB[data.email]) {
        throw new Error("Email already registered");
      }

      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Create new user
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: data.email,
        name: data.name,
        role: "user",
        createdAt: new Date().toISOString(),
        preferences: {
          favoriteStyles: [],
          favoriteColors: [],
          favoriteMaterials: [],
        },
      };

      const token = `token-${newUser.id}-${Date.now()}`;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      localStorage.setItem(STORAGE_TOKEN_KEY, token);

      setUser(newUser);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_TOKEN_KEY);
    setUser(null);
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateProfile = useCallback(async (data: Partial<User>) => {
    if (!user) throw new Error("Not authenticated");

    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const updated = { ...user, ...data };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setUser(updated);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const value: AuthContextValue = {
    user,
    isLoading,
    isAuthenticated: user !== null,
    error,
    login,
    logout,
    signup,
    clearError,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
