import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "POST"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if (req.method === "POST") {
      const {
        nombreInstitucion,
        ubicacion,
        tipoInstitucion,
        descripcion,
        telefono1,
        telefono2,
        oficina1,
        oficina2,
        mail,
        idUsuario,
      } = req.body;

      const guardado = await guardarFichaInstitucional(
        0,
        nombreInstitucion,
        ubicacion,
        tipoInstitucion,
        descripcion,
        telefono1,
        telefono2,
        oficina1,
        oficina2,
        mail,
        idUsuario
      );

      return res.status(200).json(guardado);
    }
    if (req.method === "GET") {
      const ficha = await traerFichaInstitucional();
      return res.status(200).json(ficha);
    }
  } catch (error) {
    console.error(error);
    return res.status(200).json(error);
  }
}

export async function guardarFichaInstitucional(
  id = 0,
  nombreInstitucion = "",
  ubicacion = "",
  tipoInstitucion = "",
  descripcion = "",
  telefono1 = "",
  telefono2 = "",
  oficina1 = "",
  oficina2 = "",
  mail = "",
  idUsuario = 0
) {
  const guardado = await db.fichainstitucional.upsert({
    where: {
      id: Number(id),
    },
    update: {
      nombreinstitucion: nombreInstitucion,
      descripcion: descripcion,
      ubicacion: ubicacion,
      tipoinstitucion: tipoInstitucion,
      telefono1: telefono1,
      telefono2: telefono2,
      oficina1: oficina1,
      oficina2: oficina2,
      mail: mail,
      idusuario: Number(idUsuario),
    },
    create: {
      nombreinstitucion: nombreInstitucion,
      descripcion: descripcion,
      ubicacion: ubicacion,
      tipoinstitucion: tipoInstitucion,
      telefono1: telefono1,
      telefono2: telefono2,
      oficina1: oficina1,
      oficina2: oficina2,
      mail: mail,
      idusuario: Number(idUsuario),
    },
  });
  return guardado;
}

export async function traerFichaInstitucional() {
  const fichaInstitucional = await db.fichainstitucional.findFirst({
    include: {
      portadaficha: true,
    },
    where: {
      id: {
        not: 0,
      },
    },
  });
  return fichaInstitucional;
}
