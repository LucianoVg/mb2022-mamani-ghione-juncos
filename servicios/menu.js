import { Prisma } from "./prisma";

export async function FiltrarMenu(idRol, prefijoUrl) {
  const filtro = await Prisma.newPrisma().menuXrol.findMany({
    include: {
      menu: true,
      rol: true
    },
    where: {
      AND: [
        { idRol: idRol },
        {
          menu: {
            url: {
              startsWith: `/${prefijoUrl}`
            }
          }
        }
      ]
    }
  })
  Prisma.disconnect()
  return filtro
}