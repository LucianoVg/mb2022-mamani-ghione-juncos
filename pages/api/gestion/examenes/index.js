import NextCors from "nextjs-cors";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "POST"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "GET") {
      const { idCurso, idCursos, idDocente } = req.query;

      console.log("IdCursos:", idCursos);
      const fechasExamen = await traerFechaExamenes(
        idCurso,
        idDocente,
        idCursos
      );
      return res.status(200).json(fechasExamen);
    }
    if (req.method === "POST") {
      const { titulo, fechaInicio, idCurso, fechaFin, idUsuario } = req.body;
      const fechaExamen = await guardarFechaExamen(
        titulo,
        fechaInicio,
        fechaFin,
        idUsuario,
        idCurso
      );
      return res.status(200).json(fechaExamen);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}
export async function traerFechaExamenes(idCurso, idDocente, idCursos) {
  try {
    let where = {};
    if (idCurso) {
      where = {
        ...where,
        curso: {
          alumnoxcursoxdivision: {
            some: {
              cursoxdivision: {
                id: Number(idCurso),
              },
            },
          },
        },
      };
    }
    if (idDocente) {
      where = {
        ...where,
        curso: {
          materiaxcursoxdivision: {
            some: {
              docentexmateria: {
                some: {
                  idusuario: Number(idDocente),
                },
              },
            },
          },
        },
      };
    }
    if (idCursos) {
      let cursos = Array.from(idCursos).filter((c) => c !== ",");
      console.log("IdCursos:", cursos);
      where = {
        ...where,
        curso: {
          id: {
            in: cursos.map((c) => Number(c)),
          },
        },
      };
    }
    const examenes = await db.fechaexamen.findMany({
      include: {
        usuario: true,
        curso: {
          include: {
            curso: true,
            division: true,
          },
        },
      },
      where: where,
    });
    return examenes;
  } catch (error) {
    console.log(error);
  }
}

export async function guardarFechaExamen(
  titulo,
  fechaInicio,
  fechaFin,
  idUsuario,
  idCurso
) {
  try {
    const fechaExamen = await db.fechaexamen.create({
      data: {
        titulo: titulo,
        fechainicio: fechaInicio,
        fechafin: fechaFin,
        usuario: {
          connect: {
            id: Number(idUsuario),
          },
        },
        curso: {
          connect: {
            id: Number(idCurso),
          },
        },
      },
    });
    return fechaExamen;
  } catch (error) {
    console.log(error);
  }
}
