import { Prisma } from "./prisma";

export async function contadorNotas() {
    try {

        const contador = await Prisma.newPrisma().$queryRaw`SELECT idmateria, 
       sum(count(nota1))
        from nota 
        -- where nota1 = 1 and nota2= 1
        group by idmateria`



        // const contador = await Prisma.newPrisma().nota.groupBy({
        //     by: ["idMateria"],
        //     orderBy: {
        //         idMateria: "asc"
        //     },

        //     _count: {

        //         nota1: true



        //     },

        //     where: {
        //         nota1: {
        //             in: 1
        //         },
        //     }
        // })

        return contador
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}