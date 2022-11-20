import { prisma } from "../prisma/db";

export async function FiltrarMenu(idRol, prefijoUrl) {
  const filtro = await prisma.menuXrol.findMany({
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
  return filtro
}