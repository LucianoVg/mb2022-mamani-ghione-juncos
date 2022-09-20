import { PrismaClient } from '@prisma/client';
// import { usuarios } from "./seeds/usuarios";
// import { roles } from './seeds/roles';
// import { materias } from './seeds/materias';
// import { cursos } from './seeds/cursos';
import { ficha } from './seeds/ficha';
import { menus } from './seeds/menus';
import { noticias } from './seeds/noticias';
import { tiposSancion } from './seeds/tiposSancion';
import { trimestres } from './seeds/trimestres';

const prisma = new PrismaClient();

async function main() {
    tiposSancion.map(async (t) => {
        const tiposSancion = await prisma.tipoSancion.create({
            data: t
        })
        console.log(tiposSancion);
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