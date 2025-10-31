import React from 'react';

const AuthContext = React.createContext({ isAuthenticated: false, user: null, login: () => {}, logout: () => {} });

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const flag = localStorage.getItem('dv_auth') === 'true';
    const stored = localStorage.getItem('dv_user');
    setIsAuthenticated(flag);
    setUser(stored ? JSON.parse(stored) : null);
  }, []);

  const login = (userData) => {
    localStorage.setItem('dv_auth', 'true');
    if (userData) localStorage.setItem('dv_user', JSON.stringify(userData));
    setUser(userData || null);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('dv_auth');
    localStorage.removeItem('dv_user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}


