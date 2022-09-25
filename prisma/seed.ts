import { PrismaClient } from '@prisma/client';
import { asistencias } from './seeds/asistencias';
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
    asistencias.map(async (a) => {
        const asistencia = await prisma.asistencia.create({
            data: {
                creadoEn: a.creadaEn,
                idAlumnoXcursoXdivision: a.idAlumno,
                presente: a.presente,
                ausente: a.ausente,
                llegadaTarde: a.llegadaTarde,
                mediaFalta: a.mediaFalta,
                mediaFaltaJustificada: a.mediaFaltaJustificada,
                ausenteJustificado: a.ausenteJustificado,
                llegadaTardeJustificada: a.llegadaTardeJustificada,
                idUsuario: a.idUsuario
            }
        })
        console.log(asistencia);
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