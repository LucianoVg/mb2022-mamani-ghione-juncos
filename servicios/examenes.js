import { Prisma } from "./prisma";

export async function traerFechaExamenes() {
    try {
        const examenes = await Prisma.newPrisma().fechaExamen.findMany({
            include: {
                materia: true,
                usuario: true,
                curso: true
            }
        })
        return examenes
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}

export async function guardarFechaExamen(fecha, idCurso, idMateria, idUsuario) {
    try {
        const fechaExamen = await Prisma.newPrisma().fechaExamen.create({
            data: {
                fecha: fecha,
                idCurso: idCurso,
                idMateria: idMateria,
                idUsuario: idUsuario
            }
        })
        return fechaExamen
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}