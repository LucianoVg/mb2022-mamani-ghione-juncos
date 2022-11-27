import { TraerAsistencias } from "../../../../servicios/asistencia";

export default async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            let { legajo, nombreAlumno, apellidoAlumno } = req.query
            console.log(legajo, nombreAlumno, apellidoAlumno);

            let OR = []
            let options = {
                include: {
                    usuario: true,
                    alumnoXcursoXdivision: {
                        include: {
                            usuario: true,
                            cursoXdivision: true
                        }
                    }

                },
                orderBy: {
                    alumnoXcursoXdivision: {
                        usuario: {
                            apellido: 'asc'
                        }
                    }
                }
            }
            if (legajo) {
                OR.push({
                    alumnoXcursoXdivision: {
                        usuario: {
                            legajo: {
                                contains: legajo
                            }
                        }
                    }
                })
            }
            if (nombreAlumno) {
                OR.push({
                    alumnoXcursoXdivision: {
                        usuario: {
                            nombre: {
                                contains: nombreAlumno[0].toUpperCase() + nombreAlumno.slice(1)
                            }
                        }
                    }
                })
            }
            if (apellidoAlumno) {
                OR.push({
                    alumnoXcursoXdivision: {
                        usuario: {
                            apellido: {
                                contains: apellidoAlumno[0].toUpperCase() + apellidoAlumno.slice(1)
                            }
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