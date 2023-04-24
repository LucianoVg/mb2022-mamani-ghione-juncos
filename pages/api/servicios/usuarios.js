import { Prisma } from "./prisma";

export default async function traerUsuarios(options) {
    try {
        console.log(options);
        return await Prisma.newPrisma.usuario.findMany(options)
    } catch (error) {
        console.log(error);
    }
}


export async function traerUsuario() {
    try {
        return Prisma.newPrisma.usuario.findMany()
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarUsuario(id, dataUsuario) {
    try {
        let data = {}
        if (dataUsuario.nombre) {
            data = { ...data, nombre: dataUsuario.nombre }
        }
        if (dataUsuario.apellido) {
            data = { ...data, apellido: dataUsuario.apellido }
        }
        if (dataUsuario.password) {
            data = { ...data, password: dataUsuario.password }
        }
        if (dataUsuario.legajo) {
            data = { ...data, legajo: dataUsuario.legajo }
        }
        if (dataUsuario.correo) {
            data = { ...data, correo: dataUsuario.correo }
        }
        if (dataUsuario.localidad) {
            data = { ...data, localidad: dataUsuario.localidad }
        }
        if (dataUsuario.direccion) {
            data = { ...data, direccion: dataUsuario.direccion }
        }
        if (dataUsuario.telefono) {
            data = { ...data, telefono: dataUsuario.telefono }
        }
        if (dataUsuario.fechanacimiento) {
            data = { ...data, fechanacimiento: dataUsuario.fechanacimiento }
        }
        console.log(data);
        const usuario = await Prisma.newPrisma.usuario.update({
            data: data,
            where: {
                id: Number(id)
            }
        })
        console.log(usuario);
        return "Usuario actualizado"
    } catch (error) {
        console.log(error);
        return error.message
    }
}