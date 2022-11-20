import { prisma } from "../prisma/db";

export async function traerSanciones(idCurso = '', idAlumno = '') {
    try {
        const sanciones = idCurso === '' || idAlumno === ''
            ? await prisma.sancion.findMany({
                include: {
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true,
                            cursoXdivision: {
                                include: {
                                    curso: true,
                                    division: true
                                }
                            }
                        }
                    }
                }
            }) : await prisma.sancion.findMany({
                include: {
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true,
                            cursoXdivision: {
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
                            { idCursoXdivision: idCurso }
                        ]
                    }
                }
            })
        return sanciones
    } catch (error) {
        console.error(error);
    }
}

export async function generarSancion(idUsuario, idAlumno = '', idCurso = '', motivo, idTipoSancion, fecha) {
    try {
        if (idCurso !== '') {
            const sanciones = []
            const alumnos = await prisma.alumnoXcursoXdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idCursoXdivision: idCurso
                }
            })
            alumnos.forEach(async (a) => {
                const sancion = await prisma.$executeRaw`INSERT INTO sancion(fecha, motivo,idTipoSancion,idAlumnoXCursoXDivision) VALUES(${fecha}, ${motivo}, ${idTipoSancion}, ${a.id});`
                console.log(sancion);

                const idsSancion = await prisma.$queryRaw`SELECT id FROM sancion WHERE idAlumnoXCursoXDivision = ${a.id}`

                await prisma.$executeRaw`INSERT INTO sancionXusuario (idSancion, idUsuario) VALUES(${idsSancion[0]?.id}, ${idUsuario})`
            })
            return sanciones

        } else {
            const sancion = await prisma.sancion.create({
                data: {
                    fecha: fecha,
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
        const tipoSanciones = await prisma.tipoSancion.findMany()
        return tipoSanciones
    } catch (error) {
        console.error(error);
    }
}

export async function obtenerSancion(id) {
    try {
        const sancion = await prisma.sancion.findUnique({
            include: {
                tipoSancion: true,
                alumnoXCursoXDivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: {
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
            const alumnos = await prisma.alumnoXcursoXdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idCursoXdivision: idCurso
                }
            })

            let sancionCuenta = 0
            alumnos.forEach(async (a) => {
                const sanciones = await prisma.$executeRaw`UPDATE sancion SET fecha = ${fecha}, motivo = ${motivo}, idTipoSancion = ${idTipoSancion}, idAlumnoXCursoXDivision = ${a.id} WHERE id = ${id}`
                console.log(sanciones);

                sancionCuenta += sanciones
                // const sancionesXUsuario = await Prisma.newPrisma().$executeRaw`UPDATE sancionXusuario SET idSancion = ${}`
            })
            return sancionCuenta
        } else {
            const sancionXUsuario = await prisma.sancionXusuario.findFirst({
                where: {
                    idSancion: id
                }
            })
            console.log(sancionXUsuario);
            const sancion = await prisma.sancion.update({
                data: {
                    fecha: fecha,
                    motivo: motivo,
                    alumnoXCursoXDivision: {
                        connect: {
                            id: idAlumno
                        }
                    },
                    tipoSancion: {
                        connect: {
                            id: idTipoSancion
                        }
                    },
                    sancionXusuario: {
                        connect: {
                            id: sancionXUsuario?.id
                        },
                        update: {
                            data: {
                                idUsuario: idUsuario
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
