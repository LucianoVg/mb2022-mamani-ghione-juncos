import { Prisma } from "./prisma";

export async function FiltrarMenu(idRol?: number) {
  const filtro = await Prisma.newPrisma().menuXrol.findMany({
    include: {
      menu: true,
      rol: true
    },
    where: {
      idRol: idRol
    }
  })
  return filtro
}