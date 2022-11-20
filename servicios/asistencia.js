import { prisma } from "../prisma/db";

export async function ListarCurso() {
    try {
        const cursos = await prisma.cursoXdivision.findMany({
            include: {
                curso: true,
                division: true
            }
        })

        return cursos
    } catch (error) {
        console.log(error);
    }
}

export async function FiltrarAsistencias(alumno = '', curso = '', documento = '', fecha = '') {
    try {
        const asistencias = await prisma.asistencia.findMany({
            include: {
                usuario: true,
                alumnoXcursoXdivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: true
                    }
                }

            },
            where: {
                OR: [
                    {
                        alumnoXcursoXdivision: {
                            cursoXdivision: {
                                id: curso
                            }
                        }
                    },
                    {
                        alumnoXcursoXdivision: {
                            usuario: {
                                nombre: {
                                    startsWith: alumno.split(' ')[0]
                                }
                            }
                        },
                    },
                    {
                        alumnoXcursoXdivision: {
                            usuario: {
                                apellido: {
                                    endsWith: alumno.split(' ')[1]
                                }
                            }
                        },
                    },
                    {
                        alumnoXcursoXdivision: {
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
        const asistencias = await prisma.asistencia.findMany({
            include: {
                usuario: true,
                alumnoXcursoXdivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: true
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
        const asistencia = await prisma.asistencia.findUnique({
            include: {
                usuario: true,
                alumnoXcursoXdivision: {
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
        console.log(asistencia);
        return asistencia
    } catch (error) {
        console.log(error);
    }
}

export async function updateAsistencia(id, presente = false, ausente = false, ausenteJustificado = false, llegadaTarde = false, llegadaTardeJustificada = false, mediaFalta = false, mediaFaltaJustificada = false, motivo = "", idUsuario, fecha) {
    try {
        const asistencia = await prisma.asistencia.update({
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

