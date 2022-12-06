import { Prisma } from "./prisma";

export default async function traerEnfermedades() {
    try {
        const enfermedades = await Prisma.newPrisma.enfermedad.findMany()
        return enfermedades
    } catch (error) {
        console.log(error);
    }
}