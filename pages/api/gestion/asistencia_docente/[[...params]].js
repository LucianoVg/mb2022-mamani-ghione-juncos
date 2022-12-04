import { TraerAsistencias } from "../../../../servicios/asistencia_docente";

export default async function handler(
    req,
    res
) {
    try {
        const { legajo, nombreDocente, apellidoDocente } = req.query
        let OR = []
        let options = {
            include: {
                usuario: true,
                docentexmateria: {
                    include: {
                        usuario: true
                    }
                }
            },
            orderBy: {
                usuario: {
                    nombre: 'asc'
                }
            }
        }

        if (legajo) {
            OR.push({
                docentexmateria: {
                    usuario: {
                        legajo: legajo
                    }
                }
            })
        }
        if (nombreDocente) {
            OR.push({
                docentexmateria: {
                    usuario: {
                        nombre: {
                            contains: nombreDocente[0].toUpperCase() + nombreDocente.slice(1)
                        }
                    }
                }
            })
        }
        if (apellidoDocente) {
            OR.push({
                docentexmateria: {
                    usuario: {
                        apellido: {
                            contains: apellidoDocente[0].toUpperCase() + apellidoDocente.slice(1)
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
    } catch (error) {
        console.error(error);
        return res.status(200).json({ mensaje: error.message })
    }
}