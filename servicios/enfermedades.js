import { prisma } from "../prisma/db";

export default async function traerEnfermedades() {
    try {
        const enfermedades = await prisma.enfermedad.findMany()
        return enfermedades
    } catch (error) {
        console.log(error);
    }
}