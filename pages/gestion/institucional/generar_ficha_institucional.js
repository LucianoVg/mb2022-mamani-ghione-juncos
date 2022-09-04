
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../components/context/authUserProvider";
import { Layout } from "../../../components/layout";
import { guardarImagen, traerImagen } from "../../../servicios/portada";


const FichaInstitucional = () => {
    const [fichaInstitucional, setFichaInstitucional] = useState({
        id: 0, nombreInstitucion: '', ubicacion: '', tipoInstitucion: false, descripcion: '', telefono1: '', telefono2: '', oficina1: '', oficina2: '', mail: '', idUsuario: 0, portadasFicha: []
    })
    const [usuario, setUsuario] = useState({ id: 0 })
    const router = useRouter()
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.BASE_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                console.log(res.data);
                setUsuario({
                    id: res.data.id
                })
            })
    }, [authUser, usuario, loading, router])

    const imgRef = useRef(null)

    const handleForm = (e) => {
        setFichaInstitucional({ ...fichaInstitucional, [e.target.name]: e.target.value })
    }
    const guardarFicha = (e) => {
        e.preventDefault()
        fichaInstitucional.idUsuario = usuario.id

        axios.post(`${process.env.BASE_URL}/gestion/institucional`, {
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
                axios.post(`${process.env.BASE_URL}/gestion/portadas`, {
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
            guardarImagen('portadas/' + file.name, file)
                .then(result => {
                    traerImagen('portadas/' + file.name).then(url => {
                        console.log(url);
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

    return (
        <Layout title={'Generar Ficha Institucional'}>
            <h1>Generar Ficha Institucional</h1>
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
            </div>
        </Layout>
    )
}

export default FichaInstitucional;