import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET', 'PUT'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const { id } = req.query
        if (req.method === 'PUT') {

            const { nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario } = req.body

            const ficha = await guardarFichaInstitucional(id, nombreInstitucion, ubicacion, tipoInstitucion, descripcion, telefono1, telefono2, oficina1, oficina2, mail, idUsuario)

            return res.status(200).json(ficha)
        }
        if (req.method === 'GET') {
            const fichaInstitucional = await traerFichaInstitucional(id !== undefined ? id : '')

            return res.status(200).json(fichaInstitucional)
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}

export async function guardarFichaInstitucional(id = 0, nombreInstitucion = '', ubicacion = '', tipoInstitucion = '', descripcion = '', telefono1 = '', telefono2 = '', oficina1 = '', oficina2 = '', mail = '', idUsuario = 0) {

    const guardado = await db.fichainstitucional.upsert({
        where: {
            id: Number(id)
        },
        update: {
            nombreinstitucion: nombreInstitucion,
            descripcion: descripcion,
            ubicacion: ubicacion,
            tipoinstitucion: tipoInstitucion,
            telefono1: telefono1,
            telefono2: telefono2,
            oficina1: oficina1,
            oficina2: oficina2,
            mail: mail,
            idusuario: Number(idUsuario)
        },
        create: {
            nombreinstitucion: nombreInstitucion,
            descripcion: descripcion,
            ubicacion: ubicacion,
            tipoinstitucion: tipoInstitucion,
            telefono1: telefono1,
            telefono2: telefono2,
            oficina1: oficina1,
            oficina2: oficina2,
            mail: mail,
            idusuario: Number(idUsuario)
        }
    })
    return guardado
}

export async function traerFichaInstitucional(id = 0) {
    const fichaInstitucional = id !== 0 ? await db.fichainstitucional.findFirst({
        where: {
            OR: [
                { id: id },
                { idusuario: id }
            ]
        },
        include: {
            portadasficha: true
        }
    }) : await db.fichainstitucional.findMany({
        include: {
            portadasficha: true
        }
    })
    return fichaInstitucional
}