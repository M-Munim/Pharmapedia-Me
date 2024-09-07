'use client'

import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';
import HomeLayout from '../Components/HomeLayout';
import { toast } from "react-toastify";
import { isAuthenticated } from '@/components/Authen.js';
// import { isAuthenticated } from '@/middleware';
// import { useRouter } from "next/navigation";
// import { useEffect } from 'react';



// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const blogsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Blogs Added',
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
      hoverBorderColor: 'rgba(54, 162, 235, 1)',
      data: [5, 10, 8, 6, 7, 12, 9, 11, 13, 10, 8, 14],
    },
  ],
};

const productsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Products Added',
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(75, 192, 192, 0.7)',
      hoverBorderColor: 'rgba(75, 192, 192, 1)',
      data: [2, 5, 4, 3, 0, 8, 1, 9, 0, 8, 6, 1],
    },
  ],
};

const reviewsData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Reviews Added',
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
      ],
      data: [5, 2, 8, 2, 2, 3, 8, 5, 3, 3, 5, 4],
    },
  ],
};

export default function Home() {
  if (!isAuthenticated()) {
    router.push("/Dashboard/Login");
    return;
  }
  return (
    <HomeLayout>
      <div className="p-3">
        <h1 className="text-2xl font-bold mb-3">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Blogs Added Per Month - Bar Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-base font-semibold mb-4">Blogs Added Per Month</h2>
            <div className="h-56 flex items-center justify-center">
              <Bar data={blogsData} />
            </div>
          </div>

          {/* Products Added Per Month - Line Chart */}
          <div className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-base font-semibold mb-4">Products Added Per Month</h2>
            <div className="h-56 flex items-center justify-center">
              <Line data={productsData} />
            </div>
          </div>
        </div>

        {/* Reviews Added Per Month - Pie Chart */}
        <div className="mt-6 bg-white p-4 shadow-md rounded-lg">
          <h2 className="text-base font-semibold mb-4">Reviews Added Per Month</h2>
          <div className="h-56 flex items-center justify-center">
            <Line data={reviewsData} />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}
