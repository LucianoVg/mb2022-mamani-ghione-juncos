import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from "../../../styles/notas.module.css";


export default function Notas() {
    const [notas, setNotas] = useState([])

    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });
    const [trimestre, setTrimestre] = useState({
        id: "home0",
        aria: "home-tab0",
        idTrimestre: 1

    })

    const [nota, setNota] = useState(0);

    useEffect(() => {
        defaultTrimestre()
    }, [trimestre])

    const defaultTrimestre = () => {
        axios.get(`http://localhost:3000/api/gestion/notas/${trimestre.idTrimestre}`)
            .then(res => {
                console.log(res.data);
                setNotas(res.data)
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


    const updateNota = (id, newNota) => {
        axios.put(`http://localhost:3000/api/gestion/notas/update/${id}`, {
            nota: newNota
        })
            .then(res => {
                console.log(res.data);
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                defaultTrimestre();
            })

    }

    const onSave = (id, newNota) => {
        updateNota(id, newNota);
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

    const onChangeNota = (e) => {
        setNota(Number.parseInt(e.target.value))
    }

    return (
        <Layout title={'Notas'}>
            <h1><strong>Notas</strong></h1>
            <div>
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
                                        <th scope="col">Nro. de Documento</th>
                                        <th scope="col">Sexo</th>
                                        <th scope="col">Nombre</th>
                                        <th scope="col">Apellido</th>
                                        <th scope="col">Materia</th>
                                        <th scope="col">Nota</th>
                                        <th scope="col">Trimestre</th>
                                        <th scope="col">Editar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        notas && notas.map((n, i) => (

                                            <tr className="align-justified " key={i}>
                                                <td className="col-md-2">{n.alumnoXcursoXdivision?.usuario?.dni}</td>
                                                <td className="col-md-2">{n.alumnoXcursoXdivision?.usuario?.sexo}</td>
                                                <td className="col-md-1">{n.alumnoXcursoXdivision?.usuario?.nombre}</td>
                                                <td className="col-md-1" >{n.alumnoXcursoXdivision?.usuario?.apellido} </td>
                                                <td className="text-center col-md-3">{n.materia?.nombre}</td>
                                                <td className="text-center col-md-1">
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (
                                                            <input type="number"
                                                                min="1"
                                                                max="10"
                                                                className="text-center col-md-10"
                                                                placeholder={n.nota}
                                                                onChange={(e) => {
                                                                    setNota(Number.parseInt(e.target.value))
                                                                    console.log(nota);
                                                                }}

                                                            />
                                                        ) :
                                                            (
                                                                n.nota
                                                            )
                                                    }

                                                </td>
                                                <td className=" text-center col-md-3">{n.trimestre?.trimestre}</td>
                                                <td>
                                                    {
                                                        inEditMode.status && inEditMode.rowKey === i ? (

                                                            <React.Fragment>
                                                                <button
                                                                    className="btn-success "
                                                                    onClick={() => onSave(n.id, nota)}
                                                                >
                                                                    Save
                                                                </button>

                                                                <button
                                                                    className="btn-secondary"
                                                                    style={{ marginLeft: 8 }}
                                                                    onClick={() => onCancel()}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </React.Fragment>
                                                        ) : (
                                                            <button
                                                                className="btn-primary"
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
        </Layout>

    );

}

