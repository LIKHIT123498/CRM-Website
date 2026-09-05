export type View =
  | 'dashboard'
  | 'contacts'
  | 'companies'
  | 'deals'
  | 'tasks'
  | 'analytics'
  | 'settings';

export type Priority = 'High' | 'Medium' | 'Low';
export type Status = 'Active' | 'Inactive' | 'Lead';
export type DealStage =
  | 'Lead In'
  | 'Contacted'
  | 'Proposal Sent'
  | 'Negotiation'
  | 'Closed-Won'
  | 'Closed-Lost';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  company: string;
  companyId: string;
  status: Status;
  avatarColor: string;
  initials: string;
  lastContact: string;
  location: string;
  deals: string[];
  notes: Activity[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  employees: number;
  revenue: string;
  status: Status;
  logoColor: string;
  initials: string;
  contactCount: number;
  dealCount: number;
  location: string;
  founded: number;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  contact: string;
  contactInitials: string;
  contactColor: string;
  value: number;
  stage: DealStage;
  priority: Priority;
  dueDate: string;
  probability: number;
}

export interface Task {
  id: string;
  title: string;
  type: 'Call' | 'Email' | 'Meeting' | 'Demo' | 'Follow-up';
  contact: string;
  company: string;
  dueDate: string;
  dueTime: string;
  priority: Priority;
  done: boolean;
}

export interface Activity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note' | 'deal';
  title: string;
  description: string;
  date: string;
  time: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'deal' | 'contact' | 'task' | 'system';
}
