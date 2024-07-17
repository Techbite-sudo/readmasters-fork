"use client";

import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type ChartData = {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
};
export function BookStatistics() {
    const [chartData, setChartData] = useState<ChartData | null>(null);

    useEffect(() => {
        fetch('/api/book-statistics')
            .then(response => response.json())
            .then(data => {
                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: 'Number of Loans',
                            data: data.values,
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        },
                    ],
                });
            });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Most Borrowed Books',
            },
        },
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Book Statistics</h2>
            {chartData && <Bar options={options} data={chartData} />}
        </div>
    );
}
