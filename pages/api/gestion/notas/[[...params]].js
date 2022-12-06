import NextCors from "nextjs-cors/dist";
import { TraerNotas } from "../../servicios/notas";

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

        let { idMateria, idTrimestre, idDivision, nombreAlumno, apellidoAlumno } = req.query
        console.log({ idMateria, idTrimestre, idDivision, nombreAlumno, apellidoAlumno });
        let AND = [
            { idtrimestre: Number(idTrimestre) }
        ]

        let options = {
            include: {
                materia: true,
                trimestre: true,
                alumnoxcursoxdivision: {
                    include: {
                        usuario: true,
                        cursoxdivision: true
                    }
                }
            },
            orderBy: {
                alumnoxcursoxdivision: {
                    usuario: {
                        nombre: 'asc'
                    }
                }
            }
        }
        if (idMateria) {
            AND.push({ idmateria: Number(idMateria) })
        }
        if (idDivision) {
            AND.push({
                alumnoxcursoxdivision: {
                    cursoxdivision: {
                        division: {
                            id: Number(idDivision)
                        }
                    }
                }
            })
        }
        if (nombreAlumno) {
            AND.push({
                alumnoxcursoxdivision: {
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
                alumnoxcursoxdivision: {
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
