import { Prisma } from "./prisma";

export async function listarNoticia(id: number) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.findMany({
     
        orderBy: {
            fecha: 'asc'
        }
    }
    )
}

export async function verNoticia(id: number) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.findUnique({
        where: {
            id: id
        }
    }
    )
}

export async function agregarNoticia(titulo: string, fecha: Date, descripcion: string) {
    const agregar = await Prisma.newPrisma().noticiasYnovedades.create({
        data: {
            titulo: titulo,
            fecha: fecha,
            descripcion: descripcion
        }
    }

    )
}


export async function editarNoticia(id: number, titulo: string, fecha: Date, descripcion: string) {
    const agregar = Prisma.newPrisma().noticiasYnovedades.update({
        data: {
            titulo: titulo,
            fecha: fecha,
            descripcion: descripcion
        },
        where: {
            id: id
        }
    }

    )
}

export async function eliminarNoticia(id: number) {
    const agregar = Prisma.newPrisma().noticiasYnovedades.delete({
        where: {
            id: id
        }
    }

    )
}