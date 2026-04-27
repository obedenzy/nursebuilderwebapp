'use client';

import React, { useState } from 'react';
import { useConstants } from './ConstantsProvider';
import { generateBoundaryPlan, regenerateScriptsOnly } from '../services/geminiService';
import { 
 Loader2, MessageSquareQuote, Brain, Shield, Copy, Check, ChevronLeft, RefreshCw, 
 Bookmark, Sparkles, Award, Zap, Heart, Target, Quote, CheckCircle, Printer
} from 'lucide-react';
import { BoundaryPlan, Page } from '../types';

interface BoundaryWizardProps {
 preloadedResult?: BoundaryPlan;
 onComplete: (plan: BoundaryPlan) => void;
 setCurrentPage: (page: Page) => void;
 hasCredits?: boolean;
 userEmail?: string;
}

const BoundaryWizard: React.FC<BoundaryWizardProps> = ({ preloadedResult, onComplete, setCurrentPage, hasCredits = true, userEmail = '' }) => {
 const { pleaserPhases } = useConstants();
 const [activeScriptIdx, setActiveScriptIdx] = useState(0);
 const [copied, setCopied] = useState(false);
 const [isRegenerating, setIsRegenerating] = useState(false);
 const [activePhase, setActivePhase] = useState(1);

 if (!preloadedResult) return null;

 const result = preloadedResult;
 const isPleaserTrack = result.bundle === 'Nurse No More Pleaser';

 const handleCopy = (text: string) => {
 navigator.clipboard.writeText(text);
 setCopied(true);
 setTimeout(() => setCopied(false), 2000);
 };

 const handleSaveToggle = () => {
 onComplete({ ...result, isSaved: !result.isSaved });
 };

 const handlePracticedToggle = () => {
 const updatedScripts = [...result.scripts];
 updatedScripts[activeScriptIdx] = {
 ...updatedScripts[activeScriptIdx],
 worked: !updatedScripts[activeScriptIdx].worked
 };
 onComplete({ ...result, scripts: updatedScripts });
 };

 const handleRefresh = async () => {
 if (!hasCredits) return;
 setIsRegenerating(true);
 try {
 const scripts = await regenerateScriptsOnly(result.bundle, result.issue, result.context || '', userEmail);
 onComplete({ ...result, scripts });
 } finally {
 setIsRegenerating(false);
 }
 };

 const currentPhases = pleaserPhases.length > 0 ? pleaserPhases : [];
 const currentPhaseData = currentPhases.find(p => p.level === activePhase) || currentPhases[0] || { title: 'Awareness Mapping', mindsetShift: 'Guilt is a signal of growth, not a failure of character.', experiment: '' };

 return (
 <div className="min-h-screen bg-[#F8FAFC] pb-32">
 <div className="max-w-4xl mx-auto px-6 py-20 space-y-12 animate-in fade-in duration-700">
 
 {/* Header Strategy Summary */}
 <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 relative overflow-hidden">
 <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
 <Shield className="w-48 h-48" />
 </div>
 <div className="space-y-4 relative z-10">
 <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full">
 <Shield className="w-3.5 h-3.5 text-[#6366F1]" />
 <span className="text-[9px] font-bold text-[#6366F1] uppercase tracking-widest">{result.bundle}</span>
 </div>
 <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">{result.issue}</h2>
 </div>
 <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
 <button onClick={() => window.print()} className="px-6 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm">
 <Printer className="w-3.5 h-3.5" /> Print
 </button>
 <button onClick={() => setCurrentPage('history')} className="px-6 py-2.5 bg-[#6366F1] text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 shadow-md">
 <ChevronLeft className="w-3.5 h-3.5" /> Back to Strategy
 </button>
 </div>
 </div>

 {/* Scripts Section */}
 <div className="bg-white rounded-[2.5rem] p-10 md:p-12 border border-slate-100 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.05)]">
 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-slate-100 pb-8">
 <div>
 <h3 className="text-2xl font-extrabold text-slate-900 flex items-center gap-3">
 <MessageSquareQuote className="w-6 h-6 text-[#6366F1]" /> Professional Scripts
 </h3>
 <p className="text-slate-500 font-medium text-sm mt-1">High impact verbal actions tailored to your reality.</p>
 </div>
 <button 
 onClick={handleRefresh} 
 disabled={isRegenerating || !hasCredits}
 className="px-5 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
 >
 {isRegenerating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />} Refresh Protocol
 </button>
 </div>

 <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-6">
 {['Tactical Peer', 'Institutional Lead', 'Advanced Escalation'].map((l, i) => (
 <button 
 key={l} 
 onClick={() => setActiveScriptIdx(i)}
 className={`px-6 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${
 activeScriptIdx === i 
 ? 'bg-indigo-50 text-[#6366F1] border border-[#6366F1] shadow-sm' 
 : 'bg-transparent text-slate-400 border border-transparent hover:text-slate-600'
 }`}
 >
 {l}
 </button>
 ))}
 </div>

 <div className="bg-[#F8FAFC] p-8 md:p-10 rounded-3xl relative border border-slate-100 mb-8 shadow-inner">
 <Quote className="absolute top-6 left-6 w-8 h-8 text-[#6366F1] opacity-20" />
 <p className="text-xl md:text-2xl font-medium text-slate-700 leading-relaxed italic pl-10 pr-12">
 "{result.scripts[activeScriptIdx]?.text || "Casual: 'I understand you are frustrated by the delay, but I need to focus on this medication verification to ensure patient safety right now.'"}"
 </p>
 <button 
 onClick={() => handleCopy(result.scripts[activeScriptIdx]?.text)} 
 className="absolute bottom-6 right-6 p-3 bg-white text-[#6366F1] border border-slate-200 rounded-2xl shadow-sm hover:scale-105 hover:border-[#6366F1] transition-all"
 >
 {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
 </button>
 </div>

 <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-slate-50 p-6 rounded-3xl border border-slate-100">
 <div className="flex-1 pr-6 border-r-0 md:border-r border-slate-200">
 <p className="text-[9px] font-bold text-[#6366F1] uppercase tracking-widest mb-1">Strategic Rationale</p>
 <p className="text-sm font-medium text-slate-600 leading-relaxed">
 {result.scripts[activeScriptIdx]?.why || "This script acknowledges the physician's emotion without accepting responsibility for it, maintaining focus on critical patient care."}
 </p>
 </div>
 <button 
 onClick={handlePracticedToggle}
 className={`px-8 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-md shrink-0 w-full md:w-auto ${result.scripts[activeScriptIdx]?.worked ? 'bg-[#1a1f36] text-white' : 'bg-[#6366F1] text-white hover:opacity-90'}`}
 >
 {result.scripts[activeScriptIdx]?.worked ? <CheckCircle className="w-4 h-4" /> : <Award className="w-4 h-4" />}
 {result.scripts[activeScriptIdx]?.worked ? 'Protocol Implemented' : 'Practice This'}
 </button>
 </div>
 </div>

 {/* Pushback Neutralization Bento */}
 <div className="bg-[#0B0E14] rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden border border-slate-800">
 <div className="absolute top-0 right-0 opacity-5 pointer-events-none translate-x-1/4 -translate-y-1/4">
 <Zap className="w-96 h-96" />
 </div>
 
 <div className="flex items-center gap-4 mb-12 relative z-10">
 <Zap className="w-8 h-8 text-[#6366F1]" />
 <h4 className="text-2xl font-extrabold text-white tracking-tight uppercase">Pushback Neutralization</h4>
 </div>

 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
 {result.objections.slice(0, 4).map((o, idx) => (
 <div key={idx} className="bg-[#131620] p-8 rounded-3xl border border-slate-800/80 shadow-inner flex flex-col justify-between">
 <div className="mb-6">
 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Target className="w-3 h-3" /> Anticipated Pushback</p>
 <p className="text-sm font-medium text-slate-300 italic">"{o.objection}"</p>
 </div>
 <div className="pt-6 border-t border-slate-800">
 <p className="text-[8px] font-bold text-[#6366F1] uppercase tracking-widest mb-2 flex items-center gap-2"><Shield className="w-3 h-3" /> Sanctuary Rebuttal</p>
 <p className="text-base font-bold text-white leading-tight">"{o.rebuttal}"</p>
 <p className="text-[10px] text-slate-500 font-medium mt-3 leading-relaxed">{o.rebuttalExplanation}</p>
 </div>
 </div>
 ))}
 </div>
 </div>

 {/* Cognitive Insight Bento */}
 <div className="bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.1)] relative overflow-hidden">
 <div className="flex items-center gap-4 mb-10">
 <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-[#6366F1]">
 <Brain className="w-6 h-6" />
 </div>
 <h4 className="text-xl font-extrabold text-slate-900 tracking-tight uppercase">Cognitive Insight</h4>
 </div>
 <div className="space-y-10">
 <div className="flex gap-4">
 <Quote className="w-10 h-10 text-slate-200 shrink-0 rotate-180" />
 <p className="text-slate-700 text-2xl font-medium leading-relaxed italic">
 "{result.psychologicalInsight}"
 </p>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
 {(result.premiumInsights || ["Verify boundaries", "Maintain neutral tone", "Document interactions"]).map((ins, i) => (
 <div key={i} className="flex items-start gap-3 bg-slate-50 p-5 rounded-2xl border border-slate-100">
 <CheckCircle className="w-4 h-4 text-[#6366F1] shrink-0 mt-0.5" />
 <span className="text-xs font-medium text-slate-600 leading-relaxed">{ins}</span>
 </div>
 ))}
 </div>
 </div>
 </div>

 {/* Professional Longevity Impact */}
 <div className="bg-[#FFF1F2] p-10 md:p-14 rounded-[3rem] border border-rose-100 shadow-sm relative overflow-hidden flex flex-col items-center text-center">
 <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-rose-50">
 <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
 </div>
 <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400 mb-4">Professional Longevity Impact</p>
 <p className="text-rose-950 font-extrabold text-xl md:text-3xl leading-tight max-w-2xl">
 "{result.longTermImpact}"
 </p>
 </div>

 {/* Phase 1: Awareness Mapping (Pleaser Specific) */}
 {isPleaserTrack && (
 <div className="bg-[#0B0E14] p-10 md:p-12 rounded-[3rem] text-white shadow-2xl relative border border-slate-800">
 <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
 <div>
 <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Active Integration</p>
 <h4 className="text-2xl font-extrabold flex items-center gap-3">
 Phase {activePhase}: {currentPhaseData.title}
 </h4>
 </div>
 <button onClick={handleNextPhase} className="px-5 py-2 bg-[#6366F1] text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-indigo-500 transition-all shadow-md">
 Next Phase
 </button>
 </div>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 <div className="bg-[#131620] p-8 rounded-3xl border border-slate-800/80">
 <div className="flex items-center justify-between mb-6">
 <p className="text-[10px] font-bold text-[#6366F1] uppercase tracking-widest flex items-center gap-2"><Brain className="w-3.5 h-3.5" /> Mindset Shift</p>
 </div>
 <p className="text-lg font-medium text-slate-200 italic leading-relaxed">"{currentPhaseData.mindsetShift}"</p>
 <div className="mt-8 pt-6 border-t border-slate-800">
 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Behavioral Experiment</p>
 <p className="text-sm font-medium text-slate-400 leading-relaxed">{currentPhaseData.experiment}</p>
 </div>
 </div>
 <div className="bg-[#131620] p-8 rounded-3xl border border-slate-800/80 flex flex-col justify-between">
 <div className="flex items-center justify-between mb-6">
 <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2"><TrendingUp className="w-3.5 h-3.5" /> Momentum Sync</p>
 </div>
 <div className="space-y-6 flex-1 flex flex-col justify-center">
 <div className="space-y-2">
 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
 <span>Internal Friction</span>
 <span className="text-rose-400">High</span>
 </div>
 <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
 <div className="h-full bg-gradient-to-r from-rose-500 to-rose-400 w-3/4"></div>
 </div>
 </div>
 <div className="space-y-2">
 <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
 <span>Assertive Capacity</span>
 <span className="text-emerald-400">Building</span>
 </div>
 <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
 <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-1/3"></div>
 </div>
 </div>
 </div>
 <div className="mt-8 bg-[#6366F1]/10 border border-[#6366F1]/20 p-4 rounded-xl flex items-start gap-3">
 <Target className="w-4 h-4 text-[#6366F1] shrink-0 mt-0.5" />
 <p className="text-xs font-medium text-slate-300 leading-relaxed">Focus on awareness this week. You don't need to change behavior yet, just notice the friction.</p>
 </div>
 </div>
 </div>
 </div>
 )}

 {/* FINAL TRANSFORMATION PILL */}
 <div className="bg-white p-4 pr-4 pl-8 rounded-[4rem] text-slate-900 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] border border-slate-100">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#6366F1]">
 <Target className="w-6 h-6" />
 </div>
 <div>
 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Projected Resilience Outcome</p>
 <p className="text-base font-extrabold tracking-tight">Career Integrity Score <span className="text-[#6366F1]">+12.5% Gain</span></p>
 </div>
 </div>
 <button 
 onClick={() => { handleSaveToggle(); window.scrollTo({top: 0, behavior: 'smooth'}); }} 
 className="px-8 py-4 bg-[#0B0E14] text-white rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#1a1f2e] transition-all shadow-md w-full md:w-auto"
 >
 Finalize This Phase
 </button>
 </div>
 </div>
 </div>
 );
};

export default BoundaryWizard;
