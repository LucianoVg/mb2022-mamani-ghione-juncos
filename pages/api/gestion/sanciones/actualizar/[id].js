import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['PUT'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query

        const {
            // idSancionXAlumno,
            idUsuario,
            // idCurso,
            // idAlumno,
            // idTipoSancion,
            motivo
        } = req.body

        const sancion = await actualizarSancion(
            id,
            // idSancionXAlumno,
            idUsuario,
            // idCurso,
            // idAlumno,
            // idTipoSancion,
            motivo)

        return res.status(200).json(sancion)
    } catch (error) {
        return res.status(400).send(error)
    }
}

async function actualizarSancion(
    id,
    // idSancionXAlumno,
    idUsuario,
    // idCurso = 0,
    // idAlumno = 0,
    // idTipoSancion,
    motivo) {
    try {
        // if (idCurso !== 0) {
        //     // const alumnos = await Prisma.newPrisma().alumnoxcursoxdivision.findMany({
        //     //     select: {
        //     //         id: true
        //     //     },
        //     //     where: {
        //     //         idcursoxdivision: idCurso
        //     //     }
        //     // })
        //     // const sancion = await Prisma.newPrisma().sancion.update({
        //     //     data: {
        //     //         idusuario: Number(idUsuario),
        //     //         idtiposancion: Number(idTipoSancion),
        //     //         motivo: motivo
        //     //     },
        //     //     where: {
        //     //         id: Number(id)
        //     //     }
        //     // })
        //     // alumnos.forEach(async (a) => {
        //     //     const sancionXAlumno = await Prisma.newPrisma().sancionxalumno.update({
        //     //         data: {
        //     //             alumnoxcursoxdivision: {
        //     //                 connect: {
        //     //                     id: Number(a.id)
        //     //                 }
        //     //             },
        //     //             sancion: {
        //     //                 connect: {
        //     //                     id: Number(sancion.id)
        //     //                 }
        //     //             }
        //     //         },
        //     //         where: {
        //     //             id: Number(idSancionXAlumno)
        //     //         }
        //     //     })
        //     //     console.log(sancionXAlumno);
        //     // })
        // } else {

        // }
        const sancion = await db.sancion.update({
            data: {
                motivo: motivo,
                usuario: {
                    connect: {
                        id: Number(idUsuario)
                    }
                },
                // sancionxalumno: {
                //     update: {
                //         data: {
                //             alumnoxcursoxdivision: {
                //                 connect: {
                //                     id: Number(idAlumno)
                //                 }
                //             }
                //         },
                //         where: {
                //             id: Number(idSancionXAlumno)
                //         }
                //     }
                // }
            },
            where: {
                id: Number(id)
            }
        })
        return sancion
    } catch (error) {
        console.error(error);
    }
}
