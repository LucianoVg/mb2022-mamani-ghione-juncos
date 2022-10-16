import { PrismaClient } from '@prisma/client';
import { asistencias } from './seeds/asistencias';
// import { usuarios } from "./seeds/usuarios";
// import { roles } from './seeds/roles';
// import { materias } from './seeds/materias';
// import { cursos } from './seeds/cursos';
import { ficha } from './seeds/ficha';
import { menus } from './seeds/menus';
import { notas } from './seeds/notas';
import { noticias } from './seeds/noticias';
import { tiposSancion } from './seeds/tiposSancion';
import { trimestres } from './seeds/trimestres';
import { enfermedades } from "./seeds/enfermedad";

const prisma = new PrismaClient();

async function main() {
    // enfermedades.map(async (e) => {
    //     const enfermedad = await prisma.enfermedad.create({
    //         data: {
    //             descripcion: e.nombre,
    //             usuarioId: e.idUsuario
    //         }
    //     })
    //     console.log(enfermedad);
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