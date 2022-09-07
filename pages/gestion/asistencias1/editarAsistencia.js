import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';

import { authStateChanged } from '../../../servicios/cuenta';
import { useRouter } from 'next/router';

const EditarAsitencia = () => {







    return (
        <Layout title={'Editar Asistencia'}>
            <div>
                <h1><strong>Editar Asistencia</strong></h1>
                <form action="" className='needs-validation' novalidate >

                    <div className='hstack gap-2 '>
                        <div className="form-group col-md-8  " >
                            <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Alumno</strong></label>
                            <p style={{ fontSize: "20px" }}>Alumno x</p>

                        </div>
                        <div className="form-group col-md-4" style={{float: 'right'}}>
                            <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Editado por</strong></label>
                            <p style={{ fontSize: "20px" }}>Preceptor X</p>

                        </div>
                    </div>
                    <div className='row g-3'>

                        <div className="form-group col-md-3  " style={{ float: 'right' }}>
                            <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Asistencia actual</strong></label>
                            <p style={{ fontSize: "20px" }}>Ausente Justificado</p>

                        </div>
                        <div className="form-group col-md-3  " style={{ float: 'right' }}>
                            <label style={{ fontSize: "25px" }}><strong>Nueva Asistencia</strong></label>

                            <select className="form-select " aria-label="Default select example">
                                <option selected disabled hidden>Elige una opción</option>
                                <option>Presente</option>
                                <option>Ausente</option>
                                <option>Ausente Justificado</option>
                                <option>Llegada Tarde</option>
                                <option>Llegada Tarde Justificada</option>
                                <option>Media Falta</option>
                                <option>Media Falta Justificada</option>
                            </select>

                        </div>
                    </div>

                    <div className='me-3'>
                        <div className="form-label col-md-4  has-validation" >
                            <label style={{ fontSize: "25px" }} ><strong>Motivo</strong></label>
                            <textarea className="form-control " rows="3" required ></textarea>
                            <div className="invalid-feedback">
                                Por favor, escriba un motivo.
                            </div>

                        </div>
                    </div>

                    <div className='hstack gap-2'>
                        <div >
                            <button className="btn btn-primary" type="submit">Modificar</button>
                        </div>
                        <div >
                            <button className="btn btn-secondary" type="submit">Cancelar</button>
                        </div>
                    </div>
                </form>
            </div >



        </Layout >
    )
}

export default EditarAsitencia