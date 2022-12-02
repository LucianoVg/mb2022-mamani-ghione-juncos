import { Prisma } from "./prisma";

export async function contadorNotas() {
    try {
        const contador = await Prisma.newPrisma().nota.aggregate({
           
           
            _count: {
                nota1: true,
                // nota2: true,
                // nota3: true,
                // nota4: true,
                // nota5: true
            },
            where: {
                nota1: { 
                    in: 5
                },
            }
            //     nota2: { 
            //         in: 5
            //     },
            //     nota3: { 
            //         in: 5
            //     },
            //     nota4: { 
            //         in: 5
            //     },
            //     nota5: { 
            //         in: 5
            //     },
            // }
            // where: {
            //     AND: [
            //         { nota1: { contains: "1" } },
            //         { nota2: { contains: "1" } },
            //         { nota3: { contains: "1" } },
            //         { nota4: { contains: "1" } },
            //         { nota5: { contains: "1" } },


            //     ]
            // }
        })
        return contador
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}