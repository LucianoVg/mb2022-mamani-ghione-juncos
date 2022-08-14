import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios';
import Image from 'next/image'





const AgregarNoticias: NextPage = () => {

    const [titulo, setTitulo] = useState("")
    const [fecha, setFecha] = useState("")
    const [descripcion, setDescripcion] = useState("")


    // recibe un evento(e) generico
    const handleTitulo = (e: any) => {
        setTitulo(e.target.value as string)
    }
    const handleFecha = (e: any) => {
        setFecha(e.target.value as string)
    }
    const handleDescripcion = (e: any) => {
        setDescripcion(e.target.value as string)
    }

    const onSubmitData = async (e: any) => {
        e.preventDefault()

        await axios.post('/api/noticias_novedades', {
            titulo,
            fecha,
            descripcion
        })

        location.replace('http://localhost:3000/')

    }

    return (


        <div className="justify-content-center">
            <div className="col-lg-5">

                <form method='post' onSubmit={onSubmitData} >

                    <div className='form-floating mb-3'>
                        <input className='form-control' id='inputName' value={titulo} onChange={handleTitulo} type="nombre" name='Titulo' placeholder="Example" />
                        <label>Titulo</label>
                    </div>

                    <div className='form-floating mb-3'>
                        <input className='form-control' id='inputSurname' value={descripcion} onChange={handleDescripcion} type="Descripcion" name='apellido' placeholder="Example" />
                        <label>Descripcion</label>
                    </div>

                    <div>
                        <button className='btn btn-primary' type="submit" >Crear</button>
                    </div>

                </form>

            </div>
        </div >




    )
}

export default AgregarNoticias