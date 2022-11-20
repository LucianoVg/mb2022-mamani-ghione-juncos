import { prisma } from "../prisma/db";

export default async function guardarMaterialEstudio(titulo, url, fecha, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await prisma.materialEstudio.create({
            data: {
                titulo: titulo,
                url: url,
                fecha: fecha,
                idCursoXDivision: idCurso,
                idMateria: idMateria,
                idTrimestre: idTrimestre,
                idUsuario: idUsuario
            }
        })
        console.log(materialEstudio);
        return materialEstudio
    } catch (error) {
        console.log(error);
    }
}