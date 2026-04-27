
'use client';

import React from 'react';
// Added CheckCircle to the imports from lucide-react
import { FileText, Gavel, AlertCircle, Ban, CreditCard, Scale, CheckCircle } from 'lucide-react';

const TermsOfService: React.FC = () => {
 return (
 <div className="max-w-6xl mx-auto px-8 py-24 space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
 <div className="space-y-8">
 <div className="w-20 h-20 bg-[#1a1f36] text-white rounded-full flex items-center justify-center shadow-2xl shadow-md rotate-3">
 <FileText className="w-10 h-10 text-indigo-600" />
 </div>
 <h1 className="text-6xl font-medium text-slate-900 tracking-tighter">Governance Protocols</h1>
 <p className="text-slate-500 text-2xl font-medium max-w-2xl leading-relaxed">
 Please review these protocols with the same precision you apply to your practice. By accessing the Nurse Sanctuary command center, you mandate adherence to these professional boundaries.
 </p>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
 <div className="lg:col-span-8 space-y-16 text-slate-600">
 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <Gavel className="w-8 h-8 text-indigo-600" /> 1. Professional Agency Disclaimer
 </h2>
 <div className="p-10 bg-rose-50/30 rounded-[2rem] border border-rose-100 flex items-start gap-6 shadow-md">
 <AlertCircle className="w-8 h-8 text-rose-600 shrink-0 mt-1" />
 <p className="text-rose-950 text-xl font-medium leading-relaxed">
 Nurse Sanctuary provides behavioral strategy and resilient agency templates. We are NOT a legal service, a labor union, or a professional regulatory body. Our strategies are expert recommendations for professional self-preservation only.
 </p>
 </div>
 <p className="leading-relaxed text-xl font-medium">
 Users maintain absolute responsibility for their professional conduct and for ensuring that the implementation of strategic protocols complies with institutional policies and local jurisdictional mandates.
 </p>
 </section>

 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <CreditCard className="w-8 h-8 text-indigo-600" /> 2. Access and Allotments
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 Professional subscriptions are billed on a recurring cycle. Access tiers are optimized for individual practitioners, with a standard ceiling of <span className="font-bold text-indigo-600">250 strategy generations per cycle</span> to maintain system integrity and elite performance for the entire Sanctuary community.
 </p>
 </section>

 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <Ban className="w-8 h-8 text-indigo-600" /> 3. Prohibited Engagement
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 You may not utilize Nurse Sanctuary command nodes to generate protocols that target:
 </p>
 <ul className="space-y-4 list-disc pl-10 text-lg font-medium">
 <li>Compromise of professional safety or unsafe practice environments</li>
 <li>Illegal institutional disruption or sabotage</li>
 <li>Uncalibrated harassment or defamatory communications</li>
 <li>Commercial extraction or redistribution of Sanctuary intelligence</li>
 </ul>
 </section>

 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <Scale className="w-8 h-8 text-indigo-600" /> 4. Limitation of Liability
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 Nurse Sanctuary and its governing entities shall not be held liable for any institutional outcomes, career status changes, or disciplinary findings resulting from the use of our agency strategies. Practitioners engage with the platform at their own absolute discretion.
 </p>
 </section>
 </div>

 <div className="lg:col-span-4">
 <div className="sticky top-28 space-y-10">
 <div className="bg-[#1a1f36] text-white p-10 rounded-[2rem] shadow-2xl space-y-8 shadow-md border border-slate-200">
 <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-indigo-600">Core Governance</h3>
 <div className="space-y-6 text-sm font-medium text-slate-600">
 <p className="border-b border-white/5 pb-4">By engaging, you confirm:</p>
 <div className="flex items-start gap-4">
 <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
 <span className="leading-relaxed">You are a credentialed professional practitioner.</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
 <span className="leading-relaxed">You will not use AI for direct clinical care mandates.</span>
 </div>
 <div className="flex items-start gap-3">
 <CheckCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
 <span className="leading-relaxed">You accept absolute agency for your institutional interactions.</span>
 </div>
 </div>
 </div>
 
 <div className="p-10 border border-slate-200 rounded-[2rem] text-center space-y-6 bg-slate-50/50">
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Governance Inquiries</p>
 <a href="mailto:legal@sanctuary.io" className="text-indigo-600 font-bold text-lg hover:underline block">legal@sanctuary.io</a>
 </div>
 </div>
 </div>
 </div>
 </div>
 );
};

export default TermsOfService;
