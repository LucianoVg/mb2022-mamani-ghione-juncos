import { PrismaClient } from '@prisma/client';
import { asistencias } from './seeds/asistencias';

import { cursos } from './seeds/cursos';
import { ficha } from "./seeds/ficha";
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
import { portadaFicha } from './seeds/portadaFicha';
import { discapacidad } from './seeds/discapacidad';
import { roles } from './seeds/roles';
import { menus } from './seeds/menus';
// import { roles } from './seeds/roles';

const prisma = new PrismaClient();

// const getAsistencias = async () => {
//     const asistencias = alumnos.map(a => (
//         fechas.map(fecha => (
//             {
//                 idAlumnoXcursoXdivision: a.id,
//                 creadoEn: fecha,
//                 presente: false,
//                 llegadaTarde: false,
//                 ausente: false,
//                 ausenteJustificado: false,
//                 llegadaTardeJustificada: false,
//                 mediaFalta: false,
//                 mediaFaltaJustificada: false,
//                 idUsuario: '6345ee8566a769b309bd9367'
//             }
//         ))
//     ))
//     return asistencias.flat(1)
// }
async function main() {
    // const menus = await prisma.menu.findMany()
    // const roles = await prisma.rol.findMany()
    // console.log(menus, roles);

    // menus.map(async (m) => {
    //     const enfer = await prisma.menu.create({
    //         data: {
    //             menuSistema: m.menuSistema,
    //             url: m.url
    //         }
    //     })
    //     console.log(enfer);
    // })


    // menuXRoles.map(async (m) => {
    //     const enfer = await prisma.menuXrol.create({
    //         data: {
    //            idMenu: m.idMenu,
    //            idRol: m.idRol
    //         }
    //     })
    //     console.log(enfer);
    // })

    // enfermedades.map(async (m) => {
    //     const enfer = await prisma.enfermedad.create({
    //         data: {
    //             descripcion: m.nombre
    //         }
    //     })
    //     console.log(enfer);
    // })

    // discapacidad.map(async (m) => {
    //     const disc = await prisma.discapacidad.create({
    //         data: {
    //             nombre: m.nombre
    //         }
    //     })
    //     console.log(disc);
    // })

    // noticias.map(async (n) => {
    //     const noticia = await prisma.noticiasYnovedades.create({
    //         data: {
    //             titulo: n.titulo,
    //             creadaEn: n.creadaEn,
    //             actualizadaEn: n.actualizadaEn,
    //             descripcion: n.descripcion,
    //             idUsuario: n.idUsuario,
    //             url: n.url
    //         }
    //     })
    //     console.log(noticia);
    // })



    // const fichaInstitucional = await prisma.fichaInstitucional.create({
    //     data: {
    //         nombreInstitucion: ficha.nombreInstitucion,
    //         ubicacion: ficha.ubicacion,
    //         telefono1: ficha.telefono1,
    //         telefono2: ficha.telefono2 ,
    //         tipoInstitucion: ficha.tipoInstitucion ,
    //         descripcion: ficha.descripcion ,
    //         oficina1: ficha.oficina1,
    //         oficina2: ficha.oficina2 ,
    //         mail: ficha.mail,
    //         idUsuario: ficha.idUsuario
    //     }
    // })
    // console.log(fichaInstitucional);

    // portadaFicha.map(async (p) => {
    //     const portada = await prisma.portadaFicha.createMany({
    //         data: {
    //             nombre: p.nombre,
    //             url: p.url,
    //             idFichaInstitucional: 1
    //         }
    //     })
    //     console.log(portada);
    // })


    // cursos.map(async (c) => {

    //     const materi = await prisma.cursoXdivision.create({
    //         data: {

    //             idCurso: c.idCurso,
    //             idDivision: c.idDivision
    //         }
    //     })
    //     console.log(materi);
    // })


    // materias.map(async (m) => {

    //     const materi = await prisma.materia.create({
    //         data: {
    //             id: m.id,
    //             nombre: m.nombre,
    //             idCorrelativa: m.idCorrelativa,
    //             idCurso: m.idCurso
    //         }
    //     })
    //     console.log(materi);
    // })


    //  roles.map(async (m) => {

    //     const roles = await prisma.rol.create({
    //         data: {
    //             id: m.id,
    //             tipo: m.tipo
    //         }
    //     })
    //     console.log(roles);



    // usuarios.map(async (u) => {
    //     const usuario = await prisma.usuario.create({
    //         data: {
    //             nombre: u.nombre,
    //             apellido: u.apellido,
    //             correo: u.correo,
    //             idRol: u.idRol,
    //             legajo: u.legajo,
    //             login: u.login,
    //             localidad: u.localidad,
    //             password: u.password,
    //             sexo: u.sexo,
    //             telefono: u.telefono,
    //             direccion: u.direccion
    //         }
    //     })
    //     console.log(usuario);
    // })

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






