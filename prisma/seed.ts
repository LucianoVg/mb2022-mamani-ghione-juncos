import { PrismaClient } from '@prisma/client';
import { usuarios } from "./seeds/usuarios";
import { roles } from './seeds/roles';
import { materias } from './seeds/materias';
import { cursos } from './seeds/cursos';
import { divisiones } from './seeds/divisiones';
import { menus } from './seeds/menus';
import { cursosXDivision } from './seeds/cursosXDivision';

const prisma = new PrismaClient();

async function main() {
    // const alumnos = await prisma.usuario.findMany({
    //     where: {
    //         rol: {
    //             tipo: 'Estudiante'
    //         }
    //     }
    // })

    // alumnos.map(async (a) => {

    //     await prisma.alumnoXcursoXdivision.create({
    //         data: {
    //             idUsuario: a.id,
    //             idCursoXDivision: 1
    //         }
    //     })
    // })

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });