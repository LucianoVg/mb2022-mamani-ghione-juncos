import { url } from "inspector";
import { Prisma } from "./prisma";

export async function listarNoticia(id) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.findMany({

        orderBy: {
            fecha: 'asc'
        }
    }
    )
    return listarNoticia
}

export async function verNoticia() {
    const ver = await Prisma.newPrisma().noticiasYnovedades.findMany({
        // where: {
        //     id: 4
        // }
    }
    )
    return verNoticia
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