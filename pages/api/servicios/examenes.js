import { Prisma } from "./prisma";

export async function traerFechaExamenes() {
    try {
        const examenes = await Prisma.newPrisma.fechaexamen.findMany({
            include: {
                usuario: true
            }
        })
        return examenes
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function guardarFechaExamen(titulo, fechaInicio, fechaFin, idUsuario) {
    try {
        const fechaExamen = await Prisma.newPrisma.fechaexamen.create({
            data: {
                titulo: titulo,
                fechainicio: fechaInicio,
                fechafin: fechaFin,
                idusuario: Number(idUsuario)
            }
        })
        return fechaExamen
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function actualizarExamen(id, titulo, fechaInicio, fechaFin, idUsuario) {
    try {
        const examen = await Prisma.newPrisma.fechaexamen.update({
            data: {
                titulo: titulo,
                fechainicio: fechaInicio,
                fechafin: fechaFin,
                idusuario: Number(idUsuario)
            },
            where: {
                id: Number(id)
            }
        })
        return examen
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function borrarExamen(id) {
    try {
        const examen = await Prisma.newPrisma.fechaexamen.delete({
            where: {
                id: Number(id)
            }
        })
        return examen
    } catch (error) {
        console.log(error);
    }
}