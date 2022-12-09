import { useEffect, useState } from 'react'
import { Layout } from "../../components/layout";
import BarChart from '../../components/graficos/BarChart'
import Pie from '../../components/graficos/PieChart'
import Line from '../../components/graficos/LineChart'
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../components/context/authUserProvider';
import { useRouter } from 'next/router';

// const data = [
//   {
//     id: 1,
//     year: 2016,
//     userGain: 80000,
//     userLost: 823
//   },
//   {
//     id: 2,
//     year: 2017,
//     userGain: 45677,
//     userLost: 345
//   },
//   {
//     id: 3,
//     year: 2018,
//     userGain: 78888,
//     userLost: 555
//   },
//   {
//     id: 4,
//     year: 2019,
//     userGain: 90000,
//     userLost: 4555
//   },
//   {
//     id: 5,
//     year: 2020,
//     userGain: 4300,
//     userLost: 234
//   }
// ];

export default function NotasXmateria() {
  const [usuario, setUsuario] = useState({ rol: '' })
  const router = useRouter()
  const [conteoNotas, setConteoNotas] = useState([])



  // const stringify = JSON.stringify(conteoNotas)
  // console.log("stringify:", stringify)

  // var replace = stringify.replace('\"', '"')
  // console.log("replace:", replace)

  // var convertir = JSON.parse(replace)
  // console.log("parse:", convertir)

  // const contadorNotas = JSON.parse(convertir)
  // console.log("array:", contadorNotas)
  // // console.log(contadorNotas[0]?.nota8)
  // // const contador = JSON.parse(replace)

  // console.log("contador:",contador)

  const { loading, authUser } = useAuth()

  useEffect(() => {
    if (!loading && !authUser) {
      router.push('/gestion/cuenta/login')
    }
    traerUsuario()
    if (usuario.rol) {
      if (!tienePermisos()) {
        router.push('/error')
      } else {
        traerConteoNotas()
      }
    }
  }, [loading, authUser, usuario.rol])

  const tienePermisos = () => {
    return usuario.rol === 'Administrador'
      || usuario.rol === 'Director'
  }
  const traerUsuario = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/gestion/cuenta/${authUser?.email}`)
    if (res.data) {
      console.log(res.data);
      setUsuario({ id: res.data?.id, rol: res.data?.rol?.tipo })
    }
  }
  const traerConteoNotas = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/contador_notas/${1}`)
    if (res.data) {
      setConteoNotas(res.data)
      console.log(res.data);
    }
  }



  // const [userData, setUserData] = useState({
  //   labels: data.map((d) => d.year),
  //   datasets: [
  //     {
  //       label: "Users Gained ",
  //       data: data.map((d) => d.userGain),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0"
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2
  //     },
  //   ]
  // });

  console.log(conteoNotas[0]?.nota)

  const [userData, setUserData] = useState({
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    datasets: [
      {
        label: "Cantidad",
        data: [Number(conteoNotas[0]?.nota), Number(conteoNotas[1]?.nota), Number(conteoNotas[2]?.nota), Number(conteoNotas[3]?.nota), Number(conteoNotas[4]?.nota), Number(conteoNotas[5]?.nota), Number(conteoNotas[6]?.nota), Number(conteoNotas[7]?.nota), Number(conteoNotas[8]?.nota), Number(conteoNotas[9]?.nota)],
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      },
    ]
  })

  // const [userData, setUserData] = useState({
  //   labels: conteoNotas.map((c)=> c.id),
  //   datasets: [
  //     {
  //       label: "Cantidad",
  //       data: conteoNotas.map((c) => c.nota),
  //       backgroundColor: [
  //         "rgba(75,192,192,1)",
  //         "#ecf0f1",
  //         "#50AF95",
  //         "#f3ba2f",
  //         "#2a71d0"
  //       ],
  //       borderColor: "black",
  //       borderWidth: 2
  //     },
  // {
  //   label: 2,
  //   data: conteoNotas?.nota2,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 3,
  //   data: conteoNotas?.nota3,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 4,
  //   data: conteoNotas?.nota4,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 5,
  //   data: conteoNotas?.nota5,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 6,
  //   data: conteoNotas?.nota6,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 7,
  //   data: conteoNotas?.nota7,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 8,
  //   data: conteoNotas?.nota8,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 9,
  //   data: conteoNotas?.nota9,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  // {
  //   label: 10,
  //   data: conteoNotas?.nota10,
  //   backgroundColor: [
  //     "rgba(75,192,192,1)",
  //     "#ecf0f1",
  //     "#50AF95",
  //     "#f3ba2f",
  //     "#2a71d0"
  //   ],
  //   borderColor: "black",
  //   borderWidth: 2
  // },
  //   ]
  // })



  let delayed;
  const [options, setOptions] = useState({
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === 'data' && context.mode === 'default' && !delayed) {
          delay = context.dataIndex * 300 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Conteo Notas por Materia',
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  });

  return (
    <Layout>
      <Grid container>
        <Grid item xs={4}>
          <BarChart
            chartData={userData}
            chartOptions={options}
          />
        </Grid>
        <Grid item xs={4}>
          <Pie
            chartData={userData}
            chartOptions={options}
          />
        </Grid>
        <Grid item xs={4}>
          <Line
            chartData={userData}
            chartOptions={options}
          />
        </Grid>
      </Grid>

    </Layout >
  );
}