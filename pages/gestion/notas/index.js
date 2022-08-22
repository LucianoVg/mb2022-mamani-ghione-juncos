import { Layout } from "../../../components/layout";
import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Notas() {

    const [notas, setNotas] = useState([])


    useEffect(() => {
        axios.get(`http://localhost:3000/api/gestion/notas`)
            .then(res => {
                console.log(res.data);
                setNotas(res.data)
            })
    }, [])

    return (
        <table className="table table-bordered">
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


    );
}

