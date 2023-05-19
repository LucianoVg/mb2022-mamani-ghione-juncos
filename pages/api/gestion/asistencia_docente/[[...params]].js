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
    const { fecha, idDocente } = req.query;
    let AND = [
      {
        docente: {
          activo: true,
        },
      },
    ];
    let options = {
      include: {
        usuario: true,
        docente: true,
      },
      orderBy: [
        {
          creadoen: "asc",
        },
        {
          docente: {
            apellido: "asc",
          },
        },
      ],
    };
    if (idDocente) {
      AND.push({
        iddocente: Number(idDocente),
      });
    }
    if (fecha) {
      AND.push({
        creadoen: fecha,
      });
    } else {
      AND.push({
        creadoen: new Date().toLocaleDateString("en-GB"),
      });
    }
    if (AND.length) {
      options = {
        ...options,
        where: {
          AND: AND,
        },
      };
    }
    console.log(options);
    const asistencias = await TraerAsistencias(options);
    return res.status(200).json(asistencias);
  } catch (error) {
    console.error(error);
    return res.status(200).json({ mensaje: error.message });
  }
}

export async function TraerAsistencias(options) {
  try {
    const asistencias = await db.asistenciadocente.findMany(options);
    return asistencias;
  } catch (error) {
    console.log(error);
  }
}
