import { PrismaClient } from '@prisma/client';
import { enfermedad } from './seeds/enfermedad';

const prisma = new PrismaClient();

async function main() {
    enfermedad.map(async (e) => {
        const enfermedad = await prisma.enfermedad.create({
            data: {
               nombre: e.nombre
            }
        })
        console.log(enfermedad);
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