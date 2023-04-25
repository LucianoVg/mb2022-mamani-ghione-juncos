import { Prisma } from "./prisma";

export default async function guardarMaterialEstudio(titulo, url, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await Prisma.newPrisma.materialestudio.create({
            data: {
                titulo: titulo,
                url: url,
                fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
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

export async function descargarMaterialEstudio(idTrimestre, idCurso, idMateria) {
    try {
        let and = [{ trimestre: { id: Number(idTrimestre) } }]

        if (idCurso) {
            and.push({ cursoxdivision: { id: Number(idCurso) } })
        }
        if (idMateria) {
            and.push({ materia: { id: Number(idMateria) } })
        }
        const material_estudio = await Prisma.newPrisma.materialestudio.findMany({
            where: {
                AND: and
            }
        })
        return material_estudio
    } catch (error) {
        throw error
    }
}