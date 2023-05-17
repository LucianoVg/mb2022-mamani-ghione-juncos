import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { idTrimestre, idMateria } = req.query;
    const material_estudio = await descargarMaterialEstudio(
      idTrimestre,
      idMateria
    );
    return res.status(200).json(material_estudio);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
}

export async function descargarMaterialEstudio(idTrimestre, idMateria) {
  try {
    let and = [{ trimestre: { id: Number(idTrimestre) } }];

    if (idMateria) {
      and.push({ materiaxcursoxdivision: { id: Number(idMateria) } });
    }
    const material_estudio = await db.materialestudio.findMany({
      where: {
        AND: and,
      },
    });
    console.log("Material Estudio:", material_estudio);
    return material_estudio;
  } catch (error) {
    throw error;
  }
}
