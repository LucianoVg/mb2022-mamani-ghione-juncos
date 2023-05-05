import NextCors from "nextjs-cors/dist";
import { db } from "../../../../prisma";

export default async function handler(req, res) {
  try {
    await NextCors(req, res, {
      // Options
      methods: ["GET", "PUT"],
      origin: process.env.HOST,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    const { id } = req.query;
    if (req.method === "PUT") {
      const {
        nombreinstitucion,
        ciudad,
        provincia,
        tipoinstitucion,
        descripcion,
        telefono1,
        telefono2,
        oficina1,
        oficina2,
        mail,
        idusuario,
        portadasficha,
      } = req.body;

      const ficha = await guardarFichaInstitucional(
        id,
        nombreinstitucion,
        ciudad,
        provincia,
        tipoinstitucion,
        descripcion,
        telefono1,
        telefono2,
        oficina1,
        oficina2,
        mail,
        idusuario,
        portadasficha
      );

      return res.status(200).json(ficha);
    }
    if (req.method === "GET") {
      const fichaInstitucional = await traerFichaInstitucional(Number(id));

      return res.status(200).json(fichaInstitucional);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
}

export async function guardarFichaInstitucional(
  id = 0,
  nombreinstitucion,
  ciudad,
  provincia,
  tipoinstitucion,
  descripcion,
  telefono1,
  telefono2,
  oficina1,
  oficina2,
  mail,
  idusuario,
  portadasficha = []
) {
  const guardado = await db.fichainstitucional.upsert({
    where: {
      id: Number(id),
    },
    update: {
      nombreinstitucion: nombreinstitucion,
      descripcion: descripcion,
      ciudad: ciudad,
      provincia: provincia,
      tipoinstitucion: tipoinstitucion,
      telefono1: telefono1,
      telefono2: telefono2,
      oficina1: oficina1,
      oficina2: oficina2,
      mail: mail,
      idusuario: Number(idusuario),
      portadasficha: {
        upsert: portadasficha.map((pf) => ({
          create: {
            url: pf.url,
          },
          update: {
            url: pf.url,
          },
          where: {
            id: pf.id,
          },
        })),
      },
    },
    create: {
      nombreinstitucion: nombreinstitucion,
      descripcion: descripcion,
      ciudad: ciudad,
      provincia: provincia,
      tipoinstitucion: tipoinstitucion,
      telefono1: telefono1,
      telefono2: telefono2,
      oficina1: oficina1,
      oficina2: oficina2,
      mail: mail,
      idusuario: Number(idusuario),
      portadasficha: {
        connectOrCreate: portadasficha.map((pf) => ({
          create: {
            url: pf.url,
          },
          where: {
            id: pf.id,
          },
        })),
      },
    },
  });
  return guardado;
}

export async function traerFichaInstitucional(id = 0) {
  const fichaInstitucional = await db.fichainstitucional.findFirst({
    include: {
      portadaficha: true,
    },
    where: { id: id },
  });
  return fichaInstitucional;
}
