import { app } from './../firebase/config'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    User,
    signOut
} from 'firebase/auth'
import { Prisma } from './prisma'

export async function iniciarSesion(email: string, password: string) {
    const auth = getAuth(app)
    return await signInWithEmailAndPassword(auth, email, password)
}

export async function registrarse(email: string, password: string) {
    const auth = getAuth(app)
    return await createUserWithEmailAndPassword(auth, email, password)
}

export async function registrarUsuario(
    login: string, nombre: string, apellido: string, correo: string,
    dni: string, telefono: string, localidad: string,
    direccion: string) {
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
        }
    })
    return usuarioCreado !== null
}

export async function authStateChanged(onChange: (usuarioNormalizado: { email: string | null }) => void) {
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

export async function mapearUsuario(user: User) {
    const { email } = user
    return {
        email: email
    }
}

export async function cerrarSesion() {
    const auth = getAuth(app)
    return await signOut(auth)
}