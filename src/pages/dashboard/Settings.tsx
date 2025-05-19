import React, { useState } from 'react';
import { Save, User, Mail, Phone, Lock, Bell, Users, Trash, Plus, Download } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import { useAuth } from '../../hooks/useAuth';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'account' | 'team' | 'notifications' | 'billing'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  
  // Profile settings form state
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Alex Johnson',
    email: user?.email || 'alex@marketingpro.com',
    phone: '(123) 456-7890',
    company: 'Marketing Pro',
    role: 'Marketing Director',
    bio: 'Experienced marketing professional with over 10 years in digital marketing and campaign management.',
    avatar: '',
  });
  
  // Password form state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    leadNotifications: true,
    campaignUpdates: true,
    weeklyReports: true,
    teamMentions: true,
    securityAlerts: true,
  });
  
  // Team members
  const teamMembers = [
    { id: '1', name: 'Alex Johnson', email: 'alex@marketingpro.com', role: 'Admin', avatar: '' },
    { id: '2', name: 'Sarah Williams', email: 'sarah@marketingpro.com', role: 'Manager', avatar: '' },
    { id: '3', name: 'Mike Peters', email: 'mike@marketingpro.com', role: 'Analyst', avatar: '' },
    { id: '4', name: 'Jessica Lee', email: 'jessica@marketingpro.com', role: 'User', avatar: '' },
  ];
  
  // Handle profile form changes
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value,
    });
  };
  
  // Handle password form changes
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({
      ...passwordForm,
      [name]: value,
    });
  };
  
  // Handle notification toggle
  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      
      // Show success notification (in a real app)
      alert('Settings saved successfully!');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account and application preferences
        </p>
      </div>
      
      {/* Settings Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
            { id: 'account', label: 'Account & Security', icon: <Lock className="w-4 h-4" /> },
            { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
            { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
            { id: 'billing', label: 'Billing', icon: <Trash className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                whitespace-nowrap pb-4 pt-2 px-1 border-b-2 font-medium text-sm flex items-center
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'}
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Profile Settings */}
      {activeTab === 'profile' && (
        <div>
          <Card>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Profile Image */}
                <div className="flex items-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center overflow-hidden">
                      {profileForm.avatar ? (
                        <img
                          src={profileForm.avatar}
                          alt={profileForm.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {profileForm.name.split(' ').map(part => part[0]).join('')}
                        </span>
                      )}
                    </div>
                    <label
                      htmlFor="avatar-upload"
                      className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 text-white p-1 rounded-full cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                    <input id="avatar-upload" type="file" className="hidden" />
                  </div>
                  <div className="ml-5">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">{profileForm.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{profileForm.role}</p>
                  </div>
                </div>
                
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Email Address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={profileForm.company}
                      onChange={handleProfileChange}
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Role
                    </label>
                    <input
                      type="text"
                      name="role"
                      id="role"
                      value={profileForm.role}
                      onChange={handleProfileChange}
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      id="bio"
                      rows={4}
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      className="mt-1 block w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                    leftIcon={!isSaving && <Save className="w-4 h-4" />}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
      
      {/* Account & Security Settings */}
      {activeTab === 'account' && (
        <div className="space-y-6">
          {/* Password Change */}
          <Card title="Change Password" subtitle="Update your password to keep your account secure">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="currentPassword"
                      id="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="newPassword"
                      id="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Confirm New Password
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    isLoading={isSaving}
                  >
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </Card>
          
          {/* Two-Factor Authentication */}
          <Card title="Two-Factor Authentication" subtitle="Add an extra layer of security to your account">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Enable 2FA</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Use an authenticator app to generate one-time codes
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-2fa"
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-2fa"
                    className="block h-6 rounded-full overflow-hidden cursor-pointer bg-gray-300 dark:bg-gray-700"
                  >
                    <span className="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out" />
                  </label>
                </div>
              </div>
              
              <Button variant="secondary">
                Set Up Two-Factor Authentication
              </Button>
            </div>
          </Card>
          
          {/* Sessions */}
          <Card title="Active Sessions" subtitle="Manage your active sessions across devices">
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Session</h4>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">Chrome on Windows</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        IP: 192.168.1.1 • Last active: Just now
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Current
                  </span>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Other Sessions</h4>
                </div>
                <div>
                  <div className="px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                      </svg>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Safari on iPhone</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          IP: 192.168.1.2 • Last active: 2 hours ago
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Revoke
                    </Button>
                  </div>
                  
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">Firefox on MacBook</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          IP: 192.168.1.3 • Last active: Yesterday
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Revoke
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button variant="danger">
                  Sign Out All Other Sessions
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Delete Account */}
          <Card title="Delete Account" subtitle="Permanently delete your account and all data">
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-md mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Warning: This action is irreversible</h3>
                  <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                    <p>
                      Deleting your account will permanently remove all your data including campaigns, leads, and analytics. This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex">
              <Button variant="danger" leftIcon={<Trash className="w-4 h-4" />}>
                Delete My Account
              </Button>
            </div>
          </Card>
        </div>
      )}
      
      {/* Team Settings */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <Card title="Team Members" subtitle="Manage your team members and their roles">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Role
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                            {member.avatar ? (
                              <img className="h-10 w-10 rounded-full" src={member.avatar} alt="" />
                            ) : (
                              <span className="text-blue-600 dark:text-blue-400 font-medium">
                                {member.name.split(' ').map(part => part[0]).join('')}
                              </span>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {member.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          defaultValue={member.role}
                          className="block py-1 pl-3 pr-10 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                
                        >
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Analyst">Analyst</option>
                          <option value="User">User</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="mr-2"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="danger"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button leftIcon={<Plus className="w-4 h-4" />}>
                Invite Team Member
              </Button>
            </div>
          </Card>
          
          <Card title="Team Permissions" subtitle="Configure access levels for each role">
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin</h4>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Can manage team members, billing, and all data. Has full system access.
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Manager</h4>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Can create and manage campaigns, leads, and view analytics. Cannot manage team or billing.
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Analyst</h4>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Can view and analyze data. Can create reports. Cannot create campaigns or manage leads.
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-750 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">User</h4>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Can view assigned campaigns and leads. Cannot create or edit data.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <Card title="Notification Preferences" subtitle="Manage how and when you receive notifications">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Email Alerts</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive important alerts about your account
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-email-alerts"
                    checked={notifications.emailAlerts}
                    onChange={() => handleNotificationToggle('emailAlerts')}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-email-alerts"
                    className={`block h-6 w-10 rounded-full cursor-pointer ${
                      notifications.emailAlerts ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        notifications.emailAlerts ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Lead Notifications</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications when new leads are added
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-lead-notifications"
                    checked={notifications.leadNotifications}
                    onChange={() => handleNotificationToggle('leadNotifications')}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-lead-notifications"
                    className={`block h-6 w-10 rounded-full cursor-pointer ${
                      notifications.leadNotifications ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        notifications.leadNotifications ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Campaign Updates</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive updates about your campaign performance
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-campaign-updates"
                    checked={notifications.campaignUpdates}
                    onChange={() => handleNotificationToggle('campaignUpdates')}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-campaign-updates"
                    className={`block h-6 w-10 rounded-full cursor-pointer ${
                      notifications.campaignUpdates ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        notifications.campaignUpdates ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Weekly Reports</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive weekly summary reports of your marketing performance
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-weekly-reports"
                    checked={notifications.weeklyReports}
                    onChange={() => handleNotificationToggle('weeklyReports')}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-weekly-reports"
                    className={`block h-6 w-10 rounded-full cursor-pointer ${
                      notifications.weeklyReports ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        notifications.weeklyReports ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">In-App Notifications</h3>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Team Mentions</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications when you're mentioned by team members
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-team-mentions"
                    checked={notifications.teamMentions}
                    onChange={() => handleNotificationToggle('teamMentions')}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-team-mentions"
                    className={`block h-6 w-10 rounded-full cursor-pointer ${
                      notifications.teamMentions ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        notifications.teamMentions ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">Security Alerts</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications about security events
                  </p>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="toggle-security-alerts"
                    checked={notifications.securityAlerts}
                    onChange={() => handleNotificationToggle('securityAlerts')}
                    className="sr-only"
                  />
                  <label
                    htmlFor="toggle-security-alerts"
                    className={`block h-6 w-10 rounded-full cursor-pointer ${
                      notifications.securityAlerts ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-700'
                    }`}
                  >
                    <span 
                      className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                        notifications.securityAlerts ? 'translate-x-4' : 'translate-x-0'
                      }`}
                    />
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button
                type="button"
                isLoading={isSaving}
                onClick={handleSubmit}
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </Card>
      )}
      
      {/* Billing Settings */}
      {activeTab === 'billing' && (
        <div className="space-y-6">
          <Card title="Current Plan" subtitle="Manage your subscription and billing">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">Pro Plan</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  $49/month, billed monthly
                </p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited campaigns
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Up to 10,000 leads
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <svg className="h-4 w-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    5 team members
                  </li>
                </ul>
              </div>
              <div className="flex flex-col space-y-2">
                <Button>Upgrade Plan</Button>
                <Button variant="outline">Cancel Plan</Button>
              </div>
            </div>
          </Card>
          
          <Card title="Payment Methods" subtitle="Manage your payment methods">
            <div className="space-y-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-12 w-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900/50 rounded-md">
                    <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Visa ending in 4242</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    Default
                  </span>
                  <Button size="sm" variant="secondary">Edit</Button>
                </div>
              </div>
              
              <Button
                leftIcon={<Plus className="w-4 h-4" />}
                variant="secondary"
              >
                Add Payment Method
              </Button>
            </div>
          </Card>
          
          <Card title="Billing History" subtitle="View and download your invoices">
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-750">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Invoice
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Download
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        INV-{2023 - index}-{1000 + index}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(2023, 6 - index, 1).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        $49.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          Paid
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                          <Download className="h-5 w-5" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Settings;