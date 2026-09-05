import type {
  Contact,
  Company,
  Deal,
  Task,
  Activity,
  Notification,
  DealStage,
} from '@/types';

export const deals: Deal[] = [
  { id: 'd1', title: 'Annual Platform License', company: 'Acme Corp', contact: 'Sarah Chen', contactInitials: 'SC', contactColor: 'bg-blue-500', value: 84000, stage: 'Lead In', priority: 'High', dueDate: 'Sep 20', probability: 20 },
  { id: 'd2', title: 'Enterprise Security Audit', company: 'Globex Inc', contact: 'Marcus Reid', contactInitials: 'MR', contactColor: 'bg-emerald-500', value: 125000, stage: 'Lead In', priority: 'High', dueDate: 'Sep 25', probability: 15 },
  { id: 'd3', title: 'Marketing Automation Suite', company: 'Stark Industries', contact: 'Emily Park', contactInitials: 'EP', contactColor: 'bg-amber-500', value: 52000, stage: 'Lead In', priority: 'Medium', dueDate: 'Oct 02', probability: 10 },
  { id: 'd4', title: 'CRM Migration Project', company: 'Wayne Enterprises', contact: 'David Kim', contactInitials: 'DK', contactColor: 'bg-rose-500', value: 95000, stage: 'Contacted', priority: 'High', dueDate: 'Sep 18', probability: 35 },
  { id: 'd5', title: 'Cloud Infrastructure Setup', company: 'Umbrella Corp', contact: 'Lisa Wong', contactInitials: 'LW', contactColor: 'bg-violet-500', value: 67000, stage: 'Contacted', priority: 'Medium', dueDate: 'Sep 28', probability: 30 },
  { id: 'd6', title: 'Data Analytics Platform', company: 'Hooli', contact: 'James Fox', contactInitials: 'JF', contactColor: 'bg-teal-500', value: 110000, stage: 'Contacted', priority: 'Low', dueDate: 'Oct 05', probability: 25 },
  { id: 'd7', title: 'Custom API Integration', company: 'Initech', contact: 'Anna Bell', contactInitials: 'AB', contactColor: 'bg-cyan-500', value: 38000, stage: 'Proposal Sent', priority: 'High', dueDate: 'Sep 15', probability: 55 },
  { id: 'd8', title: 'Mobile App Development', company: 'Pied Piper', contact: 'Richard Hendricks', contactInitials: 'RH', contactColor: 'bg-orange-500', value: 145000, stage: 'Proposal Sent', priority: 'High', dueDate: 'Sep 22', probability: 60 },
  { id: 'd9', title: 'DevOps Consulting', company: 'Vandelay Inc', contact: 'Art Vandelay', contactInitials: 'AV', contactColor: 'bg-indigo-500', value: 45000, stage: 'Proposal Sent', priority: 'Medium', dueDate: 'Sep 30', probability: 50 },
  { id: 'd10', title: 'AI Chatbot Implementation', company: 'Soylent Corp', contact: 'Robert Hayes', contactInitials: 'RH', contactColor: 'bg-pink-500', value: 72000, stage: 'Negotiation', priority: 'High', dueDate: 'Sep 12', probability: 75 },
  { id: 'd11', title: 'Website Redesign', company: 'Cyberdyne', contact: 'Nina Patel', contactInitials: 'NP', contactColor: 'bg-lime-500', value: 28000, stage: 'Negotiation', priority: 'Medium', dueDate: 'Sep 19', probability: 70 },
  { id: 'd12', title: 'Annual Support Contract', company: 'Massive Dynamic', contact: 'Olivia Stone', contactInitials: 'OS', contactColor: 'bg-sky-500', value: 160000, stage: 'Negotiation', priority: 'High', dueDate: 'Sep 14', probability: 80 },
  { id: 'd13', title: 'ERP System Rollout', company: 'Wonka Industries', contact: 'Charlie B.', contactInitials: 'CB', contactColor: 'bg-fuchsia-500', value: 210000, stage: 'Closed-Won', priority: 'High', dueDate: 'Aug 28', probability: 100 },
  { id: 'd14', title: 'Security Compliance Package', company: 'Tyrell Corp', contact: 'Eldon T.', contactInitials: 'ET', contactColor: 'bg-red-500', value: 88000, stage: 'Closed-Won', priority: 'Medium', dueDate: 'Aug 15', probability: 100 },
  { id: 'd15', title: 'Team Training Program', company: 'Aperture Science', contact: 'Chell J.', contactInitials: 'CJ', contactColor: 'bg-green-500', value: 34000, stage: 'Closed-Won', priority: 'Low', dueDate: 'Aug 10', probability: 100 },
  { id: 'd16', title: 'Legacy System Migration', company: 'Nakatomi Corp', contact: 'Hans G.', contactInitials: 'HG', contactColor: 'bg-slate-500', value: 195000, stage: 'Closed-Lost', priority: 'High', dueDate: 'Aug 05', probability: 0 },
  { id: 'd17', title: 'Quarterly Maintenance', company: 'Globex Inc', contact: 'Marcus Reid', contactInitials: 'MR', contactColor: 'bg-emerald-500', value: 15000, stage: 'Closed-Lost', priority: 'Low', dueDate: 'Jul 30', probability: 0 },
];

