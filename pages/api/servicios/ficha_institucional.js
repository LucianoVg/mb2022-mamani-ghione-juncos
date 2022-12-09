import { Prisma } from "./prisma";

export async function traerFichaInstitucional(id = 0) {
    const fichaInstitucional = id !== 0 ? await Prisma.newPrisma.fichainstitucional.findFirst({
        where: {
            OR: [
                { id: id },
                { idusuario: id }
            ]
        },
        include: {
            portadasficha: true
        }
    }) : await Prisma.newPrisma.fichainstitucional.findMany({
        include: {
            portadasficha: true
        }
    })
    return fichaInstitucional
}

export async function guardarPortadas(nombre, url, fichaInstitucionalId) {
    const portada = await Prisma.newPrisma.portadaficha.create({
        data: {
            nombre: nombre,
            url: url,
            idfichainstitucional: Number(fichaInstitucionalId)
        },
    })
    return portada
}
export async function editarPortadas(id, nombre, url, fichaInstitucionalId) {
    const portada = await Prisma.newPrisma.portadaficha.update({
        where: {
            id: Number(id)
        },
        data: {
            nombre: nombre,
            url: url,
            idfichainstitucional: Number(fichaInstitucionalId)
        }
    })
    return portada
}
export async function traerPortadas(idFicha) {
    const portadas = await Prisma.newPrisma.portadaficha.findMany({
        where: {
            idfichainstitucional: Number(idFicha)
        },
        include: {
            fichainstitucional: true
        }
    })
    return portadas
}
export async function guardarFichaInstitucional(id = 0, nombreInstitucion = '', ubicacion = '', tipoInstitucion = '', descripcion = '', telefono1 = '', telefono2 = '', oficina1 = '', oficina2 = '', mail = '', idUsuario = 0) {

    const guardado = await Prisma.newPrisma.fichainstitucional.upsert({
        where: {
            id: Number(id)
        },
        update: {
            nombreinstitucion: nombreInstitucion,
            descripcion: descripcion,
            ubicacion: ubicacion,
            tipoinstitucion: tipoInstitucion,
            telefono1: telefono1,
            telefono2: telefono2,
            oficina1: oficina1,
            oficina2: oficina2,
            mail: mail,
            idusuario: Number(idUsuario)
        },
        create: {
            nombreinstitucion: nombreInstitucion,
            descripcion: descripcion,
            ubicacion: ubicacion,
            tipoinstitucion: tipoInstitucion,
            telefono1: telefono1,
            telefono2: telefono2,
            oficina1: oficina1,
            oficina2: oficina2,
            mail: mail,
            idusuario: Number(idUsuario)
        }
    })
    return guardado
}