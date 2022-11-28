import { Layout } from "../../../components/layout";
import React from 'react';
// import styles from "../../../styles/notas.module.css";

export default function Estudiantes() {
    return (
        <Layout>
            <div className="container">
                <h4>Estudiantes</h4>
                <div className="row">
                    <div className="form-group">
                        <label htmlFor="inputCurso">Curso</label>
                        <select id="inputCurso" name="idCurso"
                            // onChange={handleCurso}
                            style={{ width: '90px', marginRight: '20px', marginBottom: '20px' }}>
                            {
                                cursos && cursos?.map((c, i) => (
                                    <option
                                        selected={i === 0}
                                        key={i}
                                        value={c.id}>
                                        {c.curso?.nombre} {c.division?.division}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="row">
                    <input
                        name="nombreAlumno"
                        // value={nombreAlumno}
                        // onChange={handleNombreAlumno}
                        label="Nombre del alumno"
                        sx={{ marginRight: '20px', marginBottom: '20px' }}
                    />
                    <input
                        name="apellidoAlumno"
                        // value={apellidoAlumno}
                        // onChange={handleApellidoAlumno}
                        label="Apellido del alumno"
                        sx={{ marginRight: '20px', marginBottom: '20px' }} />
                    <input
                        name="apellidoAlumno"
                        // value={apellidoAlumno}
                        // onChange={handleApellidoAlumno}
                        label="Legajo" />
                </div>

                <div className="row">
                    <button className="btn btn-outline-primary"
                    // onClick={() => onSave(n.id, nota, columnName)}
                    >
                        Buscar
                    </button>

                </div>

                <div className="container">
                    <table className="table table-responsive">
                        <thead>
                            <tr>
                                <td >Legajo</td>
                                <td>Sexo</td>
                                <td >Nombre</td>
                                <td >Apellido</td>
                                <td >Curso</td>
                                <td>Division</td>
                                <td >Acciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >
                                    454243
                                </td>

                                <td >
                                    Masculino
                                </td>
                                <td >
                                    Juan
                                </td>
                                <td >
                                    Juncos
                                </td>
                                <td>
                                    3
                                </td>
                                <td >
                                    A
                                </td>

                                <td >
                                    <React.Fragment>
                                        <div className="row">
                                            <button
                                                className="btn btn-info"
                                            // onClick={() => onSave(n.id, nota, columnName)}
                                            >
                                                Detalles
                                            </button>

                                            <button
                                                className="btn btn-primary"
                                            // onClick={() => onCancel()}
                                            >
                                                Generar Sancion
                                            </button>
                                        </div>
                                    </React.Fragment>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout >

    );

}