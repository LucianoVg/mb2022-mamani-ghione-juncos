import { Prisma } from "./prisma";

export default async function traerUsuarios(options) {
    try {
        return Prisma.newPrisma.usuario.findMany(options)
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarUsuario(id, enfermedades, alergias, password) {
    try {
        if (enfermedades) {
            enfermedades?.map(async (e) => {
                const enf = await Prisma.newPrisma.enfermedad.findFirst({ where: { descripcion: e } })
                const usuario = await Prisma.newPrisma.usuario.update({
                    data: {
                        enfermedadesxusuario: {
                            create: {
                                enfermedad: {
                                    connect: {
                                        id: enf?.id
                                    }
                                }
                            }
                        }
                    },
                    where: {
                        id: Number(id)
                    }
                })
                console.log(usuario);
            })
        }
        if (alergias) {
            const usuario = await Prisma.newPrisma.usuario.update({
                data: {
                    alergias: alergias
                },
                where: {
                    id: Number(id)
                }
            })
            console.log(usuario);
        }
        if (password) {
            const usuario = await Prisma.newPrisma.usuario.update({
                data: {
                    password: password
                },
                where: {
                    id: Number(id)
                }
            })
            console.log(usuario);
        }
    } catch (error) {
        console.log(error);
    }
}