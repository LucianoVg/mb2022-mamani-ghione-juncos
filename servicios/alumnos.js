import { orderBy } from "lodash";
import { Prisma } from "./prisma";

export default async function traerAlumnos() {
    try {
        const alumnos = await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
            include: {
                usuario: true
            }
        })
        console.log(alumnos);
        return alumnos
    } catch (error) {
        console.error(error);
    }
}


