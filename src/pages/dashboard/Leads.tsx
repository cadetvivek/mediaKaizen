import React, { useState } from 'react';
import { Plus, User, Mail, Phone, Calendar, MoreHorizontal, Flag, Trash, Edit, Download } from 'lucide-react';
import Button from '../../components/common/Button';
import FilterBar from '../../components/common/FilterBar';
import Table from '../../components/common/Table';
import Card from '../../components/common/Card';
import { Popover } from '../../components/common/Popover';
import Charts from '../../components/common/Charts';

// Lead types and interfaces
interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Converted';
  date: string;
  score: number;
  assigned_to: string | null;
  location: string;
  company?: string;
  notes?: string;
}

const Leads: React.FC = () => {
  const [selectedLeads, setSelectedLeads] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
    status: '',
    source: '',
    dateRange: '',
    search: '',
  });
  const [actionMenuOpen, setActionMenuOpen] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  
  // Sample leads data
  const leads: Lead[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '(123) 456-7890',
      source: 'Social Media',
      status: 'New',
      date: '2023-07-15T14:30:00',
      score: 75,
      assigned_to: 'Alex Johnson',
      location: 'New York, NY',
      company: 'Acme Inc.',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(234) 567-8901',
      source: 'Email',
      status: 'Contacted',
      date: '2023-07-10T09:15:00',
      score: 60,
      assigned_to: 'Sarah Williams',
      location: 'Los Angeles, CA',
      company: 'XYZ Corp',
      notes: 'Follow up about pricing questions',
    },
    {
      id: '3',
      name: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '(345) 678-9012',
      source: 'PPC',
      status: 'Qualified',
      date: '2023-07-05T16:45:00',
      score: 85,
      assigned_to: null,
      location: 'Chicago, IL',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '(456) 789-0123',
      source: 'Referral',
      status: 'Converted',
      date: '2023-06-28T11:20:00',
      score: 90,
      assigned_to: 'Alex Johnson',
      location: 'Miami, FL',
      company: 'Global Solutions',
    },
    {
      id: '5',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '(567) 890-1234',
      source: 'Social Media',
      status: 'Unqualified',
      date: '2023-07-12T13:10:00',
      score: 30,
      assigned_to: 'Sarah Williams',
      location: 'Seattle, WA',
    },
    {
      id: '6',
      name: 'Jessica Wilson',
      email: 'jessica.wilson@example.com',
      phone: '(678) 901-2345',
      source: 'Email',
      status: 'New',
      date: '2023-07-14T10:05:00',
      score: 65,
      assigned_to: null,
      location: 'Austin, TX',
      company: 'Tech Innovations',
    },
    {
      id: '7',
      name: 'David Miller',
      email: 'david.miller@example.com',
      phone: '(789) 012-3456',
      source: 'Content',
      status: 'Contacted',
      date: '2023-07-08T15:30:00',
      score: 55,
      assigned_to: 'Alex Johnson',
      location: 'Denver, CO',
    },
    {
      id: '8',
      name: 'Sarah Taylor',
      email: 'sarah.taylor@example.com',
      phone: '(890) 123-4567',
      source: 'Referral',
      status: 'Qualified',
      date: '2023-07-01T09:45:00',
      score: 80,
      assigned_to: 'Sarah Williams',
      location: 'Boston, MA',
      company: 'Financial Services Inc.',
      notes: 'Interested in premium package',
    },
  ];
  
  // Filter definitions
  const filters = [
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'New', label: 'New' },
        { value: 'Contacted', label: 'Contacted' },
        { value: 'Qualified', label: 'Qualified' },
        { value: 'Unqualified', label: 'Unqualified' },
        { value: 'Converted', label: 'Converted' },
      ],
    },
    {
      id: 'source',
      label: 'Source',
      type: 'select',
      options: [
        { value: 'Social Media', label: 'Social Media' },
        { value: 'Email', label: 'Email' },
        { value: 'PPC', label: 'PPC' },
        { value: 'Content', label: 'Content' },
        { value: 'Referral', label: 'Referral' },
      ],
    },
    {
      id: 'dateRange',
      label: 'Date',
      type: 'date',
    },
    {
      id: 'search',
      label: 'Search',
      type: 'search',
    },
  ];
  
  // Apply filters to leads
  const filteredLeads = leads.filter(lead => {
    // Status filter
    if (activeFilters.status && lead.status !== activeFilters.status) {
      return false;
    }
    
    // Source filter
    if (activeFilters.source && lead.source !== activeFilters.source) {
      return false;
    }
    
    // Date filter
    if (activeFilters.dateRange) {
      const leadDate = new Date(lead.date);
      const filterDate = new Date(activeFilters.dateRange);
      
      // Reset time part to compare only dates
      leadDate.setHours(0, 0, 0, 0);
      filterDate.setHours(0, 0, 0, 0);
      
      if (leadDate.getTime() !== filterDate.getTime()) {
        return false;
      }
    }
    
    // Search filter
    if (activeFilters.search) {
      const searchTerm = activeFilters.search.toLowerCase();
      if (
        !lead.name.toLowerCase().includes(searchTerm) && 
        !lead.email.toLowerCase().includes(searchTerm) &&
        !lead.company?.toLowerCase().includes(searchTerm)
      ) {
        return false;
      }
    }
    
    return true;
  });
  
  // Table columns definition
  const columns = [
    {
      key: 'name',
      title: 'Lead',
      render: (lead: Lead) => (
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {lead.name.split(' ').map(part => part[0]).join('')}
            </span>
          </div>
          <div className="ml-4">
            <div className="font-medium text-gray-900 dark:text-white">{lead.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{lead.company || 'N/A'}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'contact',
      title: 'Contact Info',
      render: (lead: Lead) => (
        <div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Mail className="w-4 h-4 mr-1" />
            {lead.email}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Phone className="w-4 h-4 mr-1" />
            {lead.phone}
          </div>
        </div>
      ),
    },
    {
      key: 'source',
      title: 'Source',
      render: (lead: Lead) => (
        <div className="text-sm text-gray-900 dark:text-white">
          {lead.source}
        </div>
      ),
    },
    {
      key: 'status',
      title: 'Status',
      render: (lead: Lead) => {
        const statusColors = {
          New: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
          Contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
          Qualified: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
          Unqualified: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
          Converted: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
        };
        
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[lead.status]}`}>
            {lead.status}
          </span>
        );
      },
    },
    {
      key: 'date',
      title: 'Date Added',
      render: (lead: Lead) => (
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-1" />
          {new Date(lead.date).toLocaleDateString()}
        </div>
      ),
    },
    {
      key: 'score',
      title: 'Score',
      render: (lead: Lead) => {
        const getScoreColor = (score: number) => {
          if (score >= 80) return 'text-green-600 dark:text-green-400';
          if (score >= 60) return 'text-blue-600 dark:text-blue-400';
          if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
          return 'text-red-600 dark:text-red-400';
        };
        
        return (
          <div className="flex items-center">
            <span className={`font-medium ${getScoreColor(lead.score)}`}>
              {lead.score}
            </span>
            <div className="ml-2 w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className={`h-2 rounded-full ${
                  lead.score >= 80 ? 'bg-green-500' :
                  lead.score >= 60 ? 'bg-blue-500' :
                  lead.score >= 40 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`}
                style={{ width: `${lead.score}%` }}
              ></div>
            </div>
          </div>
        );
      },
    },
    {
      key: 'actions',
      title: '',
      width: '50px',
      render: (lead: Lead) => (
        <Popover
          isOpen={actionMenuOpen === lead.id}
          setIsOpen={(isOpen) => setActionMenuOpen(isOpen ? lead.id : null)}
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
              onClick={() => console.log('Edit', lead.id)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Lead
            </button>
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log('Flag', lead.id)}
            >
              <Flag className="w-4 h-4 mr-2" />
              Flag Lead
            </button>
            <button 
              className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => console.log('Delete', lead.id)}
            >
              <Trash className="w-4 h-4 mr-2" />
              Delete
            </button>
          </div>
        </Popover>
      ),
    },
  ];
  
  // Handle filter changes
  const handleFilterChange = (filters: Record<string, any>) => {
    setActiveFilters(filters);
  };
  
  // Lead source chart data
  const leadSourceData = {
    labels: ['Social Media', 'Email', 'PPC', 'Content', 'Referral'],
    datasets: [
      {
        label: 'Leads by Source',
        data: [
          leads.filter(lead => lead.source === 'Social Media').length,
          leads.filter(lead => lead.source === 'Email').length,
          leads.filter(lead => lead.source === 'PPC').length,
          leads.filter(lead => lead.source === 'Content').length,
          leads.filter(lead => lead.source === 'Referral').length,
        ],
        backgroundColor: [
          '#3b82f6', // blue
          '#8b5cf6', // purple
          '#ec4899', // pink
          '#10b981', // green
          '#f59e0b', // yellow
        ],
        borderWidth: 0,
      },
    ],
  };
  
  // Lead status chart data
  const leadStatusData = {
    labels: ['New', 'Contacted', 'Qualified', 'Unqualified', 'Converted'],
    datasets: [
      {
        label: 'Leads by Status',
        data: [
          leads.filter(lead => lead.status === 'New').length,
          leads.filter(lead => lead.status === 'Contacted').length,
          leads.filter(lead => lead.status === 'Qualified').length,
          leads.filter(lead => lead.status === 'Unqualified').length,
          leads.filter(lead => lead.status === 'Converted').length,
        ],
        backgroundColor: [
          '#3b82f6', // blue
          '#f59e0b', // yellow
          '#10b981', // green
          '#ef4444', // red
          '#8b5cf6', // purple
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Management</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Track and manage your leads from various sources
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <Button
            leftIcon={<Download className="w-4 h-4" />}
            variant="secondary"
          >
            Export
          </Button>
          <Button
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Add Lead
          </Button>
        </div>
      </div>
      
      {/* Stats/Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Lead Overview</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {leads.length} total leads
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">By Status</h4>
              <Charts type="doughnut" data={leadStatusData} height={180} />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">By Source</h4>
              <Charts type="doughnut" data={leadSourceData} height={180} />
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Conversion Rate</h3>
          </div>
          <div className="flex items-center mt-4">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">{Math.round((leads.filter(lead => lead.status === 'Converted').length / leads.length) * 100)}%</div>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+2.5%</span>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(leads.filter(lead => lead.status === 'Converted').length / leads.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Compared to last month</p>
        </Card>
        
        <Card>
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Avg. Lead Quality</h3>
          </div>
          <div className="flex items-center mt-4">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length)}
            </div>
            <span className="ml-2 text-sm font-medium text-green-600 dark:text-green-400">+5.2</span>
          </div>
          <div className="mt-4">
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
              <div 
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length) / 100 * 100}%` }}
              ></div>
            </div>
          </div>
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">Out of 100 possible points</p>
        </Card>
      </div>
      
      {/* Filters */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        activeFilters={activeFilters}
      />
      
      {/* Leads Table/Cards */}
      <div>
        {/* View Mode Toggle */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-l-lg ${
                viewMode === 'table'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => setViewMode('table')}
            >
              Table View
            </button>
            <button
              type="button"
              className={`py-2 px-4 text-sm font-medium rounded-r-lg ${
                viewMode === 'cards'
                  ? 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
              }`}
              onClick={() => setViewMode('cards')}
            >
              Card View
            </button>
          </div>
        </div>
        
        {viewMode === 'table' ? (
          <Table
            columns={columns}
            data={filteredLeads}
            rowKey={(item) => item.id}
            selectable
            selectedRows={selectedLeads}
            onSelectChange={setSelectedLeads}
            onRowClick={(lead) => console.log('View lead', lead.id)}
            emptyMessage="No leads found. Add a new lead to get started."
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredLeads.map(lead => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {lead.name.split(' ').map(part => part[0]).join('')}
                      </span>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{lead.company || 'N/A'}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    lead.status === 'New' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                    lead.status === 'Contacted' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    lead.status === 'Qualified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    lead.status === 'Unqualified' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                    'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                  }`}>
                    {lead.status}
                  </span>
                </div>
                
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Mail className="w-4 h-4 mr-2" />
                    {lead.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Phone className="w-4 h-4 mr-2" />
                    {lead.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {new Date(lead.date).toLocaleDateString()}
                  </div>
                </div>
                
                <div className="mt-4 flex items-center">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">Score:</span>
                  <span className={`font-medium ${
                    lead.score >= 80 ? 'text-green-600 dark:text-green-400' :
                    lead.score >= 60 ? 'text-blue-600 dark:text-blue-400' :
                    lead.score >= 40 ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {lead.score}
                  </span>
                  <div className="ml-2 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                    <div 
                      className={`h-2 rounded-full ${
                        lead.score >= 80 ? 'bg-green-500' :
                        lead.score >= 60 ? 'bg-blue-500' :
                        lead.score >= 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${lead.score}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
                  <Button size="sm" variant="secondary" leftIcon={<Edit className="w-3 h-3" />}>Edit</Button>
                  <Button size="sm" variant="primary">View Details</Button>
                </div>
              </Card>
            ))}
          </div>
        )}
        
        {/* Bulk Actions */}
        {selectedLeads.length > 0 && viewMode === 'table' && (
          <div className="mt-4 flex items-center space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {selectedLeads.length} lead{selectedLeads.length > 1 ? 's' : ''} selected
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
              Bulk Edit
            </Button>
            <Button
              size="sm"
              variant="secondary"
              leftIcon={<Download className="w-4 h-4" />}
            >
              Export Selected
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leads;