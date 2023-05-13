import { createContext, useContext } from "react";
import useFirebaseAuth from "../hooks/firebaseAuth";

const authUserContext = createContext({
  authUser: null,
  loading: true,
  error: "",
  iniciarSesion: async (email, password) => {},
  cerrarSesion: async () => {},
});

export function AuthUserProvider({ children }) {
  const auth = useFirebaseAuth();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

export const useAuth = () => useContext(authUserContext);