export const companies: Company[] = [
  { id: 'c1', name: 'Acme Corp', industry: 'Technology', website: 'acme.com', employees: 1240, revenue: '$340M', status: 'Active', logoColor: 'bg-blue-600', initials: 'AC', contactCount: 3, dealCount: 2, location: 'San Francisco, CA', founded: 2010 },
  { id: 'c2', name: 'Globex Inc', industry: 'Manufacturing', website: 'globex.com', employees: 5600, revenue: '$1.2B', status: 'Active', logoColor: 'bg-emerald-600', initials: 'GI', contactCount: 5, dealCount: 3, location: 'New York, NY', founded: 1998 },
  { id: 'c3', name: 'Stark Industries', industry: 'Defense', website: 'stark.com', employees: 8900, revenue: '$3.5B', status: 'Active', logoColor: 'bg-amber-600', initials: 'SI', contactCount: 4, dealCount: 2, location: 'Los Angeles, CA', founded: 1995 },
  { id: 'c4', name: 'Wayne Enterprises', industry: 'Conglomerate', website: 'wayne.com', employees: 12000, revenue: '$5.8B', status: 'Active', logoColor: 'bg-slate-700', initials: 'WE', contactCount: 6, dealCount: 4, location: 'Gotham, NJ', founded: 1970 },
  { id: 'c5', name: 'Umbrella Corp', industry: 'Pharmaceutical', website: 'umbrella.com', employees: 3200, revenue: '$890M', status: 'Lead', logoColor: 'bg-violet-600', initials: 'UC', contactCount: 2, dealCount: 1, location: 'Raccoon City, PA', founded: 2005 },
  { id: 'c6', name: 'Hooli', industry: 'Technology', website: 'hooli.com', employees: 7800, revenue: '$2.1B', status: 'Active', logoColor: 'bg-teal-600', initials: 'HO', contactCount: 8, dealCount: 3, location: 'Palo Alto, CA', founded: 2008 },
  { id: 'c7', name: 'Initech', industry: 'Software', website: 'initech.com', employees: 450, revenue: '$120M', status: 'Active', logoColor: 'bg-cyan-600', initials: 'IN', contactCount: 3, dealCount: 2, location: 'Austin, TX', founded: 2012 },
  { id: 'c8', name: 'Pied Piper', industry: 'Technology', website: 'piedpiper.com', employees: 85, revenue: '$25M', status: 'Lead', logoColor: 'bg-orange-600', initials: 'PP', contactCount: 2, dealCount: 1, location: 'San Jose, CA', founded: 2016 },
  { id: 'c9', name: 'Vandelay Inc', industry: 'Import/Export', website: 'vandelay.com', employees: 720, revenue: '$180M', status: 'Inactive', logoColor: 'bg-indigo-600', initials: 'VI', contactCount: 1, dealCount: 1, location: 'New York, NY', founded: 2003 },
  { id: 'c10', name: 'Soylent Corp', industry: 'Food & Beverage', website: 'soylent.com', employees: 2100, revenue: '$450M', status: 'Active', logoColor: 'bg-pink-600', initials: 'SC', contactCount: 4, dealCount: 2, location: 'Portland, OR', founded: 2014 },
  { id: 'c11', name: 'Cyberdyne', industry: 'Robotics', website: 'cyberdyne.com', employees: 1800, revenue: '$620M', status: 'Active', logoColor: 'bg-lime-600', initials: 'CY', contactCount: 3, dealCount: 1, location: 'Detroit, MI', founded: 2007 },
  { id: 'c12', name: 'Massive Dynamic', industry: 'Research', website: 'massivedynamic.com', employees: 4500, revenue: '$1.8B', status: 'Active', logoColor: 'bg-sky-600', initials: 'MD', contactCount: 7, dealCount: 3, location: 'Boston, MA', founded: 2001 },
  { id: 'c13', name: 'Wonka Industries', industry: 'Consumer Goods', website: 'wonka.com', employees: 950, revenue: '$310M', status: 'Active', logoColor: 'bg-fuchsia-600', initials: 'WI', contactCount: 2, dealCount: 1, location: 'London, UK', founded: 2009 },
  { id: 'c14', name: 'Tyrell Corp', industry: 'Biotech', website: 'tyrell.com', employees: 6700, revenue: '$2.4B', status: 'Active', logoColor: 'bg-red-600', initials: 'TC', contactCount: 5, dealCount: 2, location: 'Seattle, WA', founded: 1999 },
  { id: 'c15', name: 'Aperture Science', industry: 'Research', website: 'aperture.com', employees: 1400, revenue: '$280M', status: 'Lead', logoColor: 'bg-green-600', initials: 'AS', contactCount: 2, dealCount: 1, location: 'Cleveland, OH', founded: 2011 },
  { id: 'c16', name: 'Nakatomi Corp', industry: 'Finance', website: 'nakatomi.com', employees: 3800, revenue: '$1.1B', status: 'Inactive', logoColor: 'bg-slate-600', initials: 'NC', contactCount: 3, dealCount: 1, location: 'Chicago, IL', founded: 2000 },
];

