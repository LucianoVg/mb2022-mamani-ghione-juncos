import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { params } = req.query
            console.log(params);
            const nota = await notasTrimestres(params[0], params[1])
            return res.status(200).json(nota)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function notasTrimestres(idAlumno, idMateria) {
    try {
        return await db.$queryRaw`select m.nombre as materia ,idtrimestre as id,nota1,nota2,nota3,nota4,nota5 from historialnota hn
         INNER JOIN materia as m ON m.id = hn.idmateria
        where idmateria = ${Number(idMateria)} and idalumnoxcursoxdivision = ${Number(idAlumno)}
        group by idtrimestre,nota1,nota2,nota3,nota4,nota5, m.nombre`

    } catch (error) {
        console.log(error);
    }
}