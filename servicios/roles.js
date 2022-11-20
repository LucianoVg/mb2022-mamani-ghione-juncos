import { prisma } from "../prisma/db";

export default async function traerRoles() {
    try {
        return await prisma.rol.findMany()
    } catch (error) {
        console.log(error);
    }
}