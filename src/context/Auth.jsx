import { createContext } from "react";

export const Auth = createContext({
  isAuthenticated: true,
  setIsAuthenticated: () => {},
});
