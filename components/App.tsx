'use client';

import React, { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Layout from './Layout';
import Footer from './Footer';
import SocialProof from './SocialProof';
import { Page, UserStats, BoundaryPlan, BundleType } from '../types';
import { generateBoundaryPlan } from '../services/geminiService';
import { useConstants } from '../components/ConstantsProvider';
import { 
 Heart, Shield, ArrowRight, Loader2, Sparkles, User as UserIcon, 
 Activity, ShieldCheck, Award, Brain, Zap, Stethoscope, 
 Quote, Fingerprint, Calendar, CheckCircle,
 ChevronRight, ShieldAlert,
 TrendingUp, Star, Check, Mail, MapPin, BadgeCheck, Zap as ZapIcon,
 Settings, LogOut, Trash2, Edit3, ExternalLink, CreditCard, Bell, ShieldQuestion, Save,
 History as HistoryIcon,
 Flame,
 Lock,
 Gauge,
 HeartPulse,
 FlameKindling,
 Info
} from 'lucide-react';

const AdminDashboard = dynamic(() => import('./AdminDashboard'), { ssr: false, loading: () => <LoadingSpinner /> });
const BoundaryWizard = dynamic(() => import('./BoundaryWizard'), { ssr: false, loading: () => <LoadingSpinner /> });
const HistoryPage = dynamic(() => import('./HistoryPage'), { ssr: false, loading: () => <LoadingSpinner /> });
const Pricing = dynamic(() => import('./Pricing'), { ssr: false, loading: () => <LoadingSpinner /> });
const GeneratePage = dynamic(() => import('./GeneratePage'), { ssr: false, loading: () => <LoadingSpinner /> });
const HelpCenter = dynamic(() => import('./HelpCenter'), { ssr: false, loading: () => <LoadingSpinner /> });
const PrivacyPolicy = dynamic(() => import('./PrivacyPolicy'), { ssr: false, loading: () => <LoadingSpinner /> });
const TermsOfService = dynamic(() => import('./TermsOfService'), { ssr: false, loading: () => <LoadingSpinner /> });
const ContactPage = dynamic(() => import('./ContactPage'), { ssr: false, loading: () => <LoadingSpinner /> });
const ProfilePage = dynamic(() => import('./ProfilePage'), { ssr: false, loading: () => <LoadingSpinner /> });
const HomePage = dynamic(() => import('./HomePage'), { ssr: false, loading: () => <LoadingSpinner /> });
const Auth = dynamic(() => import('./Auth'), { ssr: false, loading: () => <LoadingSpinner /> });

const LoadingSpinner = () => (
 <div className="flex items-center justify-center h-96">
 <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
 </div>
);


interface AppProps {
 initialPage?: Page;
}

const App: React.FC<AppProps> = ({ initialPage = 'home' }) => {
 const { pricingPlans: defaultPricingPlans, isLoading: isConstantsLoading } = useConstants() as any;
 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [user, setUser] = useState<any>(null);
 const [currentPage, setCurrentPage] = useState<Page>(initialPage);
 const [history, setHistory] = useState<BoundaryPlan[]>([]);
 const [stats, setStats] = useState<UserStats | null>(null);
 const [activePlan, setActivePlan] = useState<BoundaryPlan | undefined>(undefined);
 const [creditsUsed, setCreditsUsed] = useState(0);
 const [showCookies, setShowCookies] = useState(false);
 const [isAuthLoading, setIsAuthLoading] = useState(true);
 const [mounted, setMounted] = useState(false);
 const [pricingPlans, setPricingPlans] = useState<any[]>([]);
 const [isLoadingPricing, setIsLoadingPricing] = useState(true);

 useEffect(() => {
 if (defaultPricingPlans && pricingPlans.length === 0) {
 setPricingPlans(defaultPricingPlans);
 }
 }, [defaultPricingPlans]);

 const isPremium = user?.tier && user.tier.toLowerCase() !== 'free';

 useEffect(() => {
 setMounted(true);
 const checkSession = async () => {
 console.log("[SESSION CHECK] Starting session check...");
 try {
 // Check for Stripe success
 const urlParams = new URLSearchParams(window.location.search);
 const sessionId = urlParams.get('session_id');
 if (urlParams.get('success') === 'true' && sessionId) {
 console.log("[SESSION CHECK] Stripe success detected in URL, session ID:", sessionId);
 // Clear the URL params
 window.history.replaceState({}, document.title, window.location.pathname);
 
 // Log success message
 console.log("Payment successful! Verifying your Professional Resilience Track...");
 
 // If we have a user, refresh their data to show the new tier
 const savedSession = localStorage.getItem('nursebuilder_session');
 if (savedSession) {
 const session = JSON.parse(savedSession);
 if (session?.email) {
 console.log(`[SESSION CHECK] Verifying payment for ${session.email}`);
 
 // Retry logic for fetch
 let verifyResponse;
 let verifyRetries = 0;
 const maxVerifyRetries = 3;
 
 while (verifyRetries < maxVerifyRetries) {
 try {
 verifyResponse = await fetch('/api/payment/success', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ sessionId, email: session.email })
 });
 break; // Success
 } catch (fetchErr) {
 verifyRetries++;
 if (verifyRetries >= maxVerifyRetries) throw fetchErr;
 console.warn(`[SESSION CHECK] Payment verification fetch attempt ${verifyRetries} failed, retrying...`);
 await new Promise(resolve => setTimeout(resolve, 1000 * verifyRetries));
 }
 }
 
 if (verifyResponse && verifyResponse.ok) {
 const verifyData = await verifyResponse.json();
 console.log("[SESSION CHECK] Payment verified successfully", verifyData);
 if (verifyData.profile) {
 setUser(verifyData.profile);
 fetchUserData(session.email);
 } else {
 console.warn("[SESSION CHECK] Payment verified but profile not returned");
 }
 } else {
 const errorData = verifyResponse ? await verifyResponse.json().catch(() => ({ error: 'Unknown error' })) : { error: 'No response' };
 console.error("[SESSION CHECK] Payment verification failed:", verifyResponse?.status, errorData.error);
 }
 }
 }
 
 setCurrentPage('profile');
 }

 const savedSession = localStorage.getItem('nursebuilder_session');
 if (savedSession) {
 try {
 const session = JSON.parse(savedSession);
 if (session?.email) {
 console.log(`[SESSION CHECK] Restoring session for ${session.email}`);
 
 // Retry logic for fetch
 let response;
 let retries = 0;
 const maxRetries = 3;
 
 while (retries < maxRetries) {
 try {
 response = await fetch(`/api/auth?email=${encodeURIComponent(session.email)}&type=login-session`);
 break; // Success
 } catch (fetchErr) {
 retries++;
 if (retries >= maxRetries) throw fetchErr;
 console.warn(`[SESSION CHECK] Fetch attempt ${retries} failed, retrying...`);
 await new Promise(resolve => setTimeout(resolve, 1000 * retries));
 }
 }

 if (response && response.ok) {
 const data = await response.json();
 console.log("[SESSION CHECK] Session restored successfully");
 setUser(data.user);
 setIsLoggedIn(true);
 fetchUserData(data.user.email);
 } else {
 const errorData = response ? await response.json().catch(() => ({ error: 'Unknown error' })) : { error: 'No response' };
 console.warn("[SESSION CHECK] Session invalid or error:", errorData.error);
 localStorage.removeItem('nursebuilder_session');
 }
 }
 } catch (e: any) {
 console.error("[SESSION CHECK] Session restore error:", e.message || e);
 localStorage.removeItem('nursebuilder_session');
 }
 } else {
 console.log("[SESSION CHECK] No saved session found");
 }
 } catch (error) {
 console.error("[SESSION CHECK] Error during session check:", error);
 } finally {
 console.log("[SESSION CHECK] Session check complete, clearing loading state");
 setIsAuthLoading(false);
 }
 };

 checkSession();
 
 // Fetch real-time pricing
 const fetchPricing = async () => {
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
 period: t.duration_months < 12 ? `${t.duration_months} Months` : '1 Year',
 durationMonths: t.duration_months
 }));
 setPricingPlans(mapped);
 }
 }
 } catch (error) {
 console.error("Failed to fetch pricing plans:", error);
 } finally {
 setIsLoadingPricing(false);
 }
 };
 fetchPricing();
 
 // Safety timeout to ensure loading state is cleared
 const timeout = setTimeout(() => {
 setIsAuthLoading(false);
 }, 5000);
 
 const hasAccepted = localStorage.getItem('nursebuilder_cookies_accepted');
 if (!hasAccepted) {
 setShowCookies(true);
 }

 return () => clearTimeout(timeout);
 }, []);

 const handleLogout = async () => {
 try {
 await fetch('/api/auth', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ type: 'logout' })
 });
 } catch (e) {
 console.error("Logout error:", e);
 } finally {
 localStorage.removeItem('nursebuilder_session');
 setUser(null);
 setIsLoggedIn(false);
 setCurrentPage('home');
 }
 };

 const handleAcceptCookies = () => {
 localStorage.setItem('nursebuilder_cookies_accepted', 'true');
 setShowCookies(false);
 };

 const fetchUserData = async (email: string) => {
 try {
 const [statsRes, plansRes] = await Promise.all([
 fetch(`/api/user/stats?email=${encodeURIComponent(email)}`),
 fetch(`/api/plans?email=${encodeURIComponent(email)}`)
 ]);
 
 if (statsRes.ok) {
 const statsData = await statsRes.json();
 setStats(statsData.stats);
 setCreditsUsed(statsData.stats.sessionsCompleted);
 }
 
 if (plansRes.ok) {
 const plansData = await plansRes.json();
 setHistory(plansData.plans);
 }
 } catch (error) {
 console.error("Error fetching user data:", error);
 }
 };

 const handleAuthSuccess = (userData: any) => {
 localStorage.setItem('nursebuilder_session', JSON.stringify({ email: userData.email }));
 setUser(userData);
 setIsLoggedIn(true);
 fetchUserData(userData.email);
 setCurrentPage('pricing');
 };

 const renderContent = () => {
 const isPublicLegal = ['help', 'privacy', 'terms'].includes(currentPage);
 
 if (!isLoggedIn && currentPage !== 'home' && currentPage !== 'pricing' && currentPage !== 'admin' && !isPublicLegal) {
 return <Auth onAuthSuccess={handleAuthSuccess} setCurrentPage={setCurrentPage} />;
 }
 
 switch (currentPage) {
 case 'home': return <HomePage 
 onGenerate={handleGenerate} 
 isLoggedIn={isLoggedIn} 
 onJoin={(plan?: any) => {
 if (isLoggedIn) {
 setCurrentPage('pricing');
 } else {
 setCurrentPage('auth');
 }
 }} 
 creditsUsed={creditsUsed} 
 setCurrentPage={setCurrentPage} 
 userTier={user?.tier || 'Free'} 
 pricingPlans={pricingPlans}
 />;
 case 'admin': return <AdminDashboard user={user} />;
 case 'history': return <HistoryPage history={history} onReviewPlan={(p) => { setActivePlan(p); setCurrentPage('wizard'); }} onToggleSave={handleToggleSave} />;
 case 'wizard': return <BoundaryWizard 
 preloadedResult={activePlan} 
 onComplete={handleUpdatePlan} 
 setCurrentPage={setCurrentPage}
 hasCredits={isPremium || creditsUsed < (user?.sessions || 1)} 
 userEmail={user?.email || ''} 
 />;
 case 'pricing': return <Pricing 
 onPlanSelected={(plan) => {
 if (!isLoggedIn) {
 setCurrentPage('auth'); 
 }
 }} 
 creditsUsed={creditsUsed} 
 creditLimit={user?.sessions || 1}
 onContinueFree={() => setCurrentPage('auth')} 
 isLoggedIn={isLoggedIn}
 userEmail={user?.email}
 userTier={user?.tier || 'Free'}
 onPaymentSuccess={() => setCurrentPage('home')}
 dbPlansFromApp={pricingPlans}
 isLoadingPlansFromApp={isLoadingPricing}
 />;
 case 'profile': return <ProfilePage 
 user={user} 
 setUser={setUser} 
 setCurrentPage={setCurrentPage} 
 stats={stats} 
 onLogout={handleLogout} 
 onUpdateProfile={handleUpdateProfile} 
 creditsUsed={creditsUsed}
 creditLimit={user?.sessions || 1}
 />;
 case 'help': return <HelpCenter />;
 case 'contact': return <ContactPage />;
 case 'privacy': return <PrivacyPolicy />;
 case 'terms': return <TermsOfService />;
 case 'auth': return <Auth onAuthSuccess={handleAuthSuccess} setCurrentPage={setCurrentPage} />;
 case 'generate': return <GeneratePage onGenerate={handleGenerate} isLoggedIn={isLoggedIn} onJoin={() => setCurrentPage('auth')} creditsUsed={creditsUsed} stats={stats} />;
 default: return <HomePage 
 onGenerate={handleGenerate} 
 isLoggedIn={isLoggedIn} 
 onJoin={() => setCurrentPage('auth')} 
 creditsUsed={creditsUsed} 
 setCurrentPage={setCurrentPage} 
 userTier={user?.tier} 
 pricingPlans={pricingPlans}
 />;
 }
 };

 const handleGenerate = async (bundle: BundleType, issue: string, context: string) => {
 if (!isLoggedIn || !user) { setCurrentPage('auth'); return; }
 const hasAccess = isPremium || creditsUsed === 0;
 if (!hasAccess) { setCurrentPage('pricing'); return; }
 try {
 const plan = await generateBoundaryPlan(bundle, issue, context, user?.email || '');
 const fullPlan: BoundaryPlan = { 
 ...plan, 
 id: Math.random().toString(36).substr(2, 9), 
 bundle, 
 issue, 
 context, 
 timestamp: Date.now(), 
 isSaved: false, 
 currentPhase: bundle === 'Nurse No More Pleaser' ? 1 : undefined 
 };
 
 // Save to server
 const response = await fetch('/api/plans', {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: user.email, plan: fullPlan })
 });
 
 if (response.ok) {
 const { plan: savedPlan } = await response.json();
 setHistory(prev => [savedPlan, ...prev]);
 setActivePlan(savedPlan);
 setCreditsUsed(prev => prev + 1);
 setCurrentPage('wizard');
 // Refresh stats to get updated session count
 fetchUserData(user.email);
 }
 } catch (error) { 
 console.error("Generation error:", error);
 alert("Support Protocol Error. Please retry."); 
 }
 };

 const handleUpdatePlan = async (updatedPlan: BoundaryPlan) => {
 if (!user) return;
 try {
 const response = await fetch('/api/plans', {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: user.email, planId: updatedPlan.id, updates: updatedPlan })
 });
 if (response.ok) {
 setHistory(prev => prev.map(h => h.id === updatedPlan.id ? updatedPlan : h));
 setActivePlan(updatedPlan);
 }
 } catch (error) {
 console.error("Error updating plan:", error);
 }
 };

 const handleUpdateProfile = async (updates: any) => {
 if (!user) return false;
 try {
 const response = await fetch('/api/user/profile', {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: user.email, updates })
 });
 if (response.ok) {
 const { profile } = await response.json();
 setUser(profile);
 return true;
 }
 } catch (error) {
 console.error("Error updating profile:", error);
 }
 return false;
 };

 const handleToggleSave = async (planId: string) => {
 if (!user) return;
 const plan = history.find(p => p.id === planId);
 if (!plan) return;
 
 try {
 const response = await fetch('/api/plans', {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ email: user.email, planId, updates: { isSaved: !plan.isSaved } })
 });
 if (response.ok) {
 setHistory(prev => prev.map(p => p.id === planId ? { ...p, isSaved: !p.isSaved } : p));
 }
 } catch (error) {
 console.error("Error toggling save:", error);
 }
 };

 if (!mounted) {
 return (
 <div className="flex flex-col min-h-screen bg-slate-50">
 <div className="flex-1 flex items-center justify-center">
 <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
 </div>
 </div>
 );
 }

 return (
 <div className="flex flex-col min-h-screen relative overflow-x-hidden">
 <Layout 
 currentPage={currentPage} 
 setCurrentPage={setCurrentPage} 
 isLoggedIn={isLoggedIn} 
 onLogout={handleLogout} 
 creditsUsed={creditsUsed}
 userTier={user?.tier || 'Free'}
 >
 {isAuthLoading ? (
 <div className="flex items-center justify-center h-96">
 <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
 </div>
 ) : renderContent()}
 </Layout>
 {!isLoggedIn && currentPage !== 'admin' && <SocialProof />}
 <Footer setCurrentPage={setCurrentPage} />
 
 {showCookies && (
 <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] w-[calc(100%-3rem)] max-w-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
 <div className="bg-white/95 backdrop-blur-3xl text-white p-8 md:p-10 rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] border border-white/10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
 <div className="flex-1 space-y-3 text-center md:text-left">
 <p className="text-sm md:text-base font-medium text-indigo-600 flex items-center justify-center md:justify-start gap-2">
 <Sparkles className="w-5 h-5" /> Sanctuary Protocols
 </p>
 <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
 We use essential cookies to maintain your professional sanctuary and ensure the integrity of your identity data.
 </p>
 </div>
 <button 
 onClick={handleAcceptCookies}
 className="px-10 py-4 bg-indigo-50 text-slate-900 rounded-full font-medium text-sm hover:bg-indigo-400 transition-all shadow-xl active:scale-95 whitespace-nowrap cursor-pointer relative z-[120]"
 >
 Enter Sanctuary
 </button>
 </div>
 </div>
 )}
 </div>
 );
};

export default App;
