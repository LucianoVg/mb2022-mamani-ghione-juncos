import NextCors from "nextjs-cors/dist";
import { generarSancion, traerSanciones } from "../../../../servicios/sanciones"

export default async function handler(req, res) {
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
                    alumnoXCursoXDivision: {
                        include: {
                            usuario: true,
                            cursoXdivision: {
                                include: {
                                    curso: true,
                                    division: true
                                }
                            }
                        }
                    }
                }
            }
            const AND = []
            if (idAlumno) {
                AND.push({ id: Number(idAlumno) })
            }
            if (idCurso) {
                AND.push({ idCursoXdivision: Number(idCurso) })
            }
            if (AND.length) {
                options = {
                    ...options,
                    where: {
                        alumnoXCursoXDivision: {
                            AND: AND
                        }
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