import { useEffect, useRef } from 'react';
import type { ChartData, ChartOptions } from 'chart.js';
import { Chart, registerables } from 'chart.js';

// Register all necessary components from Chart.js
Chart.register(...registerables);

type TeamMember = {
    name: string;
    average_income: number;
};

interface TeamChartProps {
    teams: TeamMember[];
}

const TeamChart: React.FC<TeamChartProps> = ({ teams }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) return; // Ensure we have a valid canvas context

        // Update labels and data whenever teams changes
        const labels = teams.map((member) => member.name);
        const data: ChartData<'pie'> = {
            labels: labels,
            datasets: [
                {
                    label: 'Average Income',
                    data: teams.map((team) => team.average_income),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                    ],
                }
            ]
        };

        const options: ChartOptions<'pie'> = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Chart.js Pie Chart'
                }
            }
        };

        // Create the chart
        const chartInstance = new Chart(ctx, {
            type: 'pie',
            data: data,
            options: options,
        });

        // Cleanup after component unmount
        return () => {
            chartInstance.destroy();
        };
    }, [teams]); // Update the effect when teams changes

    return (
        <div className='w-[40%]'>
            <canvas ref={chartRef} width="100" height="50" style={{ width: "100%", height: "50vh" }}></canvas>
        </div>
    );
};

export default TeamChart;
