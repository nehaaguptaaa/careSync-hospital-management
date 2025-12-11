import { createContext, useState } from "react";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const loginUser = (jwtToken, user) => {
    setToken(jwtToken);
    setUser(user);
    console.log("Login method called", jwtToken, user);
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const logOut = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <authContext.Provider value={{ token, user, loginUser, logOut }}>
      {children}
    </authContext.Provider>
  );
};