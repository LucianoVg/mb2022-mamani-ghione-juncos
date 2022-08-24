import { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Layout } from '../../../components/layout';
import { guardarImagen, traerImagen } from '../../../servicios/portada';
import { useRouter } from 'next/router';
import { useAuth } from '../../../components/context/authUserProvider';

const AgregarNoticias = () => {
    const [noticia, setNoticia] = useState({
        titulo: '',
        descripcion: '',
        url: '',
        fecha: Date
    })
    var hoy = new Date();
    const imgRef = useRef(null)
    const [usuario, setUsuario] = useState({ id: 0 })
    const router = useRouter()

    const handleForm = (e) => {
        setNoticia({
            ...noticia, [e.target.name]: e.target.value
        })
    }
    const { loading, authUser } = useAuth()

    useEffect(() => {
        if (!loading && !authUser) {
            router.push('/gestion/cuenta/login')
        }
        axios.get(`${process.env.BASE_URL}/gestion/cuenta/${authUser?.email}`)
            .then(res => {
                if (res.data) {
                    setUsuario({
                        id: res.data.id
                    })
                }
            }).catch(err => {
                console.log(err);
            })
    }, [loading, authUser])


    const onSubmitData = async (e) => {
        e.preventDefault()
        // noticia.fecha = fecha

        const imagen = imgRef.current.files[0]
        guardarImagen('imagenes_noticias/' + imagen.name, imagen)
            .then(result => {
                traerImagen('imagenes_noticias/' + imagen.name)
                    .then(url => {
                        axios.post(`${process.env.BASE_URL}/gestion/noticias_novedades`, {
                            titulo: noticia.titulo,
                            creadaEn: hoy.toUTCString(),
                            url: url,
                            descripcion: noticia.descripcion,
                            idUsuario: usuario.id
                        }).then(res => {
                            console.log(res.data);
                        })
                        router.push('/')
                    })
            })
    }

    return (
        <Layout title={'Agregar Noticias'}>
            <div className="row">
                <div className="col-md-7">
                    <form method='post' onSubmit={onSubmitData}>
                        <div className="form-group">
                            <label >Titulo</label>
                            <input className='form-control' id='inputName' value={noticia.titulo} onChange={handleForm} type="text" name='titulo' />
                        </div>
                        <div className="form-group">
                            <label >Link Imagen</label>
                            <input className='form-control' id='inputName' value={noticia.url} ref={imgRef} onChange={handleForm} type="file" accept='image/*' name='url' />
                        </div>

                        <div className="form-group">
                            <label>Descripcion</label>
                            <textarea className='form-control' id='inputSurname' value={noticia.descripcion} onChange={handleForm} name='descripcion' >
                            </textarea>
                        </div>


                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="submit" className="btn btn-primary">Crear</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default AgregarNoticias