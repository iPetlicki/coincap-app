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
} from 'chart.js'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const LineChart = ({chartData}) => {
    const options = {
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
               display: true,
                ticks: {
                    maxTicksLimit: 12
                }
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

export default LineChart;
