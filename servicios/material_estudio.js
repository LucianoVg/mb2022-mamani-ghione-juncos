import { Prisma } from "./prisma";

export default async function guardarMaterialEstudio(titulo, url, fecha, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await Prisma.newPrisma().materialEstudio.create({
            data: {
                titulo: titulo,
                url: url,
                fecha: fecha,
                idCursoXDivision: Number(idCurso),
                idMateria: Number(idMateria),
                idTrimestre: Number(idTrimestre),
                idUsuario: Number(idUsuario)
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