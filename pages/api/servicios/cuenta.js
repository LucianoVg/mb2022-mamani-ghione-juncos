import { app } from '../../../firebase.config'
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
    contrasenia, sexo, idCurso = 0,
    idUsuario, esAlumno = false, esDocente = false, idMaterias) {

    try {
        if (esAlumno) {
            const estadoalumno = await Prisma.newPrisma.estadoalumno.findFirst({
                where: {
                    estado: 'Regular'
                }
            })
            let alumno = await Prisma.newPrisma.usuario.create({
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
                    password: contrasenia,
                    alumnoxcursoxdivision: {
                        create: {
                            tutor: {
                                connect: {
                                    id: Number(idTutor)
                                }
                            },
                            cursoxdivision: {
                                connect: {
                                    id: Number(idCurso)
                                }
                            },
                            estadoalumno: {
                                connect: {
                                    id: Number(estadoalumno?.id)
                                }
                            },
                            fechamatriculacion: new Date().toLocaleDateString('es-AR').split('T')[0],
                            asistencia: {
                                create: {
                                    presente: false,
                                    ausente: false,
                                    ausentejustificado: false,
                                    llegadatarde: false,
                                    llegadatardejustificada: false,
                                    mediafalta: false,
                                    mediafaltajustificada: false,
                                    creadoen: new Date().toLocaleDateString('es-AR').split('T')[0],
                                    usuario: {
                                        connect: {
                                            id: Number(idUsuario)
                                        }
                                    },
                                }
                            }
                        }
                    }
                }
            })
            return alumno
        }
        else if (esDocente) {
            let docente = await Prisma.newPrisma.usuario.create({
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
                    password: contrasenia,
                }
            })
            idMaterias?.map(async (idMateria) => {
                const docentexmateria = await Prisma.newPrisma.docentexmateria.create({
                    data: {
                        materia: {
                            connect: {
                                id: idMateria
                            }
                        },
                        usuario: {
                            connect: {
                                id: docente.id
                            }
                        },
                        asistenciadocente: {
                            create: {
                                presente: false,
                                ausente: false,
                                ausentejustificado: false,
                                llegadatarde: false,
                                llegadatardejustificada: false,
                                mediafalta: false,
                                mediafaltajustificada: false,
                                creadoen: new Date().toLocaleDateString('es-AR').split('T')[0],
                                usuario: {
                                    connect: {
                                        id: Number(idUsuario)
                                    }
                                },
                            }
                        }
                    }
                })
                console.log(docentexmateria);
            })
            return docente
        } else {
            let usuario = await Prisma.newPrisma.usuario.create({
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
                    password: contrasenia,
                }
            })
            return usuario
        }
    } catch (error) {
        console.log(error);
    }
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
        const usuario = await Prisma.newPrisma.usuario.findFirst({
            include: {
                rol: true
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