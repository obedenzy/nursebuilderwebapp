
'use client';

import React from 'react';
import { Shield, Lock, EyeOff, Database, Server, RefreshCw } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
 return (
 <div className="max-w-6xl mx-auto px-8 py-24 space-y-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
 <div className="space-y-8">
 <div className="w-20 h-20 bg-[#1a1f36] text-white rounded-full flex items-center justify-center shadow-2xl shadow-md rotate-3">
 <Shield className="w-10 h-10 text-indigo-600" />
 </div>
 <h1 className="text-6xl font-medium text-slate-900 tracking-tighter">Privacy Registry</h1>
 <p className="text-slate-500 text-2xl font-medium max-w-2xl leading-relaxed">
 At Nurse Sanctuary, we understand the high-stakes nature of institutional dynamics. We prioritize your professional anonymity and strategic security above all else.
 </p>
 <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] bg-slate-50/50 w-fit px-6 py-3 rounded-full border border-slate-200">
 <RefreshCw className="w-4 h-4 text-indigo-600" /> Registry Updated: February 2025
 </div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
 <div className="lg:col-span-8 space-y-16 text-slate-600">
 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <Database className="w-8 h-8 text-indigo-600" /> 1. Strategic Intelligence Collection
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 We collect the absolute minimum intelligence required to calibrate your Sanctuary experience. This includes your professional credentials for validation, your specialty to refine script accuracy, and the specific institutional context you provide for strategy formulation.
 </p>
 <ul className="space-y-4 list-disc pl-10 text-lg font-medium">
 <li>Practitioner Profile (Credentials, Specialty, Experience)</li>
 <li>Authentication Keys (Secure Magic Link identifiers)</li>
 <li>Strategy Context (Institutional scenarios provided for calibration)</li>
 </ul>
 </section>

 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <EyeOff className="w-8 h-8 text-indigo-600" /> 2. Absolute Data Isolation
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 Nurse Sanctuary never monetizes or redistributes your professional intelligence. Most crucially: <span className="text-indigo-600 font-bold underline decoration-indigo-100 underline-offset-4">we maintain a zero-sharing protocol with institutional employers, hospital management, or regulatory entities.</span> Your Sanctuary data remains yours alone.
 </p>
 </section>

 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <Server className="w-8 h-8 text-indigo-600" /> 3. Encryption and Sovereignty
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 Your formulated protocols are stored in an isolated, encrypted vault. We employ military-grade AES-256 encryption at rest and secure TLS tunnels for all incoming intelligence. You maintain absolute sovereignty over your data, with the ability to purge all records instantly via your Profile Sanctuary.
 </p>
 </section>

 <section className="space-y-6">
 <h2 className="text-3xl font-medium text-slate-900 flex items-center gap-4">
 <Lock className="w-8 h-8 text-indigo-600" /> 4. Generation Integrity
 </h2>
 <p className="leading-relaxed text-xl font-medium">
 Intelligence processed through our strategy engine is handled via isolated enterprise endpoints. Your professional scenarios are never used to train global models. Your institutional friction points remain private, secured within the Sanctuary's vault architecture.
 </p>
 </section>
 </div>

 <div className="lg:col-span-4 space-y-10">
 <div className="bg-indigo-50 p-10 rounded-[2rem] border border-indigo-100 space-y-8 shadow-md">
 <h3 className="text-xs font-bold text-indigo-800 uppercase tracking-[0.4em]">The Sanctuary Pledge</h3>
 <div className="space-y-6">
 {[
"Zero Institutional Access",
"Protocol Anonymization",
"Absolute Data Sovereignty",
"Encrypted Strategy Vault"
 ].map((p, i) => (
 <div key={i} className="flex items-center gap-4 text-indigo-800 font-medium text-lg">
 <div className="w-3 h-3 bg-indigo-50 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
 {p}
 </div>
 ))}
 </div>
 </div>
 
 <div className="bg-white p-10 rounded-[2rem] border border-slate-200 shadow-md space-y-6">
 <h3 className="text-xl font-medium text-slate-900">Privacy Governance</h3>
 <p className="text-slate-500 text-sm font-medium leading-relaxed">For inquiries regarding data protection or institutional security standards:</p>
 <a href="mailto:privacy@sanctuary.io" className="text-indigo-600 font-bold text-lg hover:underline block leading-none">privacy@sanctuary.io</a>
 </div>
 </div>
 </div>
 </div>
 );
};

export default PrivacyPolicy;
