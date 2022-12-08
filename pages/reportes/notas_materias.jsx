import { useEffect, useState } from 'react'
import { Layout } from "../../components/layout";
import BarChart from '../../components/graficos/BarChart'
import Pie from '../../components/graficos/PieChart'
import Line from '../../components/graficos/LineChart'
import { Container } from '@mui/system';
import { Grid } from '@mui/material';
import axios from 'axios';

const data = [
  {
    id: 1,
    year: 2016,
    userGain: 80000,
    userLost: 823
  },
  {
    id: 2,
    year: 2017,
    userGain: 45677,
    userLost: 345
  },
  {
    id: 3,
    year: 2018,
    userGain: 78888,
    userLost: 555
  },
  {
    id: 4,
    year: 2019,
    userGain: 90000,
    userLost: 4555
  },
  {
    id: 5,
    year: 2020,
    userGain: 4300,
    userLost: 234
  }
];

export default function NotasXmateria() {

  useEffect(() => {
    traerConteoNotas()
  }, [])

  const [conteoNotas, setConteoNotas] = useState()
  const traerConteoNotas = async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/reportes/notas/contador_notas/${3}`)
    if (res.data) {
      console.log(res.data);
    }
  }
  const [userData, setUserData] = useState({
    labels: conteoNotas?.map((cn) => cn.idmateria),
    datasets: [
      {
        label: "Materia",
        data: conteoNotas?.map((cn) => cn.nota1),
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
      // {
      //   label: "Nota 2",
      //   data: conteoNotas?.map((cn) => cn.nota2),
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
      //   label: "Nota 3",
      //   data: conteoNotas?.map((cn) => cn.nota3),
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
      //   label: "Nota 4",
      //   data: conteoNotas?.map((cn) => cn.nota4),
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
      //   label: "Nota 5",
      //   data: conteoNotas?.map((cn) => cn.nota5),
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
      //   label: "Nota 6",
      //   data: conteoNotas?.map((cn) => cn.nota6),
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
      //   label: "Nota 7",
      //   data: conteoNotas?.map((cn) => cn.nota7),
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
      //   label: "Nota 8",
      //   data: conteoNotas?.map((cn) => cn.nota8),
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
      //   label: "Nota 9",
      //   data: conteoNotas?.map((cn) => cn.nota9),
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
      //   label: "Nota 10",
      //   data: conteoNotas?.map((cn) => cn.nota10),
      //   backgroundColor: [
      //     "rgba(75,192,192,1)",
      //     "#ecf0f1",
      //     "#50AF95",
      //     "#f3ba2f",
      //     "#2a71d0"
      //   ],
      //   borderColor: "black",
      //   borderWidth: 2
      // }
    ]
  });

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
        {/* <Grid item xs={4}>
          <BarChart
            chartData={userData}
            chartOptions={options}
          />
        </Grid> */}
        <Grid item xs={4}>
          <Pie
            chartData={userData}
            chartOptions={options}
          />
        </Grid>
        {/* <Grid item xs={4}>
          <Line
            chartData={userData}
            chartOptions={options}
          />
        </Grid> */}
      </Grid>

    </Layout >
  );
}