const sampleActivities: Activity[] = [
  { id: 'a1', type: 'call', title: 'Discovery Call', description: '30-minute intro call to discuss platform needs and timeline.', date: 'Sep 4', time: '10:30 AM' },
  { id: 'a2', type: 'email', title: 'Proposal Follow-up', description: 'Sent revised pricing proposal with volume discount applied.', date: 'Sep 3', time: '2:15 PM' },
  { id: 'a3', type: 'meeting', title: 'Product Demo', description: 'Live walkthrough of analytics dashboard and reporting features.', date: 'Sep 1', time: '11:00 AM' },
  { id: 'a4', type: 'note', title: 'Decision Maker Identified', description: 'CTO is the primary decision maker, CFO handles budget approval.', date: 'Aug 28', time: '4:45 PM' },
  { id: 'a5', type: 'deal', title: 'Deal Stage Updated', description: 'Moved from Proposal Sent to Negotiation after positive feedback.', date: 'Aug 25', time: '9:30 AM' },
  { id: 'a6', type: 'email', title: 'Initial Outreach', description: 'Introduced our platform and requested a discovery meeting.', date: 'Aug 20', time: '8:00 AM' },
];

export const contacts: Contact[] = [
  { id: 'ct1', name: 'Sarah Chen', email: 'sarah.chen@acme.com', phone: '(415) 555-0182', role: 'VP of Engineering', company: 'Acme Corp', companyId: 'c1', status: 'Active', avatarColor: 'bg-blue-500', initials: 'SC', lastContact: '2 days ago', location: 'San Francisco, CA', deals: ['d1'], notes: sampleActivities },
  { id: 'ct2', name: 'Marcus Reid', email: 'm.reid@globex.com', phone: '(212) 555-0234', role: 'Director of Operations', company: 'Globex Inc', companyId: 'c2', status: 'Active', avatarColor: 'bg-emerald-500', initials: 'MR', lastContact: '5 days ago', location: 'New York, NY', deals: ['d2', 'd17'], notes: sampleActivities.slice(0, 4) },
  { id: 'ct3', name: 'Emily Park', email: 'emily@stark.com', phone: '(310) 555-0410', role: 'Head of Marketing', company: 'Stark Industries', companyId: 'c3', status: 'Active', avatarColor: 'bg-amber-500', initials: 'EP', lastContact: '1 day ago', location: 'Los Angeles, CA', deals: ['d3'], notes: sampleActivities },
  { id: 'ct4', name: 'David Kim', email: 'd.kim@wayne.com', phone: '(555) 555-0567', role: 'CIO', company: 'Wayne Enterprises', companyId: 'c4', status: 'Active', avatarColor: 'bg-rose-500', initials: 'DK', lastContact: '3 hours ago', location: 'Gotham, NJ', deals: ['d4'], notes: sampleActivities.slice(1, 6) },
  { id: 'ct5', name: 'Lisa Wong', email: 'lisa.w@umbrella.com', phone: '(555) 555-0723', role: 'VP of R&D', company: 'Umbrella Corp', companyId: 'c5', status: 'Lead', avatarColor: 'bg-violet-500', initials: 'LW', lastContact: '1 week ago', location: 'Raccoon City, PA', deals: ['d5'], notes: sampleActivities.slice(0, 3) },
  { id: 'ct6', name: 'James Fox', email: 'jfox@hooli.com', phone: '(650) 555-0890', role: 'CTO', company: 'Hooli', companyId: 'c6', status: 'Active', avatarColor: 'bg-teal-500', initials: 'JF', lastContact: '4 days ago', location: 'Palo Alto, CA', deals: ['d6'], notes: sampleActivities },
  { id: 'ct7', name: 'Anna Bell', email: 'anna.b@initech.com', phone: '(512) 555-0912', role: 'Product Manager', company: 'Initech', companyId: 'c7', status: 'Active', avatarColor: 'bg-cyan-500', initials: 'AB', lastContact: '6 days ago', location: 'Austin, TX', deals: ['d7'], notes: sampleActivities.slice(2, 6) },
  { id: 'ct8', name: 'Richard Hendricks', email: 'richard@piedpiper.com', phone: '(408) 555-0345', role: 'Founder & CEO', company: 'Pied Piper', companyId: 'c8', status: 'Lead', avatarColor: 'bg-orange-500', initials: 'RH', lastContact: '2 weeks ago', location: 'San Jose, CA', deals: ['d8'], notes: sampleActivities.slice(0, 2) },
  { id: 'ct9', name: 'Art Vandelay', email: 'art@vandelay.com', phone: '(212) 555-0678', role: 'Sales Director', company: 'Vandelay Inc', companyId: 'c9', status: 'Inactive', avatarColor: 'bg-indigo-500', initials: 'AV', lastContact: '3 weeks ago', location: 'New York, NY', deals: ['d9'], notes: sampleActivities.slice(1, 4) },
  { id: 'ct10', name: 'Robert Hayes', email: 'r.hayes@soylent.com', phone: '(503) 555-0567', role: 'VP of Product', company: 'Soylent Corp', companyId: 'c10', status: 'Active', avatarColor: 'bg-pink-500', initials: 'RH', lastContact: '1 day ago', location: 'Portland, OR', deals: ['d10'], notes: sampleActivities },
  { id: 'ct11', name: 'Nina Patel', email: 'nina@cyberdyne.com', phone: '(313) 555-0789', role: 'Head of Digital', company: 'Cyberdyne', companyId: 'c11', status: 'Active', avatarColor: 'bg-lime-500', initials: 'NP', lastContact: '5 days ago', location: 'Detroit, MI', deals: ['d11'], notes: sampleActivities.slice(0, 5) },
  { id: 'ct12', name: 'Olivia Stone', email: 'olivia@massivedynamic.com', phone: '(617) 555-0123', role: 'COO', company: 'Massive Dynamic', companyId: 'c12', status: 'Active', avatarColor: 'bg-sky-500', initials: 'OS', lastContact: '2 days ago', location: 'Boston, MA', deals: ['d12'], notes: sampleActivities },
];

