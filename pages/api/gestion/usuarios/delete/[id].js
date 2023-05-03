import NextCors from "nextjs-cors/dist";
import { db } from "../../../../../prisma";

export default async function handler(req, res) {
  await NextCors(req, res, {
    // Options
    methods: ["DELETE"],
    origin: process.env.HOST,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });
  try {
    const { id } = req.query;
    const deleted = await deleteUser(id);
    console.log(deleted);
    return res.status(200).send("Usuario eliminado");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
  }
}

async function deleteUser(id) {
  return await db.usuario.update({
    data: {
      activo: false,
    },
    where: {
      id: Number(id),
    },
  });
}
