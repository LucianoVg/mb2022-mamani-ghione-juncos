import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()

export async function ListarCurso() {

    const cursos = await prisma.cursoXdivision.findMany({
        include: {
            curso: true,
            division: true
        }
    })

    return cursos
}

export async function TraerAsistencias(alumno, curso, documento, desde, hasta) {

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
                        idCursoXdivision: curso
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
                                startsWith: alumno.split(' ')[1]
                            }
                        }
                    },
                },
                {
                    alumnoXcursoXdivision: {
                        usuario: {
                            dni: documento
                        }
                    }
                },
                {
                    creadoEn: {
                        gt: desde,
                        lt: hasta
                    }
                }
            ]
        }
    })
    return asistencias
}

export async function TraerAsistencias2() {

    const asistencias = await prisma.asistencia.findMany({

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

        // where: {
        //     AND: [
        //         {
        //             alumnoXcursoXdivision: {
        //                 idCursoXdivision: curso
        //             }
        //         },
        //         {
        //             alumnoXcursoXdivision: {
        //                 usuario: {
        //                     nombre: {
        //                         startsWith: alumno.split(' ')[0]
        //                     }
        //                 }
        //             },
        //         },
        //         {
        //             alumnoXcursoXdivision: {
        //                 usuario: {
        //                     apellido: {
        //                         startsWith: alumno.split(' ')[1]
        //                     }
        //                 }
        //             },
        //         }
        //     ]
        // }
    })
    console.log(asistencias);
    return asistencias
}


export async function DetalleAsistencia() {

    const asistencias = await prisma.asistencia.findMany({

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
            id: 14
        }
      
    })
    console.log(asistencias);
    return asistencias
}




export async function updateAsistencia(idNota, notaNueva, columnName, addMotivo) {

    switch (columnName) {
        case 'presente':
            const presente = await prisma.nota.update({
                data: {
                    presente: notaNueva,
                    ausente: null,
                    ausenteJustificado: null,
                    llegadaTarde: null,
                    llegadaTardeJustificada: null,
                    mediaFalta: null,
                    mediaFaltaJustificada: null,

                    motivo: addMotivo
                },
                where: {
                    id: idNota
                }

            })
            return presente

        case 'ausente':
            const ausente = await prisma.nota.update({
                data: {
                    presente: null,
                    ausente: notaNueva,
                    ausenteJustificado: null,
                    llegadaTarde: null,
                    llegadaTardeJustificada: null,
                    mediaFalta: null,
                    mediaFaltaJustificada: null,

                    motivo: addMotivo

                },
                where: {
                    id: idNota
                }
            })
            return ausente


        case 'ausenteJustificado':
            const ausenteJustificado = await prisma.nota.update({
                data: {
                    presente: null,
                    ausente: null,
                    ausenteJustificado: notaNueva,
                    llegadaTarde: null,
                    llegadaTardeJustificada: null,
                    mediaFalta: null,
                    mediaFaltaJustificada: null,

                    motivo: addMotivo

                },
                where: {
                    id: idNota
                }
            })
            return ausenteJustificado

        case 'llegadaTarde':
            const llegadaTarde = await prisma.nota.update({
                data: {
                    presente: null,
                    ausente: null,
                    ausenteJustificado: null,
                    llegadaTarde: notaNueva,
                    llegadaTardeJustificada: null,
                    mediaFalta: null,
                    mediaFaltaJustificada: null, 

                    motivo: addMotivo

                },
                where: {
                    id: idNota
                }
            })
            return llegadaTarde

        case 'llegadaTardeJustificada':
            const llegadaTardeJustificada = await prisma.nota.update({
                data: {
                    presente: null,
                    ausente: null,
                    ausenteJustificado: null,
                    llegadaTarde: null,
                    llegadaTardeJustificada: notaNueva,
                    mediaFalta: null,
                    mediaFaltaJustificada: null,

                    motivo: addMotivo

                },
                where: {
                    id: idNota
                }
            })
            return llegadaTardeJustificada

        case 'mediaFalta':
            const mediaFalta = await prisma.nota.update({
                data: {
                    presente: null,
                    ausente: null,
                    ausenteJustificado: null,
                    llegadaTarde: null,
                    llegadaTardeJustificada: null,
                    mediaFalta: notaNueva,
                    mediaFaltaJustificada: null,


                    motivo: addMotivo
                },
                where: {
                    id: idNota
                }
            })
            return mediaFalta

        case 'mediaFaltaJustificada':
            const mediaFaltaJustificada = await prisma.nota.update({
                data: {
                    presente: null,
                    ausente: null,
                    ausenteJustificado: null,
                    llegadaTarde: null,
                    llegadaTardeJustificada: null,
                    mediaFalta: null,
                    mediaFaltaJustificada: notaNueva,

                    motivo: addMotivo
                },
                where: {
                    id: idNota
                }
            })
            return mediaFaltaJustificada

        default:
            break;
    }


}

// export async function agregarNoticia(titulo, creadaEn, url, descripcion, idUsuario) {

//     const agregar = await prisma.noticiasYnovedades.create({
//         data: {
//             titulo: titulo,
//             creadaEn: new Date(creadaEn),
//             url: url,
//             descripcion: descripcion,
//             idUsuario: idUsuario
//         }
//     })

//     return agregar
// }


