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
    const { idusuario } = req.query;
    console.log(idusuario);
    const alumno = await traerAlumno(idusuario);
    return res.status(200).json(alumno);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function traerAlumno(idusuario) {
  try {
    const alumno = await db.alumnoxcursoxdivision.findFirst({
      include: {
        cursoxdivision: {
          include: {
            curso: true,
            division: true,
          },
        },
        tutor: true,
      },
      where: {
        AND: [
          {
            usuario: {
              id: Number(idusuario),
            },
          },
          {
            usuario: {
              activo: true,
            },
          },
        ],
      },
    });
    return alumno;
  } catch (error) {
    console.log(error);
  }
}
