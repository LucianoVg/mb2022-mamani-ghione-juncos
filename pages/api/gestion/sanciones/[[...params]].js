import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'POST'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            const { idAlumno, idCurso } = req.query

            let options = {
                include: {
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
                    },
                    sancion: {
                        include: {
                            tiposancion: true
                        }
                    }
                },
                orderBy: {
                    sancion: {
                        id: 'desc'
                    }
                }
            }
            const OR = []
            if (idAlumno) {
                OR.push({
                    alumnoxcursoxdivision: {
                        id: Number(idAlumno)
                    }
                })
            }
            if (idCurso) {
                OR.push({
                    alumnoxcursoxdivision: {
                        cursoxdivision: {
                            id: Number(idCurso)
                        }
                    }
                })
            }
            if (OR.length) {
                options = {
                    ...options,
                    where: {
                        OR: OR
                    }
                }
            }
            console.log(options);
            const sanciones = await traerSanciones(options)
            return res.status(200).json(sanciones)
        }
        if (req.method === 'POST') {
            const { idUsuario, idAlumno, idCurso, idTipoSancion, motivo, fecha } = req.body
            const sancion = await generarSancion(
                idUsuario,
                idAlumno,
                idCurso,
                motivo,
                idTipoSancion,
                fecha)

            return res.status(200).json(sancion)
        }
    } catch (error) {
        return res.status(400).send(error)
    }
}

async function traerSanciones(options) {
    try {
        const sanciones = await db.sancionxalumno.findMany(options)
        return sanciones
    } catch (error) {
        console.error(error);
    }
}

async function generarSancion(idUsuario, idAlumno = 0, idCurso = 0, motivo, idTipoSancion, fecha) {
    try {
        // console.log(idUsuario, idAlumno, idCurso, motivo, idTipoSancion, fecha);
        if (idCurso !== 0) {
            const alumnos = await db.alumnoxcursoxdivision.findMany({
                select: {
                    id: true
                },
                where: {
                    idcursoxdivision: Number(idCurso)
                }
            })
            const sancion = await db.sancion.create({
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
                const sancionXAlumno = await db.sancionxalumno.create({
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
            const sancion = await db.sancion.create({
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