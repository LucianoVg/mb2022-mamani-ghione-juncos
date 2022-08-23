import { app } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

import { Prisma } from './prisma'
import { useEffect, useState } from 'react'


export async function registrarUsuario(
    login, nombre, apellido, correo,
    dni, telefono, localidad,
    direccion, idRol, contrasenia) {
    const usuarioCreado = await Prisma.newPrisma().usuario.create({
        data: {
            login: login,
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            correo: correo,
            localidad: localidad,
            telefono: telefono,
            direccion: direccion,
            idRol: idRol,
            password: contrasenia
        }
    })
    Prisma.disconnect()

    return usuarioCreado !== null
}

const formatAuthUser = (user) => ({
    uid: user.uid,
    email: user.email
})

export default function useFirebaseAuth() {
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const auth = getAuth(app)

    const clear = () => {
        setAuthUser(null)
    }

    const iniciarSesion = (email, password) => signInWithEmailAndPassword(auth, email, password)

    const registrarse = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const cerrarSesion = () => signOut(auth).then(clear)

    const authStateChanged = async (authState) => {
        if (!authState) {
            setAuthUser(null)
            setLoading(false)
            return;
        }
        setLoading(true)
        var formattedUser = formatAuthUser(authState)
        setAuthUser(formattedUser)
        setLoading(false)
    }

    useEffect(() => {
        const unsuscribe = auth.onAuthStateChanged(authStateChanged)
        return () => unsuscribe()
    }, [])

    return {
        authUser,
        loading,
        iniciarSesion,
        registrarse,
        cerrarSesion
    }
}

