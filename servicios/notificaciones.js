import { Prisma } from "./prisma";


export async function ListarNotificacion() {

    const listado = await Prisma.newPrisma().notificacion.findMany({
        orderBy: {
            id: 'desc'
        }
    })

    return listado
}

export async function CrearNotificacion(asunto, contenido, fecha) {


    try {
        const crear = await Prisma.newPrisma().notificacion.create({
            data: {
                asunto: asunto,
                contenido: contenido,
                fecha: fecha
            }
        })
        return crear

    } catch (err) {
        console.error(err);
    }


}