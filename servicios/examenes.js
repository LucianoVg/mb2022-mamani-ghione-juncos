import { prisma } from "../prisma/db";

export async function traerFechaExamenes() {
    try {
        const examenes = await prisma.fechaExamen.findMany({
            include: {
                usuario: true
            }
        })
        return examenes
    } catch (error) {
        console.log(error);
    }
}

export async function guardarFechaExamen(titulo, fechaInicio, fechaFin, idUsuario) {
    try {
        const fechaExamen = await prisma.fechaExamen.create({
            data: {
                titulo: titulo,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                idUsuario: idUsuario
            }
        })
        return fechaExamen
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarExamen(id, titulo, fechaInicio, fechaFin, idUsuario) {
    try {
        const examen = await prisma.fechaExamen.update({
            data: {
                titulo: titulo,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                idUsuario: idUsuario
            },
            where: {
                id: id
            }
        })
        return examen
    } catch (error) {
        console.log(error);
    }
}

export async function borrarExamen(id) {
    try {
        const examen = await prisma.fechaExamen.delete({
            where: {
                id: id
            }
        })
        return examen
    } catch (error) {
        console.log(error);
    }
}