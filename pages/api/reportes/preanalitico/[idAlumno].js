import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
    try {
        await NextCors(req, res, {
            // Options
            methods: ['GET'],
            origin: '*',
            optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
        });
        if (req.method === 'GET') {
            let { idAlumno } = req.query
            const preanalitico = await Preanalitico(idAlumno)
            preanalitico?.forEach(p => {
                if (p.curso < 4) {
                    let dosDecimal = Number(p.notafinal).toFixed(2)
                    let nota = dosDecimal.toString().split('.')
                    let entero = Number(nota[0])
                    let decimal = Number(nota[1])
                    if (decimal) {
                        if (decimal <= 50) {
                            decimal = 50
                        }
                        if (decimal > 50) {
                            entero = entero + 1
                            decimal = 0
                        }
                        p.notafinal = Number(`${entero}.${decimal}`)
                    }
                }
            });

            return res.status(200).json(preanalitico)
        } else {
            return res.status(405).send("Metodo no permitido")
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
}

async function Preanalitico(idAlumno) {
    try {
        return await db.$queryRaw`select m.id as id ,m.nombre as materia, m.idcurso as curso , idalumnoxcursoxdivision,
        avg ((SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c))) as notafinal
       from nota as hn
       INNER JOIN materia as m ON m.id = hn.idmateria
       where idalumnoxcursoxdivision = ${Number(idAlumno)}
       group by  m.nombre, idalumnoxcursoxdivision, m.idcurso, m.id
       order by m.idcurso asc, m.id asc`
    } catch (error) {
        console.error(error);
    }
}