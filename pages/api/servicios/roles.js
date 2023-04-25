import { Prisma } from "./prisma";

export default async function traerRoles(rol) {
    try {
        console.log(rol);
        let opt = {}
        let and = []
        if (rol) and.push({ tipo: { not: rol } })
        if (rol === "Director") and.push({ tipo: { not: "Administrador" } })
        opt = {
            ...opt,
            where: {
                AND: and
            }
        }
        return await Prisma.newPrisma.rol.findMany(opt)
    } catch (error) {
        console.log(error);
    }
}