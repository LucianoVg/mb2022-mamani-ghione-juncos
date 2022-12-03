import { Prisma } from "./prisma";

export async function contadorNotas() {
    try {

                const contador = await Prisma.newPrisma().$queryRaw`SELECT * FROM alumnoXcursoXdivision`

        // //     sum(case when nota1  = 1  ) as nota1,
        // //      sum(case when  nota2  = 1 )as nota2 ,
        // // sum(case when  nota3  = 1  )as nota3 ,
        // //     sum(case when  nota4  = 1  ) as nota4,
        // // sum(case when  nota5  = 1  ) as nota5

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