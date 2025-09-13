import { createContext, useContext } from 'react';

interface AuthContextType {
  user: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: false
});

export const useAuth = () => useContext(AuthContext);
