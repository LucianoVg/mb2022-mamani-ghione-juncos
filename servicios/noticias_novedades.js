import { Prisma } from "./prisma";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()

export async function traerNoticia() {
    
    const noticias = await prisma.noticiasYnovedades.findMany({
        orderBy: {
            fecha: 'asc'
        }
    })
    return noticias
}


export async function agregarNoticia(titulo, fecha, url, descripcion) {
    
    const agregar = await prisma.noticiasYnovedades.create({
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