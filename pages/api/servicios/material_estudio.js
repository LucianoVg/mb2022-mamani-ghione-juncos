import { Prisma } from "./prisma";

export default async function guardarMaterialEstudio(titulo, url, fecha, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await Prisma.newPrisma.materialestudio.create({
            data: {
                titulo: titulo,
                url: url,
                fecha: fecha,
                idcursoxdivision: Number(idCurso),
                idmateria: Number(idMateria),
                idtrimestre: Number(idTrimestre),
                idusuario: Number(idUsuario)
            }
        })
        console.log(materialEstudio);
        return materialEstudio
    } catch (error) {
        console.log(error);
    }
}

export async function descargarMaterialEstudio(idTrimestre, idCurso) {
    try {
        const material_estudio = await Prisma.newPrisma.materialestudio.findMany({
            where: {
                AND: [
                    {
                        trimestre: {
                            id: Number(idTrimestre)
                        }
                    },
                    {
                        cursoxdivision: {
                            id: Number(idCurso)
                        }
                    }
                ]
            }
        })
        return material_estudio
    } catch (error) {
        throw error
    }
}