import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8', 'Category 9'],
  datasets: [
    {
      data: [300, 50, 100, 200, 75, 50, 400, 250, 350],
      backgroundColor: 'rgba(99, 102, 241, 0.5)',
      borderColor: 'rgb(99, 102, 241)',
      borderWidth: 1,
    },
  ],
}

const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category' as const,
      },
      y: {
        type: 'linear' as const,
        beginAtZero: true,
        ticks: {
          callback: function(value: number) {
            return '$' + value
          }
        }
      },
    },
  }
  

function BarChart() {
  return (
    <Bar data={chartData} options={chartOptions} />
  )
}

export default BarChart