export const tasks: Task[] = [
  { id: 't1', title: 'Follow up on proposal with Sarah Chen', type: 'Call', contact: 'Sarah Chen', company: 'Acme Corp', dueDate: 'Today', dueTime: '2:00 PM', priority: 'High', done: false },
  { id: 't2', title: 'Send pricing sheet to Marcus Reid', type: 'Email', contact: 'Marcus Reid', company: 'Globex Inc', dueDate: 'Today', dueTime: '4:30 PM', priority: 'High', done: false },
  { id: 't3', title: 'Product demo for Wayne Enterprises team', type: 'Demo', contact: 'David Kim', company: 'Wayne Enterprises', dueDate: 'Tomorrow', dueTime: '10:00 AM', priority: 'High', done: false },
  { id: 't4', title: 'Check in with Lisa Wong on requirements', type: 'Call', contact: 'Lisa Wong', company: 'Umbrella Corp', dueDate: 'Tomorrow', dueTime: '11:30 AM', priority: 'Medium', done: false },
  { id: 't5', title: 'Prepare contract for Massive Dynamic', type: 'Meeting', contact: 'Olivia Stone', company: 'Massive Dynamic', dueDate: 'Sep 8', dueTime: '9:00 AM', priority: 'High', done: false },
  { id: 't6', title: 'Send onboarding docs to Soylent Corp', type: 'Email', contact: 'Robert Hayes', company: 'Soylent Corp', dueDate: 'Sep 8', dueTime: '3:00 PM', priority: 'Medium', done: false },
  { id: 't7', title: 'Schedule quarterly review with Hooli', type: 'Follow-up', contact: 'James Fox', company: 'Hooli', dueDate: 'Sep 10', dueTime: '1:00 PM', priority: 'Low', done: false },
  { id: 't8', title: 'Confirm meeting with Cyberdyne team', type: 'Call', contact: 'Nina Patel', company: 'Cyberdyne', dueDate: 'Sep 11', dueTime: '10:30 AM', priority: 'Medium', done: false },
  { id: 't9', title: 'Intro call with new lead from Pied Piper', type: 'Call', contact: 'Richard Hendricks', company: 'Pied Piper', dueDate: 'Sep 12', dueTime: '2:00 PM', priority: 'Medium', done: true },
  { id: 't10', title: 'Send welcome email to Initech', type: 'Email', contact: 'Anna Bell', company: 'Initech', dueDate: 'Sep 5', dueTime: '9:00 AM', priority: 'Low', done: true },
];

