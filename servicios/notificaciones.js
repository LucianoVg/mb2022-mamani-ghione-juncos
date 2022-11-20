import { prisma } from "../prisma/db";


export async function ListarNotificaciones(idUsuario) {
    try {
        const listado = await prisma.notificacionXusuario.findMany({
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                },
                notificacion: true
            },
            where: {
                usuario: {
                    id: {
                        not: idUsuario
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })

        return listado
    } catch (error) {
        console.log(error);
    }
}
export async function ListarNotificacionesDeUsuario(idUsuario) {
    try {
        const listado = await prisma.notificacionXusuario.findMany({
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                },
                notificacion: true
            },
            where: {
                usuario: {
                    id: idUsuario
                }
            },
            orderBy: {
                id: 'desc'
            }
        })

        return listado
    } catch (error) {
        console.log(error);
    }
}
export async function DetalleNotificacion(idNotificacion) {
    try {
        const notificacion = await prisma.notificacion.findUnique({
            include: {
                notificacionXusuario: {
                    include: {
                        usuario: {
                            include: {
                                rol: true
                            }
                        }
                    }
                }
            },
            where: {
                id: idNotificacion
            }
        })
        console.log(notificacion);
        return notificacion
    } catch (error) {
        console.log(error);
    }
}

export async function CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso) {
    // console.log(asunto, contenido, fecha, idCurso, idUsuario);
    try {
        const alumnos = idCurso !== 'todos' ? await prisma.alumnoXcursoXdivision.findMany({
            where: {
                idCursoXdivision: idCurso
            }
        }) : await prisma.alumnoXcursoXdivision.findMany()

        alumnos.map(async (a) => {
            const notificacion = await prisma.notificacion.create({
                data: {
                    asunto: asunto,
                    contenido: contenido,
                    fecha: fecha,
                    notificacionXusuario: {
                        create: {
                            idUsuario: idUsuario
                        }
                    },
                    idAlumnoXCursoXDivision: a.id
                }
            })
            console.log(notificacion);
        })
        return "Notificaciones creadas"
    } catch (err) {
        console.error(err);
    }
}

export async function ActualizarNotificacion(id, asunto, contenido, idUsuario, idNotificacionXUsuario) {
    try {
        const actualizar = await prisma.notificacion.update({
            data: {
                asunto: asunto,
                contenido: contenido,
                notificacionXusuario: {
                    update: {
                        data: {
                            idUsuario: idUsuario
                        },
                        where: {
                            id: idNotificacionXUsuario
                        }
                    }
                }
            },
            where: {
                id: id
            }
        })
        return actualizar
    } catch (error) {
        console.log(error);
    }
}