
'use client';

import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Loader2, Lock, CheckCircle2, Briefcase, CheckCircle, Fingerprint, ChevronRight, Sparkles, Zap, AlertTriangle, Star } from 'lucide-react';
import { useConstants } from './ConstantsProvider';
import { VoicesFromTheUnit } from './VoicesFromTheUnit';
import Pricing from './Pricing';

interface AuthProps {
 onAuthSuccess: (user: any) => void;
 setCurrentPage: (page: any) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess, setCurrentPage }) => {
 const { nurseCareers } = useConstants();
 const [view, setView] = useState<'login' | 'signup' | 'otp'>('signup');
 const [isLoading, setIsLoading] = useState(false);
 const [formData, setFormData] = useState({
 firstName: '',
 lastName: '',
 email: '',
 career: 'Staff Nurse (Med-Surg)',
 customCareer: ''
 });
 const [otpValue, setOtpValue] = useState('');
 const [agreedToTerms, setAgreedToTerms] = useState(false);
 const [error, setError] = useState('');

 const handleFormSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 if (!formData.email) return;
 setError('');
 setIsLoading(true);
 
 try {
 const response = await fetch('/api/auth', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 ...formData,
 agreedToTerms,
 type: 'send-otp',
 authView: view
 })
 });

 const data = await response.json();
 
 if (response.ok) {
 setView('otp');
 } else {
 setError(data.error ||"Failed to send verification code");
 }
 } catch (err: any) {
 console.error("OTP send error:", err);
 setError("An error occurred while sending the code");
 } finally {
 setIsLoading(false);
 }
 };

 const verifyOtp = async () => {
 if (otpValue.length !== 6) return;
 setError('');
 setIsLoading(true);
 
 try {
 const response = await fetch('/api/auth', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 ...formData,
 token: otpValue,
 type: 'verify-otp',
 authView: view
 })
 });

 const data = await response.json();
 
 if (response.ok && data.user) {
 onAuthSuccess(data.user);
 } else {
 setError(data.error ||"Verification failed. Please check the code.");
 }
 } catch (err: any) {
 console.error("Auth error:", err);
 setError(`An error occurred during verification: ${err.message || String(err)}`);
 } finally {
 setIsLoading(false);
 }
 };

 const renderCardContent = () => {
 if (view === 'otp') {
 return (
 <div className="space-y-10 animate-in fade-in zoom-in-95 duration-500">
 <div className="text-center space-y-3">
 <div className="w-16 h-16 glass-card text-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-6 shrink-0">
 <Lock className="w-8 h-8" />
 </div>
 <h3 className="text-3xl font-medium tracking-tight text-slate-800">Identity Verification</h3>
 <p className="text-slate-500 font-medium text-sm">Framework access code sent to <br/><span className="text-slate-900 font-medium">{formData.email}</span></p>
 </div>

 <div className="space-y-4">
 <div className="flex justify-between items-center px-1">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.2em] block">Security Token</label>
 <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1.5">
 <div className="w-1.5 h-1.5 rounded-full bg-indigo-50 animate-pulse" />
 Secured
 </span>
 </div>
 <input
 type="text"
 inputMode="numeric"
 maxLength={6}
 value={otpValue}
 onChange={(e) => setOtpValue(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
 className="w-full h-20 text-center text-4xl font-medium bg-white border-b border-slate-200 shadow-sm border-none rounded-full focus:ring-1 focus:ring-slate-950 outline-none transition-all tracking-[0.4em]"
 placeholder="000000"
 />
 </div>

 <button
 onClick={verifyOtp}
 disabled={isLoading || otpValue.length !== 6}
 className="w-full py-6 bg-[#1a1f36] text-white shadow-md rounded-full font-medium text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
 >
 {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>Authenticate Entry</>}
 </button>
 
 <button onClick={() => setView('signup')} className="w-full text-center text-xs font-bold uppercase tracking-widest text-slate-600 hover:text-slate-600 transition-colors">
 Return to registration
 </button>
 </div>
 );
 }

 return (
 <div className="animate-in fade-in duration-500">
 <div className="flex flex-col items-center gap-6 mb-12 text-center">
 <div className="w-20 h-20 bg-[#1a1f36] text-white shadow-md rounded-full flex items-center justify-center">
 <Fingerprint className="w-10 h-10" />
 </div>
 <div className="space-y-1">
 <h3 className="text-3xl font-medium tracking-tight text-slate-800">Sanctuary Access</h3>
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Professional Identity Required</p>
 </div>
 </div>

 <div className="flex gap-2 p-1.5 bg-slate-100 rounded-full mb-10 border border-slate-200/50">
 <button onClick={() => setView('signup')} className={`flex-1 py-3 px-6 rounded-full font-medium text-sm transition-all duration-300 ${view === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600'}`}>Signup</button>
 <button onClick={() => setView('login')} className={`flex-1 py-3 px-6 rounded-full font-medium text-sm transition-all duration-300 ${view === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-600'}`}>Login</button>
 </div>

 <form onSubmit={handleFormSubmit} className="space-y-6">
 {error && (
 <div className="p-4 bg-rose-50 border border-rose-100 rounded-full text-rose-600 text-xs font-medium flex items-center gap-3 animate-in slide-in-from-top-2">
 <AlertTriangle className="w-4 h-4 flex-shrink-0" />
 {error}
 </div>
 )}
 {view === 'signup' && (
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.2em] ml-2">Given Name</label>
 <input required type="text" name="given-name" autoComplete="given-name" value={formData.firstName} className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-full focus:ring-1 focus:ring-slate-950 outline-none font-medium text-sm" onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
 </div>
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.2em] ml-2">Family Name</label>
 <input required type="text" name="family-name" autoComplete="family-name" value={formData.lastName} className="w-full px-6 py-4 glass-card border-none rounded-3xl focus:ring-1 focus:ring-slate-950 outline-none font-medium text-sm" onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
 </div>
 </div>
 )}
 
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.2em] ml-2">Professional Email</label>
 <input required type="email" name="email" autoComplete="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="practitioner@medical.com" className="w-full px-6 py-4 glass-card border-none rounded-3xl focus:ring-1 focus:ring-slate-950 font-medium text-sm outline-none" />
 </div>

 {view === 'signup' && (
 <>
 <div className="space-y-1.5">
 <label className="text-[10px] font-bold uppercase text-slate-600 tracking-[0.2em] ml-2">Specialized Area</label>
 <div className="relative">
 <select required className="w-full px-6 py-4 glass-card border-none rounded-3xl focus:ring-1 focus:ring-slate-950 outline-none font-medium text-sm appearance-none cursor-pointer" onChange={(e) => setFormData({...formData, career: e.target.value})} value={formData.career}>
 {nurseCareers.map(career => <option key={career} value={career}>{career}</option>)}
 </select>
 <ChevronRight className="w-4 h-4 text-slate-600 absolute right-6 top-1/2 -translate-y-1/2 rotate-90" />
 </div>
 </div>

 <div className="flex items-start gap-4 px-2 pt-2">
 <div className="relative flex items-center">
 <input required type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="peer h-5 w-5 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white checked:bg-indigo-50 checked:border-indigo-500 transition-all focus:outline-none" />
 <CheckCircle className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 text-white opacity-0 peer-checked:opacity-100" />
 </div>
 <label htmlFor="terms" className="text-[10px] font-medium text-slate-500 leading-tight cursor-pointer select-none">
 I accept the <button onClick={() => setCurrentPage('terms')} type="button" className="text-slate-900 hover:underline">Professional Terms</button> and <button onClick={() => setCurrentPage('privacy')} type="button" className="text-slate-900 hover:underline">Privacy Policy</button>.
 </label>
 </div>
 </>
 )}

 <button type="submit" disabled={isLoading || !formData.email || (view === 'signup' && !agreedToTerms)} className="w-full py-6 bg-[#1a1f36] text-white shadow-md rounded-full font-medium text-lg transition-all flex items-center justify-center gap-3 disabled:opacity-50 mt-4">
 {isLoading ? <Loader2 className="w-7 h-7 animate-spin" /> : <>{view === 'signup' ? 'Secure Access' : 'Authenticate Entry'} <ArrowRight className="w-5 h-5" /></>}
 </button>
 </form>
 </div>
 );
 };

 return (
 <div className="bg-[#0B0E14] min-h-screen">
 <section className="relative py-24 md:py-40">
 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
 <div className="max-w-7xl mx-auto px-8 relative z-10">
 <div className="grid grid-cols-12 gap-20 items-center">
 <div className="col-span-12 lg:col-span-7 space-y-12">
 <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#131620] text-[#6366F1] font-bold text-[10px] uppercase tracking-[0.25em] rounded-full border border-slate-800">
 <Sparkles className="w-4 h-4" /> Identity Protocol Enabled
 </div>
 <div className="space-y-8">
 <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[0.9] tracking-tight">
 Protect Your <br/>
 <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]">Peace of Mind.</span>
 </h1>
 <p className="text-lg md:text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
 Step into the professional sanctuary designed for high-stakes healthcare experts. Reclaim your agency through strategic, assertive communication frameworks.
 </p>
 </div>
 
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {[
"Visitor Friction Defense",
"Lateral Violence Neutralizers",
"Shift Dumping Guard",
"Professional Agency Hacks"
 ].map((text, i) => (
 <div key={i} className="p-8 bento-card bg-white flex items-center gap-6 group hover:-translate-y-1">
 <div className="w-12 h-12 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 group-hover:text-white transition-all duration-500">
 <CheckCircle2 className="w-6 h-6" />
 </div>
 <p className="text-sm font-medium text-slate-800 leading-tight">{text}</p>
 </div>
 ))}
 </div>
 </div>

 <div className="col-span-12 lg:col-span-5">
 <div className="glass-card p-12 md:p-16 border-slate-200 relative overflow-hidden flex flex-col justify-center min-h-[700px]">
 <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
 <ShieldCheck className="w-96 h-96" />
 </div>
 {renderCardContent()}
 </div>
 </div>
 </div>
 </div>
 </section>

 {/* Metrics Row */}
 <section className="pb-32 relative z-10">
 <div className="max-w-7xl mx-auto px-8">
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
 {[
 { label:"Strategies Deployed", value:"150k+", icon: ShieldCheck, color:"text-[#6366F1]" },
 { label:"Stress Reduction", value:"98%", icon: Zap, color:"text-yellow-400" },
 { label:"Practitioner Trust", value:"4.9/5", icon: Star, color:"text-emerald-400" },
 { label:"Secured Access", value:"12k+", icon: Lock, color:"text-rose-400" }
 ].map((metric, i) => (
 <div key={i} className="bg-[#131620] border border-slate-800 rounded-3xl text-center py-12 px-8 flex flex-col items-center gap-4 hover:-translate-y-1 transition-transform">
 <div className={`${metric.color} mb-2`}>
 <metric.icon className="w-6 h-6" />
 </div>
 <div className="text-4xl md:text-5xl font-extrabold text-white">{metric.value}</div>
 <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">{metric.label}</div>
 </div>
 ))}
 </div>
 </div>
 </section>
 
 <div className="pb-24">
 <VoicesFromTheUnit />
 </div>
 </div>
 );
};

export default Auth;
