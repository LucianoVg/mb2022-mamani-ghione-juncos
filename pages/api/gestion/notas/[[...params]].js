import NextCors from "nextjs-cors/dist";
import { TraerNotas } from "../../../../servicios/notas";

export default async function handler(
    req,
    res
) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        let { idMateria, idTrimestre, idCurso, nombreAlumno, apellidoAlumno } = req.query
        let OR = []

        let options = {
            include: {
                materia: true,
                trimestre: true,
                alumnoXcursoXdivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: true
                    }
                }
            },
        }
        if (idMateria) {
            OR.push({ idMateria: Number(idMateria) })
            options = {
                ...options,
                where: {
                    OR: OR
                }
            }
        }
        if (idCurso) {
            OR.push({
                alumnoXcursoXdivision: {
                    cursoXdivision: {
                        id: Number(idCurso)
                    }
                }
            })
            options = {
                ...options,
                where: {
                    OR: OR
                }
            }
        }
        if (nombreAlumno) {
            OR.push({
                alumnoXcursoXdivision: {
                    usuario: {
                        nombre: {
                            contains: nombreAlumno[0].toUpperCase() + nombreAlumno.slice(1)
                        }
                    }
                },
            })
            options = {
                ...options,
                where: {
                    OR: OR
                }
            }
        }
        if (apellidoAlumno) {
            OR.push({
                alumnoXcursoXdivision: {
                    usuario: {
                        apellido: {
                            contains: apellidoAlumno[0].toUpperCase() + apellidoAlumno.slice(1)
                        }
                    }
                },
            })
            options = {
                ...options,
                where: {
                    OR: OR
                }
            }
        }
        const notas = await TraerNotas(options)
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
