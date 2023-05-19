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
      const { idDocente } = req.query;
      const cursoXDivision = await traerCursosXDivision(idDocente);
      return res.status(200).json(cursoXDivision);
    } else {
      return res.status(405).send("Metodo no permitido");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function traerCursosXDivision(idDocente) {
  try {
    let where = idDocente
      ? {
          materiaxcursoxdivision: {
            some: {
              docentexmateria: {
                some: {
                  id: Number(idDocente),
                },
              },
            },
          },
        }
      : {};
    const cursosXDivision = await db.cursoxdivision.findMany({
      include: {
        curso: true,
        division: true,
      },
      orderBy: {
        curso: {
          nombre: "asc",
        },
      },
      where,
    });
    return cursosXDivision;
  } catch (error) {
    console.log(error);
  }
}
