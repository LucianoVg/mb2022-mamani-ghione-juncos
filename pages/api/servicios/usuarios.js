import { Prisma } from "./prisma";

export default async function traerUsuarios(options) {
    try {
        return Prisma.newPrisma.usuario.findMany(options)
    } catch (error) {
        console.log(error);
    }
}

export async function actualizarUsuario(id, enfermedades, alergias) {
    try {
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
                    },
                    alergias: alergias
                },
                where: {
                    id: Number(id)
                }
            })
            console.log(usuario);
        })
    } catch (error) {
        console.log(error);
    }
}