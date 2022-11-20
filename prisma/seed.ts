import { PrismaClient } from '@prisma/client';
import { asistencias } from './seeds/asistencias';
// import { usuarios } from "./seeds/usuarios";
// import { roles } from './seeds/roles';
// import { materias } from './seeds/materias';
// import { cursos } from './seeds/cursos';
import { ficha } from './seeds/ficha';
// import { menus } from './seeds/menus';
import { notas } from './seeds/notas';
import { noticias } from './seeds/noticias';
import { tiposSancion } from './seeds/tiposSancion';
import { trimestres } from './seeds/trimestres';
import { enfermedades } from "./seeds/enfermedad";
import { usuarios } from "./seeds/usuarios";
import { alumnoXcursoXdivision } from "./seeds/alumnoXcursoXdivision";
import { alumnos, fechas } from "./seeds/alumnos";
import { materias } from './seeds/materias';
import { menuXRoles } from './seeds/menuXRol';
// import { roles } from './seeds/roles';

const prisma = new PrismaClient();

const getAsistencias = async () => {
    const asistencias = alumnos.map(a => (
        fechas.map(fecha => (
            {
                idAlumnoXcursoXdivision: a.id,
                creadoEn: fecha,
                presente: false,
                llegadaTarde: false,
                ausente: false,
                ausenteJustificado: false,
                llegadaTardeJustificada: false,
                mediaFalta: false,
                mediaFaltaJustificada: false,
                idUsuario: '6345ee8566a769b309bd9367'
            }
        ))
    ))
    return asistencias.flat(1)
}
async function main() {
    // const menus = await prisma.menu.findMany()
    // const roles = await prisma.rol.findMany()
    // console.log(menus, roles);

    // materias && materias.map(m => {
    //     trimestres && trimestres.map(t => {
    //         alumnos && alumnos.map(async (a) => {
    //             let nota = await prisma.nota.create({
    //                 data: {
    //                     idAlumnoXcursoXdivision: a.id,
    //                     idMateria: m.id,
    //                     idTrimestre: t.id,
    //                     nota1: 0,
    //                     nota2: 0,
    //                     nota3: 0,
    //                     nota4: 0,
    //                     nota5: 0
    //                 }
    //             })
    //             console.log(nota);
    //         })
    //     })
    // })
    // const asistencias = await getAsistencias()
    // const creation = await prisma.asistencia.createMany({
    //     data: asistencias
    // })
    // console.log(creation);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });