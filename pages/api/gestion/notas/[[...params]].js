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
        console.log({ idMateria, idTrimestre, idCurso, nombreAlumno, apellidoAlumno });
        let AND = [
            { idTrimestre: Number(idTrimestre) }
        ]

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
            orderBy: {
                alumnoXcursoXdivision: {
                    usuario: {
                        nombre: 'asc'
                    }
                }
            }
        }
        if (idMateria) {
            AND.push({ idMateria: Number(idMateria) })
        }
        if (idCurso) {
            AND.push({
                alumnoXcursoXdivision: {
                    cursoXdivision: {
                        id: Number(idCurso)
                    }
                }
            })
        }
        if (nombreAlumno) {
            AND.push({
                alumnoXcursoXdivision: {
                    usuario: {
                        nombre: {
                            contains: nombreAlumno[0].toUpperCase() + nombreAlumno.slice(1)
                        }
                    }
                },
            })
        }
        if (apellidoAlumno) {
            AND.push({
                alumnoXcursoXdivision: {
                    usuario: {
                        apellido: {
                            contains: apellidoAlumno[0].toUpperCase() + apellidoAlumno.slice(1)
                        }
                    }
                },
            })
        }
        if (AND.length) {
            options = {
                ...options,
                where: {
                    AND: AND
                }
            }
        }
        const notas = await TraerNotas(options)
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
