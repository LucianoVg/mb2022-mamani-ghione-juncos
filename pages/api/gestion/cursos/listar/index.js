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
      const cursos = await traerCursos();
      return res.status(200).json(cursos);
    } else {
      return res.status(405).send("Metodo no permitido");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function traerCursos() {
  try {
    const cursos = await db.curso.findMany({
      orderBy: {
        nombre: "asc",
      },
    });
    return cursos;
  } catch (error) {
    console.log(error);
  }
}