export const notifications: Notification[] = [
  { id: 'n1', title: 'Deal moved to Negotiation', description: 'AI Chatbot Implementation with Soylent Corp entered negotiation.', time: '12 min ago', read: false, type: 'deal' },
  { id: 'n2', title: 'New lead assigned', description: 'Richard Hendricks from Pied Piper has been assigned to you.', time: '1 hour ago', read: false, type: 'contact' },
  { id: 'n3', title: 'Task overdue', description: 'Follow up on proposal with Sarah Chen is overdue.', time: '3 hours ago', read: false, type: 'task' },
  { id: 'n4', title: 'Deal closed-won', description: 'ERP System Rollout with Wonka Industries closed for $210,000.', time: 'Yesterday', read: true, type: 'deal' },
  { id: 'n5', title: 'Weekly report ready', description: 'Your sales performance summary for this week is available.', time: '2 days ago', read: true, type: 'system' },
];

export const dealStages: DealStage[] = [
  'Lead In',
  'Contacted',
  'Proposal Sent',
  'Negotiation',
  'Closed-Won',
  'Closed-Lost',
];

export const revenueData = [
  { month: 'Jan', value: 145 },
  { month: 'Feb', value: 168 },
  { month: 'Mar', value: 152 },
  { month: 'Apr', value: 195 },
  { month: 'May', value: 210 },
  { month: 'Jun', value: 188 },
  { month: 'Jul', value: 232 },
  { month: 'Aug', value: 268 },
  { month: 'Sep', value: 295 },
];

export const stageBreakdown = [
  { stage: 'Lead In', count: 3, color: 'bg-slate-400' },
  { stage: 'Contacted', count: 3, color: 'bg-blue-500' },
  { stage: 'Proposal Sent', count: 3, color: 'bg-amber-500' },
  { stage: 'Negotiation', count: 3, color: 'bg-violet-500' },
  { stage: 'Closed-Won', count: 3, color: 'bg-emerald-500' },
  { stage: 'Closed-Lost', count: 2, color: 'bg-rose-500' },
];

export const recentActivity: Activity[] = [
  { id: 'ra1', type: 'deal', title: 'Deal moved to Negotiation', description: 'Olivia Stone — Massive Dynamic · $160,000', date: 'Today', time: '11:42 AM' },
  { id: 'ra2', type: 'call', title: 'Logged a call with David Kim', description: 'Discussed CRM migration timeline, 35 min call', date: 'Today', time: '10:15 AM' },
  { id: 'ra3', type: 'email', title: 'Sent proposal to Anna Bell', description: 'Custom API Integration · $38,000 proposal', date: 'Today', time: '9:30 AM' },
  { id: 'ra4', type: 'deal', title: 'New deal created', description: 'Marketing Automation Suite — Stark Industries', date: 'Yesterday', time: '4:20 PM' },
  { id: 'ra5', type: 'meeting', title: 'Completed demo with Soylent Corp', description: 'AI Chatbot walkthrough, very positive response', date: 'Yesterday', time: '2:00 PM' },
  { id: 'ra6', type: 'deal', title: 'Deal closed-won', description: 'ERP System Rollout — Wonka Industries · $210,000', date: '2 days ago', time: '5:15 PM' },
  { id: 'ra7', type: 'email', title: 'Follow-up email to Marcus Reid', description: 'Checking in on security audit proposal', date: '2 days ago', time: '11:00 AM' },
  { id: 'ra8', type: 'call', title: 'Discovery call with Lisa Wong', description: 'Umbrella Corp — exploring cloud infrastructure', date: '3 days ago', time: '3:30 PM' },
];
