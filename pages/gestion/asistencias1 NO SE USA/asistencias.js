import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'


export default function Notas() {
    // const [notas, setNotas] = useState([])

    // const [idMateria, setIdMateria] = useState(1)
    // const [idCurso, setIdCurso] = useState(1)

    // const [nombreAlumno, setNombreAlumno] = useState("")
    // const [apellidoAlumno, setApellidoAlumno] = useState("")
    // const [alumno, setAlumno] = useState("")

    // const [materias, setMaterias] = useState()
    const [cursos, setCursos] = useState()
    // const [nota, setNota] = useState(0);
    // const [columnName, setColumnName] = useState("");

    // const [inEditMode, setInEditMode] = useState({
    //     status: false,
    //     rowKey: null
    // });
    // const [trimestre, setTrimestre] = useState({
    //     id: "home0",
    //     aria: "home-tab0",
    //     idTrimestre: 1

    // })

    // useEffect(() => {
    //     defaultTrimestre()
    //     listarMaterias()
    //     listarCursos()
    //     // filtros()
    // }, [trimestre, idMateria, alumno, idCurso])


    const listarCursos = () => {
        axios.get(`http://localhost:3000/api/gestion/notas/curso`)
            .then(res => {
                console.log(res.data);
                setCursos(res.data)
            }).catch(err => {
                console.error(error);
            })
    }
    // const listarMaterias = () => {
    //     axios.get(`http://localhost:3000/api/gestion/notas/materias`)
    //         .then(res => {
    //             console.log(res.data);
    //             setMaterias(res.data)
    //         }).catch(err => {
    //             console.error(error);
    //         })
    // }

    // const handleMateria = (e) => {
    //     setIdMateria(Number.parseInt(e.target.value))
    //     console.log(idMateria);
    //     defaultTrimestre()
    // }

    // const handleCurso = (e) => {
    //     setIdCurso(Number.parseInt(e.target.value))
    //     defaultTrimestre()
    // }
    // const handleNombreAlumno = (e) => {
    //     setNombreAlumno(e.target.value)
    //     setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
    //     defaultTrimestre()
    // }

    // const handleApellidoAlumno = (e) => {
    //     setApellidoAlumno(e.target.value)
    //     setAlumno(`${nombreAlumno} ${apellidoAlumno}`)
    //     defaultTrimestre()
    // }

    // const listarAsistencias = () => {
    //     axios.get(`http://localhost:3000/api/gestion/asistencias/${alumno}/${idCurso}`)
    //         .then(res => {
    //             console.log(res.data);
    //             setNotas(res.data)
    //         }).catch(err => {
    //             console.error(error);
    //         })
    // }




    // const onEdit = (id) => {
    //     setInEditMode({
    //         status: true,
    //         rowKey: id
    //     })
    // }

    // const updateNota = (id, newNota, columnName) => {
    //     axios.put(`http://localhost:3000/api/gestion/notas/update/${id}`, {
    //         nota: newNota,
    //         nombreColumna: columnName
    //     })
    //         .then(res => {
    //             console.log(res.data);
    //             // reset inEditMode and unit price state values
    //             onCancel();

    //             // fetch the updated data
    //             defaultTrimestre();
    //         }).catch(err => {
    //             console.error(err);
    //         })

    // }

    // const onSave = (id, newNota, columnName) => {
    //     updateNota(id, newNota, columnName);
    // }

    // const onCancel = () => {
    //     // reset the inEditMode state value
    //     setInEditMode({
    //         status: false,
    //         rowKey: null
    //     })
    //     // reset the unit price state value
    //     setNota(0);
    // }


    // const select = () => {
    //     var input = document.getElementById("select")
    //     input.select();
    //     input.focus();
    // }

    // const onChangeNotaColumna = (e) => {
    //     setNota(Number.parseInt(e.target.value))
    //     setColumnName(e.target.name)
    // }


    useEffect(() => {
        listarAsistencias()
        listarCursos()
    }, [])

    const [asistencias, setAsistencias] = useState([])
    const listarAsistencias = () => {
        axios.get(`http://localhost:3000/api/gestion/asistencias/asistencia_alumno`)
            .then(res => {
                console.log(res.data);
                setAsistencias(res.data)
            }).catch(err => {
                console.error(error);
            })
    }

    const bloquearCheck = (a) => {
        return (
            a.presente || a.ausente || a.ausenteJustificado || a.llegadaTarde || a.llegadaTardeJustificada || a.mediaFalta || a.mediaFaltaJustificada
        )


    }

    const fecha = new Date()



    console.log()
    return (
        <Layout title={'Notas'}>


            <div>
                <h1><strong>Asistencias</strong></h1>

                <div className="mt-5 " style={{ marginBottom: '20mm' }}>
                    <div className="col-md-3 hstack me-3 " style={{ marginBottom: '5mm' }}>
                        <label className="fw-bold me-2" name="inputMateria ">Curso: </label>
                        <select name="idCurso" className="form-select " id="inputCurso" style={{ width: '20mm' }} >
                            {
                                cursos && cursos.map((c) => (
                                    <option value={c.id} key={c.id} className="col-md-2">{c.curso?.nombre} {c.division?.division} </option>
                                ))
                            }


                        </select>
                    </div>
                    <div className="g-2" >

                        <div className="col-ms-6 hstack" style={{ marginBottom: '5mm' }}>
                            <label for="date" className="fw-bold me-2">Fecha hasta:</label>
                            <div className="col-ms-5">
                                <div className="input-group date" id="datepicker">
                                    <input type="date" className="form-control" />

                                </div>
                            </div>
                        </div>
                        <div className="col-ms-6 hstack" style={{ marginBottom: '5mm' }}>
                            <label for="date" className="fw-bold me-2">Fecha hasta:</label>
                            <div className="col-ms-5">
                                <div className="input-group date" id="datepicker">
                                    <input type="date" className="form-control" />

                                </div>
                            </div>
                        </div>

                        <div className="row g-3" >
                            <div>
                                <label className="fw-bold me-2" >Buscar alumno: </label>
                            </div>
                            <div className="col-md-3 hstack me-5">

                                <label htmlFor="inputNombre" className="fw-bold me-2">Documento: </label>
                                <input name="Documento" className="form-control my-2 text-capitalize " style={{ width: '50mm' }} type="search" placeholder="Search" aria-label="Search" />


                                <button type="submit" className="btn input-group-text btn-primary"
                                >
                                    <i className='bx bx-search me-1'></i>
                                </button>
                            </div>
                            <div className="col-md-3 hstack me-3">

                                <label htmlFor="inputNombre" className="fw-bold me-2">Nombre: </label>
                                <input name="alumno" className="form-control my-2 text-capitalize " style={{ width: '50mm' }} type="search" placeholder="Search" aria-label="Search" />


                                <button type="submit" className="btn input-group-text btn-primary"
                                >
                                    <i className='bx bx-search me-1'></i>
                                </button>
                            </div>

                            <div className="col-md-3 hstack me-3">
                                <label htmlFor="inputApellido" className="fw-bold me-2" >Apellido: </label>
                                <input name="alumno" className="form-control my-2 text-capitalize " style={{ width: '50mm' }} type="search" placeholder="Search" aria-label="Search" />


                                <button type="submit" className="btn input-group-text btn-primary"
                                >
                                    <i className='bx bx-search me-1'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>

                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Fecha</th>
                                <th scope="col">Documento</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">Preceptor</th>
                                <th scope="col">Presente</th>
                                <th scope="col">Ausente</th>
                                <th scope="col">Ausente Justificado</th>
                                <th scope="col">Llegada Tarde</th>
                                <th scope="col">Llegada Tarde Justificada</th>
                                <th scope="col">Media Falta</th>
                                <th scope="col">Media Falta Justificada</th>
                                <th scope="col">Acción</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                asistencias && asistencias.map((a, i) => (

                                    < tr key={i} >

                                        <td className="col-md-1 text-capitalize">{new Date(a.creadoEn).toLocaleDateString('en-GB')}</td>
                                        <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.dni}</td>
                                        <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                        <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                        <td className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</td>
                                        <td className="col-md-1 ">


                                            <div className="form-check form-switch  ">
                                                <input className="form-check-input pd-1" checked={a.presente} type="checkbox" role="switch" disabled={bloquearCheck(a)} />
                                            </div>



                                        </td>
                                        <td className="col-md-1 ">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" checked={a.ausente} type="checkbox" role="switch" disabled={bloquearCheck(a)} />

                                            </div>
                                        </td>
                                        <td className="col-md-1 ">


                                            <div className="form-check form-switch">
                                                <input className="form-check-input" checked={a.ausenteJustificado} type="checkbox" role="switch" disabled={bloquearCheck(a)} />

                                            </div>
                                        </td>
                                        <td className="col-md-1 ">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" checked={a.llegadaTarde} type="checkbox" role="switch" disabled={bloquearCheck(a)} />

                                            </div>
                                        </td>
                                        <td className="col-md-1">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" checked={a.llegadaTardeJustificada} type="checkbox" role="switch" disabled={bloquearCheck(a)} />

                                            </div>
                                        </td>
                                        <td className="col-md-1 ">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" checked={a.mediaFalta} type="checkbox" role="switch" disabled={bloquearCheck(a)} />

                                            </div>
                                        </td>
                                        <td className="col-md-1">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" checked={a.mediaFaltaJustificada} type="checkbox" role="switch" disabled={bloquearCheck(a)} />

                                            </div>
                                        </td>
                                        <td>
                                         <a className="btn btn-primary" href="http://localhost:3000/gestion/asistencias1/editarAsistencia">Editar</a>
                                            
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                </div>
            </div>
        </Layout >

    );

}



// --- PARA LA PAGINA DE EDITAR

// {/* <select className="form-select" aria-label="Default select example">
//                                                 <option value="" selected disabled hidden></option>
//                                                 <option value="1">Presente</option>
//                                                 <option value="2">Ausente</option>
//                                                 <option value="3">Ausente Justificado</option>
//                                                 <option value="4">Llegada Tarde</option>
//                                                 <option value="5">Llegada Tarde Justificada</option>
//                                                 <option value="6">Media Falta</option>
//                                                 <option value="7">Media Falta Justificada</option>
//                                             </select> */}