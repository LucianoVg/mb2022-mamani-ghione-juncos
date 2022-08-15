import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image'

const AgregarNoticias: NextPage = () => {
    const [noticia, setNoticia] = useState({
        titulo: '',
        descripcion: '',
        url: '',
        fecha: ''
    })
    var hoy = new Date();

    const fecha = hoy.toLocaleDateString()

    const handleForm = (e: any) => {
        setNoticia({
            ...noticia, [e.target.name]: e.target.value
        })
    }

    const onSubmitData = async (e: any) => {
        e.preventDefault()
        // noticia.fecha = fecha

        await axios.post('http://localhost:3000/api/gestion/noticias_novedades', {
            titulo: noticia.titulo,
            fecha: fecha,
            url: noticia.url,
            descripcion: noticia.descripcion
        })

        // location.replace('http://localhost:3000/')

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-7">

                    <form method='post' onSubmit={onSubmitData}>
                        <div className="form-group">
                            <label >Titulo</label>
                            <input className='form-control' id='inputName' value={noticia.titulo} onChange={handleForm} type="text" name='titulo' placeholder="Example" />
                        </div>
                        <div className="form-group">
                            <label >Link Imagen</label>
                            <input className='form-control' id='inputName' value={noticia.url} onChange={handleForm} type="text" name='url' placeholder="Example" />
                        </div>

                        <div className="form-group">
                            <label>Descripcion</label>
                            <textarea className='form-control' id='inputSurname' value={noticia.descripcion} onChange={handleForm} name='descripcion' placeholder="Example">
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
        </div>
    )
}

export default AgregarNoticias