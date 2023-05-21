import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["GET"],
    origin: process.env.HOST,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {

    const { id } = req.query;
    const usuarios = await ListarUsuarios(id)
    return res.status(200).json(usuarios)

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message })
  }
}

async function ListarUsuarios(id) {
  try {
    let AND = [
      {
        activo: true
      },
    ];
    let options = {
      include: {
        rol: true
      },
    };
    if (id) {
      AND.push({
        rol: {
          id: Number(id)
        }
      },);
    }
    options = {
      ...options,
      where: {
        AND: AND,
      },
    };
    const usuarios = await db.usuario.findMany(options)
     return usuarios
  } catch (error) {
    console.log(error);
  }
}