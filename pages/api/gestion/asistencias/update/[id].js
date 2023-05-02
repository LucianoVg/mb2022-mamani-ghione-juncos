import NextCors from "nextjs-cors";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["PUT"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { id } = req.query;
    if (req.method === "PUT") {
      const {
        presente,
        ausente,
        ausenteJustificado,
        llegadaTarde,
        mediaFalta,
        motivo,
        idUsuario,
      } = req.body;

      const asistencia = await updateAsistencia(
        Number(id),
        Boolean(presente),
        Boolean(ausente),
        Boolean(ausenteJustificado),
        Boolean(llegadaTarde),
        Boolean(mediaFalta),
        motivo,
        idUsuario
      );
      return res.status(200).json(asistencia);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
}

export async function updateAsistencia(
  id,
  presente,
  ausente,
  ausenteJustificado,
  llegadaTarde,
  mediaFalta,
  motivo,
  idUsuario
) {
  try {
    const asistencia = await db.asistencia.update({
      data: {
        presente: presente,
        ausente: ausente,
        ausentejustificado: ausenteJustificado,
        llegadatarde: llegadaTarde,
        mediafalta: mediaFalta,
        motivo: motivo,
        idusuario: Number(idUsuario),
        actualizadoen: new Date().toLocaleDateString("es-AR").split("T")[0],
      },
      where: {
        id: Number(id),
      },
    });
    return asistencia;
  } catch (error) {
    console.log(error);
  }
}
