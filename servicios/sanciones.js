import { Prisma } from "./prisma";

export async function traerSanciones(idCurso = 0, idAlumno = 0) {
    try {
        const sanciones = idCurso === 0 || idAlumno === 0
            ? await Prisma.newPrisma().sancion.findMany({
                include: {
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true
                        }
                    },
                    cursoXDivision: {
                        include: {
                            curso: true,
                            division: true
                        }
                    }
                }
            }) : await Prisma.newPrisma().sancion.findMany({
                include: {
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true
                        }
                    },
                    cursoXDivision: {
                        include: {
                            curso: true,
                            division: true
                        }
                    }
                },
                where: {
                    OR: [
                        { idAlumnoXCursoXDivision: idAlumno },
                        { idCursoXDivision: idCurso }
                    ]
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
        const sancion = idCurso !== 0 ? await Prisma.newPrisma().sancion.create({
            data: {
                fecha: new Date(fecha),
                motivo: motivo,
                tipoSancion: {
                    connect: {
                        id: idTipoSancion
                    }
                },
                cursoXDivision: {
                    connect: {
                        id: idCurso
                    }
                },
                sancionXusuario: {
                    create: {
                        idUsuario: idUsuario
                    }
                }
            }
        }) : await Prisma.newPrisma().sancion.create({
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
                        usuario: true
                    }
                },
                cursoXDivision: {
                    include: {
                        curso: true,
                        division: true
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
        const sancion = await Prisma.newPrisma().sancion.update({
            data: {
                fecha: new Date(fecha),
                motivo: motivo,
                idTipoSancion: idTipoSancion,
                idCursoXDivision: idCurso,
                idAlumnoXCursoXDivision: idAlumno,
                sancionXusuario: {
                    update: {
                        data: {
                            idUsuario: idUsuario
                        },
                        where: {
                            id: id
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
