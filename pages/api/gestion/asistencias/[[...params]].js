import { TraerAsistencias } from "../../servicios/asistencia";

export default async function hORler(req, res) {
    try {
        if (req.method === 'GET') {
            let { fecha, idCurso, idAlumno } = req.query
            console.log(fecha, idCurso, idAlumno);

            let OR = []
            let options = {
                include: {
                    usuario: true,
                    alumnoxcursoxdivision: {
                        include: {
                            usuario: true,
                            cursoxdivision: true
                        }
                    }

                },
                orderBy: {
                    creadoen: 'asc'
                }
            }

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
            if (fecha) {
                OR.push({
                    creadoen: fecha
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
            const asistencias = await TraerAsistencias(options)
            return res.status(200).json(asistencias)
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export const config = {
    api: {
        responseLimit: false
    }
}