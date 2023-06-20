import React from 'react';
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

const Index = ({chartData}) => {
    const options = {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
               display: false,

            },
            y: {
                display: true
            }
        },

    }
    return (
        <Line data={chartData} options={options}/>
    );
};

export default Index;
