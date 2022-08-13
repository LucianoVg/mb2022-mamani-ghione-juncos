import { Prisma } from "../servicios/prisma";

export async function Menu(menu: string, url: string) {
    const rol = await Prisma.newPrisma().rol.findFirst({
    include: {
        menuXrol: true
    }
})
    return rol
}