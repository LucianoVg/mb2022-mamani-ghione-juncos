import { app } from "../../firebase.config";
import { useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import axios from "axios";

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const auth = getAuth(app);

  const clear = () => {
    setAuthUser(null);
  };

  const iniciarSesion = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta?correo=${email}&password=${password}`
      );
      if (res.status === 200 && res.data) {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
          console.log("FirebaseError:", error);
          await createUserWithEmailAndPassword(auth, email, password);
        } finally {
          setAuthUser(res.data);
        }
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = () =>
    signOut(auth)
      .then(clear)
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    console.log("Auth State:", authState);
    setLoading(true);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta?correo=${authState.email}`
    );
    setAuthUser(res.data);
    setLoading(false);
  };

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsuscribe();
  }, []);

  return {
    authUser,
    loading,
    error,
    iniciarSesion,
    cerrarSesion,
  };
}
