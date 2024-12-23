import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const fetchData = async () => {
    const response = axios.get("http://49.204.232.254:91/report/monthlyCollection")
}

const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Sales in 2023 (in USD)',
            data: [1200, 1900, 3000, 5000, 2000, 3000, 4500],
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
            fill: true,
        },
    ],
};

const lineOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
    },
};

const ChartDemo = () => (
    <div>
        <h2>Line Chart Example</h2>
        <Line data={lineData} options={lineOptions} />
    </div>
);

export default ChartDemo;
