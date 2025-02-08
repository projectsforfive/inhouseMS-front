import { useEffect, useRef } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';

// Register all necessary components from Chart.js
Chart.register(...registerables);

// Utility functions for generating random data
const Utils = {

    members: [{ name: "John", income: 7000 }, { name: "Jane", income: 22000 }, { name: "Bob", income: 7000 }, { name: "Alice", income: 4800 }, { name: "Charlie", income: 35000 }, { name: "Dave", income: 26000 }, { name: "Eve", income: 9000 }, { name: "Frank", income: 8000 }, { name: "Grace", income: 9000 },
    { name: "Heidi", income: 10000 }, { name: "Isabella", income: 16000 }, { name: "Jack", income: 12000 },
    { name: "Julia", income: 13000 }, { name: "Kate", income: 14000 }, { name: "Liam", income: 24000 }, { name: "Mike", income: 16000 },
    { name: "Olivia", income: 13000 }, { name: "Peter", income: 1000 }, { name: "Quinn", income: 19000 },
    { name: "Sarah", income: 3000 }, { name: "Tom", income: 21000 }],
    CHART_COLORS: {
        red: 'rgba(255, 99, 132, 0.5)',
        blue: '#8C57FF',
    },
};

const MainChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) return; // Ensure we have a valid canvas context

        const labels = Utils.members.map((member) => member.name);
        const data: ChartData<'bar'> = {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: Utils.members.map((member) => member.income),
                    backgroundColor: Utils.CHART_COLORS.blue,
                },
            ]
        };

        const options: ChartOptions<'bar'> = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true
                },
                y: {
                    stacked: true
                }
            }
        };

        const stackedBar = new Chart(ctx, {
            type: 'bar',
            data: data,
            options: options,
        });

        // Cleanup after component unmount
        return () => {
            stackedBar.destroy();
        };
    }, []);

    return <div className='w-[60%]'><canvas ref={chartRef} width="100" height="50" style={{ width: "100%", height: "50vh" }}></canvas></div>;
};

export default MainChart;
