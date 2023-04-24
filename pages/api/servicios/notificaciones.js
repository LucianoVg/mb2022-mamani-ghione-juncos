import { Prisma } from "./prisma";

export async function ListarNotificaciones() {
    try {
        const listado = await Prisma.newPrisma.notificacion.findMany({
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                }
            },
            orderBy: {
                id: "desc"
            }
        })

        return listado
    } catch (error) {
        console.log(error);
    }
}
export async function ListarNotificacionesDeUsuario(idUsuario) {
    try {
        const listado = await Prisma.newPrisma.notificacionxalumno.findMany({
            include: {
                notificacion: {
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
                alumnoxcursoxdivision: {
                    id: Number(idUsuario)
                }
            },
            orderBy: {
                notificacion: {
                    fecha: 'desc'
                }
            }
        })

        return listado
    } catch (error) {
        console.log(error);
    }
}
export async function DetalleNotificacion(idNotificacion) {
    try {
        const notificacion = await Prisma.newPrisma.notificacion.findUnique({
            include: {
                usuario: {
                    include: {
                        rol: true
                    }
                }
            },
            where: {
                id: Number(idNotificacion)
            }
        })
        console.log(notificacion);
        return notificacion
    } catch (error) {
        console.log(error);
    }
}

export async function CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso, idTutor) {
    // console.log(asunto, contenido, fecha, idCurso, idUsuario);
    const notificacion = await Prisma.newPrisma.notificacion.create({
        data: {
            asunto: asunto,
            contenido: contenido,
            fecha: fecha,
            idusuario: Number(idUsuario),
        }
    })

    if (idTutor) {
        try {
            const notificacionxtutor = await Prisma.newPrisma.notificacionxtutor.create({
                data: {
                    idnotificacion: notificacion.id,
                    idtutor: Number(idTutor)
                }
            })
            console.log(notificacionxtutor);
            return "Notificacion enviada a tutor"
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
    if (idCurso) {
        try {
            const alumnos = idCurso !== 'todos' ? await Prisma.newPrisma.alumnoxcursoxdivision.findMany({
                where: {
                    idcursoxdivision: Number(idCurso)
                }
            }) : await Prisma.newPrisma.alumnoxcursoxdivision.findMany()

            alumnos.map(async (a) => {
                const notificacionAlumno = await Prisma.newPrisma.notificacionxalumno.create({
                    data: {
                        idnotificacion: notificacion.id,
                        idalumnoxcursoxdivision: a.id
                    }
                })
                console.log(notificacionAlumno);
            })
            return "Notificaciones para alumnos creadas"
        } catch (err) {
            console.error(err);
            return err.message
        }
    }
}

export async function ActualizarNotificacion(id, asunto, contenido, idUsuario) {
    try {
        const actualizar = await Prisma.newPrisma.notificacion.update({
            data: {
                asunto: asunto,
                contenido: contenido,
                idusuario: Number(idUsuario),
            },
            where: {
                id: Number(id)
            }
        })
        return actualizar
    } catch (error) {
        console.log(error);
    }
}