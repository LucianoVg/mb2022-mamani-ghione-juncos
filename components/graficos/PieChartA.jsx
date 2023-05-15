import React from "react";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    registerables
} from "chart.js";

ChartJS.register(...registerables)

export default function PieChart({ data }) {
    const labels = data?.map(d => d?.alumno)
    const values = data?.map(d => Number(d?.promediototal).toFixed(2))
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Promedio',
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
        Animation: {
            duration: 0
        },
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
                text: 'Mejores Promedios de 5° Año "A"',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
    };
    return (
        <div>
            <Pie data={chartData} options={options} />
        </div >
    )
}
