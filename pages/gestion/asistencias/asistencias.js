import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "../../../styles/notas.module.css";

export default function Notas() {
    // const [notas, setNotas] = useState([])

    // const [idMateria, setIdMateria] = useState(1)
    // const [idCurso, setIdCurso] = useState(1)

    // const [nombreAlumno, setNombreAlumno] = useState("")
    // const [apellidoAlumno, setApellidoAlumno] = useState("")
    // const [alumno, setAlumno] = useState("")

    // const [materias, setMaterias] = useState()
    // const [cursos, setCursos] = useState()
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


    // const listarCursos = () => {
    //     axios.get(`http://localhost:3000/api/gestion/notas/curso`)
    //         .then(res => {
    //             console.log(res.data);
    //             setCursos(res.data)
    //         }).catch(err => {
    //             console.error(error);
    //         })
    // }
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

    const [presente, setPresente] = useState({ Boolean })
    const [ausente, setAusente] = useState({ Boolean })
    const [ausenteJus, setausenteJus] = useState({ Boolean })
    const [llegadaTarde, setllegadaTarde] = useState({ Boolean })
    const [llegadaTardeJus, setllegadaTardeJus] = useState({ Boolean })
    const [mediaFalta, setmediaFalta] = useState({ Boolean })
    const [mediaFaltaJus, setmediaFaltaJus] = useState({ Boolean })

    return (
        <Layout title={'Notas'}>


            <div>
                <h1><strong>Asistencias</strong></h1>


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

                            </tr>
                        </thead>
                        <tbody>
                            {
                                asistencias && asistencias.map((a, i) => (

                                    < tr key={i} >

                                        <td className="col-md-1 text-capitalize">{a.fecha}</td>
                                        <td className="col-md-1">{a.alumnoXcursoXdivision?.usuario?.dni}</td>
                                        <td className="col-md-1 text-capitalize">{a.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                        <td className="col-md-1 text-capitalize" >{a.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                        <td className="col-md-1 text-capitalize">{a.usuario?.nombre} {a.usuario?.apellido}</td>
                                        <td className="col-md-1 ">


                                            <div className="form-check form-switch  ">
                                                <input className="form-check-input pd-1" type="checkbox" role="switch" />
                                            </div>



                                        </td>
                                        <td className="col-md-1 text-capitalize">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" value={a.ausente} />
                                            </div>
                                        </td>
                                        <td className="col-md-1 text-capitalize">


                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" value={a.ausenteJustificado} />
                                            </div>
                                        </td>
                                        <td className="col-md-1 text-capitalize">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" value={a.llegadaTarde} />
                                            </div>
                                        </td>
                                        <td className="col-md-1 text-capitalize">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" value={a.llegadaTardeJustificada} />
                                            </div>
                                        </td>
                                        <td className="col-md-1 text-capitalize">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" value={a.mediaFalta} />
                                            </div>
                                        </td>
                                        <td className="col-md-1 text-capitalize">
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" value={a.mediaFaltaJustificada} />
                                            </div>
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