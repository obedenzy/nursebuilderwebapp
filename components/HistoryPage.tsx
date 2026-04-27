'use client';

import React, { useState } from 'react';
import { BoundaryPlan } from '../types';
import { useConstants } from '../components/ConstantsProvider';
import { Search, ListFilter, ArrowUpDown, Calendar, ChevronRight, Shield, Bookmark, Target, Quote, CheckCircle, ChevronDown, Twitter, Linkedin, Mail } from 'lucide-react';

interface HistoryPageProps {
 history: BoundaryPlan[];
 onReviewPlan: (plan: BoundaryPlan) => void;
 onToggleSave: (planId: string) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ history, onReviewPlan, onToggleSave }) => {
 const { supportBundles } = useConstants();
 const [searchTerm, setSearchTerm] = useState('');
 const [filterBundle, setFilterBundle] = useState('All Tracks');
 const [showSavedOnly, setShowSavedOnly] = useState(false);
 const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

 const filteredHistory = history
 .filter(item => {
 const matchesSearch = item.issue.toLowerCase().includes(searchTerm.toLowerCase()) || 
 item.scripts.some(s => s.text.toLowerCase().includes(searchTerm.toLowerCase()));
 const matchesBundle = filterBundle === 'All Tracks' || item.bundle === filterBundle;
 const matchesSaved = !showSavedOnly || item.isSaved;
 
 return matchesSearch && matchesBundle && matchesSaved;
 })
 .sort((a, b) => {
 return sortOrder === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
 });

 return (
 <div className="min-h-screen bg-[#F8FAFC]">
 <div className="max-w-4xl mx-auto px-6 py-20 space-y-12 animate-in fade-in duration-700">
 <header className="space-y-2">
 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Strategy Archive</h1>
 <p className="text-slate-500 text-sm font-medium">Review your professional boundary legacy</p>
 </header>

 {/* Filter Bar */}
 <div className="bg-white rounded-full p-2 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-2">
 <div className="flex-1 relative w-full">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
 <input 
 type="text"
 placeholder="Search strategy..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-10 pr-4 py-3 bg-transparent font-medium text-slate-800 text-sm outline-none placeholder:text-slate-400"
 />
 </div>

 <div className="flex items-center gap-2 w-full md:w-auto px-2">
 <div className="h-6 w-px bg-slate-200 hidden md:block" />
 
 <div className="relative">
 <select 
 value={showSavedOnly ? 'Saved' : 'Show All'}
 onChange={(e) => setShowSavedOnly(e.target.value === 'Saved')}
 className="pl-4 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-full appearance-none font-bold text-[10px] uppercase tracking-widest text-slate-600 cursor-pointer outline-none hover:bg-slate-100 transition-all"
 >
 <option value="Show All">Show All</option>
 <option value="Saved">Saved Only</option>
 </select>
 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
 </div>

 <div className="relative">
 <select 
 value={filterBundle}
 onChange={(e) => setFilterBundle(e.target.value)}
 className="pl-4 pr-8 py-2 bg-slate-50 border border-slate-100 rounded-full appearance-none font-bold text-[10px] uppercase tracking-widest text-slate-600 cursor-pointer outline-none hover:bg-slate-100 transition-all max-w-[120px] truncate"
 >
 <option value="All Tracks">All Tracks</option>
 {supportBundles.map(b => <option key={b} value={b}>{b}</option>)}
 </select>
 <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
 </div>

 <button 
 onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
 className="px-6 py-2.5 bg-[#0B0E14] text-white rounded-full hover:bg-[#1a1f2e] transition-all font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 ml-2 shadow-md"
 >
 {sortOrder === 'desc' ? 'Newest' : 'Oldest'}
 </button>
 </div>
 </div>

 {/* Strategy List */}
 <div className="space-y-6">
 {filteredHistory.length > 0 ? (
 filteredHistory.map((item) => (
 <div 
 key={item.id} 
 className="bg-white rounded-[2rem] p-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 transition-transform flex flex-col relative overflow-hidden"
 >
 <div className="absolute top-10 right-10 opacity-[0.03] pointer-events-none">
 <Shield className="w-32 h-32" />
 </div>

 <div className="flex justify-between items-center mb-6 relative z-10">
 <div className="flex items-center gap-3">
 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
 <Shield className="w-3 h-3 text-[#6366F1]" />
 <span className="text-[8px] font-bold text-[#6366F1] uppercase tracking-widest">{item.bundle}</span>
 </div>
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
 <Calendar className="w-3 h-3" />
 {new Date(item.timestamp).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
 </span>
 </div>
 <button 
 onClick={() => onToggleSave(item.id)}
 className={`p-2 rounded-full transition-all ${item.isSaved ? 'bg-[#6366F1] text-white shadow-md' : 'text-slate-300 hover:text-[#6366F1]'}`}
 >
 <Bookmark className={`w-4 h-4 ${item.isSaved ? 'fill-white' : ''}`} />
 </button>
 </div>
 
 <h3 className="text-2xl font-extrabold text-slate-900 mb-8 tracking-tight relative z-10 w-4/5">
 {item.issue}
 </h3>
 
 <div className="bg-[#F8FAFC] p-6 rounded-2xl mb-8 border border-slate-100 text-slate-600 font-medium leading-relaxed relative shadow-inner">
 <Quote className="absolute top-4 left-4 w-6 h-6 opacity-5 text-slate-900" />
 <p className="italic text-sm">"{item.scripts[0]?.text}"</p>
 <div className="flex gap-1 mt-4">
 <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/20"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/20"></div>
 <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1]/20"></div>
 </div>
 <p className="text-[8px] font-bold text-[#6366F1] uppercase tracking-widest mt-2">Professional Script</p>
 </div>

 <div className="flex items-center justify-between relative z-10">
 <div className="flex gap-2">
 <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1] transition-all cursor-pointer"><Twitter className="w-3.5 h-3.5" /></div>
 <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1] transition-all cursor-pointer"><Linkedin className="w-3.5 h-3.5" /></div>
 <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-[#6366F1] hover:border-[#6366F1] transition-all cursor-pointer"><Mail className="w-3.5 h-3.5" /></div>
 </div>
 <button 
 onClick={() => onReviewPlan(item)}
 className="px-6 py-3 bg-[#6366F1] text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-md"
 >
 Review Strategy <ChevronRight className="w-3 h-3" />
 </button>
 </div>
 </div>
 ))
 ) : (
 <div className="py-24 text-center bg-white rounded-[3rem] border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col items-center px-10">
 <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 border border-slate-100">
 <ListFilter className="w-8 h-8 text-slate-400" />
 </div>
 <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">No strategies found</h3>
 <p className="text-slate-500 text-sm font-medium max-w-sm mx-auto mb-8">Try adjusting your search or filters to find what you're looking for.</p>
 <button 
 onClick={() => {setFilterBundle('All Tracks'); setSearchTerm(''); setShowSavedOnly(false);}}
 className="px-8 py-3 bg-[#0B0E14] text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#1a1f2e] transition-all shadow-md"
 >
 Clear Filters
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
};

export default HistoryPage;
