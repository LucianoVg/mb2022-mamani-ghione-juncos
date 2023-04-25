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

        let { idMateria, idTrimestre, idDivision, idAlumno } = req.query
        console.log({ idMateria, idTrimestre, idDivision, idAlumno });
        let OR = [
            { idtrimestre: Number(idTrimestre) },
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
            },

        }
        if (idMateria) {
            OR.push({ idmateria: Number(idMateria) })
        }
        if (idDivision) {
            OR.push({
                alumnoxcursoxdivision: {
                    cursoxdivision: {
                        division: {
                            id: Number(idDivision)
                        }
                    }
                }
            })
        }
        if (idAlumno) {
            OR.push({
                alumnoxcursoxdivision: {
                    id: Number(idAlumno)
                },
            })
        }

        if (OR.length) {
            options = {
                ...options,
                where: {
                    AND: OR
                }
            }
        }
        const notas = await TraerNotas(options)
        return res.status(200).json(notas)
    } catch (error) {
        return res.status(200).json({ mensaje: error.message })
    }
}
export const config = {
    api: {
        responseLimit: '8mb',
    },
}
