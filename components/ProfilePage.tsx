'use client';

import React, { useState } from 'react';
import {
    User as UserIcon, BadgeCheck, Edit3, LogOut, Mail, MapPin, Save, Loader2,
    Activity, ShieldCheck, Award, Sparkles, Zap as ZapIcon, TrendingUp, Shield, Calendar, Brain, History,
    ShieldAlert, Trash2, X, Check, Zap
} from 'lucide-react';
import { UserStats, MetricBreakdown } from '../types';
import { useConstants } from './ConstantsProvider';

export const MetricBreakdownCard = ({ title, breakdowns, icon: Icon, colorClass, bgColorClass }: { title: string, breakdowns: MetricBreakdown[], icon: any, colorClass: string, bgColorClass: string }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
            <div className={`w-8 h-8 rounded-full ${bgColorClass} ${colorClass} flex items-center justify-center`}>
                <Icon className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 tracking-tight">{title}</h3>
        </div>
        <div className="space-y-3 flex-1">
            {breakdowns.map((b, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <div className="space-y-0.5">
                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{b.label}</p>
                        <p className="text-[10px] text-slate-400 font-medium leading-tight max-w-[140px]">{b.info}</p>
                    </div>
                    <span className={`text-xl font-extrabold ${colorClass} tracking-tight`}>{b.value}</span>
                </div>
            ))}
        </div>
    </div>
);

