import React from "react";
import { Pie } from "react-chartjs-2"

export default function PieChart() {
    const dumbData = [
        {
            alumno: 'Nicolas Juncos',
            nota: 10
        },
        {
            alumno: 'Jacinto Lopez',
            nota: 8
        },
        {
            alumno: 'Laura Perez',
            nota: 5
        },
        {
            alumno: 'Roberto Gomez',
            nota: 6
        },
    ]
    const labels = dumbData.map(d => d.alumno)
    const values = dumbData.map(d => d.nota)
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Promedio Notas',
                backgroundColor: 'rgba(75, 192, 192, 1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: values
            }
        ]
    }
    return (
        <div>
            <Pie data={chartData} />
        </div>
    )
}
