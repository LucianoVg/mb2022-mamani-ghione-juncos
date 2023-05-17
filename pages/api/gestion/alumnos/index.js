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
      const { idCursoXdivision } = req.query;
      const alumnos = await traerAlumnos(idCursoXdivision);
      return res.status(200).json(alumnos);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function traerAlumnos(idCursoXdivision) {
  try {
    let AND = [
      {
        usuario: {
          activo: true
        },
      },
    ];
    let options = {
      include: {
        cursoxdivision: {
          include: {
            curso: true,
            division: true,
          },
        },
        usuario: true,
      },
    };
    if (idCursoXdivision) {
      AND.push({
        idcursoxdivision: Number(idCursoXdivision)
      },);
    }
    options = {
      ...options,
      where: {
        AND: AND,
      },
    };
    const alumnos = await db.alumnoxcursoxdivision.findMany(options);
    return alumnos;
  } catch (error) {
    console.error(error);
  }
}
