import NextCors from "nextjs-cors";
import { db } from "../../../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: process.env.HOST,
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        const mejoresPromedios = await MejorPromedio()
        return res.status(200).json(mejoresPromedios)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message })
    }
}

async function MejorPromedio() {
    try {
        let anoActual = new Date().getFullYear()
        return await db.$queryRaw`select  concat (u.nombre, ' ' , u.apellido) as alumno, idalumnoxcursoxdivision,
        avg ((SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c))) as promediototal
       from nota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       INNER JOIN alumnoxcursoxdivision as a ON a.id = hn.idalumnoxcursoxdivision
       INNER JOIN usuario as u ON u.id = a.idusuario
       inner join cursoxdivision as cd on cd.id = a.idcursoxdivision
       inner join division as d on d.id = cd.iddivision 
      
       where  a.idcursoxdivision between 9 and 10 and u.activo = true and anoactual = ${Number(anoActual)} and d.division like 'B'
       group by alumno,idalumnoxcursoxdivision
       order by promediototal desc`
    } catch (error) {
        console.error(error);
    }
}