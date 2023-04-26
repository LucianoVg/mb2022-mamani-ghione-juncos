import NextCors from "nextjs-cors";
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
            const { titulo, url, idCurso, idMateria, idTrimestre, idUsuario } = req.body
            const materialEstudio = await guardarMaterialEstudio(titulo, url, idCurso, idMateria, idTrimestre, idUsuario)
            return res.status(200).json(materialEstudio)
        } else {
            return res.status(401).json({ mensaje: 'Metodo no permitido' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

export async function guardarMaterialEstudio(titulo, url, idCurso, idMateria, idTrimestre, idUsuario) {
    try {
        const materialEstudio = await db.materialestudio.create({
            data: {
                titulo: titulo,
                url: url,
                fecha: new Date().toLocaleDateString('es-AR').split('T')[0],
                idcursoxdivision: Number(idCurso),
                idmateria: Number(idMateria),
                idtrimestre: Number(idTrimestre),
                idusuario: Number(idUsuario)
            }
        })
        console.log(materialEstudio);
        return materialEstudio
    } catch (error) {
        console.log(error);
    }
}