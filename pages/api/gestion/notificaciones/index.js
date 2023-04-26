import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['POST'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });

        if (req.method === 'POST') {
            const { asunto, contenido, fecha, idTutor, idUsuario, idCurso } = req.body
            console.log(asunto, contenido, fecha, idTutor, idUsuario, idCurso);
            const crear = await CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso, idTutor)
            console.log(crear);
            return res.status(200).json({ mensaje: crear })
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}

async function CrearNotificacion(asunto, contenido, fecha, idUsuario, idCurso, idTutor) {
    // console.log(asunto, contenido, fecha, idCurso, idUsuario);
    const notificacion = await db.notificacion.create({
        data: {
            asunto: asunto,
            contenido: contenido,
            fecha: fecha,
            idusuario: Number(idUsuario),
        }
    })

    if (idTutor) {
        try {
            const notificacionxtutor = await db.notificacionxtutor.create({
                data: {
                    idnotificacion: notificacion.id,
                    idtutor: Number(idTutor)
                }
            })
            console.log(notificacionxtutor);
            return "Notificacion enviada a tutor"
        } catch (error) {
            console.log(error);
            return error.message
        }
    }
    if (idCurso) {
        try {
            const alumnos = idCurso !== 'todos' ? await db.alumnoxcursoxdivision.findMany({
                where: {
                    idcursoxdivision: Number(idCurso)
                }
            }) : await db.alumnoxcursoxdivision.findMany()

            alumnos.map(async (a) => {
                const notificacionAlumno = await db.notificacionxalumno.create({
                    data: {
                        idnotificacion: notificacion.id,
                        idalumnoxcursoxdivision: a.id
                    }
                })
                console.log(notificacionAlumno);
            })
            return "Notificaciones para alumnos creadas"
        } catch (err) {
            console.error(err);
            return err.message
        }
    }
}