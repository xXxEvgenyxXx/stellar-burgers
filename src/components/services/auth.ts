import { createContext, useContext } from 'react';

interface AuthContextType {
  user: boolean | null;
  isAuthChecked: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthChecked: false
});

export const useAuth = () => useContext(AuthContext);
