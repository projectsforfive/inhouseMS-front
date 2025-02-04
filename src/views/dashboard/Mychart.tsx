import { useEffect, useRef } from 'react';
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';

// Register all necessary components from Chart.js
Chart.register(...registerables);

const DATA_COUNT = 17; // Number of data points to display
const NUMBER_INCOME_CFG = { count: DATA_COUNT, min: 0, max: 10000 };
const NUMBER_EXPENSE_CFG = { count: DATA_COUNT, min: -10000, max: 0 };

// Utility functions for generating random data
const Utils = {
    member: (config: { count: number }) => {
        const member = ['John', 'Jane', 'Bob', 'Alice', 'Charlie', 'Dave', 'Eve', 'Frank', 'Grace', 'Heidi', 'Isabella', 'Jack', 'Julia', 'Kate', 'Liam', 'Mike', 'Olivia', 'Peter', 'Quinn', 'Sarah', 'Tom'];
        return member.slice(0, config.count);
    },
    numbers: (
        config: { count: number; min: number; max: number }) => {
        return Array.from(Array(config.count)).map(() => Math.floor(Math.random() * (config.max - config.min + 1)) + config.min);
    },
    CHART_COLORS: {
        red: 'rgba(255, 99, 132, 0.5)',
        blue: 'rgba(54, 162, 235, 0.5)',
    },
};

const MyStackedBarChart: React.FC = () => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) return; // Ensure we have a valid canvas context

        const labels = Utils.member({ count: DATA_COUNT });
        const data: ChartData<'bar'> = {
            labels: labels,
            datasets: [
                {
                    label: 'Income',
                    data: Utils.numbers(NUMBER_INCOME_CFG),
                    backgroundColor: Utils.CHART_COLORS.red,
                },
                {
                    label: 'Expense',
                    data: Utils.numbers(NUMBER_EXPENSE_CFG),
                    backgroundColor: Utils.CHART_COLORS.blue,
                },
                
            ]
        };

        const options: ChartOptions<'bar'> = {
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

    return <canvas ref={chartRef} width="100" height="50"></canvas>;
};

export default MyStackedBarChart;
