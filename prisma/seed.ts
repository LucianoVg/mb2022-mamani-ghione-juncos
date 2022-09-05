import { PrismaClient } from '@prisma/client';
// import { usuarios } from "./seeds/usuarios";
// import { roles } from './seeds/roles';
import { materias } from './seeds/materias';
import { cursos } from './seeds/cursos';
import { divisiones } from './seeds/divisiones';

const prisma = new PrismaClient();

async function main() {
    await prisma.cursoXdivision.create({
        data: {
            idCurso: 2,
            IdDivision: 1
        }
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });