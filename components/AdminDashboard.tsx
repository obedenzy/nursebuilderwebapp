
'use client';

import React, { useState } from 'react';
import { 
 Users, CreditCard, Activity, ShieldCheck, Search, ListFilter, 
 ArrowUpRight, ArrowDownRight, MoreHorizontal, Download, 
 Settings, Bell, CheckCircle2, AlertCircle, TrendingUp,
 BarChart3, PieChart, Database, Zap, Lock, 
 FileText, History, Server, ShieldAlert, ChevronRight,
 UserPlus, Mail, Phone, Calendar, ArrowLeftRight, Trash2,
 Clock, CheckSquare, Eye, ChevronLeft, Loader2, Save
} from 'lucide-react';
import { 
 BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
 Cell, LineChart, Line, CartesianGrid, AreaChart, Area
} from 'recharts';

type AdminTab = 'overview' | 'practitioners' | 'financials' | 'settings';

const REVENUE_DATA = [
 { name: 'Feb 14', amount: 400 },
 { name: 'Feb 15', amount: 1200 },
 { name: 'Feb 16', amount: 800 },
 { name: 'Feb 17', amount: 1600 },
 { name: 'Feb 18', amount: 2400 },
 { name: 'Feb 19', amount: 1800 },
 { name: 'Feb 20', amount: 3200 },
];

const TRACK_USAGE = [
 { name: 'Boundaries', value: 450, color: '#10b981' },
 { name: 'Pleaser', value: 320, color: '#0f172a' },
 { name: 'Toxic Shield', value: 280, color: '#94a3b8' },
];

import { UserRole, User } from '../types';
import { HelpCircle, Award, Star, Brain, Stethoscope } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
 Users,
 CreditCard,
 Zap,
 ShieldCheck,
 Activity,
 Award,
 Star,
 TrendingUp,
 Brain,
 Stethoscope
};

interface AdminDashboardProps {
 user?: User;
}

