import { Prisma } from "./prisma";


export async function ListarNotificacion() {

    const listado = await Prisma.newPrisma().notificacion.findMany({
        orderBy: {
            id: 'desc'
        }
    })

    return listado
}

export async function CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso) {
    try {
        const crear = await Prisma.newPrisma().notificacion.create({
            data: {
                asunto: asunto,
                contenido: contenido,
                fecha: fecha,
                notificacionXusuario: {
                    create: {
                        idUsuario: idUsuario
                    }
                },
                idCursoDivision: idCurso
            }
        })
        return crear

    } catch (err) {
        console.error(err);
    }


}