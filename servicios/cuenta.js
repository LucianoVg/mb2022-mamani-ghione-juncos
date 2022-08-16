import { app } from '../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
    signOut
} from 'firebase/auth'
import { Prisma } from './prisma'

export async function iniciarSesion(email, password) {
    const auth = getAuth(app)
    return await signInWithEmailAndPassword(auth, email, password)
}

export async function registrarse(email, password) {
    const auth = getAuth(app)
    return await createUserWithEmailAndPassword(auth, email, password)
}

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
    return usuarioCreado !== null
}

export async function authStateChanged(onChange) {
    const auth = getAuth(app)
    onAuthStateChanged(auth, user => {
        if (user) {
            mapearUsuario(user)
                .then(usuarioNormalizado => {
                    onChange(usuarioNormalizado)
                })
        }
    })
}

export async function mapearUsuario(user) {
    const { email } = user
    return {
        email: email
    }
}

export async function cerrarSesion() {
    const auth = getAuth(app)
    return await signOut(auth)
}