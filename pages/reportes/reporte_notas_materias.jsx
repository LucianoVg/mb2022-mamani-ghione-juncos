import { useEffect, useState } from 'react'
import { Layout } from "../../components/layout";
import BarChart from '../../components/graficos/BarChart'
import Pie from '../../components/graficos/PieChart'
import { Container } from '@mui/system';

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

  const [options, setOptions] = useState({

    title: {
      display: true,
      text: 'Custom Chart Title'
    }


  });
  return (
    <Layout>
      <Container direction="row" >
        <div style={{ width: "600px" }}>
          <BarChart
            chartData={userData}
            chartOptions={options}
          />
        </div>
        <div style={{ width: "600px" }}>
          <Pie
            chartData={userData}
            chartOptions={options}
          />
        </div>

      </Container>

    </Layout >
  );
}