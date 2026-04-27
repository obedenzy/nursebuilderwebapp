'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from '@stripe/react-stripe-js';
import { Check, ShieldCheck, CreditCard, Lock, ArrowLeft, Loader2, Info, Sparkles, Award, Star, Activity, Heart, TrendingUp, Zap, Clock, Shield, ArrowRight, ChevronRight, Users, ShieldAlert, CheckCircle } from 'lucide-react';

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51S97F1EhQ5YxuMB84xzoC09p9r1WKCNqu02pUrMb7iVi1buyz3t1vZLuLnMwQAGM50NNjfGbGz6HhInYw8vBvnN500RI3VFYSH');

interface PricingProps {
 onPlanSelected?: (plan: any) => void;
 creditsUsed?: number;
 creditLimit?: number;
 onContinueFree?: () => void;
 isLoggedIn?: boolean;
 userEmail?: string;
 userTier?: string;
 onPaymentSuccess?: () => void;
 hideButtons?: boolean;
 dbPlansFromApp?: any[];
 isLoadingPlansFromApp?: boolean;
}

const Pricing: React.FC<PricingProps> = ({ 
 onPlanSelected, 
 creditsUsed = 0, 
 creditLimit = 1, 
 onContinueFree, 
 isLoggedIn = false, 
 userEmail, 
 userTier,
 onPaymentSuccess, 
 hideButtons = false,
 dbPlansFromApp,
 isLoadingPlansFromApp = false
}) => {
 const [selectedPlan, setSelectedPlan] = useState<any>(null);
 const [isProcessing, setIsProcessing] = useState(false);
 const [isSuccess, setIsSuccess] = useState(false);
 const [clientSecret, setClientSecret] = useState<string | null>(null);
 const [dbPlans, setDbPlans] = useState<any[]>(dbPlansFromApp || []);
 const [isLoadingPlans, setIsLoadingPlans] = useState(dbPlansFromApp ? isLoadingPlansFromApp : true);

 useEffect(() => {
 if (dbPlansFromApp) {
 setDbPlans(dbPlansFromApp);
 setIsLoadingPlans(isLoadingPlansFromApp);
 return;
 }
 const fetchPlans = async () => {
 try {
 const response = await fetch('/api/admin/pricing');
 if (response.ok) {
 const data = await response.json();
 if (data.tiers && data.tiers.length > 0) {
 const mapped = data.tiers.map((t: any) => ({
 id: t.id,
 name: t.name,
 price: t.price,
 strikeThroughPrice: t.strike_through_price,
 features: typeof t.features === 'string' ? JSON.parse(t.features) : (t.features || []),
 cta: t.cta || 'Select Track',
 highlight: !!t.is_popular,
 period: t.duration_months < 12 ? `${t.duration_months} Months` : '1 Year'
 }));
 setDbPlans(mapped);
 }
 }
 } catch (error) {
 console.error("Failed to fetch plans from DB:", error);
 } finally {
 setIsLoadingPlans(false);
 }
 };
 fetchPlans();
 }, [dbPlansFromApp, isLoadingPlansFromApp]);

 const handlePlanClick = (plan: any) => {
 if (hideButtons) return;
 
 if (isLoggedIn && userTier) {
 const normalizedTier = userTier.trim().toLowerCase();
 const normalizedPlanId = plan.id.trim().toLowerCase();

 if (normalizedTier === normalizedPlanId) {
 alert(`You already have an active ${plan.name} plan.`);
 return;
 }
 if (normalizedTier === '1_year' && normalizedPlanId === '3_months') {
 alert("You already have Full Access Active via your 1 Year plan.");
 return;
 }
 }

 if (!isLoggedIn && onPlanSelected) {
 onPlanSelected(plan);
 return;
 }
 setSelectedPlan(plan);
 };

 const handleCheckout = async () => {
 if (!isLoggedIn) {
 alert("Please log in to continue with the purchase.");
 return;
 }
 setIsProcessing(true);
 
 try {
 const response = await fetch('/api/payment/checkout', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ 
 email: userEmail || 'nurse@example.com', 
 planId: selectedPlan.id,
 planName: selectedPlan.name,
 price: selectedPlan.price,
 period: selectedPlan.period
 })
 });
 
 const data = await response.json();
 
 if (data.clientSecret) {
 setClientSecret(data.clientSecret);
 } else {
 throw new Error(data.error ||"Failed to create checkout session");
 }
 } catch (error: any) {
 console.error("Payment error:", error);
 alert(`An error occurred during payment processing: ${error.message}`);
 } finally {
 setIsProcessing(false);
 }
 };

 if (isSuccess) {
 return (
 <div className="max-w-3xl mx-auto py-24 md:py-40 px-6 text-center animate-in zoom-in duration-700 bg-white min-h-screen">
 <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_20px_50px_rgba(99,102,241,0.3)] relative">
 <ShieldCheck className="w-12 h-12 md:w-16 md:h-16" />
 </div>
 <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-900">Transformation Activated.</h1>
 <p className="text-slate-500 text-lg md:text-xl mb-12 leading-relaxed max-w-xl mx-auto font-medium">Your professional support account is now active. You have full access to our strategy frameworks and premium tracks.</p>
 <button 
 onClick={() => onPaymentSuccess ? onPaymentSuccess() : window.location.reload()}
 className="bg-[#0B0E14] text-white px-12 py-5 rounded-full font-medium text-lg hover:bg-black transition-all shadow-xl active:scale-95 inline-flex items-center gap-3"
 >
 Enter Sanctuary <ArrowRight className="w-5 h-5" />
 </button>
 </div>
 );
 }

 if (selectedPlan) {
 return (
 <div className="max-w-6xl mx-auto py-24 px-8 animate-in slide-in-from-right duration-700 bg-white min-h-screen">
 <button onClick={() => setSelectedPlan(null)} className="flex items-center gap-2 text-slate-500 font-bold mb-12 hover:text-[#6366F1] transition-all group uppercase tracking-[0.2em] text-[10px]">
 <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Return to Frameworks
 </button>

 <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
 <div className="lg:col-span-5 space-y-12">
 <div className="space-y-6">
 <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">Secure Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] italic">Professional Sanctuary.</span></h2>
 <p className="text-slate-500 font-medium leading-relaxed">Prioritizing your well-being is the ultimate safeguard for your healthcare career. These premium frameworks are built specifically for <span className="text-[#6366F1] font-bold">your</span> agency.</p>
 </div>
 
 <div className="space-y-6">
 <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:translate-x-1 transition-transform">
 <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#6366F1] shadow-sm"><Users className="w-6 h-6" /></div>
 <div><p className="text-sm font-bold text-slate-900">Practitioner Trusted</p><p className="text-xs font-medium text-slate-500 mt-1">Implemented by 50k+ healthcare experts.</p></div>
 </div>
 <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 hover:translate-x-1 transition-transform">
 <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#6366F1] shadow-sm"><TrendingUp className="w-6 h-6" /></div>
 <div><p className="text-sm font-bold text-slate-900">Psychological Advantage</p><p className="text-xs font-medium text-slate-500 mt-1">Designed for high-impact clinical environments.</p></div>
 </div>
 </div>

 <div className="rounded-[2.5rem] bg-[#F8FAFC] border border-slate-100 p-10">
 <div className="flex justify-between items-center mb-8">
 <div>
 <h4 className="text-xl font-extrabold text-slate-900">{selectedPlan.name}</h4>
 <p className="text-[10px] font-bold text-[#6366F1] uppercase tracking-widest mt-1">Active Selection</p>
 </div>
 <div className="text-3xl font-extrabold tracking-tight text-slate-900">{selectedPlan.price}</div>
 </div>
 <ul className="space-y-4 pt-8 border-t border-slate-200">
 {selectedPlan.features.map((f: string) => (
 <li key={f} className="flex items-start gap-4 text-xs font-medium text-slate-600 leading-tight">
 <div className="w-1.5 h-1.5 rounded-full bg-[#6366F1] mt-1 shrink-0" />
 {f}
 </li>
 ))}
 </ul>
 </div>
 </div>

 <div className="lg:col-span-7 bg-white p-12 md:p-16 rounded-[4rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 space-y-12">
 <div className="flex items-center gap-6">
 <div className="w-14 h-14 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white rounded-full flex items-center justify-center shadow-md"><CreditCard className="w-7 h-7" /></div>
 <div><h3 className="text-2xl font-extrabold tracking-tight text-slate-900">Secure Payment</h3><p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">End-to-End Encryption Active</p></div>
 </div>

 {clientSecret ? (
 <div className="bg-[#F8FAFC] p-6 rounded-[2.5rem] border border-slate-100 min-h-[500px] overflow-hidden">
 <EmbeddedCheckoutProvider stripe={stripePromise} options={{ clientSecret }}>
 <EmbeddedCheckout />
 </EmbeddedCheckoutProvider>
 </div>
 ) : (
 <div className="space-y-10">
 <div className="p-8 bg-[#F8FAFC] rounded-[2.5rem] border border-slate-100">
 <p className="text-sm text-slate-500 font-medium leading-relaxed">You will be redirected to Stripe's encrypted payment interface to complete your selection. Your professional identity is protected by end-to-end clinical-grade security protocols.</p>
 </div>

 <button 
 onClick={handleCheckout} 
 disabled={isProcessing} 
 className="w-full py-6 bg-[#0B0E14] text-white rounded-full font-bold text-lg hover:bg-[#1a1f2e] transition-all flex items-center justify-center gap-3 shadow-md disabled:opacity-50 active:scale-[0.98]"
 >
 {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Finalizing Sanctuary Entry...</> : <><Lock className="w-5 h-5" /> Confirm Access Selection</>}
 </button>
 </div>
 )}
 </div>
 </div>
 </div>
 );
 }

 return (
 <div className="bg-[#F8FAFC] min-h-screen">
 <section id="pricing" className="py-32 relative z-10 text-center">
 <div className="max-w-4xl mx-auto px-6">
 <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-8">
 <Award className="w-3 h-3 text-emerald-600" />
 <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-700">
 PROFESSIONAL RESILIENCE TRACK
 </span>
 </div>
 <h2 className="text-5xl md:text-6xl font-extrabold text-[#0B0E14] mb-4 tracking-tight leading-tight">
 Invest in Your <br />
 <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] italic">Mental Resilience.</span>
 </h2>
 <p className="text-slate-500 text-lg font-medium mb-16 max-w-2xl mx-auto">
 Mastering professional boundaries is the #1 way to prevent individual clinical exhaustion.
 </p>

 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 max-w-5xl mx-auto">
 {[
 { icon: <ShieldAlert className="w-5 h-5 text-rose-400" />, title: "15%", sub: "BURNOUT REDUCTION" },
 { icon: <Activity className="w-5 h-5 text-[#6366F1]" />, title: "4.2 hrs", sub: "WEEKLY RECLAIMED" },
 { icon: <Shield className="w-5 h-5 text-emerald-400" />, title: "50k+", sub: "NURSES PROTECTED" },
 { icon: <Zap className="w-5 h-5 text-yellow-500" />, title: "35%", sub: "GUILT REDUCTION" }
 ].map((stat, i) => (
 <div key={i} className="bg-white p-6 rounded-3xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center justify-center">
 <div className="mb-3">{stat.icon}</div>
 <div className="text-xl font-extrabold text-slate-900">{stat.title}</div>
 <div className="text-[9px] font-bold text-slate-400 tracking-widest mt-1">{stat.sub}</div>
 </div>
 ))}
 </div>

 <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-4xl mx-auto text-left">
 {isLoadingPlans ? (
 <div className="w-full flex items-center justify-center py-20">
 <Loader2 className="w-10 h-10 text-[#6366F1] animate-spin" />
 </div>
 ) : (
 dbPlans.map((plan) => (
 <div key={plan.id || plan.name} className={`flex-1 bg-white rounded-[2.5rem] p-10 md:p-12 relative flex flex-col ${plan.highlight ? 'border-2 border-[#6366F1] shadow-[0_20px_60px_-15px_rgba(99,102,241,0.2)] transform md:-translate-y-4' : 'border border-slate-200 shadow-sm'}`}>
 {plan.highlight && (
 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6366F1] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
 BEST FOR SELF-CARE
 </div>
 )}
 <div className="flex items-center justify-between mb-2">
 <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">{plan.name}</h3>
 </div>
 <div className="flex items-baseline gap-2 mb-8">
 <span className="text-6xl font-extrabold text-slate-900 tracking-tighter">{plan.price}</span>
 <div className="flex items-center gap-2">
 {plan.strikeThroughPrice && <span className="text-sm font-bold text-slate-400 line-through decoration-rose-400/60">{plan.strikeThroughPrice}</span>}
 </div>
 </div>
 
 <div className="space-y-4 mb-10 text-sm font-medium text-slate-600 flex-1">
 {plan.features.map((feat: string, i: number) => (
 <div key={i} className="flex items-center gap-3">
 <div className={`w-5 h-5 rounded-full border ${plan.highlight ? 'border-indigo-100' : 'border-slate-100'} flex items-center justify-center shrink-0`}>
 <CheckCircle className={`w-3.5 h-3.5 ${plan.highlight ? 'text-[#6366F1]' : 'text-slate-400'}`} />
 </div>
 <span className="tracking-tight">{feat}</span>
 </div>
 ))}
 </div>

 {!hideButtons && (
 <button 
 onClick={() => handlePlanClick(plan)} 
 disabled={!!(isLoggedIn && userTier && (
 userTier.trim().toLowerCase() === plan.id.trim().toLowerCase() || 
 (plan.id.trim().toLowerCase() === '3_months' && userTier.trim().toLowerCase() === '1_year')
 ))}
 className={`w-full py-4 rounded-full font-bold transition-all disabled:opacity-50 ${plan.highlight ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:opacity-90 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]' : 'bg-[#0B0E14] hover:bg-[#1a1f2e] text-white'}`}
 >
 {isLoggedIn && userTier && userTier.trim().toLowerCase() === plan.id.trim().toLowerCase() 
 ? 'Active Framework' 
 : (isLoggedIn && userTier && plan.id.trim().toLowerCase() === '3_months' && userTier.trim().toLowerCase() === '1_year') 
 ? 'Full Access Active' 
 : plan.cta || (plan.highlight ? 'Secure My Sanity' : 'Lifetime Protection')}
 </button>
 )}
 </div>
 ))
 )}
 </div>

 {creditsUsed === 0 && onContinueFree && (!userTier || userTier === 'Free') && (
 <div className="flex justify-center pt-24 pb-12">
 <button onClick={onContinueFree} className="group flex flex-col md:flex-row items-center gap-8 p-12 md:p-16 rounded-[3rem] border border-slate-100 bg-white hover:border-[#6366F1]/30 transition-all w-full max-w-4xl text-left shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)]">
 <div className="w-20 h-20 bg-indigo-50 text-[#6366F1] rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"><Star className="w-10 h-10 fill-[#6366F1]" /></div>
 <div className="space-y-4 flex-1 text-center md:text-left">
 <h4 className="text-3xl font-extrabold text-slate-900 leading-tight">Claim one professional <br/>resilience strategy.</h4>
 <p className="text-lg text-slate-500 font-medium leading-relaxed">Experience the impact of a tailored strategy before committing to a full track.</p>
 </div>
 <div className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-[#6366F1] group-hover:text-white transition-all shrink-0">
 <ArrowRight className="w-8 h-8" />
 </div>
 </button>
 </div>
 )}
 </div>
 </section>
 </div>
 );
};

export default Pricing;
