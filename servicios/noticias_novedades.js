import { prisma } from "../prisma/db";

export async function traerNoticia(id = '') {
    try {
        const noticias = id !== '' ? await prisma.noticiasYnovedades.findUnique({
            where: {
                id: id
            }
        }) : await prisma.noticiasYnovedades.findMany({
            orderBy: {
                creadaEn: 'desc'
            }
        })
        return noticias
    } catch (error) {
        console.error(error);
    }
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
    const editar = await prisma.noticiasYnovedades.update({
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