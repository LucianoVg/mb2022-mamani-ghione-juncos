import { Prisma } from "./prisma";

export async function traerSanciones(idCurso = 0, idAlumno = 0) {
    try {
        const sanciones = idCurso === 0 || idAlumno === 0
            ? await Prisma.newPrisma().sancion.findMany({
                include: {
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true,
                            cursoXDivision: {
                                include: {
                                    curso: true,
                                    division: true
                                }
                            }
                        }
                    },
                }
            }) : await Prisma.newPrisma().sancion.findMany({
                include: {
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true,
                            cursoXDivision: {
                                include: {
                                    curso: true,
                                    division: true
                                }
                            }
                        }
                    }
                },
                where: {
                    alumnoXCursoXDivision: {
                        OR: [
                            { id: idAlumno },
                            { idCursoXDivision: idCurso }
                        ]
                    }
                }
            })

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
            const alumnos = await Prisma.newPrisma().alumnoXcursoXdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idCursoXDivision: idCurso
                }
            })
            alumnos.forEach(async (a) => {
                const sancion = await Prisma.newPrisma().$executeRaw`INSERT INTO sancion(fecha, motivo,idTipoSancion,idAlumnoXCursoXDivision) VALUES(${fecha}, ${motivo}, ${idTipoSancion}, ${a.id});`
                console.log(sancion);

                const idsSancion = await Prisma.newPrisma().$queryRaw`SELECT id FROM sancion WHERE idAlumnoXCursoXDivision = ${a.id}`

                await Prisma.newPrisma().$executeRaw`INSERT INTO sancionXusuario (idSancion, idUsuario) VALUES(${idsSancion[0]?.id}, ${idUsuario})`
            })
            return sanciones

        } else {
            const sancion = await Prisma.newPrisma().sancion.create({
                data: {
                    fecha: new Date(fecha),
                    motivo: motivo,
                    tipoSancion: {
                        connect: {
                            id: idTipoSancion
                        }
                    },
                    alumnoXCursoXDivision: {
                        connect: {
                            id: idAlumno
                        }
                    },
                    sancionXusuario: {
                        create: {
                            idUsuario: idUsuario,
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
        const tipoSanciones = await Prisma.newPrisma().tipoSancion.findMany()
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
                alumnoXCursoXDivision: {
                    include: {
                        usuario: true,
                        cursoXDivision: {
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
    idCurso = 0,
    idAlumno = 0,
    idTipoSancion,
    motivo,
    fecha) {
    try {
        if (idCurso !== 0) {
            const alumnos = await Prisma.newPrisma().alumnoXcursoXdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idCursoXDivision: idCurso
                }
            })

            alumnos.forEach(async (a) => {
                const sanciones = await Prisma.newPrisma().$executeRaw`UPDATE sancion SET fecha = ${fecha}, motivo = ${motivo}, idTipoSancion = ${idTipoSancion}, idAlumnoXCursoXDivision = ${a.id} WHERE id = ${id}`
                console.log(sanciones);

                // const sancionesXUsuario = await Prisma.newPrisma().$executeRaw`UPDATE sancionXusuario SET idSancion = ${}`
            })
        } else {
            const sancion = await Prisma.newPrisma().sancion.update({
                data: {
                    fecha: new Date(fecha),
                    tipoSancion: {
                        update: {
                            id: idTipoSancion
                        }
                    },
                    alumnoXCursoXDivision: {
                        update: {
                            id: idAlumno
                        }
                    },
                    sancionXusuario: {
                        update: {
                            data: {
                                idUsuario: idUsuario
                            }
                        }
                    },
                    motivo: motivo
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