import { Prisma } from "./prisma";

export default async function guardarMaterialEstudio(titulo, url, fecha, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await Prisma.newPrisma().materialEstudio.create({
            data: {
                titulo: titulo,
                url: url,
                fecha: fecha,
                cursoXDivision: {
                    connect: {
                        id: idCurso
                    }
                },
                materia: {
                    connect: {
                        id: idMateria
                    }
                },
                trimestre: {
                    connect: {
                        id: idTrimestre
                    }
                },
                usuario: {
                    connect: {
                        id: idUsuario
                    }
                }
            }
        })
        console.log(materialEstudio);
        return materialEstudio
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}