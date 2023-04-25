import { TraerAsistencias } from "../../servicios/asistencia_docente";

export default async function handler(
    req,
    res
) {
    try {
        const { fecha, idDocente } = req.query
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
                docentexmateria: {
                    usuario: {
                        nombre: 'asc'
                    }
                }
            }
        }
        if (idDocente) {
            OR.push({
                docentexmateria: {
                    id: Number(idDocente)
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
    } catch (error) {
        console.error(error);
        return res.status(200).json({ mensaje: error.message })
    }
}