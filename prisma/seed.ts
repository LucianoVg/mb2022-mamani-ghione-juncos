import { PrismaClient } from "@prisma/client";
import { materias } from './seeds/materias'

const prisma = new PrismaClient()

async function main() {
    materias.map(async (m) => {
        await prisma.materia.create({ data: m })
    })
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })