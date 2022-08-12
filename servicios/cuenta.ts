import { Prisma } from "../servicios/prisma";

export async function iniciarSesion(login: string, password: string) {
    const usuario = await Prisma.newPrisma().usuario.findFirst({
        where: {
            login: login,
            password: password
        }
    })
    return usuario
}