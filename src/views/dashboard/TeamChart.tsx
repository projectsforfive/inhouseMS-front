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

// Function to generate a color palette
const generateColors = (numColors: number) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const hue = (i * 360) / numColors; // Distribute colors evenly across the color wheel
        colors.push(`hsl(${hue}, 70%, 50%)`); // HSL format for vibrant colors
    }
    return colors;
};

const TeamChart: React.FC<TeamChartProps> = ({ teams }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const ctx = chartRef.current?.getContext('2d');

        if (!ctx) return; // Ensure we have a valid canvas context

        // Prepare data for the chart
        const labels = teams.map((member) => member.name);
        const data: ChartData<'pie'> = {
            labels: labels,
            datasets: [
                {
                    label: 'Average Income',
                    data: teams.map((team) => team.average_income),
                    backgroundColor: generateColors(teams.length), // Generate colors for each team
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
                    text: 'Income per Team',
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
