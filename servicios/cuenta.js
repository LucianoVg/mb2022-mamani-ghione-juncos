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
    legajo, telefono, localidad,
    direccion, idRol, idTutor = 0,
    contrasenia, sexo, idCurso = 0) {
    const usuarioCreado = idTutor !== 0 && idCurso !== 0 ? await Prisma.newPrisma().usuario.create({
        data: {
            login: login,
            nombre: nombre,
            apellido: apellido,
            legajo: legajo,
            correo: correo,
            localidad: localidad,
            telefono: telefono,
            direccion: direccion,
            idrol: Number(idRol),
            idtutor: Number(idTutor),
            sexo: sexo,
            password: contrasenia,
            alumnoxcursoxdivision: {
                connectOrCreate: {
                    create: {
                        idcursoxdivision: Number(idCurso),
                        fechamatriculacion: new Date().toLocaleDateString('es-AR').split('T')[0],
                        idestadoalumno: 1,
                    }
                }
            }
        }
    }) : await Prisma.newPrisma().usuario.create({
        data: {
            login: login,
            nombre: nombre,
            apellido: apellido,
            legajo: legajo,
            correo: correo,
            localidad: localidad,
            telefono: telefono,
            direccion: direccion,
            idrol: Number(idRol),
            sexo: sexo,
            password: contrasenia
        }
    })
    Prisma.disconnect()

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
        const usuario = await Prisma.newPrisma().usuario.findFirst({
            include: {
                rol: true,
                alumnoxcursoxdivision: {
                    include: {
                        cursoxdivision: {
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