const ProfilePage = ({
    user,
    setUser,
    setCurrentPage,
    stats,
    onLogout,
    onUpdateProfile,
    creditsUsed = 0,
    creditLimit = 1
}: {
    user: any,
    setUser: any,
    setCurrentPage: any,
    stats: UserStats | null,
    onLogout: () => void,
    onUpdateProfile: (updates: any) => Promise<boolean>,
    creditsUsed?: number,
    creditLimit?: number
}) => {
    const { nurseCareers } = useConstants();
    const [isEditing, setIsEditing] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [editFirstName, setEditFirstName] = useState(user?.first_name || user?.name?.split(' ')[0] || '');
    const [editLastName, setEditLastName] = useState(user?.last_name || user?.name?.split(' ').slice(1).join(' ') || '');
    const [editCareer, setEditCareer] = useState(user?.career || '');
    const [isUpdating, setIsUpdating] = useState(false);

    if (!stats) return <div className="flex items-center justify-center min-h-screen bg-[#F8FAFC]"><Loader2 className="w-12 h-12 animate-spin text-[#6366F1]" /></div>;

    const handleUpdate = async () => {
        setIsUpdating(true);
        const success = await onUpdateProfile({
            firstName: editFirstName,
            lastName: editLastName,
            career: editCareer,
            name: `${editFirstName} ${editLastName}`.trim()
        });
        if (success) {
            setIsEditing(false);
        }
        setIsUpdating(false);
    };

    const handleCloseAccount = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch('/api/user/profile', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email })
            });
            if (response.ok) {
                onLogout();
            } else {
                alert("Failed to close account. Please try again or contact support.");
            }
        } catch (error) {
            console.error("Error closing account:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <div className="max-w-5xl mx-auto px-6 py-20 space-y-10 animate-in fade-in duration-700">

                {/* Provisioning Status Card */}
                <div className="bg-slate-50/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-[#6366F1]">
                            <Zap className="w-3 h-3" />
                            <span className="text-[9px] font-bold uppercase tracking-widest">STRATEGY PROVISIONING STATUS</span>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                            {creditLimit >= 9999 ? 'Unlimited Resilience Access' : 'Strategy Balance'}
                        </h3>
                        <p className="text-sm font-medium text-slate-500">
                            {creditLimit >= 9999
                                ? 'Your account is fully provisioned with premium shift protocols.'
                                : `System balance: ${Math.max(0, creditLimit - creditsUsed)} professional strategies remaining.`}
                        </p>
                    </div>

                    <div className="w-full md:w-64 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">USAGE VELOCITY</span>
                            <span className="text-[10px] font-extrabold text-[#6366F1] uppercase tracking-wider">
                                {creditLimit >= 9999 ? 'MAXED' : `${creditsUsed}/${creditLimit}`}
                            </span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#6366F1] rounded-full transition-all duration-1000"
                                style={{ width: `${Math.min((creditsUsed / creditLimit) * 100, 100)}%` }}
                            >
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setCurrentPage('pricing')}
                        className="px-6 py-3 border border-[#6366F1] text-[#6366F1] rounded-full font-bold text-xs hover:bg-indigo-50 transition-all shrink-0"
                    >
                        Manage Plan
                    </button>
                </div>

                {/* User Profile Card */}
                <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden">
                    <div className="flex items-center gap-8 z-10 flex-1">
                        <div className="w-32 h-32 bg-[#6366F1] text-white rounded-[2rem] flex items-center justify-center relative shadow-lg">
                            <UserIcon className="w-12 h-12" />
                            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                                <BadgeCheck className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {isEditing ? (
                                <div className="space-y-3 max-w-sm">
                                    <div className="flex gap-2">
                                        <input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:border-[#6366F1] outline-none" placeholder="First Name" />
                                        <input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:border-[#6366F1] outline-none" placeholder="Last Name" />
                                    </div>
                                    <select
                                        value={editCareer}
                                        onChange={(e) => setEditCareer(e.target.value)}
                                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl font-medium text-sm focus:border-[#6366F1] outline-none"
                                    >
                                        <option value="">Select Specialty</option>
                                        {nurseCareers.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            ) : (
                                <>
                                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{user?.name || `${user?.first_name} ${user?.last_name}` || 'Practitioner'}</h1>
                                    <p className="text-[#6366F1] font-bold text-[10px] uppercase tracking-widest">{user?.career || 'Institutional Specialist'}</p>
                                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500 pt-2">
                                        <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {user?.email}</div>
                                        <div className="flex items-center gap-1.5 text-slate-400"><MapPin className="w-3 h-3" /> Verified Unit</div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full md:w-48 z-10">
                        <button onClick={() => setCurrentPage('history')} className="w-full py-3 bg-indigo-50 text-[#6366F1] rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 hover:bg-indigo-100">
                            <History className="w-3.5 h-3.5" /> Strategy History
                        </button>
                        {!isEditing ? (
                            <button onClick={() => setIsEditing(true)} className="w-full py-3 bg-[#0B0E14] text-white rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 hover:bg-[#1a1f2e] shadow-md">
                                <Edit3 className="w-3.5 h-3.5" /> Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button onClick={handleUpdate} disabled={isUpdating} className="flex-1 py-3 bg-[#0B0E14] text-white rounded-full font-bold text-xs transition-all flex items-center justify-center shadow-md">
                                    {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save'}
                                </button>
                                <button onClick={() => setIsEditing(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-full font-bold text-xs hover:bg-slate-200">
                                    Cancel
                                </button>
                            </div>
                        )}
                        <button onClick={onLogout} className="w-full py-3 text-rose-500 bg-rose-50 rounded-full font-bold text-xs transition-all flex items-center justify-center gap-2 hover:bg-rose-100 mt-1">
                            <LogOut className="w-3.5 h-3.5" /> Logout
                        </button>
                    </div>
                </div>

                {/* Metrics 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricBreakdownCard title="Clinical Burnout Audit" breakdowns={stats.burnoutBreakdown} icon={Activity} colorClass="text-rose-500" bgColorClass="bg-rose-50" />
                    <MetricBreakdownCard title="Professional Resilience" breakdowns={stats.resilienceBreakdown} icon={ShieldCheck} colorClass="text-emerald-500" bgColorClass="bg-emerald-50" />
                    <MetricBreakdownCard title="Practice Performance" breakdowns={stats.performanceMetrics} icon={Award} colorClass="text-[#6366F1]" bgColorClass="bg-indigo-50" />
                </div>

                {/* Dark Summary Block */}
                <div className="bg-[#0B0E14] rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 pointer-events-none">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-12 relative z-10">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight mb-2">Transformation Summary</h2>
                            <p className="text-slate-400 font-medium text-sm">You have successfully built {stats.boundaryScore} professional boundaries.</p>
                        </div>
                        <div className="bg-[#131620] px-8 py-6 rounded-3xl border border-slate-800 text-center shadow-inner min-w-[160px]">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Resilience Quotient</p>
                            <p className="text-4xl font-extrabold text-white">{stats.boundaryScore}<span className="text-lg text-slate-600">/100</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 relative z-10">
                        <div className="bg-[#131620] p-6 rounded-2xl border border-slate-800/50">
                            <div className="w-6 h-6 rounded-full bg-yellow-500/10 flex items-center justify-center mb-4"><Zap className="w-3 h-3 text-yellow-500" /></div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Freedom Score</p>
                            <p className="text-2xl font-extrabold">60%</p>
                        </div>
                        <div className="bg-[#131620] p-6 rounded-2xl border border-slate-800/50">
                            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4"><TrendingUp className="w-3 h-3 text-emerald-500" /></div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Assertive Streak</p>
                            <p className="text-2xl font-extrabold">0 days</p>
                        </div>
                        <div className="bg-[#131620] p-6 rounded-2xl border border-slate-800/50">
                            <div className="w-6 h-6 rounded-full bg-[#6366F1]/10 flex items-center justify-center mb-4"><Shield className="w-3 h-3 text-[#6366F1]" /></div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Incident Delta</p>
                            <p className="text-2xl font-extrabold">-30%</p>
                        </div>
                        <div className="bg-[#131620] p-6 rounded-2xl border border-slate-800/50">
                            <div className="w-6 h-6 rounded-full bg-rose-500/10 flex items-center justify-center mb-4"><Calendar className="w-3 h-3 text-rose-500" /></div>
                            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-500 mb-1">Reclaimed Time</p>
                            <p className="text-2xl font-extrabold">1h</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-3xl p-8 relative z-10 flex gap-4 items-start shadow-xl">
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/80 mb-2">Clinical Insight</p>
                            <p className="text-lg font-medium text-white italic">"{stats.clinicalInsight}"</p>
                        </div>
                    </div>
                </div>

                {/* Close Account */}
                <div className="flex justify-center pt-8 pb-12">
                    {!showDeleteConfirm ? (
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-rose-500 transition-all flex items-center gap-2"
                        >
                            <ShieldAlert className="w-3 h-3" /> Close Professional Support Account
                        </button>
                    ) : (
                        <div className="bg-white p-8 rounded-[2rem] border border-rose-100 shadow-lg w-full max-w-md text-center">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Decommission</h3>
                            <p className="text-sm text-slate-500 mb-6">This action is irreversible and will delete all stored strategies.</p>
                            <div className="flex gap-3">
                                <button onClick={handleCloseAccount} disabled={isDeleting} className="flex-1 py-3 bg-rose-500 text-white rounded-full font-bold text-xs hover:bg-rose-600 transition-all">
                                    {isDeleting ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Delete Account'}
                                </button>
                                <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-full font-bold text-xs hover:bg-slate-200 transition-all">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;
