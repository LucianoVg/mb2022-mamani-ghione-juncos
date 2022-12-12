import { Prisma } from "./prisma";

export async function traerFechaExamenes() {
    try {
        const examenes = await Prisma.newPrisma.fechaexamen.findMany({
            include: {
                usuario: true,
                curso: {
                    include: {
                        curso: true,
                        division: true
                    }
                }
            }
        })
        return examenes
    } catch (error) {
        console.log(error);
    }
}

export async function guardarFechaExamen(titulo, fechaInicio, fechaFin, idUsuario, idCurso) {
    try {
        const fechaExamen = await Prisma.newPrisma.fechaexamen.create({
            data: {
                titulo: titulo,
                fechainicio: fechaInicio,
                fechafin: fechaFin,
                usuario: {
                    connect: {
                        id: Number(idUsuario)
                    }
                },
                curso: {
                    connect: {
                        id: Number(idCurso)
                    }
                }
            }
        })
        return fechaExamen
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarExamen(id, titulo, fechaInicio, fechaFin, idUsuario, idCurso) {
    try {
        const examen = await Prisma.newPrisma.fechaexamen.update({
            data: {
                titulo: titulo,
                fechainicio: fechaInicio,
                fechafin: fechaFin,
                idusuario: Number(idUsuario),
                idcurso: Number(idCurso)
            },
            where: {
                id: Number(id)
            }
        })
        return examen
    } catch (error) {
        console.log(error);
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