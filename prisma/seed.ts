import { PrismaClient } from '@prisma/client';
// import { usuarios } from "./seeds/usuarios";
// import { roles } from './seeds/roles';
// import { materias } from './seeds/materias';
import { cursos } from './seeds/cursos';
import { ficha } from './seeds/ficha';
import { menus } from './seeds/menus';
import { trimestres } from './seeds/trimestres';

const prisma = new PrismaClient();

async function main() {
    const fichaInstitucional = await prisma.fichaInstitucional.create({
        include: {
            portadasFicha: true
        },
        data: {
            nombreInstitucion: ficha.nombreInstitucion,
            descripcion: ficha.descripcion,
            mail: ficha.mail,
            telefono1: ficha.telefono1,
            telefono2: ficha.telefono2,
            oficina1: ficha.oficina1,
            oficina2: ficha.oficina2,
            ubicacion: ficha.ubicacion,
            tipoInstitucion: ficha.tipoInstitucion,
            idUsuario: ficha.idUsuario,
            portadasFicha: {
                create: ficha.portadasFicha
            }
        }
    })
    console.log(fichaInstitucional);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });