import { Prisma } from "./prisma";

export default async function traerUsuarios(options) {
    try {
        return Prisma.newPrisma.usuario.findMany(options)
    } catch (error) {
        console.log(error);
    }
}