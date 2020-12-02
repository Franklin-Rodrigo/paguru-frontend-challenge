import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import api from "../services/api";
interface Credentials {
  username: string;
  password: string;
}
interface RegisterCredentials {
  username: string;
  password: string;
  email: string;
}
interface User {
  name: string;
  email: string;
}

interface AuthContextData {
  loading: boolean;
  signed: boolean;
  user: User | null;
  signIn(data: Credentials): Promise<void>;
  signOut(): void;
  register(data: RegisterCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storagedUser = localStorage.getItem("@r-auth:user");
    const storagedToken = localStorage.getItem("@r-auth:token");
    console.log(storagedUser);
    console.log(storagedToken);
    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
      api.defaults.headers.authorization = `token ${storagedToken}`;
    }else{
      setLoading(false);
    }

  }, []);

  async function signIn({ password, username }: Credentials) {
    const response = await api.post("/auth/", { username, password });
    setUser(response.data);
    api.defaults.headers.authorization = `token ${response.data.token}`;
    localStorage.setItem("@r-auth:user", username);
    localStorage.setItem("@r-auth:token", response.data.token);
    
    history.push('/dashboard');
    
  }
  async function register({ username, email, password }: RegisterCredentials) {
    const response = await api.post("/users/", { username, password, email });
    console.log(response);

    await signIn({ username , password });
  }

  function signOut() {
    setUser(null);
    api.defaults.headers.authorization = null;
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{ loading, signed: !!user, user, signIn, signOut, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
