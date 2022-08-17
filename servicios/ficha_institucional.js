import { PrismaClient } from "@prisma/client";
import { Prisma } from "./prisma";

export async function traerFichaInstitucional() {
    const prisma = new PrismaClient()
    const fichaInstitucional = await prisma.fichaInstitucional.findFirst({
        where: {
            id: 6
        },
        include: {
            portadasFicha: true
        }
    })
    return fichaInstitucional
}

export async function guardarPortadas(id, nombre, url, fichaInstitucionalId) {
    await Prisma.newPrisma().portadaFicha.upsert({
        where: {
            id: id
        },
        create: {
            nombre: nombre,
            url: url,
            fichaInstitucionalId: fichaInstitucionalId
        },
        update: {
            nombre: nombre,
            url: url,
            fichaInstitucionalId: fichaInstitucionalId
        }
    })
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
    return guardado
}