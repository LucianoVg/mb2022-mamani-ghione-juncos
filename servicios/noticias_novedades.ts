import { url } from "inspector";
import { Prisma } from "./prisma";

export async function listarNoticia(id: number) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.findMany({
     
        orderBy: {
            fecha: 'asc'
        }
    }
    )
    return listarNoticia
}

export async function verNoticia(id: number) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.findUnique({
        where: {
            id: id
        }
    }
    )
    return verNoticia
}

export async function agregarNoticia(titulo: string, fecha: Date, url:string, descripcion: string) {
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


export async function editarNoticia(id: number, titulo: string,  url:string, fecha: Date, descripcion: string) {
    const agregar = Prisma.newPrisma().noticiasYnovedades.update({
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
    return editarNoticia
}

export async function eliminarNoticia(id: number) {
    const agregar = Prisma.newPrisma().noticiasYnovedades.delete({
        where: {
            id: id
        }
    }

    )
    return eliminarNoticia
}