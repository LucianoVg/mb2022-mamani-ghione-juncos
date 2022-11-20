import { prisma } from "../prisma/db";

export default async function traerUsuarios() {
    try {
        return prisma.usuario.findMany({
            include: {
                rol: true
            }
        })
    } catch (error) {
        console.log(error);
    }
}