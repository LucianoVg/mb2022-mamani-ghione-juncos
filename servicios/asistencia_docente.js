import { prisma } from "./../prisma/db";

export async function FiltrarAsistencias(docente = '', documento = '', fecha = '') {
    try {
        const asistencias = await prisma.asistenciaDocente.findMany({
            include: {
                usuario: true,
                docenteXmateria: {
                    include: {
                        usuario: true
                    }
                }

            },
            where: {
                OR: [
                    {
                        docenteXmateria: {
                            usuario: {
                                nombre: {
                                    startsWith: docente.split(' ')[0]
                                }
                            }
                        },
                    },
                    {
                        docenteXmateria: {
                            usuario: {
                                apellido: {
                                    endsWith: docente.split(' ')[1]
                                }
                            }
                        },
                    },
                    {
                        docenteXmateria: {
                            usuario: {
                                legajo: {
                                    contains: documento
                                }
                            }
                        }
                    },
                    {
                        creadoEn: fecha.split('T')[0]
                    }
                ]
            }
        })
        console.log(asistencias);
        return asistencias
    } catch (error) {
        console.error(error);
    }
}

export async function TraerAsistencias() {
    try {
        const asistencias = await prisma.asistenciaDocente.findMany({
            include: {
                usuario: true,
                docenteXmateria: {
                    include: {
                        usuario: true
                    }
                }

            }
        })
        return asistencias
    } catch (error) {
        console.log(error);
    }
}

export async function DetalleAsistencia(id) {
    try {
        const asistencia = await prisma.asistenciaDocente.findUnique({
            include: {
                usuario: true,
                docenteXmateria: {
                    include: {
                        usuario: true
                    }
                }
            },
            where: {
                id: id
            }

        })
        console.log(asistencia);
        return asistencia
    } catch (error) {
        console.log(error);
    }
}

export async function updateAsistencia(id, presente = false, ausente = false, ausenteJustificado = false, llegadaTarde = false, llegadaTardeJustificada = false, mediaFalta = false, mediaFaltaJustificada = false, motivo = "", idUsuario, fecha) {
    try {
        const asistencia = await prisma.asistenciaDocente.update({
            data: {
                presente: presente,
                ausente: ausente,
                ausenteJustificado: ausenteJustificado,
                llegadaTarde: llegadaTarde,
                llegadaTardeJustificada: llegadaTardeJustificada,
                mediaFalta: mediaFalta,
                mediaFaltaJustificada: mediaFaltaJustificada,
                motivo: motivo,
                fecha: fecha,
                idUsuario: idUsuario,
                actualizadoEn: new Date().toLocaleDateString('es-AR').split('T')[0]
            },
            where: {
                id: id
            }
        })
        return asistencia
    } catch (error) {
        console.log(error);
    }
}

