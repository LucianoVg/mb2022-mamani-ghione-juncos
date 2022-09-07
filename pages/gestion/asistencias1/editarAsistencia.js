import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';

import { authStateChanged } from '../../../servicios/cuenta';
import { useRouter } from 'next/router';

const EditarAsitencia = () => {


    useEffect(() => {
        listarAsistencias()

    }, [])

    const [asistencias, setAsistencias] = useState([])
    const listarAsistencias = () => {
        axios.get(`http://localhost:3000/api/gestion/asistencias/editar_asistencias_test`)
            .then(res => {
                console.log(res.data);
                setAsistencias(res.data)
            }).catch(err => {
                console.error(error);
            })
    }

    const mostrarAsistencia = (a) => {
        return (
            a.presente || a.ausente || a.ausenteJustificado || a.llegadaTarde || a.llegadaTardeJustificada || a.mediaFalta || a.mediaFaltaJustificada
        )

    }

    const [asistenciaActual, setAsistenciaActual] = useState()

    const mostrarAsistencia2 = () => {
        if (asistencias.presente === 1 ) {
            setAsistenciaActual = 'a.presente'
        }
        if (asistencias.ausente=== 1) {
            setAsistenciaActual = 'a.ausente'
        }
        if (asistencias.ausenteJustificado === 1) {
            setAsistenciaActual = 'a.ausenteJustificado'
        }
        if (asistencias.llegadaTarde === 1) {
            setAsistenciaActual = 'a.llegadaTarde'
        }
        if (asistencias.llegadaTardeJustificada === 1) {
            setAsistenciaActual = 'a.llegadaTardeJustificada'
        }
        if (asistencias.mediaFalta === 1) {
            setAsistenciaActual ='a.mediaFalta'
        }
        if (asistencias.mediaFaltaJustificada === 1) {
            setAsistenciaActual = 'a.mediaFaltaJustificada '
        }
    }

    

    return (
        <Layout title={'Editar Asistencia'}>
            <div>
                <h1><strong>Editar Asistencia</strong></h1>
                {
                    asistencias && asistencias.map((a, i) => (
                       

                        <form key={i} action="" className='needs-validation' novalidate >

                          {
                             mostrarAsistencia2()
                          } 
                                                  <div className='hstack gap-2 '>
                                <div className="form-group col-md-8  " >
                                    <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Alumno</strong></label>
                                    <p style={{ fontSize: "20px" }}>{a.alumnoXcursoXdivision?.usuario?.apellido} {a.alumnoXcursoXdivision?.usuario?.nombre}</p>

                                </div>
                                {
                                                a.motivo != null ? (
                                                    <div className="form-group col-md-4" style={{ float: 'right' }}>
                                                    <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Editado por</strong></label>
                                                    <p style={{ fontSize: "20px" }}>{a.usuario?.nombre} {a.usuario?.apellido}</p>
                
                                                </div>
                                                ) :
                                                    (
                                                        <div className="form-group col-md-4" style={{ float: 'right' }}>
                                                        <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Cargado por</strong></label>
                                                        <p style={{ fontSize: "20px" }}>{a.usuario?.nombre} {a.usuario?.apellido}</p>
                    
                                                    </div>

                                                    )
                                            }
         
                            </div>
                            <div className='row g-3'>

                                <div className="form-group col-md-3  " style={{ float: 'right' }}>
                                    <label for="exampleInputEmail1" style={{ fontSize: "25px" }}><strong>Asistencia actual</strong></label>


                                    <p style={{ fontSize: "20px" }}>{asistenciaActual}</p>

                                </div>
                                <div className="form-group col-md-3  " style={{ float: 'right' }}>
                                    <label style={{ fontSize: "25px" }}><strong>Nueva Asistencia</strong></label>

                                    <select className="form-select " aria-label="Default select example">
                                        <option selected  hidden>Elige una opción</option>
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
                    ))
                }
            </div >



        </Layout >
    )
}

export default EditarAsitencia