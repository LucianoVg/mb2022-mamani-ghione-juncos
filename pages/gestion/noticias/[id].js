import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../../components/context/authUserProvider"
import { Layout } from "../../../components/layout"
import { guardarImagen, traerImagen } from "../../../servicios/portada"

export default function DetallesNoticia() {
    const [noticia, setNoticia] = useState({
        id: 0,
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: 0
    })
    const [noticiaActualizar, setNoticiaActualizar] = useState({
        id: 0,
        titulo: '',
        descripcion: '',
        url: '',
        idUsuario: 0
    })
    const router = useRouter()
    const hoy = new Date()
    const imgRef = useRef(null)

    const onSubmitData = async (e) => {
        e.preventDefault()
        // noticia.fecha = fecha

        if (imgRef.current.files.length > 0) {
            const imagen = imgRef.current.files[0]
            guardarImagen('imagenes_noticias/' + imagen.name, imagen)
                .then(result => {
                    traerImagen('imagenes_noticias/' + imagen.name)
                        .then(url => {
                            axios.put(`${process.env.BASE_URL}/gestion/noticias_novedades/${noticiaActualizar.id}`, {
                                titulo: noticiaActualizar.titulo,
                                url: url,
                                descripcion: noticiaActualizar.descripcion,
                                actualizadaEn: hoy.toUTCString()
                            }).then(res => {
                                console.log(res.data);
                                router.push('/')
                            })
                        })
                })

        } else {
            axios.put(`${process.env.BASE_URL}/gestion/noticias_novedades/${noticiaActualizar.id}`, {
                titulo: noticiaActualizar.titulo,
                url: noticiaActualizar.url,
                descripcion: noticiaActualizar.descripcion,
                actualizadaEn: hoy.toUTCString()
            }).then(res => {
                console.log(res.data);
            })
            // router.push('/gestion/noticias')
        }

        router.push('/')

        // location.replace('http://localhost:3000/')

    }
    const borrarNoticia = () => {
        if (confirm("Está seguro que desea eliminar la noticia?")) {
            axios.delete(`${process.env.BASE_URL}/gestion/noticias_novedades/${noticia.id}`).then(res => {
                console.log(res.data);
                router.push('/')
            })
        }
    }
    const handleForm = (e) => {
        setNoticiaActualizar({
            ...noticia, [e.target.name]: e.target.value
        })
    }

    const { loading, authUser } = useAuth()
    const { id } = router.query
    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        if (id) {
            axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/noticias_novedades/${id}`)
                .then(res => {
                    console.log(res.data);
                    setNoticia(res.data)
                }).catch(err => {
                    console.error(err);
                })
        }
    }, [id, authUser, loading, router])

    return (
        <Layout title={'Detalles de la noticia'}>
            <h3 className="text-center">Detalles de la noticia</h3>
            <div className="text-center">
                <Image src={noticia.url !== '' && noticia.url !== null ? noticia.url : '/assets/img/placeholder.png'} width={200} height={200} className="m-auto" />
            </div>
            <form method='post' onSubmit={onSubmitData}>
                <div className="form-group m-1">
                    <label >Titulo</label>
                    <input className='form-control' id='inputName' placeholder={noticia.titulo} onChange={handleForm} type="text" name='titulo' />
                </div>
                <div className="form-group m-1">
                    <label >Link Imagen</label>
                    <input className='form-control' id='inputName' ref={imgRef} onChange={handleForm} type="file" accept='image/*' name='url' />
                </div>

                <div className="form-group m-1">
                    <label>Descripcion</label>
                    <textarea className='form-control' id='inputSurname' placeholder={noticia.descripcion} onChange={handleForm} name='descripcion' >
                    </textarea>
                </div>

                <div className="form-group row">
                    <div className="col-sm-2 mt-1">
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                    <div className="col-sm-2 mt-1">
                        <button onClick={borrarNoticia} type="button" className="btn btn-danger">Eliminar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}