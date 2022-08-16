import { url } from "inspector";
import { Prisma } from "./prisma";

export async function listarNoticia(id) {
    const noticias = await Prisma.newPrisma().noticiasYnovedades.findMany({
        orderBy: {
            fecha: 'asc'
        }
    })
    return noticias
}

export async function verNoticia(id) {
    const noticia = await Prisma.newPrisma().noticiasYnovedades.findFirst({
        where: {
            id: id
        }
    })
    return noticia
}

export async function agregarNoticia(titulo, fecha, url, descripcion) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.create({
        data: {
            titulo: titulo,
            fecha: fecha,
            url: url,
            descripcion: descripcion
        }
    }

    )

    return agregarNoticia
}


export async function editarNoticia(id, titulo, url, fecha, descripcion) {
    const editar = Prisma.newPrisma().noticiasYnovedades.update({
        data: {
            titulo: titulo,
            fecha: fecha,
            url: url,
            descripcion: descripcion
        },
        where: {
            id: id
        }
    }

    )
    return editar
}

export async function eliminarNoticia(id) {
    const eliminar = Prisma.newPrisma().noticiasYnovedades.delete({
        where: {
            id: id
        }
    }

    )
    return eliminar
}