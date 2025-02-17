import React from 'react';
import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend, Title);
Chart.defaults.plugins.tooltip.backgroundColor = 'var(--color-white-bg)';
Chart.defaults.plugins.legend.position = 'right';
Chart.defaults.plugins.legend.title.display = true;
Chart.defaults.plugins.legend.title.font = 'Lato';

// Helper to convert a CSS variable to its computed value
const getCSSVariable = (variable) =>
  getComputedStyle(document.documentElement).getPropertyValue(variable).trim();

function DoughnutGraph({ libraryBooks = [] }) {
  // Extract distinct book categories
  const distinctCategories = [
    ...new Set(libraryBooks.map((book) => book.category)),
  ];

  // Define an array with CSS variable names and fallback colors
  const projectColors = [
    { var: '--color-primary-btn', fallback: '#f6993f' }, // orange
    { var: '--color-secondary-btn', fallback: '#38c172' }, // green
    { var: '--color-accent-1', fallback: '#FFCD55' }, // yellow
    { var: '--color-accent-4', fallback: '#37A2EB' }, // blue
    { var: '--color-accent-5', fallback: '#9A66FF' }, // purple
    { var: '--color-accent-2', fallback: '#6c757d' }, // gray
  ];

  // Generate actual color values using the computed value or fallback
  const backgroundColors = distinctCategories.map((_, index) => {
    const { var: varName, fallback } =
      projectColors[index % projectColors.length];
    const computedColor = getCSSVariable(varName);
    return computedColor || fallback;
  });

  // Map each category to its count
  const counts = distinctCategories.map(
    (category) =>
      libraryBooks.filter((book) => book.category === category).length
  );

  const data = {
    labels: distinctCategories,
    datasets: [
      {
        data: counts,
        backgroundColor: backgroundColors,
        borderWidth: 2,
        radius: '90%',
      },
    ],
  };

  // Chart options: disable aspect ratio for full control of container dimensions
  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div className='w-full h-85 flex justify-center items-center'>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutGraph;
