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
                docenteXmateria: {
                    include: {
                        usuario: true
                    }
                }
            }
        }

        if (legajo) {
            OR.push({
                docenteXmateria: {
                    usuario: {
                        legajo: legajo
                    }
                }
            })
        }
        if (nombreDocente) {
            OR.push({
                docenteXmateria: {
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
                docenteXmateria: {
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