import { adminService } from '../services/adminService';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user }) => {
 const [mounted, setMounted] = React.useState(false);
 const [activeTab, setActiveTab] = useState<AdminTab>('overview');

 React.useEffect(() => {
 setMounted(true);
 }, []);
 const [searchTerm, setSearchTerm] = useState('');
 const [specialtyFilter, setSpecialtyFilter] = useState('All');
 const [statusFilter, setStatusFilter] = useState('All');
 const [selectedUser, setSelectedUser] = useState<any | null>(null);
 const [currentUser] = useState<User>(user || {
 id: 'admin-1',
 name: 'Super Admin',
 email: 'super@nursebuilder.io',
 role: UserRole.SUPER_ADMIN,
 joined: '2024-01-01',
 status: 'Active',
 sessions: 0
 });
 
 const [showAddAdmin, setShowAddAdmin] = useState(false);
 const [newAdminEmail, setNewAdminEmail] = useState('');
 const [newAdminName, setNewAdminName] = useState('');
 
 // Pagination State
 const [userPage, setUserPage] = useState(1);
 const [txPage, setTxPage] = useState(1);
 const itemsPerPage = 8;

 const [users, setUsers] = useState<any[]>([]);
 const [isUsersLoading, setIsUsersLoading] = useState(false);
 const [pricingTiers, setPricingTiers] = useState<any[]>([]);
 const [isPricingLoading, setIsPricingLoading] = useState(false);
 const [isCreatingAnnouncement, setIsCreatingAnnouncement] = useState(false);
 const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
 const [announcements, setAnnouncements] = useState<any[]>([]);
 const [isAnnouncementsLoading, setIsAnnouncementsLoading] = useState(false);
 const [transactions, setTransactions] = useState<any[]>([]);
 const [isTxLoading, setIsTxLoading] = useState(false);
 const [adminStats, setAdminStats] = useState<any[]>([]);
 const [isAdminStatsLoading, setIsAdminStatsLoading] = useState(false);

 React.useEffect(() => {
 const fetchStats = async () => {
 setIsAdminStatsLoading(true);
 try {
 const data = await adminService.getStats();
 setAdminStats(data.stats);
 } catch (error) {
 console.error("Error fetching stats:", error);
 } finally {
 setIsAdminStatsLoading(false);
 }
 };
 fetchStats();
 }, []);

 React.useEffect(() => {
 const fetchAnnouncements = async () => {
 setIsAnnouncementsLoading(true);
 try {
 const data = await adminService.getAnnouncements();
 setAnnouncements(data.announcements);
 } catch (error) {
 console.error("Error fetching announcements:", error);
 } finally {
 setIsAnnouncementsLoading(false);
 }
 };
 fetchAnnouncements();
 }, []);

 React.useEffect(() => {
 const fetchTransactions = async () => {
 setIsTxLoading(true);
 try {
 const data = await adminService.getTransactions();
 setTransactions(data.transactions);
 } catch (error) {
 console.error("Error fetching transactions:", error);
 } finally {
 setIsTxLoading(false);
 }
 };
 fetchTransactions();
 }, []);

 React.useEffect(() => {
 const fetchUsers = async () => {
 setIsUsersLoading(true);
 try {
 const data = await adminService.getUsers();
 setUsers(data.users);
 } catch (error) {
 console.error("Error fetching users:", error);
 } finally {
 setIsUsersLoading(false);
 }
 };
 fetchUsers();
 }, []);

 React.useEffect(() => {
 const fetchPricing = async () => {
 setIsPricingLoading(true);
 try {
 const data = await adminService.getPricing();
 setPricingTiers(data.tiers);
 } catch (error) {
 console.error("Error fetching pricing:", error);
 } finally {
 setIsPricingLoading(false);
 }
 };
 fetchPricing();
 }, []);

 const handleUpdatePrice = async (id: string, updates: any) => {
 try {
 const { tier } = await adminService.updatePricing(id, updates);
 setPricingTiers(prev => prev.map(t => t.id === id ? tier : t));
 alert("Pricing updated successfully!");
 } catch (error) {
 console.error("Error updating price:", error);
 alert("Failed to update pricing.");
 }
 };

 const handleCreateAnnouncement = async () => {
 if (!newAnnouncement.title || !newAnnouncement.content) return;
 
 try {
 const data = await adminService.createAnnouncement(newAnnouncement);
 setAnnouncements(prev => [data.announcement, ...prev]);
 setIsCreatingAnnouncement(false);
 setNewAnnouncement({ title: '', content: '' });
 } catch (error) {
 console.error("Error creating announcement:", error);
 }
 };

 const handleUpdateAnnouncement = async (id: string, updates: any) => {
 try {
 const { announcement } = await adminService.updateAnnouncement(id, updates);
 setAnnouncements(prev => prev.map(a => a.id === id ? announcement : a));
 } catch (error) {
 console.error("Error updating announcement:", error);
 }
 };


 const stats = adminStats.length > 0 ? adminStats.map(s => ({
 ...s,
 icon: s.icon === 'Users' ? Users : s.icon === 'CreditCard' ? CreditCard : s.icon === 'Zap' ? Zap : ShieldCheck
 })) : [
 { label: 'Total Practitioners', value: '...', trend: '...', icon: Users, color: 'text-indigo', bg: 'bg-indigo-50' },
 { label: 'Monthly Revenue', value: '...', trend: '...', icon: CreditCard, color: 'text-slate-800', bg: 'bg-slate-50' },
 { label: 'Strategies Generated', value: '...', trend: '...', icon: Zap, color: 'text-indigo', bg: 'bg-white' },
 { label: 'System Resilience', value: '...', trend: '...', icon: ShieldCheck, color: 'text-indigo', bg: 'bg-indigo-50' },
 ];

 const renderUserDetails = (user: any) => (
 <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-700">
 <button 
 onClick={() => setSelectedUser(null)}
 className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 font-bold text-[10px] uppercase tracking-[0.3em] transition-all"
 >
 <ChevronLeft className="w-5 h-5" /> Back to Sanctuary Registry
 </button>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
 {/* Profile Card */}
 <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-md space-y-10">
 <div className="flex flex-col items-center text-center space-y-6">
 <div className="w-28 h-28 rounded-full bg-[#1a1f36] text-white flex items-center justify-center font-medium text-4xl shadow-md border border-white/10">
 {user.name.charAt(0)}
 </div>
 <div>
 <h3 className="text-3xl font-medium text-slate-900 tracking-tight">{user.name}</h3>
 <p className="text-slate-600 font-medium">{user.email}</p>
 </div>
 <div className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border ${user.tier === 'Lifetime' ? 'bg-indigo-50 border-indigo-100 text-indigo-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-600'}`}>
 {user.tier} Access
 </div>
 </div>

 <div className="space-y-5 pt-8 border-t border-slate-50">
 <div className="flex justify-between items-center">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em]">Specialty</p>
 <p className="text-sm font-medium text-slate-600">{user.specialty}</p>
 </div>
 <div className="flex justify-between items-center">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em]">Enrollment</p>
 <p className="text-sm font-medium text-slate-600">{user.joined}</p>
 </div>
 <div className="flex justify-between items-center">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em]">Deployments</p>
 <p className="text-sm font-black text-slate-800">{user.sessions}</p>
 </div>
 <div className="flex justify-between items-center">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em]">Provision End</p>
 <p className="text-sm font-bold text-indigo-600">{user.expiry || 'Indefinite'}</p>
 </div>
 <div className="flex justify-between items-center">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em]">Agency Status</p>
 <span className={`text-[10px] font-bold uppercase tracking-[0.25em] p-1.5 rounded-lg ${user.status === 'Active' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
 {user.status}
 </span>
 </div>
 </div>

 <div className="pt-8">
 <button 
 onClick={() => {
 const updatedUser = { ...user, status: user.status === 'Active' ? 'Inactivated' : 'Active' };
 setSelectedUser(updatedUser);
 }}
 className={`w-full py-5 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] transition-all shadow-md ${user.status === 'Active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
 >
 {user.status === 'Active' ? 'Decommission Account' : 'Reactivate Protocol'}
 </button>
 </div>
 </div>

 {/* History Tabs */}
 <div className="lg:col-span-2 space-y-10">
 {/* Payment History */}
 <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-md space-y-8">
 <h4 className="text-xl font-medium text-slate-900 flex items-center gap-4">
 <CreditCard className="w-6 h-6 text-indigo-600" /> Transaction Repository
 </h4>
 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="border-b border-slate-50">
 <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Timestamp</th>
 <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Investment</th>
 <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600">Strategy Track</th>
 <th className="pb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 text-right">Verification</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50">
 {[
 { date: '2025-02-15', amount: 49.00, plan: 'Lifetime Sanctuary', status: 'Success' },
 { date: '2025-01-15', amount: 19.00, plan: 'The Practitioner', status: 'Success' }
 ].map((p, i) => (
 <tr key={i} className="text-sm group">
 <td className="py-6 font-bold text-slate-500">{p.date}</td>
 <td className="py-6 font-medium text-xl text-slate-900">${p.amount.toFixed(2)}</td>
 <td className="py-6 font-bold text-indigo-600 text-[10px] uppercase tracking-[0.2em]">{p.plan}</td>
 <td className="py-6 text-right">
 <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-bold uppercase tracking-widest border border-indigo-100">
 {p.status}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Plan Generation History */}
 <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-md space-y-10">
 <h4 className="text-xl font-medium text-slate-900 flex items-center gap-4">
 <Zap className="w-6 h-6 text-indigo-600" /> Formulation History
 </h4>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {[
 { date: '2025-02-20 14:30', issue: 'Institutional Mandate', track: 'Strategic Agency Protocol' },
 { date: '2025-02-18 09:12', issue: 'Lateral Disruption', track: 'Professional Sanctuary Shield' },
 { date: '2025-02-15 22:45', issue: 'Domain Transitions', track: 'Practitioner Agency Formulation' }
 ].map((g, i) => (
 <div key={i} className="flex flex-col gap-5 p-8 bg-slate-50/50 rounded-3xl border border-slate-200/50 hover:bg-indigo-50 transition-all shadow-md group">
 <div className="flex items-center justify-between">
 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-slate-50">
 <FileText className="w-6 h-6 text-indigo-600 opacity-60" />
 </div>
 <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.3em]">{g.date}</p>
 </div>
 <div className="space-y-1">
 <p className="text-lg font-medium text-slate-800">{g.issue}</p>
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em]">{g.track}</p>
 </div>
 <div className="pt-4 border-t border-slate-200 flex justify-end">
 <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-[0.2em] hover:text-indigo-800 transition-colors flex items-center gap-2">Inspect Strategy <ChevronRight className="w-3 h-3 text-indigo-600" /></button>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 </div>
 );

 const renderOverview = () => (
 <div className="space-y-12 animate-in fade-in duration-700">
 <div className="grid grid-cols-12 gap-10">
 <div className="col-span-12 lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-md space-y-10">
 <div className="flex justify-between items-center">
 <h3 className="text-2xl font-medium flex items-center gap-4 text-slate-900 tracking-tight">
 <TrendingUp className="w-8 h-8 text-indigo-600" /> Institutional Intensity
 </h3>
 <div className="flex gap-3">
 <div className="px-5 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] border border-indigo-100 shadow-sm">Expansion</div>
 </div>
 </div>
 <div className="h-[350px]">
 <ResponsiveContainer width="100%" height="100%">
 <BarChart data={TRACK_USAGE}>
 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 700}} />
 <Tooltip 
 contentStyle={{borderRadius: '24px', border: 'none', background: '#ffffff', boxShadow: '0 20px 40px rgba(0,0,0,0.08)'}} 
 itemStyle={{fontWeight: 700, fontSize: 12, fontFamily: '', fontStyle: ''}} 
 />
 <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={40}>
 {TRACK_USAGE.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
 </Bar>
 </BarChart>
 </ResponsiveContainer>
 </div>
 </div>

 <div className="col-span-12 lg:col-span-4 bg-[#1a1f36] text-white p-12 rounded-[3.5rem] shadow-md space-y-10 border border-white/5 flex flex-col justify-between overflow-hidden relative group">
 <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-50/10 rounded-[2rem] blur-[100px] pointer-events-none group-hover:bg-indigo-50/20 transition-all duration-700" />
 <div className="space-y-6 relative z-10">
 <div className="flex items-center gap-4 mb-2">
 <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
 <BarChart3 className="w-6 h-6 text-indigo-600" />
 </div>
 <h3 className="text-xl font-medium">Strategic Yield</h3>
 </div>
 <p className="text-slate-600 font-medium text-sm leading-relaxed">Forecasted institutional expansion and practitioner retention velocity.</p>
 </div>
 <div className="h-[150px] w-full relative z-10">
 <ResponsiveContainer width="100%" height="100%">
 <AreaChart data={REVENUE_DATA}>
 <defs><linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
 <Area type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
 </AreaChart>
 </ResponsiveContainer>
 </div>
 <div className="flex justify-between items-center p-8 bg-white/5 rounded-3xl border border-white/10 relative z-10 shadow-md">
 <div>
 <p className="text-[10px] font-bold uppercase text-indigo-600 tracking-[0.3em] mb-1">MTD AGGREGATE</p>
 <p className="text-3xl font-medium tracking-tight">$24,950.00</p>
 </div>
 <div className="px-4 py-1.5 bg-indigo-50 text-[10px] font-bold uppercase rounded-lg shadow-lg">+48%</div>
 </div>
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
 <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-md space-y-10">
 <div className="flex justify-between items-center">
 <h3 className="text-2xl font-medium flex items-center gap-4 text-slate-900 tracking-tight">
 <Activity className="w-8 h-8 text-rose-600" /> Professional Velocity
 </h3>
 <button onClick={() => setActiveTab('practitioners')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-[0.2em] underline underline-offset-4">Registry</button>
 </div>
 <div className="space-y-4">
 {isUsersLoading ? (
 <div className="flex items-center justify-center p-12"><Loader2 className="w-12 h-12 animate-spin text-indigo-600" /></div>
 ) : users.slice(0, 4).map((user) => (
 <div key={user.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-full border border-slate-200 hover:bg-white hover:shadow-md transition-all group">
 <div className="flex items-center gap-5">
 <div className="w-14 h-14 rounded-full bg-[#1a1f36] text-white flex items-center justify-center font-medium text-xl shadow-md border border-white/10 group-hover:bg-[#1a1f36] transition-colors">{user.name.charAt(0)}</div>
 <div>
 <p className="text-lg font-medium text-slate-900">{user.name}</p>
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.25em]">{user.specialty}</p>
 </div>
 </div>
 <div className="text-right">
 <p className="text-lg font-medium text-slate-600">{user.sessions} Sessions</p>
 <p className="text-[9px] text-indigo-600 uppercase font-black tracking-widest bg-indigo-50 px-2 py-0.5 rounded-md inline-block">{user.tier}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="bg-white p-12 rounded-[3.5rem] border border-slate-200 shadow-md space-y-10">
 <div className="flex justify-between items-center">
 <h3 className="text-2xl font-medium flex items-center gap-4 text-slate-900 tracking-tight">
 <Bell className="w-8 h-8 text-indigo-600" /> Sanctuary Communiqués
 </h3>
 <button onClick={() => setActiveTab('settings')} className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-[0.2em] underline underline-offset-4">Governance</button>
 </div>
 <div className="space-y-5">
 {announcements.slice(0, 3).map((ann) => (
 <div key={ann.id} className="p-8 bg-slate-50/50 rounded-3xl border border-slate-200 space-y-3 hover:bg-white transition-all shadow-md group">
 <div className="flex justify-between items-center">
 <p className="text-xl font-medium text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{ann.title}</p>
 <span className={`px-3 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] border ${ann.active ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-100 text-slate-500 border-slate-300'}`}>
 {ann.active ? 'Live' : 'Archived'}
 </span>
 </div>
 <p className="text-sm text-slate-500 font-medium leading-relaxed line-clamp-2">{ann.content}</p>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>
 );

 const renderPractitioners = () => {
 if (selectedUser) return renderUserDetails(selectedUser);

 const filteredUsers = users.filter(user => {
 const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
 user.email.toLowerCase().includes(searchTerm.toLowerCase());
 const matchesSpecialty = specialtyFilter === 'All' || user.specialty === specialtyFilter;
 return matchesSearch && matchesSpecialty;
 });

 const paginatedUsers = filteredUsers.slice((userPage - 1) * itemsPerPage, userPage * itemsPerPage);
 const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

 const specialties = ['All', ...Array.from(new Set(users.map(u => u.specialty)))];

 return (
 <div className="space-y-10 animate-in fade-in duration-700">
 <div className="bg-white rounded-[4rem] border border-slate-200 shadow-md overflow-hidden">
 <div className="p-12 md:p-16 space-y-12">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
 <div className="space-y-2">
 <h3 className="text-3xl font-medium text-slate-900 tracking-tight flex items-center gap-4">
 <ShieldCheck className="w-10 h-10 text-indigo-600" /> Sanctuary Registry
 </h3>
 <p className="text-slate-500 text-lg font-medium">Manage global practitioner access and professional agency tiers.</p>
 </div>
 <div className="flex flex-wrap gap-4">
 <div className="relative group min-w-[280px]">
 <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-700 group-focus-within:text-indigo-600 transition-colors" />
 <input 
 type="text" 
 placeholder="Identify practitioner..." 
 value={searchTerm}
 onChange={(e) => { setSearchTerm(e.target.value); setUserPage(1); }}
 className="pl-16 pr-6 py-5 bg-slate-50 border border-slate-50 rounded-full focus:bg-white focus:shadow-md outline-none font-medium text-sm transition-all w-full" 
 />
 </div>
 {currentUser.role === UserRole.SUPER_ADMIN && (
 <button 
 onClick={() => setShowAddAdmin(true)}
 className="px-8 py-5 bg-[#1a1f36] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 shadow-md hover:bg-black transition-all active:scale-[0.98]"
 >
 <UserPlus className="w-4 h-4 text-indigo-600" /> provision admin
 </button>
 )}
 </div>
 </div>

 {showAddAdmin && (
 <div className="p-12 bg-slate-50/50 rounded-[2.5rem] border border-slate-200 space-y-10 animate-in zoom-in-95 duration-500 shadow-md">
 <div className="flex justify-between items-center">
 <h4 className="text-2xl font-medium text-slate-800">Provision Governance Access</h4>
 <button onClick={() => setShowAddAdmin(false)} className="text-slate-600 hover:text-rose-600 font-bold text-[10px] uppercase tracking-[0.3em] transition-colors">Abort</button>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
 <div className="space-y-4">
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] ml-2">Practitioner Identity</p>
 <input type="text" value={newAdminName} onChange={(e) => setNewAdminName(e.target.value)} className="w-full p-6 glass-card rounded-3xl font-medium text-lg outline-none focus:border-indigo-500/30 transition-all shadow-md" placeholder="Sarah Jenkins" />
 </div>
 <div className="space-y-4">
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] ml-2">Institutional Channel</p>
 <input type="email" value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="w-full p-6 glass-card rounded-3xl font-medium text-lg outline-none focus:border-indigo-500/30 transition-all shadow-md" placeholder="sarah@institution.io" />
 </div>
 </div>
 <button onClick={() => { setShowAddAdmin(false); }} className="w-full py-6 bg-[#1a1f36] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.4em] shadow-md hover:bg-black transition-all">Formulate Account</button>
 </div>
 )}

 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="border-b border-slate-200">
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">Identity</th>
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">Specialization</th>
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">Current Tier</th>
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4 text-right">Sanctuary Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50">
 {isUsersLoading ? (
 <tr><td colSpan={4} className="py-24 text-center"><Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-600" /></td></tr>
 ) : paginatedUsers.length > 0 ? paginatedUsers.map((user) => (
 <tr key={user.id} className="hover:bg-slate-50/50 transition-all cursor-pointer group" onClick={() => setSelectedUser(user)}>
 <td className="py-8 px-4">
 <div className="flex items-center gap-5 transition-transform group-hover:translate-x-2">
 <div className="w-14 h-14 rounded-full bg-[#1a1f36] text-white flex items-center justify-center font-medium text-2xl shadow-md border border-white/10 group-hover:bg-[#1a1f36] transition-all">{user.name.charAt(0)}</div>
 <div><p className="font-medium text-xl text-slate-900 leading-none">{user.name}</p><p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest mt-1.5">{user.email}</p></div>
 </div>
 </td>
 <td className="py-8 px-4"><span className="text-sm font-medium text-slate-600">{user.specialty}</span></td>
 <td className="py-8 px-4">
 <span className={`inline-flex px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-[0.2em] border ${user.tier === 'Lifetime' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-slate-50 text-slate-500 border-slate-200'}`}>{user.tier} Plan</span>
 </td>
 <td className="py-8 px-4 text-right">
 <button className="w-10 h-10 rounded-full bg-slate-50 text-slate-700 flex items-center justify-center hover:bg-white hover:text-white transition-all shadow-md border border-slate-200"><Eye className="w-5 h-5" /></button>
 </td>
 </tr>
 )) : (
 <tr><td colSpan={4} className="py-32 text-center text-slate-700 font-medium text-2xl">No practitioner records detected in this domain.</td></tr>
 )}
 </tbody>
 </table>
 </div>
 
 {filteredUsers.length > itemsPerPage && (
 <div className="flex items-center justify-between pt-10 border-t border-slate-200">
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Archive Page {userPage} of {totalPages}</p>
 <div className="flex gap-3">
 <button onClick={() => setUserPage(p => Math.max(1, p-1))} disabled={userPage === 1} className="w-12 h-12 rounded-3xl glass-card text-slate-700 hover:text-slate-900 hover:shadow-md disabled:opacity-20 transition-all flex items-center justify-center shadow-inner"><ChevronLeft className="w-6 h-6" /></button>
 <button onClick={() => setUserPage(p => Math.min(totalPages, p+1))} disabled={userPage === totalPages} className="w-12 h-12 rounded-3xl glass-card text-slate-700 hover:text-slate-900 hover:shadow-md disabled:opacity-20 transition-all flex items-center justify-center shadow-inner"><ChevronRight className="w-6 h-6" /></button>
 </div>
 </div>
 )}
 </div>
 </div>
 </div>
 );
 };

 const renderFinancials = () => {
 const filteredTx = transactions.filter(tx => {
 const matchesSearch = tx.user_email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
 tx.id.toLowerCase().includes(searchTerm.toLowerCase());
 const matchesStatus = statusFilter === 'All' || tx.status === statusFilter;
 return matchesSearch && matchesStatus;
 });

 const paginatedTx = filteredTx.slice((txPage - 1) * itemsPerPage, txPage * itemsPerPage);
 const totalPages = Math.ceil(filteredTx.length / itemsPerPage);

 return (
 <div className="space-y-10 animate-in fade-in duration-700">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
 {[
 { label:"Yield (MTD)", val: transactions.reduce((sum, tx) => sum + (tx.status === 'Success' ? Number(tx.amount) : 0), 0), icon: ArrowUpRight, color:"text-indigo-600" },
 { label:"Engagement Volume", val: transactions.length, icon: Activity, color:"text-indigo-600" },
 { label:"Practioner Average", val: (transactions.reduce((sum, tx) => sum + Number(tx.amount), 0) / (transactions.length || 1)).toFixed(2), icon: CreditCard, color:"text-slate-800" }
 ].map((m, i) => (
 <div key={i} className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-md space-y-4 hover:scale-[1.02] transition-all group">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em]">{m.label}</p>
 <div className="flex items-center justify-between">
 <p className="text-3xl font-medium tracking-tight text-slate-900">{typeof m.val === 'number' ? `$${m.val.toLocaleString()}` : `$${m.val}`}</p>
 <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-md transition-all border border-transparent group-hover:border-slate-50">
 <m.icon className={`w-5 h-5 ${m.color}`} />
 </div>
 </div>
 </div>
 ))}
 </div>

 <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-md space-y-12">
 <div className="flex flex-col md:flex-row md:items-center justify-between gap-10">
 <h3 className="text-3xl font-medium text-slate-900 tracking-tight flex items-center gap-4"><CreditCard className="w-10 h-10 text-indigo-600" /> Strategic Ledger</h3>
 <div className="flex gap-4">
 <div className="relative group">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-700 group-focus-within:text-indigo-600 transition-colors" />
 <input type="text" placeholder="TX Trace..." className="pl-12 pr-4 py-3 bg-slate-50 border border-slate-50 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] outline-none focus:bg-white focus:shadow-md focus:border-indigo-500/20 transition-all" />
 </div>
 <button className="px-6 py-3 bg-[#1a1f36] text-white rounded-full text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 shadow-md hover:bg-black transition-all"><Download className="w-4 h-4 text-indigo-600" /> Extract CSV</button>
 </div>
 </div>

 <div className="overflow-x-auto">
 <table className="w-full text-left">
 <thead>
 <tr className="border-b border-slate-200">
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">TX ID Reference</th>
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">Practitioner Channel</th>
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4">Strategic Investment</th>
 <th className="pb-8 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 px-4 text-right">Verification</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-50">
 {isTxLoading ? (
 <tr><td colSpan={4} className="py-24 text-center"><Loader2 className="w-12 h-12 animate-spin mx-auto text-indigo-600" /></td></tr>
 ) : paginatedTx.length > 0 ? paginatedTx.map((tx) => (
 <tr key={tx.id} className="text-sm group hover:bg-slate-50/30 transition-all cursor-crosshair">
 <td className="py-8 px-4 font-bold text-slate-600 font-mono tracking-tighter text-xs">NB-{tx.id.slice(0, 12).toUpperCase()}</td>
 <td className="py-8 px-4 font-medium text-slate-900 text-lg">{tx.user_email}</td>
 <td className="py-8 px-4 font-medium text-slate-900 text-xl">${Number(tx.amount).toFixed(2)}</td>
 <td className="py-8 px-4 text-right">
 <span className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.3em] border ${tx.status === 'Success' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>{tx.status}</span>
 </td>
 </tr>
 )) : (
 <tr><td colSpan={4} className="py-32 text-center text-slate-700 font-medium text-2xl">No strategic transactions detected in this cycle.</td></tr>
 )}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
 };

 const renderSettings = () => (
 <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
 <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-slate-200 shadow-md space-y-16">
 <div className="space-y-4">
 <h3 className="text-4xl font-medium text-slate-900 tracking-tight flex items-center gap-6">
 <Settings className="w-10 h-10 text-indigo-600" /> Sanctuary Governance
 </h3>
 <p className="text-slate-500 text-lg font-medium">Configure global sanctuary intelligence parameters and professional defaults.</p>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
 <div className="space-y-12">
 <div className="space-y-6">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Intelligence Sensitivity</label>
 <div className="flex items-center gap-6 p-8 bg-slate-50/50 rounded-3xl shadow-md border border-slate-50">
 <input type="range" className="flex-1 accent-indigo-600 cursor-pointer" />
 <span className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em]">High Agency</span>
 </div>
 </div>
 
 <div className="space-y-4">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Initial Protocol Allotment</label>
 <input type="number" defaultValue={1} className="w-full p-6 bg-slate-50/50 border border-slate-200 rounded-full font-medium text-2xl outline-none focus:bg-white focus:shadow-md transition-all" />
 </div>

 <div className="space-y-6">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Social Proof Governance</label>
 <div className="space-y-6">
 <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-full border border-slate-200 hover:bg-white transition-all shadow-md">
 <p className="text-sm font-bold text-slate-600">Broadcast"Voices From The Unit"</p>
 <div className="w-14 h-7 bg-[#1a1f36] rounded-full relative shadow-md border border-indigo-500 cursor-pointer shadow-inner">
 <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
 </div>
 </div>
 <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-full border border-slate-200 hover:bg-white transition-all shadow-md">
 <p className="text-sm font-bold text-slate-600">Testimonial Rotation Epoch (s)</p>
 <input type="number" defaultValue={5} className="w-16 bg-slate-50 text-right font-medium text-lg outline-none" />
 </div>
 <div className="p-8 bg-slate-50/50 rounded-3xl space-y-8 border border-slate-200 shadow-md">
 <p className="text-sm font-bold text-slate-600 border-l-2 border-indigo-200 pl-4 uppercase tracking-[0.2em]">Sanctuary FOMO Engine</p>
 <div className="grid grid-cols-2 gap-8">
 <div className="space-y-2">
 <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">Gap (min)</p>
 <input type="number" defaultValue={15} className="w-full bg-white p-4 rounded-full text-lg font-medium outline-none border border-slate-200 focus:shadow-md transition-all" />
 </div>
 <div className="space-y-2">
 <p className="text-[9px] font-black uppercase text-slate-600 tracking-widest ml-1">Window (hrs)</p>
 <input type="number" defaultValue={24} max={72} className="w-full bg-white p-4 rounded-full text-lg font-medium outline-none border border-slate-200 focus:shadow-md transition-all" />
 </div>
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="space-y-12">
 <div className="space-y-6">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Institutional Pricing (Live Tiers)</label>
 <div className="space-y-8">
 {isPricingLoading ? (
 <div className="flex items-center justify-center p-12"><Loader2 className="w-12 h-12 animate-spin text-indigo-600" /></div>
 ) : pricingTiers.map((tier) => (
 <div key={tier.id} className="p-8 bg-slate-50/50 rounded-3xl border border-slate-200 space-y-8 hover:bg-white transition-all shadow-md group">
 <div className="flex justify-between items-center">
 <p className="text-xl font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{tier.name}</p>
 <span className="text-[9px] font-bold uppercase text-indigo-600 bg-indigo-50 px-4 py-1.5 rounded-full border border-indigo-100 tracking-[0.2em]">{tier.duration_months} Months Access</span>
 </div>
 <div className="grid grid-cols-2 gap-8">
 <div className="space-y-2">
 <p className="text-[9px] font-bold uppercase text-slate-600 tracking-widest ml-1">Tier Investment</p>
 <div className="relative">
 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">$</span>
 <input 
 type="text" 
 defaultValue={tier.price} 
 onBlur={(e) => handleUpdatePrice(tier.id, { price: e.target.value })}
 className="w-full bg-white pl-8 pr-4 py-4 rounded-full text-lg font-medium outline-none border border-slate-200 focus:shadow-inner transition-all" 
 />
 </div>
 </div>
 <div className="space-y-2">
 <p className="text-[9px] font-bold uppercase text-slate-600 tracking-widest ml-1">Strike-through Value</p>
 <div className="relative">
 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">$</span>
 <input 
 type="text" 
 defaultValue={tier.strike_through_price} 
 onBlur={(e) => handleUpdatePrice(tier.id, { strike_through_price: e.target.value })}
 className="w-full bg-white pl-8 pr-4 py-4 rounded-full text-lg font-medium outline-none border border-slate-200 focus:shadow-inner transition-all" 
 />
 </div>
 </div>
 </div>
 <div className="grid grid-cols-2 gap-8">
 <div className="space-y-2">
 <p className="text-[9px] font-bold uppercase text-slate-600 tracking-widest ml-1">Call to Action Label</p>
 <input 
 type="text" 
 defaultValue={tier.cta} 
 onBlur={(e) => handleUpdatePrice(tier.id, { cta: e.target.value })}
 className="w-full bg-white p-4 rounded-full text-sm font-bold uppercase tracking-[0.2em] outline-none border border-slate-200 focus:shadow-inner transition-all" 
 />
 </div>
 <div className="flex items-center gap-4 pt-6">
 <button 
 onClick={() => handleUpdatePrice(tier.id, { is_popular: !tier.is_popular })}
 className={`w-full py-4 rounded-full font-bold text-[9px] uppercase tracking-[0.3em] transition-all shadow-md ${tier.is_popular ? 'bg-[#1a1f36] text-white border-indigo-500 scale-[1.05]' : 'bg-white text-slate-700 border border-slate-50'}`}
 >
 {tier.is_popular ? 'Highlighted Portfolio' : 'Standard Tier'}
 </button>
 </div>
 </div>
 </div>
 ))}
 </div>
 </div>

 <div className="space-y-6">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Platform Communiqués</label>
 <div className="space-y-6">
 {isAnnouncementsLoading ? (
 <div className="flex items-center justify-center p-12"><Loader2 className="w-12 h-12 animate-spin text-indigo-600" /></div>
 ) : announcements.map((ann) => (
 <div key={ann.id} className="p-8 bg-slate-50/50 rounded-3xl border border-slate-200 space-y-4 hover:bg-white transition-all shadow-md group">
 <div className="flex justify-between items-center">
 <p className="text-xl font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">{ann.title}</p>
 <button 
 onClick={() => handleUpdateAnnouncement(ann.id, { active: !ann.active })}
 className={`px-4 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.3em] border transition-all ${ann.active ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
 >
 {ann.active ? 'Broadcast Live' : 'Archive'}
 </button>
 </div>
 <p className="text-sm text-slate-500 font-medium leading-relaxed">{ann.content}</p>
 </div>
 ))}
 {isCreatingAnnouncement ? (
 <div className="p-10 bg-white rounded-[4rem] border-2 border-indigo-100 space-y-8 shadow-md animate-in zoom-in-95 duration-500">
 <div className="space-y-2">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Communication Headline</p>
 <input 
 type="text" 
 value={newAnnouncement.title}
 onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
 placeholder="e.g. Protocol Calibration Complete"
 className="w-full bg-slate-50 p-5 rounded-full text-lg font-medium outline-none border border-slate-200 focus:bg-white focus:shadow-md transition-all" 
 />
 </div>
 <div className="space-y-2">
 <p className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Refined Message Body</p>
 <textarea 
 value={newAnnouncement.content}
 onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
 placeholder="Detail the strategic communiqué..."
 className="w-full bg-slate-50 p-5 rounded-full text-lg font-medium outline-none border border-slate-200 focus:bg-white focus:shadow-md transition-all min-h-[150px]" 
 />
 </div>
 <div className="flex gap-4">
 <button 
 onClick={handleCreateAnnouncement}
 className="flex-1 py-5 bg-[#1a1f36] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.4em] shadow-md hover:bg-black transition-all"
 >
 Initiate Broadcast
 </button>
 <button 
 onClick={() => setIsCreatingAnnouncement(false)}
 className="px-10 py-5 bg-slate-50 text-slate-600 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 transition-all border border-slate-200"
 >
 Abort
 </button>
 </div>
 </div>
 ) : (
 <button 
 onClick={() => setIsCreatingAnnouncement(true)}
 className="w-full py-10 bg-white border-2 border-dashed border-slate-200 rounded-full text-[10px] font-bold uppercase tracking-[0.4em] text-slate-700 hover:border-indigo-200 hover:text-indigo-600 transition-all hover:bg-indigo-50 shadow-md group"
 >
 + Initiate Global Communiqué
 </button>
 )}
 </div>
 </div>

 <div className="space-y-6">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.3em] ml-2">Sanctuary Stasis (Maintenance)</label>
 <div className="flex items-center justify-between p-8 bg-rose-50/30 rounded-3xl border border-rose-100 shadow-md group hover:bg-rose-50/50 transition-all">
 <p className="text-sm font-bold text-rose-700 uppercase tracking-[0.1em]">Suspend Formulation Engine Intelligence</p>
 <div className="w-14 h-7 bg-slate-100 rounded-full relative cursor-pointer border border-slate-300 shadow-inner">
 <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-md" />
 </div>
 </div>
 </div>
 </div>
 </div>

 <div className="pt-12 border-t border-slate-200 flex justify-end gap-6">
 <button className="px-12 py-5 bg-slate-50 text-slate-600 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 transition-all border border-slate-200">Restore Sanctuary Defaults</button>
 <button className="px-16 py-6 bg-white text-indigo-600 rounded-full font-bold text-[10px] uppercase tracking-[0.4em] hover:bg-black shadow-md transition-all active:scale-[0.98]">Commit Governance Protocols</button>
 </div>
 </div>
 </div>
 );

 if (!mounted) return null;

 return (
 <div className="max-w-7xl mx-auto px-8 py-24 space-y-12 animate-in fade-in duration-700 bg-slate-50">
 {/* Admin Header Bento */}
 <div className="grid grid-cols-12 gap-8 items-stretch">
 <div className="col-span-12 md:col-span-8 bg-white p-12 rounded-[2rem] border border-slate-200 shadow-md flex items-center gap-10">
 <div className="w-20 h-20 bg-[#1a1f36] text-white rounded-full flex items-center justify-center shadow-md">
 <Lock className="w-10 h-10 text-indigo-600" />
 </div>
 <div>
 <h1 className="text-4xl md:text-5xl font-medium text-slate-900 tracking-tight">Command Sanctuary.</h1>
 <p className="text-slate-500 font-medium mt-1 text-lg">Global platform analytics and elite practitioner governance.</p>
 </div>
 </div>
 <div className="col-span-12 md:col-span-4 bg-[#1a1f36] p-12 rounded-[2.5rem] text-white shadow-md flex items-center justify-between border border-indigo-500 relative overflow-hidden group">
 <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none rotate-12 group-hover:rotate-45 transition-transform duration-700">
 <Activity className="w-32 h-32" />
 </div>
 <div className="relative z-10">
 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-100">Core Vitality</p>
 <p className="text-3xl font-medium mt-2">99.9% Operational</p>
 </div>
 <button onClick={() => setActiveTab('settings')} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-md border border-white/10 relative z-10">
 <Settings className="w-6 h-6 text-white" />
 </button>
 </div>
 </div>

 {/* Tab Navigation Bento */}
 <div className="flex flex-wrap items-center gap-3 p-3 glass-card rounded-3xl w-fit shadow-md">
 {[
 { id: 'overview', label: 'Overview', icon: TrendingUp }, 
 { id: 'practitioners', label: 'Practitioners', icon: Users }, 
 { id: 'financials', label: 'Financials', icon: CreditCard }, 
 { id: 'settings', label: 'Intelligence', icon: Settings }
 ].map((tab) => (
 <button 
 key={tab.id} 
 onClick={() => setActiveTab(tab.id as AdminTab)} 
 className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all ${activeTab === tab.id ? 'bg-[#1a1f36] text-white shadow-md scale-[1.02]' : 'text-slate-600 hover:text-slate-900'}`}
 >
 <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-indigo' : ''}`} />
 {tab.label}
 </button>
 ))}
 </div>

 {/* Quick Stats Grid */}
 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
 {stats.map((stat, i) => {
 const IconComponent = ICON_MAP[stat.icon] || HelpCircle;
 return (
 <div key={i} className="p-10 glass-card rounded-3xl shadow-md space-y-8 hover:scale-[1.02] transition-all group">
 <div className="flex justify-between items-start">
 <div className={`w-14 h-14 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shadow-md border border-transparent group-hover:border-slate-200 transition-all`}>
 <IconComponent className="w-7 h-7" />
 </div>
 <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.trend.startsWith('+') ? 'text-indigo' : 'text-slate-600'} tracking-widest`}>
 {stat.trend} {stat.trend.startsWith('+') ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
 </div>
 </div>
 <div>
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] mb-2">{stat.label}</p>
 <p className="text-4xl font-medium text-slate-900 tracking-tight">{stat.value}</p>
 </div>
 </div>
 );
 })}
 </div>

 <div className="min-h-[600px] animate-in slide-in-from-bottom-8 duration-700">
 {activeTab === 'overview' && renderOverview()}
 {activeTab === 'practitioners' && renderPractitioners()}
 {activeTab === 'financials' && renderFinancials()}
 {activeTab === 'settings' && renderSettings()}
 </div>
 </div>
 );
};

export default AdminDashboard;
