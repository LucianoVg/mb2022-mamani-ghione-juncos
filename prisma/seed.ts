import { PrismaClient } from '@prisma/client';
import { usuarios } from "./seeds/usuarios";
import { roles } from './seeds/roles';
import { materias } from './seeds/materias';
import { cursos } from './seeds/cursos';
import { divisiones } from './seeds/divisiones';

const prisma = new PrismaClient();

async function main() {
    const roles = await prisma.rol.findMany()
    usuarios.map(async (u, i) => {
        await prisma.usuario.update({
            data: {
                correo: u.correo,
                idRol: roles[i].id
            },
            where: {
                id: i + 1
            }
        })
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