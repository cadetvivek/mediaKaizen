import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Users, Target, BarChart, DollarSign } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Charts from '../../components/common/Charts';
import { useTheme } from '../../context/ThemeContext';

const Overview: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Define colors based on theme
  const primaryColor = isDark ? '#60a5fa' : '#3b82f6';
  const secondaryColor = isDark ? '#a78bfa' : '#8b5cf6';
  const tertiaryColor = isDark ? '#f472b6' : '#ec4899';
  const backgroundColor = isDark ? '#1f2937' : '#f3f4f6';
  
  // KPI Cards data
  const kpis = [
    {
      title: 'Total Leads',
      value: '2,543',
      change: '+14.5%',
      isPositive: true,
      icon: <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      description: '245 new this month',
    },
    {
      title: 'Conversion Rate',
      value: '3.6%',
      change: '+2.1%',
      isPositive: true,
      icon: <BarChart className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      description: 'From last period',
    },
    {
      title: 'Active Campaigns',
      value: '12',
      change: '0%',
      isPositive: true,
      icon: <Target className="w-6 h-6 text-pink-600 dark:text-pink-400" />,
      description: '2 ending this week',
    },
    {
      title: 'Monthly Revenue',
      value: '$24,500',
      change: '-5.2%',
      isPositive: false,
      icon: <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />,
      description: 'Based on current campaigns',
    },
  ];
  
  // Line chart data for lead conversion
  const leadConversionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Leads',
        data: [150, 220, 180, 200, 250, 300, 280, 320, 350, 370, 400, 390],
        borderColor: primaryColor,
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: [50, 65, 60, 70, 90, 100, 95, 120, 130, 140, 150, 145],
        borderColor: secondaryColor,
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };
  
  // Campaign performance data
  const campaignPerformanceData = {
    labels: ['Social Media', 'Email', 'PPC', 'Content', 'Referral', 'Direct'],
    datasets: [
      {
        label: 'Budget',
        data: [12000, 8000, 15000, 6000, 4000, 2000],
        backgroundColor: primaryColor,
      },
      {
        label: 'Revenue',
        data: [18000, 12000, 12000, 8000, 7000, 3000],
        backgroundColor: tertiaryColor,
      },
    ],
  };
  
  // Lead sources data
  const leadSourcesData = {
    labels: ['Social Media', 'Email', 'PPC', 'Content', 'Referral', 'Direct'],
    datasets: [
      {
        label: 'Lead Sources',
        data: [35, 25, 20, 10, 8, 2],
        backgroundColor: [
          '#3b82f6', // blue
          '#8b5cf6', // purple
          '#ec4899', // pink
          '#10b981', // green
          '#f59e0b', // yellow
          '#6b7280', // gray
        ],
        borderWidth: 1,
        borderColor: isDark ? '#1f2937' : '#ffffff',
      },
    ],
  };
  
  // Recent leads data
  const recentLeads = [
    { id: 1, name: 'Emma Johnson', email: 'emma@example.com', source: 'Social Media', date: '2 hours ago', status: 'New' },
    { id: 2, name: 'Michael Chen', email: 'michael@example.com', source: 'PPC', date: '5 hours ago', status: 'Contacted' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', source: 'Email', date: '1 day ago', status: 'Qualified' },
    { id: 4, name: 'James Wilson', email: 'james@example.com', source: 'Direct', date: '1 day ago', status: 'New' },
    { id: 5, name: 'Olivia Brown', email: 'olivia@example.com', source: 'Referral', date: '2 days ago', status: 'Contacted' },
  ];
  
  // Handler for time range change
  const handleTimeRangeChange = (range: 'day' | 'week' | 'month' | 'year') => {
    setTimeRange(range);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening with your campaigns.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            size="sm"
            variant={timeRange === 'day' ? 'primary' : 'secondary'}
            onClick={() => handleTimeRangeChange('day')}
          >
            Day
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'week' ? 'primary' : 'secondary'}
            onClick={() => handleTimeRangeChange('week')}
          >
            Week
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'month' ? 'primary' : 'secondary'}
            onClick={() => handleTimeRangeChange('month')}
          >
            Month
          </Button>
          <Button
            size="sm"
            variant={timeRange === 'year' ? 'primary' : 'secondary'}
            onClick={() => handleTimeRangeChange('year')}
          >
            Year
          </Button>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow duration-300">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{kpi.title}</p>
                <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{kpi.value}</p>
                <div className="mt-1 flex items-center">
                  <span
                    className={`text-sm font-medium inline-flex items-center ${
                      kpi.isPositive 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}
                  >
                    {kpi.isPositive ? (
                      <ArrowUp className="w-3 h-3 mr-1" />
                    ) : (
                      <ArrowDown className="w-3 h-3 mr-1" />
                    )}
                    {kpi.change}
                  </span>
                  <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                    {kpi.description}
                  </span>
                </div>
              </div>
              <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">{kpi.icon}</div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Conversion Chart */}
        <Card title="Lead Conversion Trend" subtitle="Conversion rate over time">
          <Charts type="line" data={leadConversionData} height={280} />
        </Card>
        
        {/* Campaign Performance Chart */}
        <Card title="Campaign Performance" subtitle="Budget vs Revenue">
          <Charts type="bar" data={campaignPerformanceData} height={280} />
        </Card>
      </div>
      
      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Sources Chart */}
        <Card title="Lead Sources" subtitle="Distribution by channel">
          <Charts type="doughnut" data={leadSourcesData} height={240} />
        </Card>
        
        {/* Recent Leads */}
        <Card
          title="Recent Leads"
          subtitle="Latest lead activities"
          footer={
            <a
              href="/dashboard/leads"
              className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              View all leads →
            </a>
          }
          className="lg:col-span-2"
        >
          <div className="overflow-hidden">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {recentLeads.map((lead) => (
                <li key={lead.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            {lead.name.split(' ').map(part => part[0]).join('')}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">{lead.email}</div>
                      </div>
                    </div>
                    <div className="ml-2 flex flex-col items-end text-sm">
                      <span className="text-gray-500 dark:text-gray-400">{lead.date}</span>
                      <span className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        lead.status === 'New' 
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' 
                          : lead.status === 'Contacted' 
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                      }`}>
                        {lead.status}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Overview;