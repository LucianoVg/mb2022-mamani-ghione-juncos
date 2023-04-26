import NextCors from "nextjs-cors";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['PUT', 'DELETE'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'PUT') {
            const { titulo, fechaInicio, fechaFin, idUsuario, idCurso } = req.body
            const examen = await actualizarExamen(id, titulo, fechaInicio, fechaFin, idUsuario, idCurso)
            return res.status(200).json(examen)
        } else if (req.method === 'DELETE') {
            const examen = await borrarExamen(id)
            return res.status(200).json(examen)
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

export async function actualizarExamen(id, titulo, fechaInicio, fechaFin, idUsuario, idCurso) {
    try {
        const examen = await db.fechaexamen.update({
            data: {
                titulo: titulo,
                fechainicio: fechaInicio,
                fechafin: fechaFin,
                idusuario: Number(idUsuario),
                idcurso: Number(idCurso)
            },
            where: {
                id: Number(id)
            }
        })
        return examen
    } catch (error) {
        console.log(error);
    }
}

export async function borrarExamen(id) {
    try {
        const examen = await db.fechaexamen.delete({
            where: {
                id: Number(id)
            }
        })
        return examen
    } catch (error) {
        console.log(error);
    }
}