import { Prisma } from "./prisma";

export default async function guardarMaterialEstudio(titulo, url, fecha, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await Prisma.newPrisma().materialestudio.create({
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
    } finally {
        Prisma.disconnect()
    }
}