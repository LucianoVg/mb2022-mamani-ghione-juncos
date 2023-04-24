import { Prisma } from "./prisma";

export default async function traerRoles(rol) {
    try {
        console.log(rol);
        let opt = {}
        if (rol) opt = { where: { tipo: { not: rol } } }
        return await Prisma.newPrisma.rol.findMany(opt)
    } catch (error) {
        console.log(error);
    }
}