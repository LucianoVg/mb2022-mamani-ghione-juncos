import { Prisma } from "./prisma";

export async function traerSanciones(options) {
    try {
        const sanciones = await Prisma.newPrisma().sancion.findMany(options)
        Prisma.disconnect()
        return sanciones
    } catch (error) {
        console.error(error);
    }
}

export async function generarSancion(idUsuario, idAlumno = 0, idCurso = 0, motivo, idTipoSancion, fecha) {
    try {
        if (idCurso !== 0) {
            const sanciones = []
            const alumnos = await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idcursoxdivision: Number(idCurso)
                }
            })
            alumnos.forEach(async (a) => {
                const sancion = await Prisma.newPrisma().$executeRaw`INSERT INTO sancion (fecha, motivo, idtiposancion, idalumnoxcursoxdivision) VALUES(${fecha}, ${motivo}, ${Number(idTipoSancion)}, ${Number(a.id)});`
                console.log(sancion);

                const idsSancion = await Prisma.newPrisma().$queryRaw`SELECT id FROM sancion WHERE idalumnoxcursoxdivision = ${Number(a.id)}`

                await Prisma.newPrisma().$executeRaw`INSERT INTO sancionxusuario (idsancion, idusuario) VALUES(${idsSancion[0]?.id}, ${Number(idUsuario)})`
            })
            return sanciones

        } else {
            const sancion = await Prisma.newPrisma().sancion.create({
                data: {
                    fecha: fecha,
                    motivo: motivo,
                    tiposancion: {
                        connect: {
                            id: Number(idTipoSancion)
                        }
                    },
                    alumnoxcursoxdivision: {
                        connect: {
                            id: Number(idAlumno)
                        }
                    },
                    sancionxusuario: {
                        create: {
                            idUsuario: Number(idUsuario),
                        }
                    },
                }
            })
            return sancion
        }
    } catch (error) {
        console.log(error);
    }
}

export async function traerTipoSanciones() {
    try {
        const tipoSanciones = await Prisma.newPrisma().tiposancion.findMany()
        return tipoSanciones
    } catch (error) {
        console.error(error);
    }
}

export async function obtenerSancion(id) {
    try {
        const sancion = await Prisma.newPrisma().sancion.findUnique({
            include: {
                tipoSancion: true,
                alumnoxcursoxdivision: {
                    include: {
                        usuario: true,
                        cursoxdivision: {
                            include: {
                                curso: true,
                                division: true
                            }
                        }
                    }
                }
            },
            where: {
                id: id
            }
        })
        return sancion
    } catch (error) {
        console.error(error);
    }
}

export async function actualizarSancion(
    id,
    idUsuario,
    idCurso = '',
    idAlumno = '',
    idTipoSancion,
    motivo,
    fecha) {
    try {
        if (idCurso !== '') {
            const alumnos = await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idcursoxdivision: idCurso
                }
            })

            let sancionCuenta = 0
            alumnos.forEach(async (a) => {
                const sanciones = await Prisma.newPrisma().$executeRaw`UPDATE sancion SET fecha = ${fecha}, motivo = ${motivo}, idtiposancion = ${idTipoSancion}, idalumnoxcursoxdivision = ${a.id} WHERE id = ${id}`
                console.log(sanciones);

                sancionCuenta += sanciones
                // const sancionesXUsuario = await Prisma.newPrisma().$executeRaw`UPDATE sancionXusuario SET idSancion = ${}`
            })
            return sancionCuenta
        } else {
            const sancionXUsuario = await Prisma.newPrisma().sancionxusuario.findFirst({
                where: {
                    idsancion: id
                }
            })
            console.log(sancionXUsuario);
            const sancion = await Prisma.newPrisma().sancion.update({
                data: {
                    fecha: fecha,
                    motivo: motivo,
                    alumnoxcursoxdivision: {
                        connect: {
                            id: idAlumno
                        }
                    },
                    tiposancion: {
                        connect: {
                            id: idTipoSancion
                        }
                    },
                    sancionxusuario: {
                        connect: {
                            id: sancionXUsuario?.id
                        },
                        update: {
                            data: {
                                idusuario: idUsuario
                            },
                            where: {
                                id: sancionXUsuario?.id
                            }
                        }
                    }
                },
                where: {
                    id: id
                }
            })
            return sancion

        }
    } catch (error) {
        console.error(error);
    }
}
