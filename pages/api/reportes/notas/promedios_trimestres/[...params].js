import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { params } = req.query
            console.log(params);
            const promedio = await PromedioXtrimestre(params[0], params[1])
            return res.status(200).json(promedio)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function PromedioXtrimestre(idAlumno, idMateria) {
    try {
        return await db.$queryRaw`select m.nombre as materia, idalumnoxcursoxdivision,t.trimestre as trimestre,
        (SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c)) AS Promedio
       from nota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       INNER JOIN trimestre as t ON t.id = hn.idtrimestre
       where idalumnoxcursoxdivision =${Number(idAlumno)} and idmateria = ${Number(idMateria)}
       order by m.nombre asc, t.trimestre asc`
    } catch (error) {
        console.error(error);
    }
}