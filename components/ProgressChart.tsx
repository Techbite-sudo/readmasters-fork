"use client";

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

export function ProgressChart({ progress }: { progress: { book: { title: string }, pagesRead: number }[] }) {
    const data = {
        labels: progress.map(p => p.book.title),
        datasets: [
            {
                label: 'Pages Read',
                data: progress.map(p => p.pagesRead),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Reading Progress',
            },
        },
    };

    return <Bar options={options} data={data} />;
}