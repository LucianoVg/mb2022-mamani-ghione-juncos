import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
      let { params } = req.query;
      console.log("IdAlumno: ", params[0], "IdMateria: ", params[1]);
      const nota = await notasTrimestres(params[0], params[1]);
      return res.status(200).json(nota);
    } else {
      return res.status(405).send("Metodo no permitido");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

async function notasTrimestres(idAlumno, idMateria) {
  try {
    let anoActual = new Date().getFullYear();

    return await db.$queryRaw`select m.nombre as materia ,idtrimestre as id,nota1,nota2,nota3,nota4,nota5 from nota n
         INNER JOIN materia as m ON m.id = n.idmateria
         inner join alumnoxcursoxdivision as al on al.id = n.idalumnoxcursoxdivision
         inner join usuario as u on u.id = al.idusuario
        where idmateria = ${Number(
          idMateria
        )} and idalumnoxcursoxdivision = ${Number(
      idAlumno
    )} and u.activo = true and anoactual = ${Number(anoActual)}
        group by idtrimestre,nota1,nota2,nota3,nota4,nota5, m.nombre`;
  } catch (error) {
    console.log(error);
  }
}
