'use client';

import React, { useState, useEffect } from 'react';
import { BundleType } from '../types';
import { useConstants } from '../components/ConstantsProvider';
import { 
 Shield, Heart, ShieldAlert, CheckCircle, ChevronRight, 
 Loader2, Award, Sparkles, Stethoscope, RefreshCw,
 Zap, Clock, Target, TrendingUp, History, Brain, Lock
} from 'lucide-react';
import { UserStats } from '../types';

interface GeneratePageProps {
 onGenerate: (bundle: BundleType, issue: string, context: string) => Promise<void>;
 isLoggedIn: boolean;
 onJoin: () => void;
 creditsUsed: number;
 stats: UserStats | null;
}

const GeneratePage: React.FC<GeneratePageProps> = ({ onGenerate, isLoggedIn, onJoin, creditsUsed, stats }) => {
 const { supportBundles, bundleIssues, isLoading } = useConstants();
 const [bundle, setBundle] = useState<BundleType>('Nurse No More Pleaser');
 const [issue, setIssue] = useState('');
 const [context, setContext] = useState('');
 const [isLoadingInternal, setIsLoading] = useState(false);

 useEffect(() => { setIssue(''); }, [bundle]);

 const handleSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!issue || isLoadingInternal) return;
 setIsLoading(true);
 await onGenerate(bundle, issue, context);
 setIsLoading(false);
 };

 if (isLoading) {
 return (
 <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]">
 <Loader2 className="w-12 h-12 text-[#6366F1] animate-spin" />
 </div>
 );
 }

 const issues = bundleIssues[bundle] || [];

 return (
 <div className="bg-[#F8FAFC] min-h-screen font-sans pb-32">
 <div className="max-w-4xl mx-auto px-6 py-20 animate-in fade-in duration-700 space-y-10">
 
 {/* Main Action Card (Form) */}
 <div className="bg-white rounded-[3rem] p-12 md:p-16 border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
 <Stethoscope className="w-64 h-64" />
 </div>

 <div className="flex flex-col items-center text-center mb-16 relative z-10">
 <div className="w-16 h-16 bg-indigo-50 text-[#6366F1] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
 <Sparkles className="w-8 h-8" />
 </div>
 <div className="flex items-center justify-center gap-4 mb-3">
 <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">New Unit Strategy</h1>
 <button 
 onClick={() => { setIssue(''); setContext(''); }}
 className="px-4 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
 >
 <RefreshCw className="w-3 h-3" /> Start New
 </button>
 </div>
 <div className="inline-flex px-4 py-1 bg-indigo-50 text-[#6366F1] text-[9px] font-bold uppercase tracking-[0.2em] rounded-full mb-4">Script Active</div>
 <p className="text-slate-500 font-medium text-lg">Build a custom clinical script for <span className="text-[#6366F1] italic font-bold">your</span> sanity.</p>
 </div>

 <form onSubmit={handleSubmit} className="space-y-12 relative z-10">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
 {/* Left Column: Track Selection */}
 <div className="space-y-6">
 <div className="flex items-center gap-3">
 <div className="w-6 h-6 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-[10px] font-bold">1</div>
 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Choose Individual Track</label>
 </div>
 
 <div className="space-y-3">
 {supportBundles.map(b => (
 <button 
 key={b} 
 type="button"
 onClick={() => setBundle(b)}
 className={`w-full px-6 py-5 rounded-2xl font-bold text-sm text-left transition-all flex items-center gap-4 border ${bundle === b ? 'border-[#6366F1] bg-indigo-50/50 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'}`}
 >
 <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bundle === b ? 'bg-[#6366F1] text-white shadow-md' : 'bg-white border border-slate-200 text-slate-400'}`}>
 {b.includes('Boundaries') ? <Shield className="w-5 h-5" /> : b.includes('Pleaser') ? <Heart className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
 </div>
 <div className="flex-1 overflow-hidden">
 <div className={`truncate ${bundle === b ? 'text-[#6366F1]' : 'text-slate-600'}`}>{b}</div>
 {bundle === b && <div className="text-[8px] uppercase tracking-widest text-indigo-400 mt-1">Active Track</div>}
 </div>
 {bundle === b && <CheckCircle className="w-5 h-5 text-[#6366F1] shrink-0" />}
 </button>
 ))}
 </div>
 </div>

 {/* Right Column: Challenge & Context */}
 <div className="space-y-12">
 <div className="space-y-6">
 <div className="flex items-center gap-3">
 <div className="w-6 h-6 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-[10px] font-bold">2</div>
 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Primary Challenge</label>
 </div>
 <div className="relative">
 <select 
 required
 value={issue} 
 onChange={(e) => setIssue(e.target.value)} 
 className="w-full p-5 rounded-2xl border border-slate-300 bg-white font-medium text-slate-900 outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition-all text-sm appearance-none shadow-sm"
 >
 <option value="">-- Choose Unit Issue --</option>
 {issues.map(i => <option key={i} value={i}>{i}</option>)}
 </select>
 <ChevronRight className="w-4 h-4 text-slate-400 absolute right-6 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
 </div>
 </div>

 <div className="space-y-6">
 <div className="flex items-center gap-3">
 <div className="w-6 h-6 rounded-full bg-[#6366F1] text-white flex items-center justify-center text-[10px] font-bold">3</div>
 <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Context (Optional)</label>
 </div>
 <textarea 
 value={context} 
 onChange={(e) => setContext(e.target.value)} 
 placeholder="What specifically is draining you today?" 
 className="w-full p-5 rounded-2xl border border-slate-300 bg-white h-32 resize-none font-medium text-slate-900 text-sm outline-none focus:border-[#6366F1] focus:ring-4 focus:ring-[#6366F1]/10 transition-all shadow-sm"
 />
 </div>
 </div>
 </div>

 <div className="pt-6">
 <button 
 onClick={handleSubmit}
 disabled={isLoadingInternal || !issue} 
 className="w-full py-6 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-2xl font-extrabold text-lg hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(99,102,241,0.3)] disabled:opacity-50 active:scale-[0.98]"
 >
 {isLoadingInternal ? <><Loader2 className="w-5 h-5 animate-spin" /> Formulating Protocol...</> : <><Lock className="w-5 h-5" /> Protect My Shift</>}
 </button>
 </div>
 </form>
 </div>

 {/* Bottom 3 Cards */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
 {/* Strategy Velocity Card */}
 <div className="bg-[#0B0E14] rounded-[2.5rem] p-10 text-white flex flex-col relative overflow-hidden shadow-xl border border-slate-800">
 <div className="absolute top-10 right-10 opacity-5 pointer-events-none">
 <Clock className="w-32 h-32" />
 </div>
 <div className="relative z-10 mb-8">
 <p className="text-[9px] font-bold text-indigo-400 uppercase tracking-[0.2em] mb-1">Shift Integrity</p>
 <h3 className="text-2xl font-extrabold tracking-tight">Strategy Velocity</h3>
 </div>
 <div className="relative z-10 flex items-baseline gap-3 mb-8">
 <span className="text-5xl font-extrabold text-[#6366F1]">{stats?.sessionsCompleted || 0}</span>
 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Managed</span>
 </div>
 <div className="relative z-10 mt-auto">
 <p className="text-xs font-medium leading-relaxed text-slate-400">
 Your historical provision of clinical-grade strategies has prevented approximately <span className="font-bold text-white">{((stats?.sessionsCompleted || 0) * 1.5).toFixed(1)}h</span> of individual burnout risk.
 </p>
 </div>
 </div>

 {/* Identity Robustness Card */}
 <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-10 flex flex-col justify-between">
 <div className="flex items-center gap-4 mb-10">
 <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
 <Zap className="w-5 h-5" />
 </div>
 <h3 className="font-extrabold text-slate-900 leading-tight">Identity<br/>Robustness</h3>
 </div>
 <div className="space-y-4">
 <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center border border-slate-100">
 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Resilience Score</span>
 <span className="text-xl font-extrabold text-emerald-500">{stats?.boundaryScore || 0}%</span>
 </div>
 <div className="bg-slate-50 rounded-2xl p-4 flex justify-between items-center border border-slate-100">
 <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Assertive Streak</span>
 <span className="text-xl font-extrabold text-[#6366F1]">{stats?.assertiveStreak || 0}d</span>
 </div>
 </div>
 </div>

 {/* System Insight Card */}
 <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-10 flex flex-col">
 <div className="flex items-center gap-4 mb-10">
 <div className="w-10 h-10 bg-indigo-50 text-[#6366F1] rounded-xl flex items-center justify-center">
 <Brain className="w-5 h-5" />
 </div>
 <h3 className="font-extrabold text-slate-900">System Insight</h3>
 </div>
 <div className="bg-indigo-50/50 border border-indigo-100/50 rounded-2xl p-6 flex-1 flex items-center justify-center text-center">
 <p className="text-sm font-bold text-[#6366F1] italic">
 "{stats?.clinicalInsight || "Most of your boundary work happens on Tues."}"
 </p>
 </div>
 </div>
 </div>

 </div>
 </div>
 );
};

export default GeneratePage;
