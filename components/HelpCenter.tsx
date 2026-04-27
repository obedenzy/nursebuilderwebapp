
'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, MessageCircle, ShieldCheck, Zap, Mail, Phone, ExternalLink } from 'lucide-react';

const FAQS = [
 {
 category:"Getting Started",
 questions: [
 { q:"How does the Strategy Protocol work?", a:"The framework leverages behavioral strategy models and advanced processing to generate specific agency protocols. By selecting your institutional challenge and providing context, we formulate Tactical, Lead, and Advanced Escalation responses." },
 { q:"Is my longitudinal data visible to institutions?", a:"Absolutely not. The Professional Sanctuary is an independent platform for high-level practitioners. We maintain strict isolation from institutional systems, secured by advanced identity protocols." },
 { q:"What are 'Protocol Formulations'?", a:"A formulation represents one complete Strategy Framework. This includes refined verbal scripts, professional psychological insights, and objection neutralization. Professional tracks include up to 250 of these strategic assets." }
 ]
 },
 {
 category:"Engagement & Access",
 questions: [
 { q:"Is this a recurring subscription?", a:"No. Our platform utilizes a definitive one-time engagement model. Once you acquire a resilience track, you maintain absolute access to those strategic assets without recurring fees." },
 { q:"What is the Lifetime Sanctuary?", a:"The Lifetime Sanctuary is a premier one-time acquisition providing permanent, unlimited access to all strategic domains and future framework enhancements." },
 { q:"Do you offer enterprise-level arrangements?", a:"We prioritize individual practitioner empowerment. For large-scale institutional liaison arrangements, please engage with our executive support team." }
 ]
 },
 {
 category:"Professional Governance",
 questions: [
 { q:"Are these frameworks aligned with institutional standards?", a:"Our protocols are designed for sophisticated, assertive professional conduct. We provide frameworks that enhance your agency while maintaining elite professional standards." },
 { q:"What if an interaction escalates beyond the protocol?", a:"Every framework includes 'Objection Neutralization' which provides specific verbal pivots for maintaining composure while upholding your professional boundary." },
 { q:"How do I monitor my professional evolution?", a:"Your Sanctuary Profile visualizes your 'Agency Index' and 'Professional Streak' based on the strategic frameworks you implement and archive." }
 ]
 }
];

const HelpCenter: React.FC = () => {
 const [searchTerm, setSearchTerm] = useState("");
 const [openIndex, setOpenIndex] = useState<string | null>("0-0");

 const toggleFaq = (idx: string) => {
 setOpenIndex(openIndex === idx ? null : idx);
 };

 return (
 <div className="bg-slate-50">
 <div className="max-w-5xl mx-auto px-8 py-24 space-y-24 animate-in fade-in duration-700">
 <div className="text-center space-y-8">
 <h1 className="text-6xl md:text-8xl font-medium text-slate-900 tracking-tight leading-none">Help Center.</h1>
 <p className="text-slate-500 text-xl md:text-2xl font-medium max-w-2xl mx-auto">Strategic resources and guidance for cultivating your professional sanctuary.</p>
 
 <div className="relative max-w-2xl mx-auto mt-16 group">
 <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-700 w-7 h-7 group-focus-within:text-indigo-600 transition-colors" />
 <input 
 type="text" 
 placeholder="Search for strategic assets..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-20 pr-10 py-7 glass-card rounded-3xl shadow-md focus:border-indigo-500/50 outline-none font-medium text-xl transition-all"
 />
 </div>
 </div>

 <div className="space-y-20">
 {FAQS.map((cat, catIdx) => (
 <div key={catIdx} className="space-y-10">
 <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-indigo-600 ml-8 border-l-2 border-indigo-100 pl-4">{cat.category}</h2>
 <div className="space-y-6">
 {cat.questions.map((faq, faqIdx) => {
 const id = `${catIdx}-${faqIdx}`;
 const isOpen = openIndex === id;
 if (searchTerm && !faq.q.toLowerCase().includes(searchTerm.toLowerCase()) && !faq.a.toLowerCase().includes(searchTerm.toLowerCase())) return null;
 
 return (
 <div key={faqIdx} className="bg-white rounded-full border border-slate-50 overflow-hidden transition-all duration-500 hover:shadow-md hover:-translate-y-1">
 <button 
 onClick={() => toggleFaq(id)}
 className="w-full px-10 py-8 flex items-center justify-between text-left group"
 >
 <span className="text-2xl font-medium text-slate-700">{faq.q}</span>
 <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-indigo-50 text-white rotate-180 shadow-md' : 'group-hover:bg-slate-100'}`}>
 <ChevronDown className="w-5 h-5" />
 </div>
 </button>
 {isOpen && (
 <div className="px-10 pb-10 animate-in slide-in-from-top-4 duration-500">
 <p className="text-slate-500 text-lg leading-relaxed font-medium pt-6 border-t border-slate-50">
 {faq.a}
 </p>
 </div>
 )}
 </div>
 );
 })}
 </div>
 </div>
 ))}
 </div>

 <div className="bg-white rounded-[4rem] p-12 md:p-24 text-white text-center space-y-10 relative overflow-hidden shadow-md border border-white/5">
 <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none rotate-12 scale-150">
 <MessageCircle className="w-64 h-64 text-indigo-600" />
 </div>
 <div className="space-y-6 relative z-10">
 <h2 className="text-4xl md:text-6xl font-medium tracking-tight">Unresolved Inquiry?</h2>
 <p className="text-slate-600 text-xl font-medium max-w-2xl mx-auto">Our professional liaison team is available for technical and strategic assistances across all domains.</p>
 </div>
 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 pt-6">
 <a href="mailto:liaison@nursebuilder.io" className="flex items-center gap-4 px-12 py-5 bg-white text-slate-900 rounded-full font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-slate-100 transition-all shadow-md active:scale-[0.98]">
 <Mail className="w-5 h-5 text-indigo-600" /> Dispatch Email
 </a>
 <button className="flex items-center gap-4 px-12 py-5 bg-[#1a1f36] text-white rounded-full font-bold text-[10px] uppercase tracking-[0.3em] border border-white/10 hover:bg-slate-800 transition-all">
 <ExternalLink className="w-5 h-5 text-indigo-600" /> Strategic Developer Portal
 </button>
 </div>
 </div>
 </div>
 </div>
 );
};

export default HelpCenter;
