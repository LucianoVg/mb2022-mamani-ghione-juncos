import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import { trim } from "lodash";

export default function Notas() {

    const [notas, setNotas] = useState([])


    useEffect(() => {
        defaultTrimestre()
    }, [])

    const [trimestre, setTrimestre] = useState({
        id: "ex3-tabs-1",
        aria: "ex3-tab-1",
        idTrimestre: 1

    })


    const defaultTrimestre = () => {

        axios.get(`http://localhost:3000/api/gestion/notas/${trimestre.idTrimestre}`)
            .then(res => {
                console.log(res.data);
                setNotas(res.data)
            })
    }
    const primerTrimestre = () => {
        setTrimestre({
            id: "ex3-tabs-1",
            aria: "ex3-tab-1",
            idTrimestre: 1
        })
        defaultTrimestre()
    }

    const segundoTrimestre = () => {
        setTrimestre({
            id: "ex3-tabs-2",
            aria: "ex3-tabs-2",
            idTrimestre: 2
        })
        defaultTrimestre()
    }

    const tercerTrimestre = () => {
        setTrimestre({
            id: "ex3-tabs-3",
            aria: "ex3-tabs-3",
            idTrimestre: 3
        })
        defaultTrimestre()
    }







    return (
        <div>
            <div>
              

                <ul className="nav nav-tabs nav-fill mb-3" id="ex1" role="tablist">
                    <li className="nav-item" onClick={primerTrimestre} role="presentation">
                        <a
                            className="nav-link "
                            id="ex3-tab-1"
                            data-mdb-toggle="tab"
                            href="#"
                            role="tab"
                            aria-controls="ex3-tabs-1"
                            aria-selected="true"
                        >Primer Trimestre</a
                        >
                    </li>

                    <li className="nav-item" onClick={segundoTrimestre} role="presentation">
                        <a
                            className="nav-link"
                            id="ex3-tab-2"
                            data-mdb-toggle="tab"
                            href="#"
                            role="tab"
                            aria-controls="ex3-tabs-2"
                            aria-selected="true"
                        >Segundo Trimestre</a
                        >
                    </li>
                    <li className="nav-item" onClick={tercerTrimestre} role="presentation">
                        <a
                            className="nav-link"
                            id="ex3-tab-3"
                            data-mdb-toggle="tab"
                            href="#"
                            role="tab"
                            aria-controls="ex3-tabs-3"
                            aria-selected="true"
                        >Tercer Trimestre</a
                        >
                    </li>
                </ul >


                <div className="tab-content" id="ex2-content">
                    <div
                        className="tab-pane fade show active"
                        id={trimestre.id}
                        role="tabpanel"
                        aria-labelledby={trimestre.aria}
                    >
                        <table className="table table-active fill">
                            <thead>
                                <tr>
                                    <th>Alumno</th>
                                    <th>Materia</th>
                                    <th>Nota</th>
                                    <th>Trimestre</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    notas && notas.map((n, i) => (

                                        <tr key={i}>
                                            <td>{n.alumnoXcursoXdivision?.usuario?.nombre} {n.alumnoXcursoXdivision?.usuario?.apellido}</td>
                                            <td>{n.materia?.nombre}</td>
                                            <td>{n.nota}</td>
                                            <td>{n.trimestre?.trimestre}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>

    );
}

