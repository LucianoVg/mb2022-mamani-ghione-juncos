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
    return (
        <div>
            <Bar style={{
                width: '50%',
                height: 'auto',
                margin: 'auto'
            }} data={chartData} />
        </div>
    )
}
