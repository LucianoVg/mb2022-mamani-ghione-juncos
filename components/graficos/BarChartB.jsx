import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    registerables
} from "chart.js";

ChartJS.register(...registerables)

export default function BarChart({ data }) {
    const labels = ['Nota 1', 'Nota 2', 'Nota 3', 'Nota 4', 'Nota 5', 'Nota 6', 'Nota 7', 'Nota 8', 'Nota 9', 'Nota 10']
    const values = [data[0].nota1, data[0].nota2, data[0].nota3, data[0].nota4, data[0].nota5, data[0].nota6, data[0].nota7, data[0].nota8, data[0].nota9, data[0].nota10]

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Conteo Notas',
                backgroundColor: [
                    "rgba(75,192,192,1)",
                    "#ecf0f1",
                    "#50AF95",
                    "#f3ba2f",
                    "#2a71d0"
                ],
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: values
            }
        ]
    }

    let delayed
    const options = {
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
                text: `${data[0].nombre} división B`,
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };

    return (

        <Bar data={chartData}
            options={options}
        />

    )
}
