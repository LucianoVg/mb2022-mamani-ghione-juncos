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
      const { id } = req.query;
      const sancion = await obtenerSancion(id);
      if (sancion) {
        return res.status(200).json(sancion);
      }
      return res.status(404).json({ mensaje: "Sancion no encontrada" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
}
async function obtenerSancion(id) {
  try {
    const sancion = await db.sancionxalumno.findFirst({
      include: {
        sancion: {
          include: {
            tiposancion: true,
          },
        },
        alumnoxcursoxdivision: {
          include: {
            usuario: true,
            cursoxdivision: {
              include: {
                curso: true,
                division: true,
              },
            },
          },
        },
      },
      where: {
        id: Number(id),
      },
    });
    console.log(sancion);
    return sancion;
  } catch (error) {
    console.error(error);
  }
}
