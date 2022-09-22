import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';

import { useRouter } from 'next/router';
import { useAuth } from '../../../components/context/authUserProvider';

const DetalleAsistencia = () => {
    const router = useRouter()
    const { loading, authUser } = useAuth()
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        listarAsistencias()
    }, [loading, authUser])
    const { id } = router.query
    const [asistencias, setAsistencias] = useState([])
    const listarAsistencias = () => {
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/asistencias/detalles/${id}`)
            .then(res => {
                console.log(res.data);
                setAsistencias(res.data)
            }).catch(err => {
                console.error(err);
            })
    }

    const mostrarAsistencia = (a) => {
        return (
            a.presente || a.ausente || a.ausenteJustificado || a.llegadaTarde || a.llegadaTardeJustificada || a.mediaFalta || a.mediaFaltaJustificada
        )

    }

    const [asistenciaActual, setAsistenciaActual] = useState()

    const mostrarAsistencia2 = (a) => {
        if (a.presente && 1) {
            setAsistenciaActual = 'Presente'
        }
        if (a.ausente && 1) {
            setAsistenciaActual = 'Ausente'
        }
        if (a.ausenteJustificado && 1) {
            setAsistenciaActual = 'Ausente Justificado'
        }
        if (a.llegadaTarde && 1) {
            setAsistenciaActual = 'Llegada Tarde'
        }
        if (a.llegadaTardeJustificada && 1) {
            setAsistenciaActual = 'Llegada Tarde Justificada'
        }
        if (a.mediaFalta && 1) {
            setAsistenciaActual = 'Media Falta'
        }
        if (a.mediaFaltaJustificada && 1) {
            setAsistenciaActual = 'Media Falta Justificada '
        }
    }



    return (
        <Layout>
            <div className='mt-5'>
                <h1><strong>Mas información</strong></h1>
                <div>

                    {
                        asistencias && asistencias.map((a, i) => (


                            <form key={i} action="" className='needs-validation'>

                                {/* <form key={i} action="" className='needs-validation' on novalidate > */}
                                {/* 
                           {
                               mostrarAsistencia2()
                           } */}
                                <div className='hstack gap-2  '>
                                    <div className="form-group col-md-3  " >
                                        <label  style={{ fontSize: "25px" }}><strong>Alumno</strong></label>
                                        <p style={{ fontSize: "20px" }}>{a.alumnoXcursoXdivision?.usuario?.apellido} {a.alumnoXcursoXdivision?.usuario?.nombre}</p>

                                    </div>
                                    <div className="form-group col-md-6  " >
                                        <label  style={{ fontSize: "25px" }}><strong>Curso</strong></label>
                                        <p style={{ fontSize: "20px" }}>{a.alumnoXcursoXdivision?.cursoXdivision?.curso?.nombre} {a.alumnoXcursoXdivision?.cursoXdivision?.division?.division}</p>

                                    </div>


                                    {
                                        a.motivo != null ? (

                                            <a className='btn btn-primary col-md-3' style={{ fontSize: '20px' }}>
                                                <strong> Editado por:</strong> {a.usuario?.nombre} {a.usuario?.apellido}
                                            </a>

                                            // <div className="btn btn-info form-group col-md-3 hstack gap-2" style={{ float: 'right' }}>
                                            //     <p style={{ fontSize: "25px" }}><strong>Editado por: </strong></p>
                                            //     <p style={{ fontSize: "20px" }}>{a.usuario?.nombre} {a.usuario?.apellido}</p>

                                            // </div>
                                        ) :
                                            (
                                                <a className='btn btn-primary col-md-3' style={{ fontSize: '20px' }}>
                                                    <strong> Creado por:</strong> {a.usuario?.nombre} {a.usuario?.apellido}
                                                </a>

                                            )
                                    }



                                </div>
                                <div className='hstack gap-3 mt-4'>
                                    <div className="form-group col-md-3  " style={{ float: 'right' }}>
                                        <label style={{ fontSize: "25px" }}><strong>Asistencia actual</strong></label>

                                        {
                                            a.presente && 1 ? (
                                                <p style={{ fontSize: "20px" }}>Presente</p>
                                            ) :
                                                (
                                                    a.ausente && 1 ? (
                                                        <p style={{ fontSize: "20px" }}>Ausente</p>
                                                    ) :
                                                        (
                                                            a.ausenteJustificado && 1 ? (
                                                                <p style={{ fontSize: "20px" }}>Ausente Justificado</p>
                                                            ) :
                                                                (
                                                                    a.llegadaTarde && 1 ? (
                                                                        <p style={{ fontSize: "20px" }}>Llegada Tarde</p>
                                                                    ) :
                                                                        (
                                                                            a.llegadaTardeJustificada && 1 ? (
                                                                                <p style={{ fontSize: "20px" }}>llegada Tarde Justificada</p>
                                                                            ) :
                                                                                (
                                                                                    a.mediaFalta && 1 ? (
                                                                                        <p style={{ fontSize: "20px" }}>Media Falta</p>
                                                                                    ) :
                                                                                        (
                                                                                            <p style={{ fontSize: "20px" }}>Media Falta Justificada</p>
                                                                                        )
                                                                                )
                                                                        )
                                                                )

                                                        )


                                                )
                                        }


                                    </div>
                                    <div className="form-group col-md-2  " >
                                        <label  style={{ fontSize: "25px" }}><strong>Creado en: </strong></label>
                                        <p style={{ fontSize: "20px" }}>{new Date(a.creadoEn).toLocaleDateString('en-GB')}</p>

                                    </div>
                                    {
                                        a.actualizadoEn != null ? (
                                            <div className="form-group col-md-2  " >
                                                <label  style={{ fontSize: "25px" }}><strong>Actualizado en: </strong></label>
                                                <p style={{ fontSize: "20px" }}>{new Date(a.actualizadoEn).toLocaleDateString('en-GB')}</p>

                                            </div>
                                        ) :
                                            (
                                                <div className="form-group col-md-4  " >
                                                    <label  style={{ fontSize: "25px" }}><strong>Actualizado en: </strong></label>
                                                    <p style={{ fontSize: "20px" }}>--/--/----</p>

                                                </div>

                                            )
                                    }
                                </div>



                                {/* <div className="form-group col-md-3  " style={{ float: 'right' }}>
                                   <label style={{ fontSize: "25px" }}><strong>Nueva Asistencia</strong></label>

                                   <select className="form-select " aria-label="Default select example">
                                       <option selected hidden>Elige una opción</option>
                                       <option>Presente</option>
                                       <option>Ausente</option>
                                       <option>Ausente Justificado</option>
                                       <option>Llegada Tarde</option>
                                       <option>Llegada Tarde Justificada</option>
                                       <option>Media Falta</option>
                                       <option>Media Falta Justificada</option>
                                   </select>

                               </div> */}


                                <div className='mt-4'>
                                    <div className="form-label col-md-4" >
                                        {/* <div className="form-label col-md-4  has-validation" > */}
                                        <label style={{ fontSize: "25px" }} ><strong>Justificación</strong></label>
                                        <textarea className="form-control" style={{ resize: 'none', height: '200px', backgroundColor: 'white' }} rows="3" disabled value={a.motivo} ></textarea>
                                        {/* <textarea className="form-control " rows="3" required ></textarea> */}
                                        {/* <div className="invalid-feedback">
                                       Por favor, escriba un motivo.
                                   </div> */}

                                    </div>
                                </div>

                                {/* <div className='hstack gap-2'>
                               <div >
                                   <button className="btn btn-primary" type="submit">Modificar</button>
                               </div>
                               <div >
                                   <button className="btn btn-secondary" type="submit">Cancelar</button>
                               </div>
                           </div> */}
                            </form>
                        ))
                    }
                </div >
            </div>




        </Layout >
    )
}

export default DetalleAsistencia