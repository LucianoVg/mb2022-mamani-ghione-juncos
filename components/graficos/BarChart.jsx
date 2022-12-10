import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    registerables
} from "chart.js";

ChartJS.register(...registerables)

export default function BarChart({ data }) {
    const labels = data?.map(d => `Nota ${d?.valorNota}`)
    const values = data?.map(d => d?.nota)
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Conteo Notas',
                backgroundColor: 'rgba(75, 192, 192, 1)',
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
                text: 'Conteo Notas por Materia',
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
