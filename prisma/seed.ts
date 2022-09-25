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

const prisma = new PrismaClient();

async function main() {
    notas.map(async (n) => {
        const nota = await prisma.nota.create({
            data: {
                idAlumnoXcursoXdivision: n.idAlumno,
                idMateria: n.idMateria,
                idTrimestre: n.idTrimestre,
                idUsuario: n.idUsuario,
                nota1: n.nota1,
                nota2: n.nota2,
                nota3: n.nota3,
                nota4: n.nota4,
                nota5: n.nota5,
                fecha: n.fecha
            }
        })
        console.log(nota);
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