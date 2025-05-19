import React, { useState } from 'react';
import { Plus, Filter, MoreHorizontal, Trash, Edit, Flag, PlayCircle, PauseCircle } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import Table from '../../components/common/Table';
import FilterBar from '../../components/common/FilterBar';
import { Popover } from '../../components/common/Popover';
import Charts from '../../components/common/Charts';

// Campaign types and interfaces
interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Completed' | 'Draft';
  type: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  leads: number;
  conversions: number;
  roi: number;
}

const Campaigns: React.FC = () => {
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    status: '',
    campaignType: '',
    search: '',
  });
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  
  // Sample campaign data
  const campaigns: Campaign[] = [
    {
      id: '1',
      name: 'Summer Promotion',
      status: 'Active',
      type: 'Social Media',
      startDate: '2023-05-01',
      endDate: '2023-08-31',
      budget: 5000,
      spent: 3200,
      leads: 420,
      conversions: 34,
      roi: 2.1,
    },
    {
      id: '2',
      name: 'Product Launch',
      status: 'Active',
      type: 'Email',
      startDate: '2023-06-15',
      endDate: '2023-09-15',
      budget: 8000,
      spent: 3800,
      leads: 650,
      conversions: 58,
      roi: 3.2,
    },
    {
      id: '3',
      name: 'Holiday Sale',
      status: 'Draft',
      type: 'Social Media',
      startDate: '2023-11-15',
      endDate: '2023-12-31',
      budget: 10000,
      spent: 0,
      leads: 0,
      conversions: 0,
      roi: 0,
    },
    {
      id: '4',
      name: 'Brand Awareness',
      status: 'Paused',
      type: 'PPC',
      startDate: '2023-03-01',
      endDate: '2023-12-31',
      budget: 12000,
      spent: 5600,
      leads: 380,
      conversions: 25,
      roi: 1.8,
    },
    {
      id: '5',
      name: 'Lead Generation',
      status: 'Active',
      type: 'Content',
      startDate: '2023-01-15',
      endDate: '2023-12-31',
      budget: 6000,
      spent: 4200,
      leads: 520,
      conversions: 45,
      roi: 2.6,
    },
    {
      id: '6',
      name: 'Spring Sale',
      status: 'Completed',
      type: 'Email',
      startDate: '2023-02-01',
      endDate: '2023-04-30',
      budget: 7500,
      spent: 7500,
      leads: 830,
      conversions: 72,
      roi: 3.8,
    },
  ];
  
  // Filter definitions
  const filters = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Paused', label: 'Paused' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Draft', label: 'Draft' },
      ],
    },
    {
      id: 'campaignType',
      label: 'Campaign Type',
      type: 'select',
      options: [
        { value: 'Social Media', label: 'Social Media' },
        { value: 'Email', label: 'Email' },
        { value: 'PPC', label: 'PPC' },
        { value: 'Content', label: 'Content' },
      ],
    },
    {
      id: 'search',
      label: 'Search',
      type: 'search',
    },
  ];
  
  // Apply filters to campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    // Status filter
    if (activeFilters.status && campaign.status !== activeFilters.status) {
      return false;
    }
    
    // Campaign type filter
    if (activeFilters.campaignType && campaign.type !== activeFilters.campaignType) {
      return false;
    }
    
    // Search filter
    if (activeFilters.search && !campaign.name.toLowerCase().includes(activeFilters.search.toLowerCase())) {
      return false;
    }
    
    return true;
  });
  
  // Table columns definition
  const columns = [
    {
      key: 'name',
      title: 'Campaign Name',
      render: (campaign: Campaign) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">{campaign.name}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{campaign.type}</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (campaign: Campaign) => {
        const statusColors = {
          Active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          Paused: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          Completed: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
          Draft: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
            {campaign.status}
          </span>
        );
      },
    },
    {
      key: 'budget',
      title: 'Budget',
      render: (campaign: Campaign) => (
        <div>
          <div className="font-medium text-gray-900 dark:text-white">${campaign.budget.toLocaleString()}</div>
          <div className="flex items-center text-xs">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
              <div 
                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" 
                style={{ width: `${Math.min(100, (campaign.spent / campaign.budget) * 100)}%` }}
              ></div>
            </div>
            <span className="text-gray-500 dark:text-gray-400">
              ${campaign.spent.toLocaleString()} spent
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'dateRange',
      title: 'Date Range',
      render: (campaign: Campaign) => (
        <div className="text-sm text-gray-900 dark:text-white">
          {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'leads',
      title: 'Leads',
      render: (campaign: Campaign) => (
        <div className="text-right">
          <div className="font-medium text-gray-900 dark:text-white">{campaign.leads}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {campaign.conversions} conversions
          </div>
        </div>
      ),
    },
    {
      key: 'roi',
      title: 'ROI',
      render: (campaign: Campaign) => (
        <div className="text-right">
          <div className={`font-medium ${
            campaign.roi > 2 
              ? 'text-green-600 dark:text-green-400' 
              : campaign.roi > 1 
              ? 'text-blue-600 dark:text-blue-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {campaign.roi > 0 ? `${campaign.roi.toFixed(1)}x` : '-'}
          </div>
        </div>
      ),
    },
    {
      key: 'actions',
      title: '',
      width: '50px',
      render: (campaign: Campaign) => (
        <Popover
          isOpen={actionMenuOpen === campaign.id}
          setIsOpen={(isOpen) => setActionMenuOpen(isOpen ? campaign.id : null)}
          trigger={
            <button 
              className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="More options"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          }
        >
          <div className="py-1 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 w-48">
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log('Edit', campaign.id)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Campaign
            </button>
            {campaign.status === 'Active' ? (
              <button 
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => console.log('Pause', campaign.id)}
              >
                <PauseCircle className="w-4 h-4 mr-2" />
                Pause Campaign
              </button>
            ) : campaign.status === 'Paused' ? (
              <button 
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => console.log('Resume', campaign.id)}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                Resume Campaign
              </button>
            ) : null}
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log('Duplicate', campaign.id)}
            >
              <Flag className="w-4 h-4 mr-2" />
              Duplicate
            </button>
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log('Delete', campaign.id)}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </Popover>
      ),
    },
  ];
  
  // Campaign performance chart data
  const campaignPerformanceData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        label: 'Leads',
        data: [320, 420, 340, 360, 480, 520, 650, 580],
        borderColor: '#3b82f6',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
      {
        label: 'Conversions',
        data: [28, 45, 32, 44, 52, 59, 70, 62],
        borderColor: '#ec4899',
        backgroundColor: 'transparent',
        tension: 0.4,
      },
    ],
  };
  
  // Handle filter changes
  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
  };
  
  // ROI by campaign type chart data
  const roiByCampaignTypeData = {
    labels: ['Social Media', 'Email', 'PPC', 'Content'],
    datasets: [
      {
        label: 'Average ROI',
        data: [2.1, 3.5, 1.8, 2.6],
        backgroundColor: [
          '#3b82f6',
          '#8b5cf6',
          '#ec4899',
          '#10b981',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Campaigns</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and track your marketing campaigns
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create Campaign
          </Button>
        </div>
      </div>
      
      {/* Campaign Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="Campaign Performance" subtitle="Last 8 months" className="lg:col-span-2">
          <Charts type="line" data={campaignPerformanceData} height={280} />
        </Card>
        
        <Card title="ROI by Campaign Type" subtitle="Average return on investment">
          <Charts type="bar" data={roiByCampaignTypeData} height={280} options={{ indexAxis: 'y' }} />
        </Card>
      </div>
      
      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      
      {/* Campaigns Table */}
      <div>
        <Table
          columns={columns}
          data={filteredCampaigns}
          rowKey={(item) => item.id}
          selectable
          selectedRows={selectedCampaigns}
          onSelectChange={setSelectedCampaigns}
          onRowClick={(campaign) => console.log('View campaign', campaign.id)}
          emptyMessage="No campaigns found. Create a new campaign to get started."
        />
        
        {/* Bulk Actions */}
        {selectedCampaigns.length > 0 && (
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedCampaigns.length} campaign{selectedCampaigns.length > 1 ? 's' : ''} selected
            </span>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Trash className="w-4 h-4" />}
            >
              Delete Selected
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Edit className="w-4 h-4" />}
            >
              Edit Selected
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;