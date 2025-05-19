import React, { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { useTheme } from '../../context/ThemeContext';

// Register all Chart.js components
Chart.register(...registerables);

interface ChartProps {
  type: 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea';
  data: any;
  options?: any;
  height?: number;
  width?: number;
  className?: string;
}

const Charts: React.FC<ChartProps> = ({
  type,
  data,
  options = {},
  height = 300,
  width,
  className = '',
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);
  const { theme } = useTheme();

  // Theme-specific styling
  const isDark = theme === 'dark';
  const textColor = isDark ? '#e5e7eb' : '#4b5563';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  // Default options with theme-specific styling
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: textColor,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#1f2937' : 'white',
        titleColor: isDark ? '#e5e7eb' : '#111827',
        bodyColor: isDark ? '#d1d5db' : '#4b5563',
        borderColor: isDark ? '#374151' : '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 6,
      },
    },
    scales: type !== 'pie' && type !== 'doughnut' && type !== 'polarArea' && type !== 'radar'
      ? {
          x: {
            grid: {
              color: gridColor,
              borderColor: gridColor,
            },
            ticks: {
              color: textColor,
            },
          },
          y: {
            grid: {
              color: gridColor,
              borderColor: gridColor,
            },
            ticks: {
              color: textColor,
            },
          },
        }
      : undefined,
  };

  // Update chart when properties change
  useEffect(() => {
    if (!chartRef.current) return;

    // Destroy previous chart if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create new chart
    const ctx = chartRef.current.getContext('2d');
    if (ctx) {
      const mergedOptions = { ...defaultOptions, ...options };
      
      const config: ChartConfiguration = {
        type,
        data,
        options: mergedOptions,
      };
      
      chartInstance.current = new Chart(ctx, config);
    }

    // Cleanup on unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options, theme]);

  return (
    <div className={`relative ${className}`} style={{ height: `${height}px`, width: width ? `${width}px` : '100%' }}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default Charts;