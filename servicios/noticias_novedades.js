import { Prisma } from "./prisma";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()

export async function traerNoticia(id = 0) {
    const noticias = id !== 0 ? await prisma.noticiasYnovedades.findUnique({
        where: {
            id: id
        }
    }) : await prisma.noticiasYnovedades.findMany({
        orderBy: {
            creadaEn: 'desc'
        }
    })
    return noticias
}

export async function agregarNoticia(titulo, creadaEn, url, descripcion, idUsuario) {

    const agregar = await prisma.noticiasYnovedades.create({
        data: {
            titulo: titulo,
            creadaEn: new Date(creadaEn),
            url: url,
            descripcion: descripcion,
            idUsuario: idUsuario
        }
    })

    return agregar
}


export async function editarNoticia(id, titulo, url, descripcion, actualizadaEn) {
    const editar = prisma.noticiasYnovedades.update({
        data: {
            titulo: titulo,
            url: url,
            descripcion: descripcion,
            actualizadaEn: new Date(actualizadaEn)
        },
        where: {
            id: id
        }
    })
    return editar
}

export async function eliminarNoticia(id) {
    const eliminar = await prisma.noticiasYnovedades.delete({
        where: {
            id: id
        }
    })
    return eliminar
}