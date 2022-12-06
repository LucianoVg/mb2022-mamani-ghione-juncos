import NextCors from "nextjs-cors/dist";
import { generarSancion, traerSanciones } from "../../servicios/sanciones"

export default async function hORler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'POST'],
            origin: '*',
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
                        fecha: 'desc'
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