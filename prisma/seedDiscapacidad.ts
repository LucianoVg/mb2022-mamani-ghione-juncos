import { PrismaClient } from '@prisma/client';
import { discapacidad } from './seeds/discapacidad';

const prisma = new PrismaClient();

async function main() {
    discapacidad.map(async (d) => {
        const discapacidad = await prisma.discapacidad.create({
            data: {
                nombre: d.nombre
            }
        })
        console.log(discapacidad);
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