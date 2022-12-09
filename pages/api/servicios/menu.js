import { Prisma } from "./prisma";

export async function FiltrarMenu(idRol, prefijoUrl) {
  const filtro = await Prisma.newPrisma.menuxrol.findMany({
    include: {
      menu: true,
      rol: true
    },
    where: {
      AND: [
        { idrol: Number(idRol) },
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