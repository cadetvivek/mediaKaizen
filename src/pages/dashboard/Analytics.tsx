import React, { useState } from 'react';
import { CalendarRange, Download, BarChart2, LineChart, Filter, Share2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Charts from '../../components/common/Charts';
import FilterBar from '../../components/common/FilterBar';

const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'ytd' | 'all'>('30d');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    campaign: '',
    channel: '',
    dateRange: '',
  });
  
  // Date range options
  const dateRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: 'ytd', label: 'Year to date' },
    { value: 'all', label: 'All time' },
  ];
  
  // Campaign performance chart data
  const campaignPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Website Visits',
        data: [4200, 4500, 5100, 4800, 5300, 6000, 5800, 6200, 6800, 7400, 8000, 8500],
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Leads',
        data: [320, 360, 410, 390, 450, 510, 480, 520, 570, 620, 680, 730],
        borderColor: '#8b5cf6',
        backgroundColor: 'transparent',
        tension: 0.4,
        yAxisID: 'y',
      },
      {
        label: 'Conversions',
        data: [64, 72, 82, 78, 90, 102, 96, 104, 114, 124, 136, 146],
        borderColor: '#ec4899',
        backgroundColor: 'transparent',
        tension: 0.4,
        yAxisID: 'y',
      },
    ],
  };
  
  // Channel comparison chart data
  const channelComparisonData = {
    labels: ['Social Media', 'Email', 'PPC', 'Content', 'Direct', 'Referral'],
    datasets: [
      {
        label: 'Leads',
        data: [520, 480, 430, 390, 320, 180],
        backgroundColor: '#3b82f6',
      },
      {
        label: 'Conversions',
        data: [104, 120, 86, 78, 64, 36],
        backgroundColor: '#8b5cf6',
      },
      {
        label: 'Cost per Lead ($)',
        data: [12, 8, 24, 15, 5, 10],
        backgroundColor: '#ec4899',
        yAxisID: 'y1',
      },
    ],
  };
  
  // Filter options
  const filters = [
    {
      id: 'campaign',
      label: 'Campaign',
      type: 'select',
      options: [
        { value: 'summer', label: 'Summer Promotion' },
        { value: 'product', label: 'Product Launch' },
        { value: 'holiday', label: 'Holiday Sale' },
        { value: 'brand', label: 'Brand Awareness' },
      ],
    },
    {
      id: 'channel',
      label: 'Channel',
      type: 'select',
      options: [
        { value: 'social', label: 'Social Media' },
        { value: 'email', label: 'Email' },
        { value: 'ppc', label: 'PPC' },
        { value: 'content', label: 'Content' },
        { value: 'direct', label: 'Direct' },
        { value: 'referral', label: 'Referral' },
      ],
    },
    {
      id: 'dateRange',
      label: 'Custom Date',
      type: 'date',
    },
  ];
  
  // Conversion funnel chart data
  const conversionFunnelData = {
    labels: ['Visits', 'Leads', 'Qualified', 'Opportunities', 'Conversions'],
    datasets: [
      {
        data: [8500, 2300, 1450, 840, 420],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue
          'rgba(139, 92, 246, 0.8)', // purple
          'rgba(236, 72, 153, 0.8)', // pink
          'rgba(16, 185, 129, 0.8)', // green
          'rgba(245, 158, 11, 0.8)', // yellow
        ],
        borderWidth: 0,
      },
    ],
  };
  
  // ROI by campaign chart data
  const roiByCampaignData = {
    labels: ['Summer Promotion', 'Product Launch', 'Brand Awareness', 'Lead Generation', 'Holiday Sale'],
    datasets: [
      {
        label: 'ROI',
        data: [2.1, 3.2, 1.8, 2.6, 3.8],
        backgroundColor: '#3b82f6',
      },
    ],
  };
  
  // Performance metrics
  const performanceMetrics = [
    { name: 'Total Visits', value: '32,580', change: '+12.5%', positive: true },
    { name: 'New Leads', value: '2,840', change: '+8.3%', positive: true },
    { name: 'Conversion Rate', value: '4.2%', change: '+0.5%', positive: true },
    { name: 'Avg. Cost per Lead', value: '$14.20', change: '-2.3%', positive: true },
    { name: 'Customer Acquisition Cost', value: '$85.40', change: '+1.7%', positive: false },
    { name: 'Total Revenue', value: '$156,300', change: '+15.2%', positive: true },
  ];
  
  // Handle date range change
  const handleDateRangeChange = (range: '7d' | '30d' | '90d' | 'ytd' | 'all') => {
    setDateRange(range);
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };
  
  // Handle filter change
  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
    setIsLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive insights and performance metrics
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            variant="secondary"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export Report
          </Button>
          <Button
            variant="secondary"
            leftIcon={<Share2 className="w-4 h-4" />}
          >
            Share
          </Button>
        </div>
      </div>
      
      {/* Date Range Selection */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center">
          <CalendarRange className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date Range:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dateRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleDateRangeChange(option.value as any)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md ${
                dateRange === option.value
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      
      {/* Performance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="text-center">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{metric.name}</h3>
            <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</p>
            <div className={`mt-1 inline-flex items-center text-sm font-medium ${
              metric.positive
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            }`}>
              {metric.change}
              <svg 
                className={`ml-1 w-3 h-3 ${metric.positive ? 'rotate-0' : 'rotate-180'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Main Performance Chart */}
      <Card 
        title="Campaign Performance" 
        subtitle="Website visits, leads and conversions over time"
        isLoading={isLoading}
      >
        <Charts 
          type="line" 
          data={campaignPerformanceData} 
          height={400} 
          options={{
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Count',
                }
              }
            }
          }}
        />
      </Card>
      
      {/* Secondary Charts - Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Channel Comparison */}
        <Card 
          title="Channel Comparison" 
          subtitle="Performance metrics by channel"
          isLoading={isLoading}
        >
          <Charts 
            type="bar" 
            data={channelComparisonData} 
            height={300} 
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Count',
                  }
                },
                y1: {
                  position: 'right',
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'Cost ($)',
                  },
                  grid: {
                    drawOnChartArea: false,
                  }
                }
              }
            }}
          />
        </Card>
        
        {/* Conversion Funnel */}
        <Card 
          title="Conversion Funnel" 
          subtitle="From visits to conversions"
          isLoading={isLoading}
        >
          <Charts 
            type="bar" 
            data={conversionFunnelData} 
            height={300} 
            options={{
              indexAxis: 'y',
              plugins: {
                legend: {
                  display: false,
                }
              },
              scales: {
                x: {
                  beginAtZero: true,
                }
              }
            }}
          />
        </Card>
      </div>
      
      {/* Secondary Charts - Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ROI by Campaign */}
        <Card 
          title="ROI by Campaign" 
          subtitle="Return on investment per campaign"
          isLoading={isLoading}
        >
          <Charts 
            type="bar" 
            data={roiByCampaignData} 
            height={300} 
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: 'ROI (x)',
                  }
                }
              }
            }}
          />
        </Card>
        
        {/* Key Insights */}
        <Card 
          title="Key Insights" 
          subtitle="AI-powered performance analysis"
          isLoading={isLoading}
        >
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Channel Effectiveness</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Email campaigns are showing the highest ROI at 3.2x, with a 25% increase in conversion rate compared to last month.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-green-800 dark:text-green-300 mb-2">Growth Opportunities</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                Social media campaigns are driving high traffic but have a lower conversion rate (2.1%). Consider optimizing landing pages for social traffic.
              </p>
            </div>
            
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Areas for Improvement</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                PPC campaigns have the highest cost per lead ($24). Consider reviewing keyword strategy and ad copy to improve efficiency.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300 mb-2">Trend Alert</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Lead generation has increased by 12% this quarter, but conversion rates have only improved by 2%. Focus on lead nurturing strategies.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;