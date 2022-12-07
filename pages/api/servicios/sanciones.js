import { Prisma } from "./prisma";

export async function ReporteSanciones(idAlumno) {
    try {
        const sanciones = await Prisma.newPrisma.sancion.findMany(
            {
                include: {
                    sancionxalumno: {
                        include: {
                            alumnoxcursoxdivision: {
                                include: {
                                    usuario: {
                                        include: {
                                            rol: true
                                        }
                                    }
                                }
                            }
                        }

                    },
                    usuario: {
                        include: {
                            rol: true
                        }
                    },
                    tiposancion: true
                },
                where: {
                    alumnoxcursoxdivision: {
                        id: idAlumno
                    }
                },
                orderBy: {
                    id: "desc"
                }
            }
        )
        Prisma.disconnect()
        return sanciones
    } catch (error) {
        console.error(error);
    }
}


export async function traerSanciones(options) {
    try {
        const sanciones = await Prisma.newPrisma.sancionxalumno.findMany(options)
        Prisma.disconnect()
        return sanciones
    } catch (error) {
        console.error(error);
    }
}

export async function generarSancion(idUsuario, idAlumno = 0, idCurso = 0, motivo, idTipoSancion, fecha) {
    try {
        // console.log(idUsuario, idAlumno, idCurso, motivo, idTipoSancion, fecha);
        if (idCurso !== 0) {
            const alumnos = await Prisma.newPrisma.alumnoxcursoxdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idcursoxdivision: Number(idCurso)
                }
            })
            const sancion = await Prisma.newPrisma.sancion.create({
                data: {
                    fecha: fecha,
                    motivo: motivo,
                    tiposancion: {
                        connect: {
                            id: Number(idTipoSancion)
                        }
                    },
                    usuario: {
                        connect: {
                            id: Number(idUsuario)
                        }
                    }
                }
            })
            alumnos.forEach(async (a) => {
                const sancionXAlumno = await Prisma.newPrisma.sancionxalumno.create({
                    data: {
                        alumnoxcursoxdivision: {
                            connect: {
                                id: a.id
                            }
                        },
                        sancion: {
                            connect: {
                                id: sancion.id
                            }
                        }
                    }
                })
                console.log(sancionXAlumno);
            })
            return "Sanciones creadas"
        } else {
            const sancion = await Prisma.newPrisma.sancion.create({
                data: {
                    fecha: fecha,
                    motivo: motivo,
                    tiposancion: {
                        connect: {
                            id: Number(idTipoSancion)
                        }
                    },
                    sancionxalumno: {
                        create: {
                            alumnoxcursoxdivision: {
                                connect: {
                                    id: Number(idAlumno)
                                }
                            }
                        }
                    },
                    usuario: {
                        connect: {
                            id: Number(idUsuario)
                        }
                    }
                }
            })
            console.log(sancion);
            return sancion
        }
    } catch (error) {
        console.log(error);
    }
}

export async function traerTipoSanciones() {
    try {
        const tipoSanciones = await Prisma.newPrisma.tiposancion.findMany()
        return tipoSanciones
    } catch (error) {
        console.error(error);
    }
}

export async function obtenerSancion(id) {
    try {
        const sancion = await Prisma.newPrisma.sancionxalumno.findFirst({
            include: {
                sancion: {
                    include: {
                        tiposancion: true
                    }
                },
                alumnoxcursoxdivision: {
                    include: {
                        usuario: true,
                        cursoxdivision: {
                            include: {
                                curso: true,
                                division: true
                            }
                        }
                    }
                }
            },
            where: {
                idsancion: Number(id)
            }
        })
        console.log(sancion);
        return sancion
    } catch (error) {
        console.error(error);
    }
}

export async function actualizarSancion(
    id,
    // idSancionXAlumno,
    idUsuario,
    // idCurso = 0,
    // idAlumno = 0,
    // idTipoSancion,
    motivo) {
    try {
        // if (idCurso !== 0) {
        //     // const alumnos = await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
        //     //     select: {
        //     //         id: true
        //     //     },
        //     //     where: {
        //     //         idcursoxdivision: idCurso
        //     //     }
        //     // })
        //     // const sancion = await Prisma.newPrisma().sancion.update({
        //     //     data: {
        //     //         idusuario: Number(idUsuario),
        //     //         idtiposancion: Number(idTipoSancion),
        //     //         motivo: motivo
        //     //     },
        //     //     where: {
        //     //         id: Number(id)
        //     //     }
        //     // })
        //     // alumnos.forEach(async (a) => {
        //     //     const sancionXAlumno = await Prisma.newPrisma().sancionxalumno.update({
        //     //         data: {
        //     //             alumnoxcursoxdivision: {
        //     //                 connect: {
        //     //                     id: Number(a.id)
        //     //                 }
        //     //             },
        //     //             sancion: {
        //     //                 connect: {
        //     //                     id: Number(sancion.id)
        //     //                 }
        //     //             }
        //     //         },
        //     //         where: {
        //     //             id: Number(idSancionXAlumno)
        //     //         }
        //     //     })
        //     //     console.log(sancionXAlumno);
        //     // })
        // } else {

        // }
        const sancion = await Prisma.newPrisma.sancion.update({
            data: {
                motivo: motivo,
                usuario: {
                    connect: {
                        id: Number(idUsuario)
                    }
                },
                // sancionxalumno: {
                //     update: {
                //         data: {
                //             alumnoxcursoxdivision: {
                //                 connect: {
                //                     id: Number(idAlumno)
                //                 }
                //             }
                //         },
                //         where: {
                //             id: Number(idSancionXAlumno)
                //         }
                //     }
                // }
            },
            where: {
                id: Number(id)
            }
        })
        return sancion
    } catch (error) {
        console.error(error);
    }
}
