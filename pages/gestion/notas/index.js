import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "../../../styles/notas.module.css";

export default function Notas() {
    const [notas, setNotas] = useState([])

    const [idMateria, setIdMateria] = useState(1)
    const [idCurso, setIdCurso] = useState(1)
    const [alumno, setAlumno] = useState("")

    const [materias, setMaterias] = useState()
    const [cursos, setCursos] = useState()
    const [nota, setNota] = useState(0);
    const [columnName, setColumnName] = useState("");

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
    const [trimestre, setTrimestre] = useState({
        id: "home0",
        aria: "home-tab0",
        idTrimestre: 1

    })

    useEffect(() => {
        defaultTrimestre()
        listarMaterias()
        listarCursos()
        // filtros()
    }, [trimestre])


    const listarCursos = () => {
        axios.get(`http://localhost:3000/api/gestion/notas/curso`)
            .then(res => {
                console.log(res.data);
                setCursos(res.data)
            }).catch(err => {
                console.error(error);
            })
    }
    const listarMaterias = () => {
        axios.get(`http://localhost:3000/api/gestion/notas/materias`)
            .then(res => {
                console.log(res.data);
                setMaterias(res.data)
            }).catch(err => {
                console.error(error);
            })
    }

    // const filtros = () => {
    //     axios.post(`http://localhost:3000/api/gestion/notas/${trimestre.idTrimestre}`,
    //         {
    //             materia: idMateria,
    //             curso: idCurso,
    //             alumno: alumno
    //         })
    //         .then(res => {
    //             console.log(res.data);

    //         }).catch(err => {
    //             console.error(error);
    //         })
    // }

    const handleMateria = (e) => {
        setIdMateria(Number.parseInt(e.target.value))
        console.log(idMateria);
        // defaultTrimestre()
    }

    const handleCurso = (e) => {
        setIdCurso(Number.parseInt(e.target.value))
        defaultTrimestre()
    }
    const handleAlumno = (e) => {
        setAlumno(e.target.value)
        defaultTrimestre()
    }

    const defaultTrimestre = () => {
        axios.get(`http://localhost:3000/api/gestion/notas/${trimestre.idTrimestre}/${idMateria}/${alumno}/${idCurso}`)
            .then(res => {
                console.log(res.data);
                // setNotas(res.data)
            }).catch(err => {
                console.error(error);
            })
    }

    const primerTrimestre = () => {
        setTrimestre({
            id: "home0",
            aria: "home-tab0",
            idTrimestre: 1
        })
        defaultTrimestre()
    }

    const segundoTrimestre = () => {
        setTrimestre({
            id: "home1",
            aria: "home-tab1",
            idTrimestre: 2
        })
        defaultTrimestre()
    }

    const tercerTrimestre = () => {
        setTrimestre({
            id: "home2",
            aria: "home-tab2",
            idTrimestre: 3
        })
        defaultTrimestre()
    }

    const onEdit = (id) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
    }

    const updateNota = (id, newNota, columnName) => {
        axios.put(`http://localhost:3000/api/gestion/notas/update/${id}`, {
            nota: newNota,
            nombreColumna: columnName
        })
            .then(res => {
                console.log(res.data);
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                defaultTrimestre();
            }).catch(err => {
                console.error(err);
            })

    }

    const onSave = (id, newNota, columnName) => {
        updateNota(id, newNota, columnName);
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setNota(0);
    }


    const select = () => {
        var input = document.getElementById("select")
        input.select();
        input.focus();
    }

    const onChangeNotaColumna = (e) => {
        setNota(Number.parseInt(e.target.value))
        setColumnName(e.target.name)
    }

    return (
        <Layout title={'Notas'}>


            <div>
                <h1><strong>Notas</strong></h1>
                <div className="mt-5 " style={{ marginBottom: '20mm' }}>
                    <div className="row g-3" >
                        <div className="col-md-3 hstack">
                            <label className="fw-bold me-2" name="inputMateria">Materia: </label>
                            <select name="idMateria" value={idMateria} onChange={handleMateria} className="form-select " id="inputMateria" style={{ width: '50mm' }} >
                                {
                                    materias && materias.map((m) => (

                                        <option value={m.id} key={m.id} className="col-md-2">{m.nombre}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="col-md-3 hstack">
                            <label className="fw-bold me-2" name="inputMateria ">Curso: </label>
                            <select name="idCurso" value={idCurso} onChange={handleCurso} className="form-select " id="inputMateria" style={{ width: '20mm' }} >
                                {
                                    cursos && cursos.map((c) => (
                                        <option value={c.id} key={c.id} className="col-md-2">{c.curso?.nombre} {c.division?.division} </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="row g-3" >
                            <div>
                                <label className="fw-bold me-2" >Buscar alumno: </label>
                            </div>

                            <div className="col-md-3 hstack me-5">

                                <label htmlFor="inputNombre" className="fw-bold me-2">Nombre: </label>
                                <input name="alumno" value={alumno} className="form-control my-2 text-capitalize " style={{ width: '50mm' }} type="search" placeholder="Search" aria-label="Search"
                                    onChange={handleAlumno}
                                    onSubmitCapture={handleAlumno} />

                                <button type="submit" className="btn input-group-text btn-primary"
                                >
                                    <i className='bx bx-search me-1'></i>
                                </button>
                            </div>

                            <div className="col-md-3 hstack">
                                <label htmlFor="inputApellido" className="fw-bold me-2" >Apellido: </label>
                                <input name="alumno" value={alumno} className="form-control my-2 text-capitalize " style={{ width: '50mm' }} type="search" placeholder="Search" aria-label="Search"
                                    onChange={handleAlumno}
                                    onSubmitCapture={handleAlumno} />

                                <button type="submit" className="btn input-group-text btn-primary"
                                >
                                    <i className='bx bx-search me-1'></i>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>


                <div className="mt-5">
                    <div>
                        <ul className="nav nav-tabs nav-justified mb-3" id="myTab0" role="tablist" style={{ flexDirection: 'inherit' }}>
                            <li className="nav-item" onClick={primerTrimestre} role="presentation">
                                <button
                                    className="nav-link active"
                                    id="home-tab0"
                                    data-mdb-toggle="tab"
                                    data-mdb-target="#home0"
                                    type="button"
                                    role="tab"
                                    aria-controls="home"
                                    aria-selected="true"
                                >
                                    Primer Trimestre
                                </button>
                            </li>
                            <li className="nav-item" onClick={segundoTrimestre} role="presentation">
                                <button
                                    className="nav-link"
                                    id="home-tab1"
                                    data-mdb-toggle="tab"
                                    data-mdb-target="#home1"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Segundo Trimestre
                                </button>
                            </li>
                            <li className="nav-item" onClick={tercerTrimestre} role="presentation">
                                <button
                                    className="nav-link"
                                    id="home-tab2"
                                    data-mdb-toggle="tab"
                                    data-mdb-target="#home2"
                                    type="button"
                                    role="tab"
                                    aria-controls="contact"
                                    aria-selected="false"
                                >
                                    Tercer Trimestre
                                </button>
                            </li>
                        </ul>

                        <div className="tab-content" id="myTabContent0">
                            <div
                                className="tab-pane active"
                                id={trimestre.id}
                                role="tabpanel"
                                aria-labelledby={trimestre.aria}
                                onChange={defaultTrimestre}
                            >


                                <table className="table  nav-justified table-striped table-dark table-bordered">
                                    <thead>
                                        <tr className="text-center">
                                            <th scope="col">Documento</th>
                                            <th scope="col">Sexo</th>
                                            <th scope="col">Nombre</th>
                                            <th scope="col">Apellido</th>
                                            <th scope="col">Materia</th>
                                            <th scope="col">Nota 1</th>
                                            <th scope="col">Nota 2</th>
                                            <th scope="col">Nota 3</th>
                                            <th scope="col">Nota 4</th>
                                            <th scope="col">Nota 5</th>
                                            <th scope="col">Trimestre</th>
                                            <th scope="col">Editar</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            notas && notas.map((n, i) => (

                                                <tr className="align-justified " key={i}>
                                                    <td className="col-md-2">{n.alumnoXcursoXdivision?.usuario?.dni}</td>
                                                    <td className="col-md-1 text-center text-capitalize">{n.alumnoXcursoXdivision?.usuario?.sexo}</td>
                                                    <td className="col-md-1 text-capitalize">{n.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                                    <td className="col-md-1 text-capitalize" >{n.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                                    <td className="text-center col-md-1">{n.materia?.nombre}</td>
                                                    <td className="text-center col-md-1">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === i ? (
                                                                <input type="number"
                                                                    min="1"
                                                                    max="10"
                                                                    name="nota1"
                                                                    className="text-center col-md-10"
                                                                    placeholder={n.nota1}
                                                                    onChange={(e) => {
                                                                        setNota(Number.parseInt(e.target.value))
                                                                        setColumnName(e.target.name)
                                                                        console.log(nota);
                                                                    }}

                                                                />
                                                            ) :
                                                                (
                                                                    n.nota1
                                                                )
                                                        }

                                                    </td>
                                                    <td className="text-center col-md-1">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === i ? (
                                                                <input type="number"
                                                                    min="1"
                                                                    max="10"
                                                                    name="nota2"
                                                                    className="text-center col-md-10"
                                                                    placeholder={n.nota2}
                                                                    onChange={(e) => {
                                                                        setNota(Number.parseInt(e.target.value))
                                                                        setColumnName(e.target.name)
                                                                        console.log(nota);
                                                                    }}

                                                                />
                                                            ) :
                                                                (
                                                                    n.nota2
                                                                )
                                                        }

                                                    </td>
                                                    <td className="text-center col-md-1">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === i ? (
                                                                <input type="number"
                                                                    min="1"
                                                                    max="10"
                                                                    name="nota3"
                                                                    className="text-center col-md-10"
                                                                    placeholder={n.nota3}
                                                                    onChange={(e) => {
                                                                        setNota(Number.parseInt(e.target.value))
                                                                        setColumnName(e.target.name)
                                                                        console.log(nota);
                                                                    }}

                                                                />
                                                            ) :
                                                                (
                                                                    n.nota3
                                                                )
                                                        }

                                                    </td>
                                                    <td className="text-center col-md-1">
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === i ? (
                                                                <input type="number"
                                                                    min="1"
                                                                    max="10"
                                                                    name="nota4"
                                                                    className="text-center col-md-10"
                                                                    placeholder={n.nota4}
                                                                    onChange={(e) => {
                                                                        setNota(Number.parseInt(e.target.value))
                                                                        setColumnName(e.target.name)
                                                                        console.log(nota);
                                                                    }}

                                                                />
                                                            ) :
                                                                (
                                                                    n.nota4
                                                                )
                                                        }

                                                    </td>

                                                    <td className="text-center col-md-1" >

                                                        {
                                                            inEditMode.status && inEditMode.rowKey === i ? (
                                                                <input type="number"
                                                                    min="1"
                                                                    max="10"
                                                                    name="nota5"
                                                                    className="text-center col-md-10"
                                                                    placeholder={n.nota5}
                                                                    onChange={(e) => {
                                                                        setNota(Number.parseInt(e.target.value))
                                                                        setColumnName(e.target.name)
                                                                        console.log(nota);
                                                                    }}

                                                                />
                                                            ) :
                                                                (
                                                                    n.nota5
                                                                )
                                                        }

                                                    </td>
                                                    <td className=" text-center col-md-3">{n.trimestre?.trimestre}</td>
                                                    <td>
                                                        {
                                                            inEditMode.status && inEditMode.rowKey === i ? (

                                                                <React.Fragment>
                                                                    <div className="hstack">
                                                                        <button
                                                                            className="btn btn-primary "
                                                                            onClick={() => onSave(n.id, nota, columnName)}
                                                                        >
                                                                            Save
                                                                        </button>

                                                                        <button
                                                                            className="btn btn-secondary"
                                                                            style={{ marginLeft: 8 }}
                                                                            onClick={() => onCancel()}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                </React.Fragment>
                                                            ) : (
                                                                <button
                                                                    className=" btn btn-primary"
                                                                    onClick={() => setInEditMode({
                                                                        status: true,
                                                                        rowKey: i
                                                                    })}
                                                                >
                                                                    Edit
                                                                </button>
                                                            )
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout >

    );

}

