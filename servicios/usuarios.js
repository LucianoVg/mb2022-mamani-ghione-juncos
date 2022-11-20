import { Prisma } from "./prisma";

export default async function traerUsuarios() {
    try {
        return Prisma.newPrisma().usuario.findMany({
            include: {
                rol: true
            }
        })
    } catch (error) {
        console.log(error);
    }
}