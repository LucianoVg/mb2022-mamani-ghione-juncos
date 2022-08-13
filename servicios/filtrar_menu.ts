import { Prisma } from "../servicios/prisma";

export async function FiltrarMenu(menu: string, idRol: any) {
  const filtro = await Prisma.newPrisma().menuXrol.findMany({
    include: {
      menu: true
    },
    where: {
      idRol: idRol
    }

  })
  return filtro
}