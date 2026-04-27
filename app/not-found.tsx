'use client';

import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function NotFound() {
 return (
 <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 px-8 text-center animate-in fade-in duration-1000">
 <div className="w-24 h-24 bg-[#1a1f36] text-white shadow-md rounded-full flex items-center justify-center shadow-md mb-12 animate-bounce-slow rotate-3">
 <ShieldCheck className="w-12 h-12 text-indigo-600" />
 </div>
 <h1 className="text-9xl font-medium text-slate-800 mb-2 tracking-tighter absolute opacity-50 -z-10 select-none">404</h1>
 <h1 className="text-6xl font-medium text-slate-900 mb-4 tracking-tighter">Sanctuary Breach</h1>
 <h2 className="text-2xl font-medium mb-8 text-slate-600">The requested protocol is outside current jurisdiction.</h2>
 <p className="text-slate-500 mb-12 max-w-sm font-medium text-lg leading-relaxed">
 The resilience track or professional strategy you seek has been decommissioned or moved to a more secure sector.
 </p>
 <Link 
 href="/"
 className="px-12 py-5 glass-card text-white rounded-3xl font-bold text-[10px] uppercase tracking-[0.4em] hover:border-indigo-500/50 transition-all shadow-2xl active:scale-95"
 >
 Return to Command Center
 </Link>
 </div>
 );
}
