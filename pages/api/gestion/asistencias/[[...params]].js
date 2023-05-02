import NextCors from "nextjs-cors";
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
      let { fecha, idCurso, idAlumno } = req.query;
      console.log(fecha, idCurso, idAlumno);

      let OR = [];
      let options = {
        include: {
          usuario: true,
          alumnoxcursoxdivision: {
            include: {
              usuario: true,
              cursoxdivision: true,
            },
          },
        },
        orderBy: {
          creadoen: "asc",
        },
      };

      if (idAlumno) {
        OR.push({
          alumnoxcursoxdivision: {
            id: Number(idAlumno),
          },
        });
      }
      if (idCurso) {
        OR.push({
          alumnoxcursoxdivision: {
            cursoxdivision: {
              id: Number(idCurso),
            },
          },
        });
      }
      if (fecha) {
        OR.push({
          creadoen: fecha,
        });
      }
      if (OR.length) {
        options = {
          ...options,
          where: {
            OR: OR,
          },
        };
      }
      console.log(options);
      const asistencias = await TraerAsistencias(options);
      return res.status(200).json(asistencias);
    } else {
      return res.status(401).json({ mensaje: "Metodo no permitido" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function TraerAsistencias(options) {
  try {
    const asistencias = await db.asistencia.findMany(options);
    return asistencias;
  } catch (error) {
    console.log(error);
  }
}

export const config = {
  api: {
    responseLimit: "30mb",
  },
};
