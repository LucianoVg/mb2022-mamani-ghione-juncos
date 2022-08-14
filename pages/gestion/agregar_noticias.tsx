import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios';
import Image from 'next/image'








const AgregarNoticias: NextPage = () => {

    const [titulo, setTitulo] = useState("")
    // const [fecha, setFecha] = useState("")
    const [url, setUrl] = useState("")
    const [descripcion, setDescripcion] = useState("")


    var hoy = new Date();
    const fecha = hoy.toLocaleDateString()



    // recibe un evento(e) generico
    const handleTitulo = (e: any) => {
        setTitulo(e.target.value as string)
    }
    // const handleFecha = (e: any) => {
    //     setFecha(e.target.value as string)
    // }
    const handleDescripcion = (e: any) => {
        setDescripcion(e.target.value as string)
    }
    const handleUrl = (e: any) => {
        setUrl(e.target.value as string)
    }

    const onSubmitData = async (e: any) => {
        e.preventDefault()

       
        await axios.post('http://localhost:3000/api/gestion/noticias_novedades', {
            titulo,
            fecha,
            url,
            descripcion
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
                            <input className='form-control' id='inputName' value={titulo} onChange={handleTitulo} type="text" name='Titulo' placeholder="Example" />
                        </div>
                        <div className="form-group">
                            <label >Link Imagen</label>
                            <input className='form-control' id='inputName' value={url} onChange={handleUrl} type="text" name='Url' placeholder="Example" />
                        </div>

                        <div className="form-group">
                            <label>Descripcion</label>
                            <textarea className='form-control' id='inputSurname' value={descripcion} onChange={handleDescripcion} name='apellido' placeholder="Example">
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