
'use client';

import React, { useState, useEffect } from 'react';
import { useConstants } from './ConstantsProvider';
import { ShoppingBag, X, Zap } from 'lucide-react';

const SocialProof: React.FC = () => {
 const { socialProofEntries, isLoading } = useConstants();
 const [isVisible, setIsVisible] = useState(false);
 const [currentIndex, setCurrentIndex] = useState(0);

 useEffect(() => {
 if (isLoading || socialProofEntries.length === 0) return;
 
 // 7 seconds interval = 7,000 ms
 const intervalTime = 7000;
 
 const showNotification = () => {
 const nextIndex = Math.floor(Math.random() * socialProofEntries.length);
 setCurrentIndex(nextIndex);
 setIsVisible(true);
 
 // Auto hide after 4 seconds to leave room for the 6s next interval
 setTimeout(() => {
 setIsVisible(false);
 }, 4000);
 };

 // Show first one after 2 seconds
 const initialTimeout = setTimeout(showNotification, 2000);

 const interval = setInterval(showNotification, intervalTime);

 return () => {
 clearTimeout(initialTimeout);
 clearInterval(interval);
 };
 }, [isLoading, socialProofEntries]);

 if (!isVisible || socialProofEntries.length === 0) return null;

 const entry = socialProofEntries[currentIndex];

 return (
 <div className="fixed bottom-10 left-10 z-[100] animate-in slide-in-from-left-full duration-700">
 <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200 p-8 flex items-center gap-8 max-w-sm relative group shadow-lg">
 <button 
 onClick={() => setIsVisible(false)}
 className="absolute -top-4 -right-4 w-10 h-10 bg-[#1a1f36] text-white rounded-full flex items-center justify-center hover:bg-black transition-all shadow-xl z-20 border-2 border-white"
 >
 <X className="w-5 h-5" />
 </button>
 
 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-white shrink-0 shadow-2xl group-hover:scale-105 transition-transform rotate-3">
 <Zap className="w-10 h-10 fill-indigo-500 text-indigo-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
 </div>
 
 <div className="space-y-2">
 <p className="text-lg text-slate-900 font-medium leading-none">
 <span className="text-indigo-600 font-medium">{entry.name}</span> <span className="text-slate-600 font-medium text-sm">in {entry.city}</span>
 </p>
 <p className="text-xs text-slate-500 font-medium lowercase leading-relaxed">
 purchased <span className="font-bold text-slate-900">1 year access</span> to <span className="text-indigo-600 font-bold">{entry.plan}</span>
 </p>
 <div className="flex items-center gap-3 pt-2">
 <div className="w-2.5 h-2.5 rounded-full bg-indigo-50 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em] leading-none">
 {entry.timeText}
 </p>
 </div>
 </div>
 </div>
 </div>
 );
};

export default SocialProof;
