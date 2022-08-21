import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export async function traerFichaInstitucional(id = 0) {
    const fichaInstitucional = await prisma.fichaInstitucional.findFirst({
        where: {
            OR: [
                { id: id },
                { idUsuario: id }
            ]
        },
        include: {
            portadasFicha: true
        }
    })
    return fichaInstitucional
}

export async function guardarPortadas(nombre, url, fichaInstitucionalId) {
    const portada = await prisma.portadaFicha.create({
        data: {
            nombre: nombre,
            url: url,
            fichaInstitucionalId: fichaInstitucionalId
        },
    })
    return portada
}
export async function editarPortadas(id, nombre, url, fichaInstitucionalId) {
    const portada = await prisma.portadaFicha.update({
        where: {
            id: id
        },
        data: {
            nombre: nombre,
            url: url,
            fichaInstitucionalId: fichaInstitucionalId
        }
    })
    return portada
}
export async function traerPortadas(idFicha) {
    const portadas = await prisma.portadaFicha.findMany({
        where: {
            fichaInstitucionalId: idFicha
        },
        include: {
            fichaInstitucional: true
        }
    })
    return portadas
}
export async function guardarFichaInstitucional(id = 0, nombreInstitucion = '', ubicacion = '', tipoInstitucion = false, descripcion = '', telefono1 = '', telefono2 = '', oficina1 = '', oficina2 = '', mail = '', idUsuario = 0) {

    const guardado = await prisma.fichaInstitucional.upsert({
        where: {
            id: id
        },
        update: {
            nombreInstitucion: nombreInstitucion,
            descripcion: descripcion,
            ubicacion: ubicacion,
            tipoInstitucion: tipoInstitucion,
            telefono1: telefono1,
            telefono2: telefono2,
            oficina1: oficina1,
            oficina2: oficina2,
            mail: mail,
            idUsuario: idUsuario
        },
        create: {
            nombreInstitucion: nombreInstitucion,
            descripcion: descripcion,
            ubicacion: ubicacion,
            tipoInstitucion: tipoInstitucion,
            telefono1: telefono1,
            telefono2: telefono2,
            oficina1: oficina1,
            oficina2: oficina2,
            mail: mail,
            idUsuario: idUsuario
        }
    })
    return guardado
}