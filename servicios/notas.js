import { startsWith } from "lodash";
import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient()

export async function ListarCurso() {

    const cursos = await prisma.cursoXdivision.findMany({
        include: {
            curso: true,
            division: true
        }
    })

    return cursos
}



export async function ListarMaterias() {

    const materias = await prisma.materia.findMany()

    return materias
}



export async function TraerNotas(idTrimestre, idMateria, alumno, curso) {

    const notas = await prisma.nota.findMany({

        include: {
            materia: true,
            trimestre: true,
            alumnoXcursoXdivision: {
                include: {
                    usuario: true,
                    cursoXDivision: true
                }
            }

        },
        where: {
            AND: [
                { idTrimestre: idTrimestre },
                { idMateria: idMateria },
                {
                    alumnoXcursoXdivision: {
                        idCursoXDivision: curso
                    }
                },
                {
                    alumnoXcursoXdivision: {
                        usuario: {
                            nombre: {
                                startsWith: alumno.split(' ')[0]
                            }
                        }
                    },
                },
                {
                    alumnoXcursoXdivision: {
                        usuario: {
                            apellido: {
                                startsWith: alumno.split(' ')[1]
                            }
                        }
                    },
                }
            ]
        }
    })
    console.log(notas);
    return notas
}

export async function updateNota(idNota, notaNueva, columnName) {

    switch (columnName) {
        case 'nota1':
            const newNota1 = await prisma.nota.update({
                data: {
                    nota1: notaNueva

                },
                where: {
                    id: idNota
                }

            })
            return newNota1

        case 'nota2':
            const newNota2 = await prisma.nota.update({
                data: {
                    nota2: notaNueva

                },
                where: {
                    id: idNota
                }
            })
            return newNota2


        case 'nota3':
            const newNota3 = await prisma.nota.update({
                data: {
                    nota3: notaNueva

                },
                where: {
                    id: idNota
                }
            })
            return newNota3

        case 'nota4':
            const newNota4 = await prisma.nota.update({
                data: {
                    nota4: notaNueva

                },
                where: {
                    id: idNota
                }
            })
            return newNota4

        case 'nota5':
            const newNota5 = await prisma.nota.update({
                data: {
                    nota5: notaNueva

                },
                where: {
                    id: idNota
                }
            })
            return newNota5


        default:
            break;
    }


}
