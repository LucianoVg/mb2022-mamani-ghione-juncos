import { Prisma } from "./prisma";

export async function traerFichaInstitucional(id = 0) {
    const fichaInstitucional = id !== 0 ? await Prisma.newPrisma().fichaInstitucional.findFirst({
        where: {
            OR: [
                { id: id },
                { idUsuario: id }
            ]
        },
        include: {
            portadasFicha: true
        }
    }) : await Prisma.newPrisma().fichaInstitucional.findMany({
        include: {
            portadasFicha: true
        }
    })
    Prisma.disconnect()
    return fichaInstitucional
}

export async function guardarPortadas(nombre, url, fichaInstitucionalId) {
    const portada = await Prisma.newPrisma().portadaFicha.create({
        data: {
            nombre: nombre,
            url: url,
            fichaInstitucionalId: fichaInstitucionalId
        },
    })
    Prisma.disconnect()
    return portada
}
export async function editarPortadas(id, nombre, url, fichaInstitucionalId) {
    const portada = await Prisma.newPrisma().portadaFicha.update({
        where: {
            id: id
        },
        data: {
            nombre: nombre,
            url: url,
            fichaInstitucionalId: fichaInstitucionalId
        }
    })
    Prisma.disconnect()
    return portada
}
export async function traerPortadas(idFicha) {
    const portadas = await Prisma.newPrisma().portadaFicha.findMany({
        where: {
            fichaInstitucionalId: idFicha
        },
        include: {
            fichaInstitucional: true
        }
    })
    Prisma.disconnect()
    return portadas
}
export async function guardarFichaInstitucional(id = 0, nombreInstitucion = '', ubicacion = '', tipoInstitucion = false, descripcion = '', telefono1 = '', telefono2 = '', oficina1 = '', oficina2 = '', mail = '', idUsuario = 0) {

    const guardado = await Prisma.newPrisma().fichaInstitucional.upsert({
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
    Prisma.disconnect()
    return guardado
}