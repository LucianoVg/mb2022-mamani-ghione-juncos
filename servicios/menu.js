import { Prisma } from "./prisma";

export async function FiltrarMenu(idRol) {
  const filtro = await Prisma.newPrisma().menuXrol.findMany({
    include: {
      menu: true,
      rol: true
    },
    where: {
      idRol: idRol
    }
  })
  Prisma.disconnect()
  return filtro
}