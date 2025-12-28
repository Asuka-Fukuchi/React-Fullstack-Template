import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import type { UserPublic, LoginCredentials } from '../types/auth.types';
import { loginService, logoutService, restoreUser } from '../services/auth.service';
import { updateUser, deleteUser } from '../services/user.service';

// アプリ全体に配布したい機能一覧を宣言
interface AuthContextType {
  user: UserPublic | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  currentUserSnapshot: () => UserPublic | null;
  updateProfile: (data: Partial<UserPublic>) => Promise<void>;
  deleteAccount: () => Promise<void>;
}

// 機能一覧を箱にまとめる
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProviderを子コンポーネントのみで使用できるようにする
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  // 状態管理のための宣言
  const [user, setUser] = useState<UserPublic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  // タイマーの開始処理
  const startLogoutTimer = (token: string) => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);

    try {
      const decoded: any = jwtDecode(token);
      
      if (!decoded?.exp) {
        logout();
        return;
      }

      const expMs = decoded.exp * 1000;
      const now = Date.now();
      const timeout = expMs - now;

      if (timeout > 0) {
        logoutTimer.current = setTimeout(() => {
          logout();
          alert("Session expired. Please log in again.");
          navigate("/login?sessionExpired=1");
        }, timeout);
      }
    } catch (err) {
      console.error("JWT decode error", err);
      logout();
    }
  };

  // Login handler
  const login = async (credentials: LoginCredentials) => {
    try {
      const loggedInUser = await loginService(credentials);
      setUser(loggedInUser);

      const token = localStorage.getItem("token");
      if (token) startLogoutTimer(token);
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  // Logout handler
  const logout = () => {
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutService();
    setUser(null);
    navigate("/login");
  };

  const currentUserSnapshot = () => user;

  // ユーザー更新処理
  const updateProfile = async (data: Partial<UserPublic>) => {
    if (!user) throw new Error("No user logged in");
    const updatedUser = await updateUser(user.id, data);
    setUser(updatedUser);
  };

  // ユーザー削除処理
  const deleteAccount = async () => {
    if (!user) throw new Error("No user logged in");
    await deleteUser(user.id);
    logout();
  };

  // 画面が開かれたときにセッションが有効なユーザーがいるかを確認
  useEffect(() => {
    (async () => {
      const restoredUser = await restoreUser();
      setUser(restoredUser);

      const token = localStorage.getItem("token");
      if (restoredUser && token) {
        startLogoutTimer(token);
      }

      setIsLoading(false);
    })();
  }, []);

  // これまでに宣言してきた処理を使えるようにする
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      currentUserSnapshot,
      updateProfile,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// これまでのコードを他のファイルで使えるように輸出
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within AuthProvider");
  return context;
};