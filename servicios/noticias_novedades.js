import { Prisma } from "./prisma";

export async function traerNoticia(id = 0) {
    try {
        const noticias = id !== 0 ? await Prisma.newPrisma().noticiasYnovedades.findUnique({
            where: {
                id: id
            }
        }) : await Prisma.newPrisma().noticiasYnovedades.findMany({
            orderBy: {
                creadaEn: 'desc'
            }
        })
        return noticias
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function agregarNoticia(titulo, creadaEn, url, descripcion, idUsuario) {

    const agregar = await Prisma.newPrisma().noticiasYnovedades.create({
        data: {
            titulo: titulo,
            creadaEn: new Date(creadaEn),
            url: url,
            descripcion: descripcion,
            idUsuario: idUsuario
        }
    })
    Prisma.disconnect()
    return agregar
}


export async function editarNoticia(id, titulo, url, descripcion, actualizadaEn) {
    const editar = Prisma.newPrisma().noticiasYnovedades.update({
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
    Prisma.disconnect()
    return editar
}

export async function eliminarNoticia(id) {
    const eliminar = await Prisma.newPrisma().noticiasYnovedades.delete({
        where: {
            id: id
        }
    })
    Prisma.disconnect()
    return eliminar
}