import { useEffect, useState } from 'react'
import { Layout } from "../../components/layout";
import BarChart from '../../components/graficos/BarChart'
import Pie from '../../components/graficos/PieChart'
import Line from '../../components/graficos/LineChart'
import { Container } from '@mui/system';
import { Grid } from '@mui/material';

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

  const [userData, setUserData] = useState({
    labels: data.map((d) => d.year),
    datasets: [
      {
        label: "Users Gained ",
        data: data.map((d) => d.userGain),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
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
        text: 'Custom Chart Title',
        padding: {
          top: 10,
          bottom: 30
        }
      }
    }
  });
  return (
    <Layout>
      <Container >
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

      </Container>

    </Layout >
  );
}