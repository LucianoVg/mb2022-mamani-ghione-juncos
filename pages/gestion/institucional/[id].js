import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import Loading from "../../../components/loading";
import { guardarImagen, traerImagen } from "../../../servicios/portada";

export default function EditarFicha() {
    const [ficha, setFicha] = useState({
        id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: []
    })
    const [cargando, setCargando] = useState(false)

    const router = useRouter()

    const handleForm = (e) => {
        setFicha({ ...ficha, [e.target.name]: e.target.value })
    }
    const guardarFicha = (e) => {
        e.preventDefault()

        axios.put(`${process.env.BASE_URL}/gestion/institucional/${ficha.id}`, {
            nombreInstitucion: ficha.nombreInstitucion,
            ubicacion: ficha.ubicacion,
            tipoInstitucion: ficha.tipoInstitucion,
            descripcion: ficha.descripcion,
            telefono1: ficha.telefono1,
            telefono2: ficha.telefono2,
            oficina1: ficha.oficina1,
            oficina2: ficha.oficina2,
            mail: ficha.mail,
            idUsuario: ficha.idUsuario
        }).then(res => {
            console.log(res.data);
            ficha.portadasFicha.map(p => {
                if (p.id) {
                    axios.put(`${process.env.BASE_URL}/gestion/portadas/${p.id}`, {
                        nombre: p.nombre,
                        url: p.url,
                        fichaInstitucionalId: p.fichaInstitucionalId
                    }).then(res => {
                        console.log(res.data);
                    }).catch(err => {
                        console.log(err);
                    })
                } else {
                    axios.post(`${process.env.BASE_URL}/gestion/portadas`, {
                        nombre: p.nombre,
                        url: p.url,
                        fichaInstitucionalId: p.fichaInstitucionalId
                    }).then(res => {
                        console.log(res.data);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            })
        }).catch(err => {
            console.log(err);
        })
        router.push('/gestion/institucional')
    }

    const imgRef = useRef(null)
    const { authUser, loading } = useAuth()
    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        if (id) {
            setCargando(true)
            axios.get(`${process.env.BASE_URL}/gestion/institucional/${id}`)
                .then(res => {
                    if (res.data) {
                        console.log(res.data);
                        setFicha(res.data)
                    }
                    setCargando(false)
                })
        }
    }, [id, authUser, loading, router])

    const cargarImagenes = () => {

        if (imgRef.current.files.length > 0) {
            for (let i = 0; i < imgRef.current.files.length; i++) {
                const file = imgRef.current.files[i];
                guardarImagen('portadas/' + file.name, file)
                    .then(result => {
                        traerImagen('portadas/' + file.name).then(url => {
                            ficha.portadasFicha.push({
                                nombre: file.name,
                                url: url,
                                fichaInstitucionalId: ficha.id
                            })
                            console.log(ficha.portadasFicha);
                        })

                        // console.log(fichaInstitucional);
                    }).catch(err => {
                        console.log(err);
                    })
            }
        }
    }


    return (
        <Layout title={'Editar Ficha'}>
            {
                ficha && ficha.id !== 0 && (
                    <div>
                        <Carrusel imagenes={ficha.portadasFicha} />
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Editar Ficha Institucional</h3></div>
                            <div className="card-body">
                                <form>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input className="form-control" id="inputFirstName" name="nombreInstitucion" value={ficha.nombreInstitucion} onChange={handleForm} type="text" />
                                                <label htmlFor="inputFirstName">Nombre de la institucion</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating">
                                                <input onChange={handleForm} className="form-control" id="inputLastName" name="ubicacion" value={ficha.ubicacion} type="text" />
                                                <label htmlFor="inputLastName">Ubicacion</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type={'email'} onChange={handleForm} className="form-control" name="mail" value={ficha.mail} id="inputDesc" />

                                        <label htmlFor="inputDesc">Correo electronico</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <textarea onChange={handleForm} className="form-control" name="descripcion" value={ficha.descripcion} id="inputDesc" rows={5} cols={10}>
                                        </textarea>
                                        <label htmlFor="inputDesc">Descripcion</label>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input name="telefono1" value={ficha.telefono1} onChange={handleForm} className="form-control" id="inputTel" type="tel" />
                                                <label htmlFor="inputTel">Telefono 1</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input name="telefono2" value={ficha.telefono2} onChange={handleForm} className="form-control" id="inputTel2" type="tel" />
                                                <label htmlFor="inputTel2">Telefono 2</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input name="oficina1" value={ficha.oficina1} onChange={handleForm} className="form-control" id="inputOficina1" type="text" />
                                                <label htmlFor="inputOficina1">Oficina 1</label>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-floating mb-3 mb-md-0">
                                                <input name="oficina2" value={ficha.oficina2} onChange={handleForm} className="form-control" id="inputOficina2" type="text" />
                                                <label htmlFor="inputOficina1">Oficina 2</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select value={ficha.tipoInstitucion} onChange={handleForm} className="form-control" name="tipoInstitucion" id="inputTipoInstitucion">
                                            <option value={true}>Privada</option>
                                            <option value={false}>Publica</option>
                                        </select>
                                        <label htmlFor="inputTipoInstitucion">Tipo de institucion</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="file" name="imagenes" id="inputImg" className="form-control" accept="image/*" ref={imgRef} multiple={true} onChange={cargarImagenes} />
                                        <label htmlFor="inputImg">Imagenes</label>
                                    </div>
                                    <div className="mt-4 mb-0">
                                        <div className="d-grid">
                                            <button className="btn btn-primary btn-block" onClick={guardarFicha}>Guardar Ficha</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                cargando && (
                    <Loading />
                )
            }
        </Layout>
    )
}