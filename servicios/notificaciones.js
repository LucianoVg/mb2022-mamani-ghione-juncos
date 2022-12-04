import { Prisma } from "./prisma";

export async function ListarNotificaciones() {
    try {
        const listado = await Prisma.newPrisma().notificacion.findMany({
            // include: {
            //     usuario: {
            //         include: {
            //             rol: true
            //         }
            //     },
            //     notificacion: true
            // },
            // where: {
            //     usuario: {
            //         id: {
            //             not: Number(idUsuario)
            //         }
            //     }
            // },
            // orderBy: {
            //     id: 'desc'
            // }
        })

        return listado
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}
export async function ListarNotificacionesDeUsuario(idUsuario) {
    try {
        const listado = await Prisma.newPrisma().notificacionxusuario.findMany({
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
                    id: Number(idUsuario)
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
                notificacionxusuario: {
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
                id: Number(idNotificacion)
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

export async function CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso, idAlumno) {
    // console.log(asunto, contenido, fecha, idCurso, idUsuario);
    if (idCurso != "") {
        try {
            const alumnos = idCurso !== 'todos' ? await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
                where: {
                    idcursoxdivision: Number(idCurso)
                }
            }) : await Prisma.newPrisma().alumnoxcursoxdivision.findMany()
            const notificacion = await Prisma.newPrisma().notificacion.create({
                data: {
                    asunto: asunto,
                    contenido: contenido,
                    fecha: fecha,
                    idusuario: Number(idUsuario),
                }
            })
            const idNotificacionUltimo = await Prisma.newPrisma().notificacion.findUnique({
                orderBy: {
                    id: "desc"
                }
            })
            alumnos.map(async (a) => {

                const notificacionUsuario = await Prisma.newPrisma().notificacionxusuario.create({
                    data: {
                        idnotificacion: idNotificacionUltimo.id,
                        idalumnoxcursoxdivision: Number(idAlumno)
                    }
                })
                console.log(notificacionUsuario);
            })
            return "Notificaciones creadas"
        } catch (err) {
            console.error(err);
        } finally {
            Prisma.disconnect()
        }
    } else {
        const notificacion = await Prisma.newPrisma().notificacion.create({
            data: {
                asunto: asunto,
                contenido: contenido,
                fecha: fecha,
                idusuario: Number(idUsuario),


            }
        })
        const idNotificacionUltimo = await Prisma.newPrisma().notificacion.findUnique({
            orderBy: {
                id: "desc"
            }
        })

        const notificacionUsuario = await Prisma.newPrisma().notificacionxusuario.create({
            data: {
                idnotificacion: idNotificacionUltimo.id,
                idalumnoxcursoxdivision: Number(idAlumno)
            }
        })

        console.log(notificacionUsuario);
    }
}

export async function ActualizarNotificacion(id, asunto, contenido, idUsuario) {
    try {
        const actualizar = await Prisma.newPrisma().notificacion.update({
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