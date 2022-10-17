import { orderBy } from "lodash";
import { Prisma } from "./prisma";

export default async function traerAlumnos() {
    try {
        const alumnos = await Prisma.newPrisma().alumnoXcursoXdivision.findMany({
            include: {
                usuario: true
            }
        })
        console.log(alumnos);
        return alumnos
    } catch (error) {
        console.error(error);
    }
}


// export default async function alumnoXcurso() {
//     try {
//         const alumnos = await Prisma.newPrisma().alumnoXcursoXdivision.findMany({
//             include: {
//                 // usuario: true,
//                 cursoXdivision: {
//                     include: {
//                         curso: true,
//                         division: true
//                     }
//                 }
//             },
//             where: {
//                 cursoXdivision: {
//                     curso: {
//                         nombre: '1'
//                     }
//                 }
//             }
//         })
//         console.log(alumnos);
//         return alumnos
//     } catch (error) {
//         console.error(error);
//     }
// }

