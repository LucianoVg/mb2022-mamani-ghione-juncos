import { Prisma } from "./prisma";


export async function ListarNotificaciones(idUsuario) {
    try {
        const listado = await Prisma.newPrisma().notificacionXusuario.findMany({
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
    } finally {
        Prisma.disconnect()
    }
}
export async function DetalleNotificacion(idNotificacion) {
    try {
        const notificacion = await Prisma.newPrisma().notificacion.findUnique({
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
    } finally {
        Prisma.disconnect()
    }
}

export async function CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso) {
    // console.log(asunto, contenido, fecha, idCurso, idUsuario);
    try {
        const alumnos = idCurso !== 'todos' ? await Prisma.newPrisma().alumnoXcursoXdivision.findMany({
            where: {
                idCursoXdivision: idCurso
            }
        }) : await Prisma.newPrisma().alumnoXcursoXdivision.findMany()

        alumnos.map(async (a) => {
            const notificacion = await Prisma.newPrisma().notificacion.create({
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
    } finally {
        Prisma.disconnect()
    }
}

export async function ActualizarNotificacion(id, asunto, contenido, idUsuario, idNotificacionXUsuario) {
    try {
        const actualizar = await Prisma.newPrisma().notificacion.update({
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