import { Prisma } from "./prisma";

export async function TraerNotas(options) {
    try {
        return await Prisma.newPrisma().nota.findMany(options)
    } catch (error) {
        console.error(error);
    } finally {
        Prisma.disconnect()
    }
}
// export async function TraerNotas() {
//     try {
//         return await Prisma.newPrisma().nota.findMany({
//             include: {
//                 materia: true,
//                 trimestre: true,
//                 alumnoXcursoXdivision: {
//                     include: {
//                         usuario: true,
//                         cursoXdivision: true
//                     }
//                 }
//             },
//             // where: {
//             //     idTrimestre: 1
//             // }
//         })
//     } catch (error) {
//         console.error(error);
//     } finally {
//         Prisma.disconnect()
//     }
// }

export async function updateNota(idNota, notaNueva, columnName) {

    try {
        switch (columnName) {
            case 'nota1':
                const newNota1 = await Prisma.newPrisma().nota.update({
                    data: {
                        nota1: notaNueva

                    },
                    where: {
                        id: idNota
                    }

                })
                return newNota1

            case 'nota2':
                const newNota2 = await Prisma.newPrisma().nota.update({
                    data: {
                        nota2: notaNueva

                    },
                    where: {
                        id: idNota
                    }
                })
                return newNota2


            case 'nota3':
                const newNota3 = await Prisma.newPrisma().nota.update({
                    data: {
                        nota3: notaNueva

                    },
                    where: {
                        id: idNota
                    }
                })
                return newNota3

            case 'nota4':
                const newNota4 = await Prisma.newPrisma().nota.update({
                    data: {
                        nota4: notaNueva

                    },
                    where: {
                        id: idNota
                    }
                })
                return newNota4

            case 'nota5':
                const newNota5 = await Prisma.newPrisma().nota.update({
                    data: {
                        nota5: notaNueva

                    },
                    where: {
                        id: idNota
                    }
                })
                return newNota5
        }
    } catch (error) {
        console.log(error);
    } finally {
        Prisma.disconnect()
    }
}
