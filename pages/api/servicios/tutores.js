import { Prisma } from "./prisma";

export default async function traerTutores() {
    try {
        const tutores = await Prisma.newPrisma.usuario.findMany({
            // include: {
            //   tutor: true
            // },
            where: {
                idrol: 6
            }

        });
        return tutores
    } catch (error) {
        console.error(error);
    }
}

export async function traerTutor(idusuario) {
    try {
        const tutor = await Prisma.newPrisma.usuario.findFirst({
            where: {
                usuario: {
                    id: Number(idusuario)
                }
            }
        })
        return tutor
    } catch (error) {
        console.log(error);
    }
}

