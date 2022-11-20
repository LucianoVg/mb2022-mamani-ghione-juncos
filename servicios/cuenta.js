import { app } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'

import { prisma } from '../prisma/db'
import { useEffect, useState } from 'react'


export async function registrarUsuario(
    login, nombre, apellido, correo,
    legajo, telefono, localidad,
    direccion, idRol, idTutor = '',
    contrasenia, sexo, idCurso = '') {
    const usuarioCreado = idTutor.length && idCurso.length ? await prisma.usuario.create({
        data: {
            login: login,
            nombre: nombre,
            apellido: apellido,
            legajo: legajo,
            correo: correo,
            localidad: localidad,
            telefono: telefono,
            direccion: direccion,
            idRol: idRol,
            idTutor: idTutor,
            sexo: sexo,
            password: contrasenia,
            alumnoXcursoXdivision: {
                connectOrCreate: {
                    create: {
                        idCursoXDivision: idCurso,
                        anoActual: new Date(),
                        idEstadoAlumno: 1,
                    }
                }
            }
        }
    }) : await prisma.usuario.create({
        data: {
            login: login,
            nombre: nombre,
            apellido: apellido,
            legajo: legajo,
            correo: correo,
            localidad: localidad,
            telefono: telefono,
            direccion: direccion,
            idRol: idRol,
            sexo: sexo,
            password: contrasenia
        }
    })

    return usuarioCreado
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

export async function traerUsuario(correo, password) {
    try {
        const usuario = await prisma.usuario.findFirst({
            include: {
                rol: true,
                alumnoXcursoXdivision: {
                    include: {
                        cursoXdivision: {
                            include: {
                                curso: true,
                                division: true
                            }
                        }
                    }
                }
            },
            where: {
                AND: [
                    { correo: correo },
                    { password: password }
                ]
            }
        })
        return usuario
    } catch (error) {
        console.log(error);
    }
}