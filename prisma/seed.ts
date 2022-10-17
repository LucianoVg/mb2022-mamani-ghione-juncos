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
import { usuarios } from "./seeds/usuarios";
import { alumnoXcursoXdivision } from "./seeds/alumnoXcursoXdivision";

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
    alumnoXcursoXdivision.map(async (a) => {
        const alumnoXcursoXdivision = await prisma.alumnoXcursoXdivision.create({
            data: {
                anoActual: a.anoActual,
                idCursoXdivision: a.idCursoXdivision,
                idUsuario: a.idUsuario,
                idEstadoAlumno: a.idEstadoAlumno
            }
        })
        console.log(alumnoXcursoXdivision);
    })
    // usuarios.map(async (u) => {
    //     const usuario = await prisma.usuario.create({
    //         data: {
    //             login: u.login,
    //             password: u.password,
    //             nombre: u.nombre,
    //             apellido: u.apellido,
    //             correo: u.correo,
    //             idRol: u.idRol ,
    //             legajo: u.legajo,
    //             sexo: u.sexo,
    //             localidad: u.localidad ,
    //             telefono: u.telefono,
    //             direccion: u.direccion
    //         }
    //     })
    //     console.log(usuario);
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