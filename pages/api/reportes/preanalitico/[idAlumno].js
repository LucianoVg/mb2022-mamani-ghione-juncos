import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
      let { idAlumno } = req.query;
      const preanalitico = await Preanalitico(idAlumno);
      preanalitico?.forEach((p) => {
        if (p.curso < 4) {
          let dosDecimal = Number(p.notafinal).toFixed(2);
          console.log(dosDecimal)
          let nota = dosDecimal.toString().split(".");
          let entero = Number(nota[0]);
          // console.log(entero)
          // let decimal =Number(nota[1]);

          let decimal
          let decimal1 = nota[1].toString().split("");
          console.log(decimal1)
          if (Number(decimal1[0]) === 0 && Number(decimal1[1]) > 0) {
            decimal = 1
          } else {
            decimal = Number(nota[1])
          }
          console.log(decimal)

          if (decimal) {
            if (decimal >= 1 && decimal < 33) {
              decimal = 0;
            }
            if (decimal >= 33 && decimal < 75) {
              decimal = 50;
            } else {
              if (decimal >= 75) {
                entero = entero + 1;
                decimal = 0;
              }
            }

            p.notafinal = Number(`${entero}.${decimal}`);

          }

        }
      });

      return res.status(200).json(preanalitico);
    } else {
      return res.status(405).send("Metodo no permitido");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function Preanalitico(idAlumno) {
  try {
    console.log("Id alumno: ", idAlumno);
    return await db.$queryRaw`select m.id as id ,m.nombre as materia, cd.idcurso as curso , idalumnoxcursoxdivision,
        avg ((SELECT AVG(c)
               FROM   (VALUES(nota1),
                             (nota2),
                             (nota3),
                             (nota4),
                             (nota5)) T (c))) as notafinal
       from nota as n
       INNER JOIN materia as m ON m.id = n.idmateria
       Inner join materiaxcursoxdivision mxd on mxd.idmateria = m.id
       inner join cursoxdivision cd on cd.id = mxd.idcursoxdivision
       INNER JOIN alumnoxcursoxdivision as a ON a.id = n.idalumnoxcursoxdivision
       INNER JOIN usuario as u ON u.id = a.idusuario
       where idalumnoxcursoxdivision = ${Number(idAlumno)} and u.activo = true 
       group by  m.nombre, idalumnoxcursoxdivision, cd.idcurso, m.id
       order by cd.idcurso, m.id asc`;
  } catch (error) {
    console.error(error);
  }
}
