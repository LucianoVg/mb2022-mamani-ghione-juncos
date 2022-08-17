import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Carrusel from "../../../components/carrusel";
import { Layout } from "../../../components/layout";
import { authStateChanged } from "../../../servicios/cuenta";
import { guardarImagen, traerImagen } from "../../../servicios/portada";

export default function Institucional() {
    const [fichaInstitucional, setFichaInstitucional] = useState({
        id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: []
    })
    const [usuario, setUsuario] = useState({ id: 0 })
    const router = useRouter()

    useEffect(() => {
        authStateChanged(user => {
            console.log("Usuario logeado", user);
            if (user.email) {
                axios.get(`http://localhost:3000/api/gestion/cuenta?correo=${user.email}`)
                    .then(res => {
                        console.log(res.data);
                        setUsuario({
                            id: res.data.id
                        })
                    })
            } else {
                router.push('/gestion/cuenta/login')
            }
        })
    }, [])

    const imgRef = useRef(null)

    const handleForm = (e) => {
        setFichaInstitucional({ ...fichaInstitucional, [e.target.name]: e.target.value })
    }
    const guardarFicha = (e) => {
        e.preventDefault()
        fichaInstitucional.idUsuario = usuario.id

        axios.post('http://localhost:3000/api/gestion/institucional', {
            nombreInstitucion: fichaInstitucional.nombreInstitucion,
            ubicacion: fichaInstitucional.ubicacion,
            tipoInstitucion: fichaInstitucional.tipoInstitucion,
            descripcion: fichaInstitucional.descripcion,
            telefono1: fichaInstitucional.telefono1,
            telefono2: fichaInstitucional.telefono2,
            oficina1: fichaInstitucional.oficina1,
            oficina2: fichaInstitucional.oficina2,
            mail: fichaInstitucional.mail,
            idUsuario: fichaInstitucional.idUsuario
        }).then(res => {
            console.log(res.data);
            fichaInstitucional.portadasFicha.map(p => {
                axios.post('http://localhost:3000/api/gestion/portadas', {
                    nombre: p.name,
                    url: p.url,
                    fichaInstitucionalId: res.data.id
                }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    console.log(err);
                })
            })
        }).catch(err => {
            console.log(err);
        })
    }
    const cargarImagenes = () => {
        if (fichaInstitucional.portadasFicha.length > 0) {
            fichaInstitucional.portadasFicha.splice(0, fichaInstitucional.portadasFicha.length)
        }
        for (let i = 0; i < imgRef.current.files.length; i++) {
            const file = imgRef.current.files[i];
            guardarImagen(file.name, file)
                .then(result => {
                    traerImagen(file.name).then(url => {
                        fichaInstitucional.portadasFicha.push({
                            name: file.name,
                            url: url
                        })
                    })
                    // console.log(fichaInstitucional);
                }).catch(err => {
                    console.log(err);
                })
        }
    }
    const cargarFicha = async () => {
        axios.get('http://localhost:3000/api/gestion/institucional')
            .then(res => {
                console.log(res.data);
            })
    }

    useEffect(() => {
        cargarFicha()
    }, [])
    return (
        <Layout title={'Ficha Institucional'}>
            {/* {
                imagenes.length > 0 && (
                    <Carrusel imagenes={imagenes} />
                )
            } */}
            <a href="/gestion/institucional/generar_ficha_institucional" className="btn btn-primary m-2">Nueva Ficha Institucional</a>

            {
                fichaInstitucional.id !== 0 ? (
                    <div>
                        <Carrusel imagenes={fichaInstitucional.portadasFicha} />
                        <h2>{fichaInstitucional.nombreInstitucion}</h2>
                        <p>{fichaInstitucional.descripcion}</p>
                        <p></p>

                        <div className="line"></div>

                        <h2>Telefonos</h2>
                        <p>Telefono 1: {fichaInstitucional.telefono1}</p>
                        <p>Telefono 2: {fichaInstitucional.telefono2}</p>

                        <div className="line"></div>

                        <h2>Oficinas</h2>
                        <p>Oficina 1: {fichaInstitucional.oficina1}</p>
                        <p>Oficina 2: {fichaInstitucional.oficina2}</p>

                        <div className="line"></div>
                    </div>
                ) : (
                    <div className="card shadow-lg border-0 rounded-lg mt-5">
                        <div className="card-header"><h3 className="text-center font-weight-light my-4">Ficha Institucional</h3></div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input className="form-control" id="inputFirstName" name="nombreInstitucion" value={fichaInstitucional.nombreInstitucion} onChange={handleForm} type="text" />
                                            <label htmlFor="inputFirstName">Nombre de la institucion</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input onChange={handleForm} className="form-control" id="inputLastName" name="ubicacion" value={fichaInstitucional.ubicacion} type="text" />
                                            <label htmlFor="inputLastName">Ubicacion</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type={'email'} onChange={handleForm} className="form-control" name="mail" value={fichaInstitucional.mail} id="inputDesc" />

                                    <label htmlFor="inputDesc">Correo electronico</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <textarea onChange={handleForm} className="form-control" name="descripcion" value={fichaInstitucional.descripcion} id="inputDesc" rows={5} cols={10}>
                                    </textarea>
                                    <label htmlFor="inputDesc">Descripcion</label>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input name="telefono1" value={fichaInstitucional.telefono1} onChange={handleForm} className="form-control" id="inputTel" type="tel" />
                                            <label htmlFor="inputTel">Telefono 1</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input name="telefono2" value={fichaInstitucional.telefono2} onChange={handleForm} className="form-control" id="inputTel2" type="tel" />
                                            <label htmlFor="inputTel2">Telefono 2</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input name="oficina1" value={fichaInstitucional.oficina1} onChange={handleForm} className="form-control" id="inputOficina1" type="text" />
                                            <label htmlFor="inputOficina1">Oficina 1</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating mb-3 mb-md-0">
                                            <input name="oficina2" value={fichaInstitucional.oficina2} onChange={handleForm} className="form-control" id="inputOficina2" type="text" />
                                            <label htmlFor="inputOficina1">Oficina 2</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <select value={fichaInstitucional.tipoInstitucion} onChange={handleForm} className="form-control" name="tipoInstitucion" id="inputTipoInstitucion">
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
                        <div className="card-footer text-center py-3">
                            <div className="small"><a href="login.html">Have an account? Go to login</a></div>
                        </div>
                    </div>
                )
            }
        </Layout>
    )
}