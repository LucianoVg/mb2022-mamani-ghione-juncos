import { createContext, useContext } from "react";
import useFirebaseAuth from "../../pages/api/servicios/cuenta";

const authUserContext = createContext({
    authUser: null,
    loading: true,
    iniciarSesion: async () => { },
    registrarse: async () => { },
    cerrarSesion: async () => { }
})

export function AuthUserProvider({ children }) {
    const auth = useFirebaseAuth()
    return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
}

export const useAuth = () => useContext(authUserContext)