import { Prisma } from "./prisma";

export default async function traerEnfermedades(idUsuario) {
    try {
        const enfermedades = await Prisma.newPrisma.enfermedadesxusuario.findMany({
            include: {
                enfermedad: true
            },
            where: {
                idusuario: Number(idUsuario)
            }
        })
        return enfermedades
    } catch (error) {
        console.log(error);
    }
}