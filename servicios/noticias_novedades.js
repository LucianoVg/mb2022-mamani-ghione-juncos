import { Prisma } from "./prisma";

export async function traerNoticia(id = 0) {
    try {
        const noticias = id !== 0 ? await Prisma.newPrisma().noticiasynovedades.findUnique({
            where: {
                id: Number(id)
            }
        }) : await Prisma.newPrisma().noticiasynovedades.findMany({
            orderBy: {
                creadaen: 'desc'
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
    const agregar = await Prisma.newPrisma().noticiasynovedades.create({
        data: {
            titulo: titulo,
            creadaen: new Date(creadaEn),
            url: url,
            descripcion: descripcion,
            idusuario: Number(idUsuario)
        }
    })
    Prisma.disconnect()
    return agregar
}


export async function editarNoticia(id, titulo, url, descripcion, actualizadaEn) {
    const editar = Prisma.newPrisma().noticiasynovedades.update({
        data: {
            titulo: titulo,
            url: url,
            descripcion: descripcion,
            actualizadaen: new Date(actualizadaEn)
        },
        where: {
            id: Number(id)
        }
    })
    Prisma.disconnect()
    return editar
}

export async function eliminarNoticia(id) {
    const eliminar = await Prisma.newPrisma().noticiasynovedades.delete({
        where: {
            id: Number(id)
        }
    })
    Prisma.disconnect()
    return eliminar
}