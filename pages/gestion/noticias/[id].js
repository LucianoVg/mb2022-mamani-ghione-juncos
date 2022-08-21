import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { Layout } from "../../../components/layout"
import { authStateChanged } from "../../../servicios/cuenta"
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
                            axios.put(`http://localhost:3000/api/gestion/noticias_novedades/${noticiaActualizar.id}`, {
                                titulo: noticiaActualizar.titulo,
                                url: url,
                                descripcion: noticiaActualizar.descripcion,
                                actualizadaEn: hoy.toUTCString()
                            }).then(res => {
                                console.log(res.data);
                            })
                            // router.push('/gestion/noticias')
                        })
                })

        } else {
            axios.put(`http://localhost:3000/api/gestion/noticias_novedades/${noticiaActualizar.id}`, {
                titulo: noticiaActualizar.titulo,
                url: noticiaActualizar.url,
                descripcion: noticiaActualizar.descripcion,
                actualizadaEn: hoy.toUTCString()
            }).then(res => {
                console.log(res.data);
            })
            // router.push('/gestion/noticias')
        }

        router.push('/gestion/noticias')

        // location.replace('http://localhost:3000/')

    }
    const handleForm = (e) => {
        setNoticiaActualizar({
            ...noticia, [e.target.name]: e.target.value
        })
    }
    useEffect(() => {
        authStateChanged(user => {
            if (user.email) {
                const { id } = router.query
                axios.get(`http://localhost:3000/api/gestion/noticias_novedades/${id}`)
                    .then(res => {
                        console.log(res.data);
                        setNoticia(res.data)
                    }).catch(err => {
                        console.error(err);
                    })
            } else {
                router.push('/gestion/cuenta/login')
            }
        })
    }, [router])

    return (
        <Layout title={'Detalles de la noticia'}>
            <h3>Detalles de la noticia</h3>
            <div className="text-center">
                <Image src={noticia.url !== '' && noticia.url !== null ? noticia.url : '/assets/img/placeholder.png'} width={200} height={200} className="m-auto" />
            </div>
            <form method='post' onSubmit={onSubmitData}>
                <div className="form-group">
                    <label >Titulo</label>
                    <input className='form-control' id='inputName' placeholder={noticia.titulo} onChange={handleForm} type="text" name='titulo' />
                </div>
                <div className="form-group">
                    <label >Link Imagen</label>
                    <input className='form-control' id='inputName' ref={imgRef} onChange={handleForm} type="file" accept='image/*' name='url' />
                </div>

                <div className="form-group">
                    <label>Descripcion</label>
                    <textarea className='form-control' id='inputSurname' placeholder={noticia.descripcion} onChange={handleForm} name='descripcion' >
                    </textarea>
                </div>

                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Actualizar</button>
                    </div>
                </div>
            </form>
        </Layout>
    )
}