import { prisma } from "../prisma/db";

export async function TraerNotas(idTrimestre, idMateria, curso, nombreAlumno = "", apellidoAlumno = "") {
    try {
        let trimestres = await prisma.trimestre.findMany()
        const notas = idMateria && curso ? await prisma.nota.findMany({
            include: {
                materia: true,
                trimestre: true,
                alumnoXcursoXdivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: true
                    }
                }
            },
            where: {
                AND: [
                    { idTrimestre: trimestres[idTrimestre].id },
                    { idMateria: idMateria },
                    {
                        alumnoXcursoXdivision: {
                            cursoXdivision: {
                                id: curso
                            }
                        }
                    },
                    // {
                    //     alumnoXcursoXdivision: {
                    //         usuario: {
                    //             nombre: {
                    //                 contains: nombreAlumno
                    //             }
                    //         }
                    //     },
                    // },
                    // {
                    //     alumnoXcursoXdivision: {
                    //         usuario: {
                    //             apellido: {
                    //                 contains: apellidoAlumno
                    //             }
                    //         }
                    //     },
                    // }
                ]
            }
        }) : await prisma.nota.findMany({
            include: {
                materia: true,
                trimestre: true,
                alumnoXcursoXdivision: {
                    include: {
                        usuario: true,
                        cursoXdivision: true
                    }
                }
            },
            where: {
                idTrimestre: trimestres[idTrimestre].id
            }
        })
        return notas
    } catch (error) {
        console.error(error);
    }
}

export async function updateNota(idNota, notaNueva, columnName) {

    try {
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
        }
    } catch (error) {
        console.log(error);
    }
}
