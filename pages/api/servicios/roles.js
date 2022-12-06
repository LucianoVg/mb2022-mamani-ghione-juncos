import { Prisma } from "./prisma";

export default async function traerRoles() {
    try {
        return await Prisma.newPrisma.rol.findMany()
    } catch (error) {
        console.log(error);
    }
}