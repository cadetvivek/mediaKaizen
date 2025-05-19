// Campaign Types
export interface Campaign {
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
  userId: string;
}

// Lead Types
export interface Lead {
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
  userId: string;
}

// Settings Types
export interface UserSettings {
  userId: string;
  notifications: {
    emailAlerts: boolean;
    leadNotifications: boolean;
    campaignUpdates: boolean;
    weeklyReports: boolean;
    teamMentions: boolean;
    securityAlerts: boolean;
  };
  theme: 'light' | 'dark';
}

// Storage Keys
const STORAGE_KEYS = {
  CAMPAIGNS: 'marketingProCampaigns',
  LEADS: 'marketingProLeads',
  SETTINGS: 'marketingProSettings',
  USERS: 'marketingProUsers',
  TEAMS: 'marketingProTeams',
};

// Generic get function
export const getFromStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Generic save function
export const saveToStorage = <T>(key: string, data: T[]): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Campaign functions
export const getCampaigns = (userId: string): Campaign[] => {
  const campaigns = getFromStorage<Campaign>(STORAGE_KEYS.CAMPAIGNS);
  return campaigns.filter(campaign => campaign.userId === userId);
};

export const saveCampaign = (campaign: Campaign): void => {
  const campaigns = getFromStorage<Campaign>(STORAGE_KEYS.CAMPAIGNS);
  const index = campaigns.findIndex(c => c.id === campaign.id);
  
  if (index !== -1) {
    campaigns[index] = campaign;
  } else {
    campaigns.push(campaign);
  }
  
  saveToStorage(STORAGE_KEYS.CAMPAIGNS, campaigns);
};

// Lead functions
export const getLeads = (userId: string): Lead[] => {
  const leads = getFromStorage<Lead>(STORAGE_KEYS.LEADS);
  return leads.filter(lead => lead.userId === userId);
};

export const saveLead = (lead: Lead): void => {
  const leads = getFromStorage<Lead>(STORAGE_KEYS.LEADS);
  const index = leads.findIndex(l => l.id === lead.id);
  
  if (index !== -1) {
    leads[index] = lead;
  } else {
    leads.push(lead);
  }
  
  saveToStorage(STORAGE_KEYS.LEADS, leads);
};

// Settings functions
export const getUserSettings = (userId: string): UserSettings | null => {
  const settings = getFromStorage<UserSettings>(STORAGE_KEYS.SETTINGS);
  return settings.find(s => s.userId === userId) || null;
};

export const saveUserSettings = (settings: UserSettings): void => {
  const allSettings = getFromStorage<UserSettings>(STORAGE_KEYS.SETTINGS);
  const index = allSettings.findIndex(s => s.userId === settings.userId);
  
  if (index !== -1) {
    allSettings[index] = settings;
  } else {
    allSettings.push(settings);
  }
  
  saveToStorage(STORAGE_KEYS.SETTINGS, allSettings);
};

// Initialize default data if not exists
export const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, '[]');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.LEADS)) {
    localStorage.setItem(STORAGE_KEYS.LEADS, '[]');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, '[]');
  }
  
  if (!localStorage.getItem(STORAGE_KEYS.TEAMS)) {
    localStorage.setItem(STORAGE_KEYS.TEAMS, '[]');
  }
};